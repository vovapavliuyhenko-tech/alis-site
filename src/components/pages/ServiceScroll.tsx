"use client";
// БЛОК «УСЛУГИ И ПРАЙС» — sticky-скроллителлинг: слева зафиксированное большое
// фото + название активной категории; справа прокручиваются услуги по
// категориям, а левое фото сменяется кросс-фейдом по мере скролла. Скролл-драйв
// на rAF + getBoundingClientRect (без Lenis на этих страницах). Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
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

export default function ServiceScroll({
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
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = window.innerHeight * 0.4;
        let idx = 0;
        refs.current.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top <= center) idx = i;
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

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ЛЕВО — зафиксированное фото активной категории */}
          <div className="hidden lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-[26px]">
              {categories.map((c, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={c.label.ru}
                  src={PHOTOS[i % PHOTOS.length]}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="font-display text-[11px] uppercase tracking-[0.28em] text-white/70">
                  {String(active + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[30px] uppercase leading-none tracking-[0.02em] text-white lg:text-[38px]">
                  {categories[active]?.label[lang]}
                </h3>
              </div>
            </div>
          </div>

          {/* ПРАВО — прокручиваемые категории */}
          <div>
            {categories.map((c, i) => (
              <div
                key={c.label.ru}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="border-t border-[#3B0D1A]/12 py-8 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:py-12"
              >
                {/* Фото категории — только на мобильном */}
                <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[22px] lg:hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTOS[i % PHOTOS.length]} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-display text-[22px] uppercase tracking-[0.02em] text-white">{c.label[lang]}</h3>
                </div>

                {/* Название категории — на десктопе (крупное фото слева) */}
                <h3 className="mb-5 hidden font-display text-[18px] uppercase tracking-[0.06em] text-[#3B0D1A]/40 lg:block">
                  {c.label[lang]}
                </h3>

                {c.rows.map((r) => (
                  <div key={r.name.ru} className="flex items-baseline gap-4 py-3.5">
                    <span className="min-w-0 text-[15px] text-[#2a2320] lg:text-[16px]">{r.name[lang]}</span>
                    <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-[#3B0D1A]/25" />
                    <span className="whitespace-nowrap font-display text-[15px] text-[#3B0D1A] lg:text-[17px]">{r.price[lang]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
