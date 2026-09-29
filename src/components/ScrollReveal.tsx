"use client";
// Появление элементов при скролле: .r-reveal въезжают снизу с прозрачностью,
// соседи — со стаггером. Видимость отслеживает IntersectionObserver (работает и
// с плавным скроллом SmoothScroll — он двигает страницу через window.scrollTo).
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

    // IntersectionObserver вместо проверки каждый кадр: раньше на каждом кадре
    // пересчитывалось положение всех элементов — на телефонах прокрутка дёргалась.
    // Порог «нижние 10% экрана» — как было.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    // То, что уже на экране при загрузке, показываем сразу (не ждём первого колбэка)
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
      else io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
