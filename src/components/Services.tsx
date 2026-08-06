"use client";
// УСЛУГИ/ПРАЙС: аккордеон с реальными услугами салона красоты.
// Заголовок «(services/prices)» — SVG. Номера строк и «+» — реальные SVG.
import { useState } from "react";

const NUM = [
  "/assets/tild3930-303_1.svg",
  "/assets/tild3639-373_2.svg",
  "/assets/tild6538-633_3.svg",
];

type Row = { n: string; p: string };
type Group = { title: string; rows: Row[]; note?: string };

const GROUPS: Group[] = [
  {
    title: "Услуги",
    rows: [
      { n: "Полный образ", p: "8 000 ₽" },
      { n: "Полный образ (топ-стилисты)", p: "10 000 ₽" },
      { n: "Макияж", p: "5 000 ₽" },
      { n: "Укладка", p: "2 500 – 3 500 ₽" },
      { n: "Свадебный образ", p: "10 000 ₽" },
      { n: "Свадебный образ (топ-стилисты)", p: "15 000 ₽" },
      { n: "Пробный свадебный образ", p: "8 500 ₽" },
      { n: "Свадебный образ и подбор 1-го look от стилиста", p: "17 000 ₽" },
      { n: "Полный образ и подбор 1-го look на мероприятие от стилиста", p: "15 000 ₽" },
    ],
  },
  {
    title: "Выезд от 2-х мастеров",
    rows: [
      { n: "Новороссийск", p: "8 000 ₽" },
      { n: "Геленджик / Анапа / Абрау-Дюрсо и другие близлежащие локации", p: "от 10 000 ₽" },
      { n: "Сочи / Адлер", p: "от 25 000 ₽" },
      { n: "Краснодар / Ростов", p: "от 25 000 ₽" },
      { n: "Москва и Санкт-Петербург", p: "по запросу" },
    ],
    note: "*Другое количество мастеров обсуждается с менеджером",
  },
  {
    title: "Сопровождение стилистов на мероприятии/свадьбе",
    rows: [
      { n: "Стилист или визажист", p: "2 000 ₽/час" },
      { n: "Стилист + визажист", p: "4 000 ₽/час" },
    ],
  },
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="scroll-mt-24 bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <h2 className="r-reveal mb-14 text-[34px] font-light lowercase leading-none tracking-tight text-white lg:text-[44px]">
          <span className="text-white/45">(</span>услуги и цены<span className="text-white/45">)</span>
        </h2>

        <div className="border-t border-[#2e3133]">
          {GROUPS.map((g, i) => {
            const isOpen = open === i;
            return (
              <div key={g.title} className="r-reveal border-b border-[#2e3133]">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-6 py-6 text-left lg:gap-10 lg:py-7"
                  aria-expanded={isOpen}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={NUM[i]} alt="" className="h-4 w-auto opacity-90" />
                  <span className="flex-1 text-[17px] text-white lg:text-[19px]">
                    {g.title}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/tild3037-333_plus.svg"
                    alt=""
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid overflow-hidden transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <div className="pb-8 pl-[calc(1rem+2.5rem)] pr-2">
                      <dl className="max-w-2xl">
                        {g.rows.map((r) => (
                          <div
                            key={r.n}
                            className="flex items-baseline justify-between gap-6 border-b border-[#2e3133]/60 py-3.5 last:border-0"
                          >
                            <dt className="text-[14px] text-white/85">{r.n}</dt>
                            <dd className="shrink-0 text-[14px] tabular-nums text-white/60">
                              {r.p}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {g.note && (
                        <p className="mt-4 text-[13px] italic text-white/45">{g.note}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
