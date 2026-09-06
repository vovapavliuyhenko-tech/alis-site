"use client";
// БЛОК «УСЛУГИ И ПРАЙС» — 4 карточки-категории, которые при скролле полностью
// наезжают друг на друга и перекрывают предыдущую (sticky-stacking, единый top +
// равная высота + непрозрачный фон). В каждой карточке слева — панель с услугами-
// строками, раскрывающимися по клику (цена + короткое описание), справа — большое
// фото. Переиспользуется на /salon и /concierge. Двуязычно.
import { useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import type { ServiceCategory } from "@/components/pages/ServiceTabs";

type Loc = { ru: string; en: string };

const PHOTOS = [
  "/assets/tild6530-383_-2___1_.jpg",
  "/assets/tild3638-373_-2___1__3.jpg",
  "/assets/tild3236-393__.jpg",
  "/assets/tild6230-643__.jpg",
  "/assets/tild3561-646_-2___1__5.jpg",
  "/assets/tild6536-613_-2___1__4.jpg",
];

function CategoryCard({ cat, img, lang }: { cat: ServiceCategory; img: string; lang: Lang }) {
  const [open, setOpen] = useState<number | null>(0);
  const [photo, setPhoto] = useState(img); // фото справа, мгновенно меняется при наведении на строку
  const rowPhoto = (idx: number) => PHOTOS[idx % PHOTOS.length];

  return (
    // непрозрачный фон-подложка (цвет секции) перекрывает предыдущую карточку;
    // внутри — ДВЕ отдельные карточки с зазором между ними.
    <div
      className="grid items-stretch gap-4 bg-white lg:grid-cols-2 lg:gap-6"
      onMouseLeave={() => setPhoto(img)}
    >
      {/* Левая карточка — услуги-аккордеон (простые строки с разделителями) */}
      <div className="flex flex-col rounded-[28px] bg-[#f3f1ed] p-8 lg:min-h-[640px] lg:p-16">
        <h3 className="font-display text-[24px] uppercase tracking-[0.02em] text-[#2a2320] lg:text-[30px]">
          {cat.label[lang]}
        </h3>

        <div className="mt-8">
          {cat.rows.map((r, idx) => {
            const isOpen = open === idx;
            return (
              <div key={r.name.ru} className="border-b border-[#2a2320]/12 first:border-t first:border-t-[#2a2320]/12">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  onMouseEnter={() => setPhoto(rowPhoto(idx))}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] text-[#2a2320] lg:text-[16px]">{r.name[lang]}</span>
                  <span
                    className="shrink-0 text-[18px] font-light leading-none text-[#2a2320]/70 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="flex items-baseline justify-between gap-4 pb-5">
                      <p className="max-w-[80%] text-[13px] leading-relaxed text-[#2a2320]/55 lg:text-[13.5px]">
                        {(r.note ?? r.price)[lang]}
                      </p>
                      <span className="whitespace-nowrap font-display text-[15px] text-[#3B0D1A] lg:text-[16px]">{r.price[lang]}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Правая карточка — большое фото (мгновенно меняется при наведении на строку) */}
      <div className="relative min-h-[320px] overflow-hidden rounded-[28px] lg:min-h-[640px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>
    </div>
  );
}

export default function ServiceStack({
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
    <section className={ground === "cream" ? "bg-[#f7f3ed] py-14 lg:py-20" : "bg-white py-14 lg:py-20"}>
      <div className="mx-auto w-full max-w-none px-4 sm:px-6">
        <div className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {eyebrow[lang]}
          </span>
          <h2 className="mt-5 font-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[40px]">
            {title[lang]}
          </h2>
        </div>

        {/* Карточки наезжают друг на друга при скролле */}
        <div>
          {categories.map((c, i) => (
            <div key={c.label.ru} className="sticky top-24 pb-5 last:pb-0">
              <CategoryCard cat={c} img={PHOTOS[i % PHOTOS.length]} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
