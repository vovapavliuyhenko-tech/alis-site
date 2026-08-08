"use client";
// Кастомный курсор — точь-в-точь как на paloma.website: белая точка 6px следует
// за мышью мгновенно, кольцо 32px тянется с задержкой; контейнер в режиме
// mix-blend-mode: difference (инвертирует цвет под собой). При наведении на
// интерактив точка скрывается, рамка кольца становится ярче. Только для мыши.
import { useEffect, useRef } from "react";

const HOVER_SEL =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Только для точных указателей (мышь/трекпад), не для тач
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    if (!root || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.style.opacity = "1";
      const t = e.target as Element | null;
      const hov = !!(t && t.closest && t.closest(HOVER_SEL));
      root.classList.toggle("is-hovering", hov);
    };

    const tick = () => {
      rx += (mx - rx) * 0.18; // кольцо догоняет с задержкой
      ry += (my - ry) * 0.18;
      root.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx - mx}px, ${ry - my}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const hide = () => (root.style.opacity = "0");
    const show = () => (root.style.opacity = "1");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" style={{ opacity: 0 }} aria-hidden>
      <div ref={ringRef} className="custom-cursor__ring" />
      <div className="custom-cursor__dot" />
    </div>
  );
}
