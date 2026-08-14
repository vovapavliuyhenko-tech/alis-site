"use client";
// БЕСТСЕЛЛЕРЫ · ОНЛАЙН-ВИТРИНА. По мотивам карусели O'CARE / PALOMA: горизонтальная
// лента карточек-товаров (фото, название, цена, «Подробнее») со стрелками и ссылкой
// «Все товары». Стиль ALIS: белые карточки, скругления, бордовые акценты. Двуязычно.
import { useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Product = { name: Loc; note: Loc; price: string; photo: string };

const PRODUCTS: Product[] = [
  { name: { ru: "Противоотёчные патчи, 25 пар", en: "Anti-puffiness patches, 25 pairs" }, note: { ru: "Свежий взгляд за 15 минут", en: "A fresh look in 15 minutes" }, price: "1 290 ₽", photo: "/assets/tild3535-313_bergamo.png" },
  { name: { ru: "Солнцезащитный крем SPF 50", en: "Sunscreen SPF 50" }, note: { ru: "Лёгкая текстура без белёсости", en: "Light texture, no white cast" }, price: "1 850 ₽", photo: "/assets/tild3638-373_-2___1__3.jpg" },
  { name: { ru: "Альгинатная маска «Ботокс», 200 г", en: "Alginate mask 'Botox', 200 g" }, note: { ru: "Мгновенный лифтинг перед выходом", en: "Instant lift before an event" }, price: "990 ₽", photo: "/assets/tild6530-383_-2___1_.jpg" },
  { name: { ru: "Противоотёчная лифтинг-маска", en: "Anti-puffiness lifting mask" }, note: { ru: "Тонус и чёткий контур лица", en: "Tone and a defined facial contour" }, price: "1 450 ₽", photo: "/assets/tild6436-383_fermata__1.jpg" },
  { name: { ru: "Сыворотка с гиалуроном", en: "Hyaluronic serum" }, note: { ru: "Глубокое увлажнение и сияние", en: "Deep hydration and glow" }, price: "2 100 ₽", photo: "/assets/tild6230-643__.jpg" },
  { name: { ru: "Обновляющий пилинг", en: "Renewing peel" }, note: { ru: "Ровный тон и гладкий рельеф", en: "Even tone and smooth texture" }, price: "1 690 ₽", photo: "/assets/tild3561-646_-2___1__5.jpg" },
  { name: { ru: "Пенка для умывания", en: "Cleansing foam" }, note: { ru: "Мягкое очищение без стянутости", en: "Gentle cleansing, no tightness" }, price: "890 ₽", photo: "/assets/tild6561-356_fermata__2.jpg" },
  { name: { ru: "Увлажняющий крем", en: "Moisturising cream" }, note: { ru: "Комфорт кожи на весь день", en: "All-day skin comfort" }, price: "1 750 ₽", photo: "/assets/tild3236-393__.jpg" },
];

export default function Bestsellers() {
  const { lang } = useLang();
  const en = lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="bestsellers" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto w-[94%] max-w-[1360px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
              {en ? "bestsellers" : "бестселлеры"}
            </span>
            <h2 className="mt-4 font-serif text-[32px] leading-[1.05] text-[#17191a] lg:text-[46px]">
              {en ? "Bestsellers of the studio" : "Бестселлеры студии"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label={en ? "Previous" : "Назад"}
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a] transition-colors hover:border-[#4E2126] hover:bg-[#4E2126] hover:text-[#f4efe6]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label={en ? "Next" : "Вперёд"}
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a] transition-colors hover:border-[#4E2126] hover:bg-[#4E2126] hover:text-[#f4efe6]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2"
        >
          {PRODUCTS.map((p) => (
            <article
              key={p.name.ru}
              data-card
              className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-15px)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#f4efe6] shadow-[0_10px_30px_rgba(23,25,26,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photo}
                  alt={p.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-[19px] leading-snug text-[#17191a]">{p.name[lang]}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#17191a]/50">{p.note[lang]}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-serif text-[18px] text-[#4E2126]">{p.price}</span>
                  <a
                    href="/request"
                    className="rounded-full border border-[#4E2126] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#4E2126] transition-colors duration-300 hover:bg-[#4E2126] hover:text-[#f4efe6]"
                  >
                    {en ? "Details" : "Подробнее"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
