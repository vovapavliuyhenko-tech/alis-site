"use client";
// ЭФФЕКТЫ ОБЛОЖЕК (главная и все внутренние страницы):
//  SplitTitle   — буквы заголовка проявляются по одной из лёгкого размытия, под ним
//                 прорисовывается тонкая линия («кинематографичное появление»);
//  Grain        — лёгкое плёночное «зерно» + мягкая виньетка по краям фото;
//  useHeroLive  — «живое фото»: фото чуть смещается за мышкой (глубина), заголовок — навстречу;
//                 при прокрутке заголовок уменьшается и растворяется, фото темнеет.
// Анимации — в globals.css (hero-zoom, hero-letter, hero-line, hero-up). При «уменьшить
// движение» всё выключено; смещение за мышкой — только для мыши.
import { useEffect, type RefObject } from "react";

export function SplitTitle({ text, delay = 0.35 }: { text: string; delay?: number }) {
  let n = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, w, arr) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {word.split("").map((ch) => {
              const d = delay + n++ * 0.035;
              return (
                <span key={n} className="hero-letter inline-block" style={{ animationDelay: `${d}s` }}>
                  {ch}
                </span>
              );
            })}
            {w < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </>
  );
}

// Тонкая линия под заголовком — прорисовывается после букв
export function TitleLine({ delay = 1.1 }: { delay?: number }) {
  return <span aria-hidden className="hero-line mx-auto mt-3 block h-px w-12 origin-center bg-white/70 sm:mt-4 sm:w-16" style={{ animationDelay: `${delay}s` }} />;
}

// Плёночное зерно и виньетка — поверх фото, под текстом
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
export function Grain() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,.28) 100%)" }} />
      <div aria-hidden className="hero-grain pointer-events-none absolute -inset-[20%] -z-10 opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
    </>
  );
}

export function useHeroLive(
  section: RefObject<HTMLElement | null>,
  img: RefObject<HTMLElement | null>,
  content: RefObject<HTMLElement | null>,
  shade: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const sec = section.current, ph = img.current, ct = content.current, sh = shade.current;
    if (!sec || !ph || !ct || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mouse = matchMedia("(pointer: fine)").matches;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const draw = () => {
      raf = 0;
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      ph.style.translate = `${x}px ${y}px`;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.7)));
      ct.style.translate = `${-x * 0.35}px ${-y * 0.35}px`;
      ct.style.opacity = String(1 - p * 1.1);
      ct.style.scale = String(1 - p * 0.08);
      if (sh) sh.style.opacity = String(p * 0.45);
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const move = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      tx = -((e.clientX - r.left) / r.width - 0.5) * 22;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 16;
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
    if (mouse) {
      sec.addEventListener("pointermove", move);
      sec.addEventListener("pointerleave", leave);
    }
    window.addEventListener("scroll", kick, { passive: true });
    kick();
    return () => {
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", kick);
      cancelAnimationFrame(raf);
    };
  }, [section, img, content, shade]);
}
