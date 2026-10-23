"use client";
// ОТЗЫВЫ «стеной» (по референсу): маленькая подпись «[ Отзывы ]», заголовок, под ним плашка
// с рейтингом (4.9 ★★★★★ · 75+ отзывов на Яндекс и 2ГИС ↗), ниже — две бегущие ленты
// светлых карточек в разные стороны. Карточка: текст отзыва, внизу кружок с буквой имени,
// имя и услуга. Ленты едут сами и листаются (палец, колёсико, мышка). Края растворяются в белом.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { REVIEWS } from "@/components/Reviews";

type Loc = { ru: string; en: string };
const YANDEX = "https://yandex.ru/maps/org/lis_byuti/63024642190/reviews/";

function Card({ r, lang }: { r: (typeof REVIEWS)[number]; lang: "ru" | "en" }) {
  return (
    <figure className="mr-2.5 flex w-[230px] shrink-0 flex-col justify-between rounded-[18px] min-h-[170px] border border-[#17191a]/[0.06] bg-white p-4 sm:mr-3 sm:min-h-[230px] sm:rounded-[20px] sm:p-6 shadow-[0_10px_30px_-18px_rgba(23,25,26,0.28)] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2 hover:shadow-[0_22px_40px_-20px_rgba(23,25,26,0.35)] sm:w-[380px] lg:mr-4">
      <blockquote className="text-[10.5px] leading-[1.5] text-[#17191a]/85 sm:text-[12.5px] sm:leading-[1.55]">{r.text[lang]}</blockquote>
      <figcaption className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-2.5">
        <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#17191a] text-[9px] text-white sm:h-6 sm:w-6 sm:text-[10px]">
          {r.name[lang].charAt(0)}
        </span>
        <span className="text-[9.5px] sm:text-[11.5px]">
          <span className="font-medium text-[#17191a]">{r.name[lang]}</span>
          <span className="text-[#17191a]/50"> · {r.role[lang]}</span>
        </span>
      </figcaption>
    </figure>
  );
}

// Лента: сама медленно едет (вторая — в обратную сторону) и её можно листать —
// пальцем, колёсиком/тачпадом или перетаскиванием мышкой. Пока человек листает или навёл
// курсор — авто-прокрутка на паузе. Контент продублирован — лента бесконечная.
function Row({ items, reverse, lang }: { items: typeof REVIEWS; reverse?: boolean; lang: "ru" | "en" }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, hold = false, until = 0, last = performance.now(), seen = false;
    const half = () => el.scrollWidth / 2;
    if (reverse) el.scrollLeft = half();
    // Точная позиция дробью: браузер округляет scrollLeft, мелкий шаг иначе теряется
    let pos = el.scrollLeft;
    const loop = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      // Лента за кадром — не крутим (экономим ресурсы, прокрутка страницы плавнее)
      if (!seen) { raf = requestAnimationFrame(loop); return; }
      // человек пролистал сам — продолжаем с его места
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
      if (!still && !hold && t > until) pos += (reverse ? -1 : 1) * dt * 0.035;
      // бесконечность: перескок на ту же точку второй копии
      if (pos >= half()) pos -= half();
      else if (pos <= 0) pos += half();
      el.scrollLeft = pos;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen) pos = el.scrollLeft; }, { rootMargin: "100px" });
    io.observe(el);
    const pause = () => { until = performance.now() + 2500; };
    // Перетаскивание мышкой
    let down = false, sx = 0, sl = 0, moved = false;
    const pd = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; el.style.cursor = "grabbing"; };
    const pm = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; el.scrollLeft = sl - dx; pause(); };
    const pu = () => { if (!down) return; down = false; el.style.cursor = ""; };
    const click = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    const enter = () => { hold = true; };
    const leave = () => { hold = false; pu(); };
    el.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    el.addEventListener("click", click, true);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchmove", pause, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      el.removeEventListener("click", click, true);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchmove", pause);
    };
  }, [reverse]);
  const track = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-stretch">
      {items.map((r, i) => <Card key={`${hidden}-${i}`} r={r} lang={lang} />)}
    </div>
  );
  return (
    <div ref={box} className="relative -my-6 flex cursor-grab select-none overflow-x-auto py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {track(false)}
      {track(true)}
    </div>
  );
}

export default function ReviewsWall({ title = { ru: "Так говорят гости", en: "What our guests say" } }: { title?: Loc }) {
  const { lang } = useLang();
  const en = lang === "en";
  const half = Math.ceil(REVIEWS.length / 2);
  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden bg-white section-y">
      <div className="mx-auto mb-8 flex w-[92%] max-w-[1760px] flex-col items-center text-center lg:mb-12">
        <h2 className="mt-4 text-[#17191a]">{title[lang]}</h2>
        <a
          href={YANDEX}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-2 rounded-full border border-[#17191a]/12 bg-white py-1 pl-1 pr-3 text-[10.5px] text-[#17191a]/65 transition-colors hover:border-[#17191a]/40 sm:mt-6 sm:gap-3 sm:py-1.5 sm:pl-1.5 sm:pr-4 sm:text-[13.5px]"
        >
          <span className="rounded-full bg-[#17191a] px-2 py-1 text-[11px] font-medium text-white sm:px-3 sm:py-1.5 sm:text-[13px]">4.9</span>
          <span aria-hidden className="text-[10px] tracking-[0.06em] text-[#b8955a] sm:text-[inherit] sm:tracking-[0.1em]">★★★★★</span>
          {en ? "75+ reviews on Yandex and 2GIS" : "75+ отзывов на Яндекс и 2ГИС"}
          <span aria-hidden className="transition-transform duration-300 group-hover:-rotate-45">↗</span>
        </a>
      </div>

      <div className="relative flex flex-col">
        <Row items={REVIEWS.slice(0, half)} lang={lang} />
        <Row items={REVIEWS.slice(half)} reverse lang={lang} />
        {/* Растворение по краям */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent lg:w-40" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent lg:w-40" />
      </div>
    </section>
  );
}
