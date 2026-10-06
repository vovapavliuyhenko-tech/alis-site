"use client";
// ПАКЕТЫ УСЛУГ (страница «Консьерж-сервис», #uslugi) — «лестница» из 4 тарифов:
// SOLO · BRIDAL · TEAM · DESTINATION. Каждый следующий выше; в стиле сайта — три белые
// карточки в тонкой рамке и последняя чёрная (как кнопки).
// Телефон/планшет — полосы друг под другом, каждая следующая шире. При прокрутке пакеты
// появляются по очереди. Цены «от …» пришлёт заказчица.
// Внизу сноска и две кнопки: B2B-предложение и расчёт частного события (анкета #calc).
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

// Тон ступени: фон, текст, приглушённый текст, линия
const TONES = [
  { box: "border border-[#17191a]/12 bg-white text-[#17191a]", mute: "text-[#17191a]/55", line: "border-[#17191a]/10" },
  { box: "border border-[#17191a]/12 bg-white text-[#17191a]", mute: "text-[#17191a]/55", line: "border-[#17191a]/10" },
  { box: "border border-[#17191a]/12 bg-white text-[#17191a]", mute: "text-[#17191a]/55", line: "border-[#17191a]/10" },
  { box: "border border-[#17191a] bg-[#17191a] text-white", mute: "text-white/60", line: "border-white/15" },
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
  // Компьютер (≥1024px) — ступени появляются все по очереди
  const wide = useSyncExternalStore(
    (cb) => { const mq = matchMedia("(min-width: 1024px)"); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); },
    () => matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
  useEffect(() => {
    const lg = matchMedia("(min-width: 1024px)").matches;
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
        <h2 className="sr-only">{en ? "Service packages" : "Пакеты услуг"}</h2>

        <div ref={box} className="relative">
          {/* Телефон/планшет — полосы друг под другом; компьютер — 4 ступени в ряд, выровнены по верху */}
          <div className="group/packs flex flex-col gap-2 sm:gap-3 lg:grid lg:grid-cols-4 lg:items-start lg:gap-4">
            {PACKS.map((p, i) => {
              const t = TONES[i];
              return (
                <article
                  key={p.name}
                  ref={(el) => { cards.current[i] = el; }}
                  className={`group relative flex flex-col overflow-hidden rounded-[12px] p-5 transition-[translate,box-shadow,opacity] duration-[800ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(23,25,26,0.45)] sm:p-7 lg:w-auto lg:p-8 lg:group-hover/packs:opacity-55 lg:hover:!opacity-100 ${t.box} ${SM_W[i]} ${LG_H[i]}`}
                  style={{
                    opacity: shown[i] ? 1 : 0,
                    transform: shown[i] ? "none" : wide ? "translateY(40px)" : "translateX(-24px)",
                    transition: `opacity .7s ease ${wide ? i * 0.18 : 0.05}s, transform .9s cubic-bezier(.2,.7,.2,1) ${wide ? i * 0.18 : 0.05}s`,
                  }}
                >
                  <div className="relative flex items-start justify-between gap-4 lg:block">
                    <div>
                      <span className="block w-fit origin-left font-display text-[20px] leading-none text-[#a9874f] transition-transform duration-700 group-hover:translate-x-1 group-hover:scale-110 lg:text-[28px]">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="relative mt-2 inline-block font-display text-[18px] uppercase tracking-[0.06em] lg:mt-3 lg:text-[26px]">
                        {p.name}
                        <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#a9874f] transition-transform duration-700 ease-out group-hover:scale-x-100" />
                      </h3>
                      <p className={`mt-1 !text-[11px] leading-[1.45] transition-colors duration-700 sm:!text-[13px] ${t.mute}`}>{p.who[lang]}</p>
                    </div>
                    {/* Цена — справа на телефоне, внизу на компьютере */}
                    <span className="shrink-0 whitespace-nowrap pt-1 font-display text-[11px] uppercase tracking-[0.06em] lg:hidden">
                      <span className={`${t.mute}`}>{en ? "from " : "от "}</span>{p.price[lang]}
                    </span>
                  </div>

                  <ul className={`relative mt-4 flex flex-1 flex-col gap-1.5 border-t pt-4 transition-colors duration-700 sm:gap-2 lg:mt-6 lg:pt-6 ${t.line}`}>
                    {p.items.map((it, k) => (
                      <li
                        key={it.ru}
                        className="flex items-start gap-2 text-[11.5px] leading-[1.45] transition-transform duration-700 group-hover:translate-x-1 sm:text-[13.5px]"
                        style={{
                          opacity: shown[i] ? 1 : 0,
                          translate: shown[i] ? "0 0" : "0 10px",
                          transition: `opacity .5s ease ${(wide ? i * 0.18 : 0) + 0.35 + k * 0.08}s, translate .6s cubic-bezier(.2,.7,.2,1) ${(wide ? i * 0.18 : 0) + 0.35 + k * 0.08}s, transform .5s ease ${k * 0.04}s`,
                        }}
                      >
                        <span aria-hidden className={`inline-block transition-[rotate,color] duration-700 group-hover:rotate-90 ${t.mute}`}>+</span>
                        {it[lang]}
                      </li>
                    ))}
                  </ul>

                  <div className={`relative mt-6 hidden h-[44px] overflow-hidden border-t pt-4 lg:block ${t.line}`}>
                    <div className="flex items-baseline justify-between transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-[44px]">
                    <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-700 ${t.mute}`}>{en ? "from" : "от"}</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em]">{p.price[lang]}</span>
                    </div>
                    <a href="#calc" className="absolute inset-x-0 top-4 flex translate-y-[44px] items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-y-0">
                      {en ? "Calculate the budget" : "Рассчитать бюджет"}
                      <span className="text-[16px]">→</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="mt-5 text-center !text-[10.5px] leading-[1.5] text-[#17191a]/50 sm:!text-[13px]">
          {en ? "*The exact price depends on the date, venue and number of guests." : "*Точная стоимость зависит от даты, места и числа гостей."}
        </p>

        <div className="mx-auto mt-6 grid max-w-[940px] gap-2 sm:grid-cols-2 sm:gap-3">
          <a
            href="#calc"
            className="flex items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a] bg-[#17191a] px-3 py-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:px-5 sm:py-3.5 sm:text-[12px] sm:tracking-[0.12em]"
          >
            {en ? "Private event estimate" : "Расчёт частного мероприятия"}
          </a>
          {/* TODO: PDF коммерческого предложения пришлёт заказчица — пока ведёт к анкете расчёта */}
          <a
            href="#calc"
            className="flex items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a]/25 px-3 py-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[#17191a] transition-colors duration-300 hover:border-[#17191a] sm:px-5 sm:py-3.5 sm:text-[12px] sm:tracking-[0.12em]"
          >
            {en ? "Download B2B proposal" : "Скачать коммерческое предложение B2B"}
          </a>
        </div>
      </div>
    </section>
  );
}
