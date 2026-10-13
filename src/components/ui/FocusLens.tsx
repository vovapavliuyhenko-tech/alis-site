"use client";
// «ЛИНЗА ФОКУСА» на обложках (по мотивам insideart.pro): пока курсор над первым блоком,
// фото плавно размывается, а за курсором едет чёткое «окно» с уголками-рамкой и крестиком
// по центру. Окно догоняет курсор с инерцией. Курсор ушёл — фото снова целиком чёткое.
// Только для мыши (на телефонах и при «уменьшить движение» — выключено).
// Ставится внутрь обложки между фото (-z-20) и затемнением (-z-10); фото-копии повторяют
// эффект «статичного фона» (useHeroParallax), чтобы совпадать с основным фото.
import { useEffect, useRef, useState } from "react";
import { useHeroParallax } from "@/lib/useHeroParallax";

export default function FocusLens({ src, imgClass = "object-center" }: { src: string; imgClass?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const blurImg = useRef<HTMLImageElement>(null);
  const sharpImg = useRef<HTMLImageElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [over, setOver] = useState(false);
  useHeroParallax(blurImg);
  useHeroParallax(sharpImg);

  useEffect(() => {
    const ok = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    const host = el?.parentElement; // обложка (section)
    if (!ok || !el || !host || !sharpImg.current || !frame.current) return;
    setEnabled(true);
    const sharp = sharpImg.current, fr = frame.current;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, first = true;
    const size = () => { const w = Math.min(260, Math.max(170, host.clientWidth * 0.15)); return { w, h: w * 1.45 }; };
    const draw = () => {
      raf = 0;
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      const { w, h } = size();
      const r = host.getBoundingClientRect();
      const left = x - w / 2, top = y - h / 2;
      // Окно в координатах обложки → clip-path для чёткой копии (она сдвинута параллаксом)
      const imgTop = sharp.getBoundingClientRect().top - r.top;
      sharp.style.clipPath = `inset(${top - imgTop}px ${r.width - left - w}px ${sharp.offsetHeight - (top - imgTop) - h}px ${left}px round 2px)`;
      fr.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      fr.style.width = `${w}px`;
      fr.style.height = `${h}px`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(draw);
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (first) { x = tx; y = ty; first = false; }
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const enter = (e: PointerEvent) => { first = true; move(e); setOver(true); };
    const leave = () => setOver(false);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const corner = "absolute h-5 w-5 border-white/85";
  return (
    <div ref={root} aria-hidden className={`pointer-events-none absolute inset-0 -z-[15] transition-opacity duration-700 ${enabled && over ? "opacity-100" : "opacity-0"}`}>
      {/* Размытая копия поверх основного фото */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={blurImg} src={src} alt="" className={`absolute inset-x-0 top-0 h-full w-full scale-[1.04] object-cover blur-[12px] will-change-transform ${imgClass}`} />
      {/* Чёткая копия — видна только в «окне» */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={sharpImg} src={src} alt="" className={`absolute inset-x-0 top-0 h-full w-full object-cover will-change-transform ${imgClass}`} style={{ clipPath: "inset(50%)" }} />
      {/* Рамка окна: уголки и крестик по центру */}
      <div ref={frame} className="absolute left-0 top-0 will-change-transform">
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/80" />
        <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/80" />
      </div>
    </div>
  );
}
