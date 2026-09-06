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

  return (
    <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_-10px_36px_rgba(0,0,0,0.10)] lg:grid-cols-2 lg:min-h-[460px]">
      {/* Левая панель — услуги-аккордеон */}
      <div className="flex flex-col bg-[#f2ede3] p-8 lg:p-12">
        <h3 className="font-display text-[22px] uppercase tracking-[0.03em] text-[#3B0D1A] lg:text-[26px]">
          {cat.label[lang]}
        </h3>

        <div className="mt-7 flex flex-col gap-3">
          {cat.rows.map((r, idx) => {
            const isOpen = open === idx;
            return (
              <div key={r.name.ru} className="overflow-hidden rounded-2xl border border-[#3B0D1A]/10 bg-white/70">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                >
                  <span className="text-[14px] text-[#2a2320] lg:text-[15px]">{r.name[lang]}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="whitespace-nowrap font-display text-[14px] text-[#3B0D1A] lg:text-[15px]">{r.price[lang]}</span>
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-[#3B0D1A]/25 text-[12px] text-[#3B0D1A] transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[12.5px] leading-relaxed text-[#2a2320]/60 lg:text-[13px]">
                      {(r.note ?? r.price)[lang]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Правая колонка — большое фото */}
      <div className="relative min-h-[280px] lg:min-h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
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
    <section className={ground === "cream" ? "bg-[#f7f3ed] py-24 lg:py-28" : "bg-white py-24 lg:py-28"}>
      <div className="mx-auto w-[92%] max-w-[1200px]">
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
