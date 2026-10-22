"use client";
// МЕЖДУНАРОДНАЯ КОМАНДА (Вакансии, #international) — тексты слово в слово с листов заказчицы:
// заголовок, пояснение со звёздочкой, условия и две кнопки («Получить подробные условия» —
// написать консьерж-сервису, «Заполнить анкету» — к анкете #join). Тёмная плашка в стиле сайта.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
const CONCIERGE_WA = "https://wa.me/79888887728";

const TERMS: Loc[] = [
  { ru: "Заказы в России, СНГ, Европе", en: "Bookings in Russia, the CIS and Europe" },
  { ru: "Обучение", en: "Training" },
  { ru: "50% от стоимости заказа", en: "50% of the booking value" },
  { ru: "Кейс с расходными материалами и форма", en: "A kit with consumables and a uniform" },
];

export default function InternationalTeam() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="international" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] gap-8 rounded-[28px] bg-[#17191a] p-6 text-white sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-14">
        <div className="flex flex-col">
          <p className="text-[10.5px] uppercase tracking-[0.18em] text-white/55 lg:text-[11px]">
            {en ? "Join the international team" : "Стать частью международной команды"}
          </p>
          <h2 className="mt-4 font-serif-display !text-[24px] font-normal uppercase leading-[1.15] tracking-[0.02em] text-white sm:!text-[30px] lg:!text-[38px]">
            {en ? "Work at events in different cities and countries — under the ÁLIS BEAUTY brand." : "Работайте на событиях в разных городах и странах — под брендом ÁLIS BEAUTY."}
          </h2>
          <p className="mt-5 max-w-[46ch] !text-[12.5px] leading-[1.6] text-white/70 sm:!text-[14px]">
            {en
              ? "*We find the big bookings, you create the looks. No client hunting and no spending on materials."
              : "*Мы находим крупные заказы, вы создаёте образы. Без поиска клиентов и вложений в материалы."}
          </p>
          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:mt-auto lg:pt-10">
            <a href={CONCIERGE_WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-[12px] border border-white bg-white px-6 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-white sm:py-4 sm:text-[12px]">
              {en ? "Get the full terms" : "Получить подробные условия"}
            </a>
            <a href="#join" className="flex items-center justify-center rounded-[12px] border border-white/60 px-6 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a] sm:py-4 sm:text-[12px]">
              {en ? "Fill in the form" : "Заполнить анкету"}
            </a>
          </div>
        </div>

        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {TERMS.map((x, i) => (
            <li key={x.ru} className="flex items-center gap-4 rounded-[20px] border border-white/12 px-5 py-5 lg:px-7 lg:py-6">
              <span className="font-display text-[11px] tracking-[0.1em] text-white/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[13px] uppercase tracking-[0.04em] sm:text-[15px] lg:text-[17px]">{x[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
