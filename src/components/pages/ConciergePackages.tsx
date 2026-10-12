"use client";
// ПАКЕТЫ УСЛУГ (страница «Консьерж-сервис», #uslugi) — 4 карточки-перевёртыша.
// Спереди: фото на всю карточку, крупное название и «для кого». При наведении (на телефоне —
// по касанию) карточка плавно переворачивается в 3D; на обороте — светлый фон, название,
// состав пакета, цена и «Рассчитать бюджет →» (к анкете #calc). Карточки появляются по очереди.
// Компьютер — 4 в ряд, телефон — лента вбок. Цены «от …» пришлёт заказчица. Фото — временные.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Pack = { name: string; img: string; who: Loc; items: Loc[]; price: Loc };

// TODO: цены «от …» — пришлёт заказчица
const req = { ru: "по запросу", en: "on request" };

const PACKS: Pack[] = [
  {
    name: "SOLO",
    img: "/assets/alis/img_2672.jpg",
    who: { ru: "Один специалист — один образ", en: "One artist — one look" },
    items: [
      { ru: "Макияж или причёска", en: "Makeup or hair" },
      { ru: "Выезд к вам со всем необходимым", en: "We come to you fully equipped" },
      { ru: "Для съёмки, ужина или выхода", en: "For a shoot, dinner or an event" },
    ],
    price: req,
  },
  {
    name: "BRIDAL",
    img: "/assets/alis/img_2746.jpg",
    who: { ru: "Образ невесты под ключ", en: "A turnkey bridal look" },
    items: [
      { ru: "Макияж и причёска невесты", en: "Bridal makeup and hair" },
      { ru: "Пробный образ заранее", en: "A trial look in advance" },
      { ru: "Подружки невесты и мама", en: "Bridesmaids and mother" },
      { ru: "Сопровождение — по желанию", en: "Stay-on support — optional" },
    ],
    price: req,
  },
  {
    name: "TEAM",
    img: "/assets/alis/img_3283.jpg",
    who: { ru: "Команда на событие или съёмку", en: "A team for an event or shoot" },
    items: [
      { ru: "Команда специалистов в 4–6 рук", en: "A team working with 4–6 hands" },
      { ru: "Все гости готовы по таймингу", en: "Every guest ready on schedule" },
      { ru: "Специалист на площадке весь день", en: "An artist on site all day" },
    ],
    price: req,
  },
  {
    name: "DESTINATION",
    img: "/assets/tild6530-383_-2___1_.jpg",
    who: { ru: "Выезд по России, Европе и СНГ", en: "Russia, Europe and the CIS" },
    items: [
      { ru: "Команда приезжает к месту события", en: "The team travels to your venue" },
      { ru: "Подбор команды под задачу", en: "A team chosen for the brief" },
      { ru: "Материалы и оборудование с собой", en: "All materials and kit with us" },
    ],
    price: req,
  },
];

export default function ConciergePackages() {
  const { lang } = useLang();
  const en = lang === "en";
  // Перевёрнутые касанием карточки (телефон/планшет)
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (i: number) => setFlipped((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]));

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="sr-only">{en ? "Service packages" : "Пакеты услуг"}</h2>
        <div className="-mx-[2%] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[2%] pb-2 [scrollbar-width:none] sm:gap-3 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {PACKS.map((p, i) => {
            const on = flipped.includes(i);
            return (
              <div
                key={p.name}
                className="r-reveal group h-[440px] w-[78%] shrink-0 snap-center [perspective:1400px] sm:h-[480px] sm:w-[46%] lg:h-[520px] lg:w-auto"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${p.name}: ${en ? "show what's included" : "показать состав"}`}
                  onClick={() => { if (!matchMedia("(hover: hover)").matches) toggle(i); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}
                  className={`relative h-full w-full cursor-pointer rounded-[20px] transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] [transform-style:preserve-3d] [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${on ? "[transform:rotateY(180deg)]" : ""}`}
                >
                  {/* Лицевая сторона: фото и название */}
                  <div className="absolute inset-0 overflow-hidden rounded-[20px] bg-[#17191a] text-white [backface-visibility:hidden]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={`${p.name} — ÁLIS BEAUTY`} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6">
                      <h3 className="font-display !text-[28px] uppercase !leading-none tracking-[0.06em] lg:!text-[clamp(24px,2vw,36px)]">{p.name}</h3>
                      <p className="mt-2 !text-[12px] text-white/75 sm:!text-[13px]">{p.who[lang]}</p>
                    </div>
                    <span aria-hidden className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-[16px] text-white">↻</span>
                  </div>

                  {/* Оборот: состав, цена, кнопка */}
                  <div className="absolute inset-0 flex flex-col rounded-[20px] border border-[#17191a]/10 bg-[#f6f4f1] p-6 text-[#17191a] [backface-visibility:hidden] [transform:rotateY(180deg)] lg:p-8">
                    <p className="font-display !text-[24px] uppercase !leading-none tracking-[0.06em] lg:!text-[clamp(22px,1.8vw,30px)]">{p.name}</p>
                    <p className="mt-2 !text-[12px] text-[#17191a]/60 sm:!text-[13px]">{p.who[lang]}</p>
                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-[#17191a]/10 pt-6">
                      {p.items.map((it) => (
                        <li key={it.ru} className="flex items-start gap-2.5 text-[13px] leading-[1.45] sm:text-[14px]">
                          <span aria-hidden className="text-[#17191a]/40">+</span>
                          {it[lang]}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between border-t border-[#17191a]/10 pt-4">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#17191a]/50">{en ? "from" : "от"}</span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em]">{p.price[lang]}</span>
                      </div>
                      <a href="#calc" onClick={(e) => e.stopPropagation()} className="mt-4 flex items-center justify-between rounded-[12px] border border-[#17191a] bg-[#17191a] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a]">
                        {en ? "Calculate the budget" : "Рассчитать бюджет"}
                        <span>→</span>
                      </a>
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
