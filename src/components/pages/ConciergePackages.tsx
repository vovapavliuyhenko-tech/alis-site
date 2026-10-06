"use client";
// ПАКЕТЫ УСЛУГ (страница «Консьерж-сервис», #uslugi) — 4 тарифа карточками в ряд:
// SOLO · BRIDAL · TEAM · DESTINATION. Что входит — списком, стоимость — «от …» (цены пришлёт
// заказчица, пока «по запросу»). На телефоне — лента карточек с прокруткой вбок.
// Внизу сноска и две кнопки: B2B-предложение и расчёт частного события (анкета #calc).
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

export default function ConciergePackages() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{en ? "Service packages" : "Пакеты услуг"}</h2>

        {/* Телефон — лента вбок, планшет — 2×2, компьютер — 4 в ряд */}
        <div className="-mx-[2%] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[2%] pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-4">
          {PACKS.map((p, i) => (
            <article
              key={p.name}
              className="r-reveal group flex w-[78%] shrink-0 snap-center flex-col rounded-[12px] border border-[#17191a]/12 bg-white p-5 transition-colors duration-300 hover:border-[#17191a] hover:bg-[#17191a] sm:w-auto sm:p-7 lg:p-8"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 transition-colors group-hover:text-white/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[22px] uppercase tracking-[0.06em] text-[#17191a] transition-colors group-hover:text-white lg:text-[26px]">{p.name}</h3>
              <p className="mt-1.5 !text-[11px] leading-[1.45] text-[#17191a]/60 transition-colors group-hover:text-white/70 sm:!text-[13px]">{p.who[lang]}</p>

              <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-[#17191a]/10 pt-5 transition-colors group-hover:border-white/15 sm:gap-2.5">
                {p.items.map((it) => (
                  <li key={it.ru} className="flex items-start gap-2.5 text-[11.5px] leading-[1.45] text-[#17191a]/85 transition-colors group-hover:text-white/85 sm:text-[13.5px]">
                    <span aria-hidden className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-current" />
                    {it[lang]}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-baseline justify-between border-t border-[#17191a]/10 pt-4 transition-colors group-hover:border-white/15">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#17191a]/45 transition-colors group-hover:text-white/50">{en ? "from" : "от"}</span>
                <span className="font-display text-[14px] uppercase tracking-[0.06em] text-[#17191a] transition-colors group-hover:text-white sm:text-[16px]">{p.price[lang]}</span>
              </div>
            </article>
          ))}
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
