"use client";
// ЭФФЕКТЫ ОБЛОЖЕК (главная и все внутренние страницы):
//  SplitTitle   — буквы заголовка проявляются по одной из лёгкого размытия, под ним
//                 прорисовывается тонкая линия («кинематографичное появление»);
//  Grain        — лёгкое плёночное «зерно» + мягкая виньетка по краям фото;
//  useHeroLive  — при прокрутке заголовок с текстом заметно уменьшается и исчезает, фото темнеет.
// Анимации — в globals.css (hero-zoom, hero-letter, hero-line, hero-up). При «уменьшить
// движение» всё выключено.
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
    let raf = 0;
    // При прокрутке заголовок с текстом заметно уменьшается и исчезает, фото темнеет
    const draw = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)));
      ct.style.opacity = String(Math.max(0, 1 - p * 1.4));
      ct.style.scale = String(1 - p * 0.35);
      ct.style.transformOrigin = "50% 100%";
      if (sh) sh.style.opacity = String(p * 0.45);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    window.addEventListener("scroll", kick, { passive: true });
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      cancelAnimationFrame(raf);
    };
  }, [section, img, content, shade]);
}
