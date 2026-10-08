"use client";
// ПАКЕТЫ УСЛУГ (страница «Консьерж-сервис», #uslugi) — 4 тарифа в стиле сайта: фото-карточки
// со скруглением 20px и затемнением снизу (как категории и «Для кого»). Видно номер, название,
// для кого и цену; при наведении (на телефоне — у карточки в центре экрана) фото приближается,
// затемнение усиливается, снизу выезжает состав пакета и «Рассчитать бюджет →» (к анкете #calc).
// Компьютер — 4 в ряд, телефон — лента вбок. Цены «от …» пришлёт заказчица. Фото — временные.
import { useEffect, useRef, useState } from "react";
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
    img: "/assets/alis/img_0569.jpg",
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
  // Телефон/планшет (нет наведения): раскрыта карточка в центре экрана
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const root = box.current;
    if (!root || matchMedia("(hover: hover)").matches) return;
    const cards = [...root.querySelectorAll("article")];
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        const i = cards.indexOf(e.target as HTMLElement);
        if (e.isIntersecting) setActive(i);
        else setActive((x) => (x === i ? -1 : x));
      }
    }, { root: null, rootMargin: "0px -35% 0px -35%", threshold: 0.5 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="sr-only">{en ? "Service packages" : "Пакеты услуг"}</h2>
        <div ref={box} className="-mx-[2%] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[2%] pb-2 [scrollbar-width:none] sm:gap-3 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {PACKS.map((p, i) => (
            <article
              key={p.name}
              data-on={active === i ? "" : undefined}
              className="r-reveal group relative h-[440px] w-[78%] shrink-0 snap-center overflow-hidden rounded-[20px] bg-[#17191a] text-white sm:w-[46%] sm:h-[480px] lg:h-[560px] lg:w-auto"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={`${p.name} — ÁLIS BEAUTY`} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.06] group-data-[on]:scale-[1.06]" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
              <div aria-hidden className="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-data-[on]:opacity-100" />

              {/* Верх: номер и цена */}
              <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-6 sm:top-6">
                <span className="font-display text-[12px] tabular-nums text-white/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] text-[#17191a] backdrop-blur-sm sm:text-[12px]">
                  {en ? "from " : "от "}{p.price[lang]}
                </span>
              </div>

              {/* Низ: название и «для кого»; при наведении поднимаются, снизу выезжает состав */}
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <div className="transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]">
                  <h3 className="font-display text-[22px] uppercase tracking-[0.06em] lg:text-[26px]">{p.name}</h3>
                  <p className="mt-1 !text-[11.5px] text-white/75 sm:!text-[13px]">{p.who[lang]}</p>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:grid-rows-[1fr] group-data-[on]:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <ul className="mt-4 flex flex-col gap-1.5 border-t border-white/20 pt-4">
                      {p.items.map((it, k) => (
                        <li
                          key={it.ru}
                          className="flex items-start gap-2 text-[12px] leading-[1.45] text-white/90 opacity-0 transition-[opacity,translate] duration-500 [translate:0_8px] group-hover:opacity-100 group-hover:[translate:0_0] group-data-[on]:opacity-100 group-data-[on]:[translate:0_0] sm:text-[13px]"
                          style={{ transitionDelay: `${0.15 + k * 0.06}s` }}
                        >
                          <span aria-hidden className="text-white/50">+</span>
                          {it[lang]}
                        </li>
                      ))}
                    </ul>
                    <a href="#calc" className="mt-4 flex items-center justify-between rounded-[12px] border border-white/70 bg-white/15 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a]">
                      {en ? "Calculate the budget" : "Рассчитать бюджет"}
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
