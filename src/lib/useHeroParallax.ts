"use client";
// Эффект «статичного фона» для фото на обложке: при прокрутке фото уезжает медленнее
// страницы (смещается вниз на долю прокрутки). Фото должно быть выше блока на ту же долю
// (130% при K = 0.3; хук сам задаёт высоту), чтобы снизу не открывался пустой край.
// На телефонах (сенсорный экран) выключено: там прокрутка идёт мимо JS и фото дёргалось бы.
import { useEffect, type RefObject } from "react";

const K = 0.3;

export function useHeroParallax(img: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = img.current;
    if (!el || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Запас по высоте под сдвиг — только когда эффект включён (на телефоне кадр не меняется)
    el.style.setProperty("height", `${(1 + K) * 100}%`);
    let raf = 0;
    const apply = () => {
      raf = 0;
      const y = window.scrollY;
      // Пока обложка на экране — двигаем; дальше не трогаем
      if (y <= window.innerHeight * 1.2) el.style.setProperty("transform", `translate3d(0, ${y * K}px, 0)`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [img]);
}
