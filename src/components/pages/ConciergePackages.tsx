"use client";
// ПАКЕТЫ УСЛУГ (страница «Консьерж-сервис», #uslugi) — по мотивам блока направлений fcchance.ru:
// слева светлая панель со списком из 4 тарифов (крупные названия; выбранный — чёрный со стрелкой,
// остальные приглушены), справа большое фото выбранного тарифа: сверху «для кого» и «стоимость»,
// снизу состав пакета и кнопка «Рассчитать бюджет» (к анкете #calc). Тариф меняется наведением
// или кликом; фото и текст плавно сменяются. Телефон: список сверху, карточка тарифа под ним.
// Цены «от …» пришлёт заказчица. Фото — временные.
import { useRef, useState } from "react";
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
  const [cur, setCurNow] = useState(0);
  // Наведение: небольшая задержка, чтобы тариф не «мигал», когда мышь просто проходит по списку
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setCur = (i: number) => { if (timer.current) clearTimeout(timer.current); setCurNow(i); };
  const hoverCur = (i: number) => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setCurNow(i), 120); };
  const p = PACKS[cur];

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] gap-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-4">
        <h2 className="sr-only">{en ? "Service packages" : "Пакеты услуг"}</h2>

        {/* Слева: список тарифов */}
        <div className="r-reveal rounded-[24px] bg-[#f6f4f1] px-6 py-2 sm:px-10 lg:px-12 lg:py-4">
          {PACKS.map((x, i) => {
            const on = i === cur;
            return (
              <button
                key={x.name}
                type="button"
                onMouseEnter={() => hoverCur(i)}
                onFocus={() => setCur(i)}
                onClick={() => setCur(i)}
                aria-pressed={on}
                className={`group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-7 lg:py-8 ${i > 0 ? "border-t border-[#17191a]/10" : ""}`}
              >
                <span className="min-w-0">
                  <span className={`block font-display text-[22px] uppercase leading-none tracking-[0.05em] transition-colors duration-700 ease-[cubic-bezier(.22,.61,.36,1)] sm:text-[28px] lg:text-[clamp(24px,2.1vw,36px)] ${on ? "text-[#17191a]" : "text-[#17191a]/30 group-hover:text-[#17191a]/60"}`}>
                    {x.name}
                  </span>
                  <span className={`mt-1.5 block text-[11.5px] leading-[1.45] transition-colors duration-700 sm:text-[13px] ${on ? "text-[#17191a]/75" : "text-[#17191a]/40"}`}>{x.who[lang]}</span>
                </span>
                <span aria-hidden className={`shrink-0 text-[18px] transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${on ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}>→</span>
              </button>
            );
          })}
        </div>

        {/* Справа: фото и описание выбранного тарифа */}
        <div className="r-reveal relative min-h-[460px] overflow-hidden rounded-[24px] bg-[#17191a] text-white sm:min-h-[540px] lg:min-h-0">
          {PACKS.map((x, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={x.img}
              src={x.img}
              alt={i === cur ? `${x.name} — ÁLIS BEAUTY` : ""}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-[1400ms] ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ opacity: i === cur ? 1 : 0, scale: i === cur ? "1" : "1.04" }}
            />
          ))}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70" />

          <div key={cur} className="relative flex h-full min-h-[inherit] flex-col justify-between p-6 sm:p-9 lg:p-10">
            {/* Верх: параметры */}
            <dl className="grid gap-4 animate-[pk-in_.9s_cubic-bezier(.22,.61,.36,1)_both]">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/60">{en ? "Who it's for" : "Для кого"}</dt>
                <dd className="mt-1 font-display text-[12.5px] uppercase tracking-[0.04em] sm:text-[14px]">{p.who[lang]}</dd>
              </div>
            </dl>

            {/* Низ: состав и кнопка */}
            <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <ul className="flex flex-col gap-2">
                {p.items.map((it, k) => (
                  <li key={it.ru} className="flex items-start gap-3 font-display text-[11.5px] uppercase leading-[1.35] tracking-[0.03em] animate-[pk-in_.9s_cubic-bezier(.22,.61,.36,1)_both] sm:text-[13px]" style={{ animationDelay: `${0.15 + k * 0.09}s` }}>
                    <span aria-hidden className="mt-[4px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-white" />
                    {it[lang]}
                  </li>
                ))}
              </ul>
              <a href="#calc" className="flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-[12px] border border-white bg-white px-5 py-3 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-500 hover:bg-transparent hover:text-white sm:text-[11px]">
                {en ? "Calculate the budget" : "Рассчитать бюджет"}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pk-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
