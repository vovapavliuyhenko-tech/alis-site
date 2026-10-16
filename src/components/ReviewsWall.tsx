"use client";
// ОТЗЫВЫ «стеной» (по референсу): маленькая подпись «[ Отзывы ]», заголовок, под ним плашка
// с рейтингом (4.9 ★★★★★ · 75+ отзывов на Яндекс и 2ГИС ↗), ниже — две бегущие ленты
// светлых карточек в разные стороны. Карточка: текст отзыва, внизу кружок с буквой имени,
// имя и услуга. При наведении лента останавливается. Края растворяются в белом.
import { useLang } from "@/lib/i18n";
import { REVIEWS } from "@/components/Reviews";

type Loc = { ru: string; en: string };
const YANDEX = "https://yandex.ru/maps/org/lis_byuti/63024642190/reviews/";

function Card({ r, lang }: { r: (typeof REVIEWS)[number]; lang: "ru" | "en" }) {
  return (
    <figure className="mr-3 flex w-[300px] shrink-0 flex-col justify-between rounded-[20px] bg-[#f6f4f1] p-6 sm:w-[380px] lg:mr-4 lg:p-7">
      <blockquote className="text-[13.5px] leading-[1.55] text-[#17191a] sm:text-[15px]">{r.text[lang]}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17191a] text-[12px] text-white">
          {r.name[lang].charAt(0)}
        </span>
        <span className="text-[12.5px] sm:text-[13.5px]">
          <span className="font-medium text-[#17191a]">{r.name[lang]}</span>
          <span className="text-[#17191a]/50"> · {r.role[lang]}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse, lang }: { items: typeof REVIEWS; reverse?: boolean; lang: "ru" | "en" }) {
  const track = (hidden: boolean) => (
    <div aria-hidden={hidden} className={`flex shrink-0 items-stretch ${reverse ? "animate-[rw-right_70s_linear_infinite]" : "animate-[rw-left_70s_linear_infinite]"} group-hover:[animation-play-state:paused]`}>
      {items.map((r, i) => <Card key={`${hidden}-${i}`} r={r} lang={lang} />)}
    </div>
  );
  return (
    <div className="group relative flex overflow-hidden">
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
        <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#17191a]/45 lg:text-[11px]">[ {en ? "Reviews" : "Отзывы"} ]</p>
        <h2 className="mt-4 text-[#17191a]">{title[lang]}</h2>
        <a
          href={YANDEX}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-3 rounded-full border border-[#17191a]/12 bg-white py-1.5 pl-1.5 pr-4 text-[12.5px] text-[#17191a]/65 transition-colors hover:border-[#17191a]/40 sm:text-[13.5px]"
        >
          <span className="rounded-full bg-[#17191a] px-3 py-1.5 text-[13px] font-medium text-white">4.9</span>
          <span aria-hidden className="tracking-[0.1em] text-[#b8955a]">★★★★★</span>
          {en ? "75+ reviews on Yandex and 2GIS" : "75+ отзывов на Яндекс и 2ГИС"}
          <span aria-hidden className="transition-transform duration-300 group-hover:-rotate-45">↗</span>
        </a>
      </div>

      <div className="relative flex flex-col gap-3 lg:gap-4">
        <Row items={REVIEWS.slice(0, half)} lang={lang} />
        <Row items={REVIEWS.slice(half)} reverse lang={lang} />
        {/* Растворение по краям */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent lg:w-40" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent lg:w-40" />
      </div>
      <style>{`
        @keyframes rw-left { from { transform: translateX(0) } to { transform: translateX(-100%) } }
        @keyframes rw-right { from { transform: translateX(-100%) } to { transform: translateX(0) } }
        @media (prefers-reduced-motion: reduce) { #reviews [class*="rw-"] { animation: none !important } }
      `}</style>
    </section>
  );
}
