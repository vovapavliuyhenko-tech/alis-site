"use client";
// ПАКЕТЫ УСЛУГ (страница «Консьерж-сервис», #uslugi) — «лестница» из 4 тарифов:
// SOLO · BRIDAL · TEAM · DESTINATION. Каждый следующий темнее и выше (белый → бежевый →
// графит → чёрный), римский номер и «+» — золотом, верх карточек соединяет золотая линия.
// Телефон/планшет — полосы друг под другом, каждая следующая шире. При прокрутке пакеты
// появляются по очереди, линия прорисовывается. Цены «от …» пришлёт заказчица.
// Внизу сноска и две кнопки: B2B-предложение и расчёт частного события (анкета #calc).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Pack = { name: string; who: Loc; items: Loc[]; price: Loc };

// TODO: цены «от …» — пришлёт заказчица
const req = { ru: "по запросу", en: "on request" };

const PACKS: Pack[] = [
  {
    name: "SOLO",
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
    who: { ru: "Выезд по России, Европе и СНГ", en: "Russia, Europe and the CIS" },
    items: [
      { ru: "Команда приезжает к месту события", en: "The team travels to your venue" },
      { ru: "Подбор команды под задачу", en: "A team chosen for the brief" },
      { ru: "Материалы и оборудование с собой", en: "All materials and kit with us" },
    ],
    price: req,
  },
];

const GOLD = "#a9874f";
const ROMAN = ["I", "II", "III", "IV"];
// Тон ступени: фон, текст, приглушённый текст, линия
const TONES = [
  { box: "border border-[#17191a]/12 bg-white text-[#17191a]", mute: "text-[#17191a]/55", line: "border-[#17191a]/10" },
  { box: "bg-[#f3eee6] text-[#17191a]", mute: "text-[#17191a]/55", line: "border-[#17191a]/10" },
  { box: "bg-[#3a3c3d] text-white", mute: "text-white/60", line: "border-white/15" },
  { box: "bg-[#17191a] text-white", mute: "text-white/60", line: "border-white/15" },
];
// Высота ступени на компьютере и ширина полосы на телефоне
const LG_H = ["lg:h-[400px]", "lg:h-[440px]", "lg:h-[480px]", "lg:h-[520px]"];
const SM_W = ["w-[85%]", "w-[90%]", "w-[95%]", "w-full"];

export default function ConciergePackages() {
  const { lang } = useLang();
  const en = lang === "en";
  // Появление по очереди. Компьютер: ступени попали в кадр → все по очереди (задержка по номеру).
  // Телефон: каждая полоса выезжает сама, когда до неё долистали.
  const box = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [shown, setShown] = useState([false, false, false, false]);
  const [wide, setWide] = useState(false);
  const on = shown.some(Boolean);
  useEffect(() => {
    const lg = matchMedia("(min-width: 1024px)").matches;
    setWide(lg);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown([true, true, true, true]); return; }
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (!e.isIntersecting) continue;
        const i = cards.current.indexOf(e.target as HTMLElement);
        setShown((s) => (lg ? [true, true, true, true] : s.map((v, k) => v || k === i)));
        io.unobserve(e.target);
      }
    }, { threshold: 0.25 });
    cards.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{en ? "Service packages" : "Пакеты услуг"}</h2>

        <div ref={box} className="relative lg:pt-[60px]">
          {/* Золотая линия роста над ступенями (только компьютер) — прорисовывается слева направо.
              Верх ступеней: 180/140/100/60 px от верха блока, линия идёт на 40 px выше них. */}
          <svg viewBox="0 0 400 180" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[180px] w-full lg:block">
            <polyline
              points="50,140 150,100 250,60 350,20"
              fill="none"
              stroke={GOLD}
              strokeWidth="1"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) .2s" }}
            />
          </svg>
          {[140, 100, 60, 20].map((y, i) => (
            <span
              key={y}
              aria-hidden
              className="pointer-events-none absolute hidden h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
              style={{ left: `${12.5 + i * 25}%`, top: y, background: GOLD, opacity: on ? 1 : 0, transition: `opacity .4s ease ${0.3 + i * 0.35}s` }}
            />
          ))}

          {/* Телефон/планшет — полосы друг под другом; компьютер — 4 ступени в ряд, выровнены по низу */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:grid lg:grid-cols-4 lg:items-end lg:gap-4">
            {PACKS.map((p, i) => {
              const t = TONES[i];
              return (
                <article
                  key={p.name}
                  ref={(el) => { cards.current[i] = el; }}
                  className={`flex flex-col rounded-[12px] p-5 sm:p-7 lg:w-auto lg:p-8 ${t.box} ${SM_W[i]} ${LG_H[i]}`}
                  style={{
                    opacity: shown[i] ? 1 : 0,
                    transform: shown[i] ? "none" : wide ? "translateY(40px)" : "translateX(-24px)",
                    transition: `opacity .7s ease ${wide ? i * 0.18 : 0.05}s, transform .9s cubic-bezier(.2,.7,.2,1) ${wide ? i * 0.18 : 0.05}s`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 lg:block">
                    <div>
                      <span className="font-display text-[20px] leading-none lg:text-[28px]" style={{ color: GOLD }}>{ROMAN[i]}</span>
                      <h3 className="mt-2 font-display text-[18px] uppercase tracking-[0.06em] lg:mt-3 lg:text-[26px]">{p.name}</h3>
                      <p className={`mt-1 !text-[11px] leading-[1.45] sm:!text-[13px] ${t.mute}`}>{p.who[lang]}</p>
                    </div>
                    {/* Цена — справа на телефоне, внизу на компьютере */}
                    <span className="shrink-0 whitespace-nowrap pt-1 font-display text-[11px] uppercase tracking-[0.06em] lg:hidden">
                      <span className={t.mute}>{en ? "from " : "от "}</span>{p.price[lang]}
                    </span>
                  </div>

                  <ul className={`mt-4 flex flex-1 flex-col gap-1.5 border-t pt-4 sm:gap-2 lg:mt-6 lg:pt-6 ${t.line}`}>
                    {p.items.map((it) => (
                      <li key={it.ru} className="flex items-start gap-2 text-[11.5px] leading-[1.45] sm:text-[13.5px]">
                        <span aria-hidden style={{ color: GOLD }}>+</span>
                        {it[lang]}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-6 hidden items-baseline justify-between border-t pt-4 lg:flex ${t.line}`}>
                    <span className={`text-[10px] uppercase tracking-[0.16em] ${t.mute}`}>{en ? "from" : "от"}</span>
                    <span className="font-display text-[16px] uppercase tracking-[0.06em]">{p.price[lang]}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="mt-5 text-center !text-[10.5px] leading-[1.5] text-[#17191a]/50 sm:!text-[13px]">
          {en ? "*The exact price depends on the date, venue and number of guests." : "*Точная стоимость зависит от даты, места и числа гостей."}
        </p>

        <div className="mx-auto mt-6 grid max-w-[760px] gap-2 sm:grid-cols-2 sm:gap-3">
          <a
            href="#calc"
            className="flex items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a] bg-[#17191a] px-3 py-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.14em]"
          >
            {en ? "Private event estimate" : "Расчёт частного мероприятия"}
          </a>
          {/* TODO: PDF коммерческого предложения пришлёт заказчица — пока ведёт к блоку партнёрства */}
          <a
            href="#partners"
            className="flex items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a]/25 px-3 py-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[#17191a] transition-colors duration-300 hover:border-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.14em]"
          >
            {en ? "Download B2B proposal" : "Скачать коммерческое предложение B2B"}
          </a>
        </div>
      </div>
    </section>
  );
}
