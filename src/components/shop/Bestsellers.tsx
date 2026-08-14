"use client";
// БЕСТСЕЛЛЕРЫ — копия витрины O'CARE: заголовок Cormorant, лента карточек-товаров
// (фото на светлой карточке + название Geologica), стрелки и точки-пагинация.
// Бежевый фон #F3F2EE, зелёные акценты. Двуязычно.
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Product = { name: Loc; img: string };

const PRODUCTS: Product[] = [
  { name: { ru: "Противоотёчные тканевые патчи, 25 пар", en: "Anti-puffiness sheet patches, 25 pairs" }, img: "/shop/prod-patches.jpg" },
  { name: { ru: "Солнцезащитный крем SPF 50", en: "Sunscreen SPF 50" }, img: "/shop/prod-spf.png" },
  { name: { ru: "Альгинатная маска с эффектом ботокса, 200 г", en: "Alginate mask with botox-effect, 200 g" }, img: "/shop/prod-alginate.jpg" },
  { name: { ru: "Противоотёчная лифтинг-маска для лица", en: "Anti-puffiness lifting face mask" }, img: "/shop/prod-lifting.jpg" },
];

export default function Bestsellers() {
  const { lang } = useLang();
  const en = lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const frac = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
    setPage(frac > 0.5 ? 1 : 0);
  };

  const goto = (p: 0 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: p * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  return (
    <section id="bestsellers" className="scroll-mt-24 bg-[#F3F2EE] py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="ff-cormorant text-[34px] font-bold leading-[1.05] text-[#1c1c1c] lg:text-[52px]">
            {en ? "O’CARE bestsellers" : "Бестселлеры O’CARE"}
          </h2>
          <div className="hidden items-center gap-2.5 sm:flex">
            <button
              aria-label={en ? "Previous" : "Назад"}
              onClick={() => goto(0)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1c1c1c]/15 text-[#1c1c1c] transition-colors hover:border-[#2B6F2B] hover:bg-[#C9F0B1] hover:text-[#2B6F2B]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label={en ? "Next" : "Вперёд"}
              onClick={() => goto(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1c1c1c]/15 text-[#1c1c1c] transition-colors hover:border-[#2B6F2B] hover:bg-[#C9F0B1] hover:text-[#2B6F2B]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2"
        >
          {PRODUCTS.map((p) => (
            <a
              key={p.name.ru}
              href="/request"
              className="group w-[75%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-15px)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[18px] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="ff-geo mt-4 text-[15px] font-medium leading-snug text-[#1c1c1c]">
                {p.name[lang]}
              </h3>
              <span className="ff-geo mt-2 inline-flex items-center gap-1.5 text-[12px] text-[#2B6F2B] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {en ? "Details" : "Подробнее"}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        {/* Точки-пагинация */}
        <div className="mt-9 flex items-center justify-center gap-2.5">
          {[0, 1].map((d) => (
            <button
              key={d}
              aria-label={`${en ? "Page" : "Стр."} ${d + 1}`}
              onClick={() => goto(d as 0 | 1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                page === d ? "w-6 bg-[#2B6F2B]" : "w-2 bg-[#1c1c1c]/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
