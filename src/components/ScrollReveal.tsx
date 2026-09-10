"use client";
// Появление элементов при скролле: .r-reveal въезжают снизу с прозрачностью,
// соседи — со стаггером. Работает и при smooth-scroll (Lenis): помимо scroll/
// resize крутим rAF-тикер, пока не проявятся все элементы — не зависим от того,
// шлёт ли Lenis нативный scroll.
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
    let raf = 0;

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

    // rAF-тикер: проверяем видимость каждый кадр (надёжно при Lenis-скролле)
    const tick = () => {
      reveal();
      if (pending.size > 0) raf = requestAnimationFrame(tick);
    };

    const cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };

    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    raf = requestAnimationFrame(tick);

    return cleanup;
  }, []);

  return null;
}
