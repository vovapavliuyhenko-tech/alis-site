"use client";
// БЛОК «УСЛУГИ И ПРАЙС» — ОДНО зафиксированное фото слева (sticky), справа
// панели-категории с услугами, которые при скролле наезжают друг на друга.
// Фото слева меняется по активной категории при скролле и МГНОВЕННО при
// наведении на строку услуги. Переиспользуется на /salon и /concierge. Двуязычно.
import { useEffect, useRef, useState } from "react";
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

type Cta = { label: Loc; href: string; external?: boolean };

function Panel({ cat, img, lang, cta }: { cat: ServiceCategory; img: string; lang: Lang; cta: Cta }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col rounded-[28px] border border-[#3B0D1A]/30 bg-white p-8 lg:min-h-[640px] lg:p-14">
      {/* Фото категории — только на мобильном (на десктопе фото зафиксировано слева) */}
      <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[20px] lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>

      <h3 className="font-display text-[24px] uppercase tracking-[0.02em] text-[#2a2320] lg:text-[30px]">{cat.label[lang]}</h3>

      <div className="mt-8">
        {cat.rows.map((r, idx) => {
          const isOpen = open === idx;
          return (
            <div key={r.name.ru} className="border-b border-[#2a2320]/12 first:border-t first:border-t-[#2a2320]/12">
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
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

      {/* Кнопка во всю ширину снизу карточки */}
      <a
        href={cta.href}
        {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-8 block w-full rounded-2xl border border-[#3B0D1A] bg-[#3B0D1A] px-6 py-4 text-center font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A] lg:mt-auto lg:pt-4"
      >
        {cta.label[lang]}
      </a>
    </div>
  );
}

export default function ServiceStack({
  eyebrow,
  title,
  categories,
  cta,
  ground = "white",
}: {
  eyebrow: Loc;
  title: Loc;
  categories: ServiceCategory[];
  cta: Cta;
  ground?: "white" | "cream";
}) {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.4;
        let idx = 0;
        refs.current.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top <= threshold) idx = i;
        });
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const photo = PHOTOS[active % PHOTOS.length];

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

        <div className="grid gap-2 lg:grid-cols-2">
          {/* ЛЕВО — одно зафиксированное фото */}
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[640px] overflow-hidden rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" className="h-full w-full object-cover" draggable={false} />
            </div>
          </div>

          {/* ПРАВО — панели услуг наезжают друг на друга */}
          <div>
            {categories.map((c, i) => (
              <div
                key={c.label.ru}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="sticky top-24 pb-2 last:pb-0"
              >
                <Panel
                  cat={c}
                  img={PHOTOS[i % PHOTOS.length]}
                  lang={lang}
                  cta={cta}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
