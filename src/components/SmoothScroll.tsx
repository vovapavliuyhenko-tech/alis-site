"use client";
// Плавный (инерционный) скролл, как на resayme (SmoothScroll ~800мс).
// Перехватывает колесо и доезжает с ease. Включается только если rAF реально
// тикает (иначе — нативный скролл, ничего не ломаем).
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(pointer: fine)").matches) return; // тач-устройства — нативный скролл

    let cleanup = () => {};

    // Проба: включаем перехват только когда кадры реально рендерятся
    const probe = requestAnimationFrame(() => {
      let target = window.scrollY;
      let current = window.scrollY;
      let running = false;
      let rafId = 0;
      const ease = 0.12;

      const maxScroll = () =>
        document.documentElement.scrollHeight - window.innerHeight;
      const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

      const tick = () => {
        current += (target - current) * ease;
        if (Math.abs(target - current) < 0.5) {
          current = target;
          window.scrollTo(0, current);
          running = false;
          return;
        }
        window.scrollTo(0, current);
        rafId = requestAnimationFrame(tick);
      };

      const onWheel = (e: WheelEvent) => {
        if (e.ctrlKey) return; // зум — не трогаем
        e.preventDefault();
        const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        target = clamp((running ? target : window.scrollY) + delta);
        if (!running) {
          running = true;
          current = window.scrollY;
          rafId = requestAnimationFrame(tick);
        }
      };

      const onScroll = () => {
        if (!running) target = window.scrollY; // синхрон при обычном скролле
      };

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanup = () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rafId);
      };
    });

    return () => {
      cancelAnimationFrame(probe);
      cleanup();
    };
  }, []);

  return null;
}
