"use client";
// Кастомный курсор — «чернильная капля» точь-в-точь как на paloma.website
// (портирована их логика cursor.js): цепочка из 20 точек, слипающихся в каплю
// через SVG goo-фильтр; в покое хвостовые точки тихо кружатся вокруг
// зафиксированных позиций (капля «переплывает»). Цвет адаптивный — тёмный на
// светлых секциях, светлый на тёмных, чтобы капля была видна на любом фоне.
import { useEffect, useRef } from "react";

const AMOUNT = 20;
const SINE_DOTS = Math.floor(AMOUNT * 0.3); // 6
const WIDTH = 26;
const IDLE_TIMEOUT = 150;
const TRAIL = 0.35;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -100, y: -100 };
    let idle = false;
    let visible = false;
    let timeoutID: number | undefined;
    let raf = 0;

    // Точка цепочки (как у paloma)
    class Dot {
      index: number;
      anglespeed = 0.05;
      x = 0;
      y = 0;
      scale: number;
      range: number;
      angleX = 0;
      angleY = 0;
      lockX = 0;
      lockY = 0;
      el: HTMLSpanElement;
      constructor(index: number) {
        this.index = index;
        this.scale = 1 - 0.05 * index;
        this.range = WIDTH / 2 - (WIDTH / 2) * this.scale + 2;
        this.el = document.createElement("span");
        this.el.style.transform = `scale(${this.scale})`;
        cursor.appendChild(this.el);
      }
      lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.PI * 2 * Math.random();
        this.angleY = Math.PI * 2 * Math.random();
      }
      draw() {
        if (!idle || this.index <= SINE_DOTS) {
          this._set(this.x, this.y);
        } else {
          this.angleX += this.anglespeed;
          this.angleY += this.anglespeed;
          this.y = this.lockY + Math.sin(this.angleY) * this.range;
          this.x = this.lockX + Math.sin(this.angleX) * this.range;
          this._set(this.x, this.y);
        }
      }
      _set(x: number, y: number) {
        this.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${this.scale})`;
      }
    }

    const dots: Dot[] = [];
    for (let i = 0; i < AMOUNT; i++) dots.push(new Dot(i));

    // Idle — капля расплывается на месте
    const startIdle = () => {
      timeoutID = window.setTimeout(goInactive, IDLE_TIMEOUT);
      idle = false;
    };
    const resetIdle = () => {
      clearTimeout(timeoutID);
      startIdle();
    };
    function goInactive() {
      idle = true;
      for (const dot of dots) dot.lock();
    }

    // Адаптивный цвет: тёмная капля на светлом фоне, светлая — на тёмном
    const updateColor = (px: number, py: number) => {
      let el = document.elementFromPoint(px, py) as Element | null;
      while (el) {
        const bg = getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);
        if (m && (m[4] === undefined || parseFloat(m[4]) > 0.4)) {
          const lum = (0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3]) / 255;
          cursor.classList.toggle("on-light", lum > 0.55);
          return;
        }
        el = el.parentElement;
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX - WIDTH / 2;
      mouse.y = e.clientY - WIDTH / 2;
      if (!visible) {
        visible = true;
        cursor.classList.add("is-visible");
      }
      updateColor(e.clientX, e.clientY);
      resetIdle();
    };
    const leave = () => {
      cursor.classList.remove("is-visible");
      visible = false;
    };
    const enter = () => {
      if (mouse.x > -100) {
        cursor.classList.add("is-visible");
        visible = true;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    const render = () => {
      raf = requestAnimationFrame(render);
      let x = mouse.x;
      let y = mouse.y;
      dots.forEach((dot, index) => {
        const nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        if (!idle || index <= SINE_DOTS) {
          x += (nextDot.x - dot.x) * TRAIL;
          y += (nextDot.y - dot.y) * TRAIL;
        }
      });
    };
    startIdle();
    render();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutID);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cursor.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* SVG-фильтр goo — слипает точки в чернильную каплю */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="palomaGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div ref={cursorRef} className="ink-cursor" aria-hidden />
    </>
  );
}
