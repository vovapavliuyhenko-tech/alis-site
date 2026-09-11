"use client";
// БЛОК «УСЛУГИ И ПРАЙС» — крупные карточки-категории: фото сверху с названием
// категории поверх, ниже — список услуг с ценами. Переиспользуется на /salon и
// /concierge с одними и теми же данными (ServiceCategory[]). Двуязычно.
import { useLang } from "@/lib/i18n";
import type { ServiceCategory } from "@/components/pages/ServiceTabs";

type Loc = { ru: string; en: string };

// Фон-фото по индексу категории (можно заменить на профильные снимки).
const PHOTOS = [
  "/assets/tild6530-383_-2___1_.jpg",
  "/assets/tild3638-373_-2___1__3.jpg",
  "/assets/tild3236-393__.jpg",
  "/assets/tild6230-643__.jpg",
  "/assets/tild3561-646_-2___1__5.jpg",
  "/assets/tild6536-613_-2___1__4.jpg",
];

export default function ServiceCards({
  eyebrow,
  title,
  categories,
  ground = "white",
}: {
  eyebrow: Loc;
  title: Loc;
  categories: ServiceCategory[];
  ground?: "white" | "cream";
}) {
  const { lang } = useLang();

  return (
    <section className={ground === "cream" ? "bg-[#f7f3ed] py-24 lg:py-28" : "bg-white py-24 lg:py-28"}>
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="mb-12 text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#9A9D22]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#9A9D22]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9A9D22]" />
            {eyebrow[lang]}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#9A9D22] lg:text-[40px]">
            {title[lang]}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {categories.map((c, i) => (
            <article
              key={c.label.ru}
              className="group overflow-hidden rounded-[24px] border border-[#9A9D22]/12 bg-white shadow-[0_16px_44px_rgba(0,0,0,0.06)]"
            >
              {/* Фото-шапка с названием категории */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS[i % PHOTOS.length]}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <h3 className="absolute bottom-5 left-6 font-display text-[22px] uppercase tracking-[0.03em] text-white lg:text-[26px]">
                  {c.label[lang]}
                </h3>
              </div>

              {/* Прайс-строки категории */}
              <div className="px-6 py-5 lg:px-8 lg:py-6">
                {c.rows.map((r) => (
                  <div key={r.name.ru} className="flex items-baseline gap-4 border-t border-[#9A9D22]/10 py-3 first:border-t-0">
                    <span className="min-w-0 text-[14px] text-[#2a2320] lg:text-[15px]">{r.name[lang]}</span>
                    <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-[#9A9D22]/20" />
                    <span className="whitespace-nowrap font-display text-[14px] text-[#9A9D22] lg:text-[16px]">{r.price[lang]}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
