"use client";
// Появление элементов при скролле (как на resayme): .r-reveal въезжают снизу
// с прозрачностью, соседи — со стаггером. На scroll + getBoundingClientRect
// (надёжнее IntersectionObserver в средах без композиции кадров).
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".r-reveal"));
    if (els.length === 0) return;

    // стаггер внутри одного родителя
    els.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const sibs = Array.from(parent.querySelectorAll<HTMLElement>(":scope > .r-reveal"));
      const idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.09, 0.6) + "s";
    });

    const pending = new Set(els);

    const reveal = () => {
      const vh = window.innerHeight;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) {
          el.classList.add("is-in");
          pending.delete(el);
        }
      });
      if (pending.size === 0) cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };

    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    reveal(); // сразу показать то, что уже в поле зрения

    return cleanup;
  }, []);

  return null;
}
