"use client";
// УСЛУГИ САЛОНА — «оглавление-журнал» как блок вакансий: крупные строки-категории
// с номером, названием и подписью. По клику строка раскрывается в плашку с прайсом
// (услуга · время · цена). Под категориями — растянутая кнопка записи со скидкой.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Row = { name: Loc; price: Loc; time?: Loc };
type Category = { label: Loc; sub: Loc; from: Loc; rows: Row[] };

export default function SalonServices({
  eyebrow,
  title,
  categories,
  cta,
}: {
  eyebrow: Loc;
  title: Loc;
  categories: Category[];
  cta: { label: Loc; href: string };
}) {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div className="mb-12 text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#6E7248]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#6E7248]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6E7248]" />
            {eyebrow[lang]}
          </span>
          <h2 className="mt-5 font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.03em] text-[#6E7248] lg:text-[28px]">
            {title[lang]}
          </h2>
        </div>

        {/* Оглавление-журнал: строки-категории, по клику раскрывается прайс-плашка */}
        <div className="flex flex-col gap-3">
          {categories.map((c, i) => {
            const isOpen = open === i;
            return (
              <div
                key={c.label.ru}
                className={`overflow-hidden rounded-[20px] border transition-colors duration-300 ${
                  isOpen ? "border-transparent bg-[#6E7248]" : "border-[#6E7248]/12 bg-white"
                }`}
              >
                {/* Заголовок-строка */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-6 py-4 text-left lg:gap-8 lg:px-8 lg:py-4"
                >
                  {/* Номер */}
                  <span className={`font-display text-[13px] tabular-nums transition-colors duration-300 lg:text-[15px] ${isOpen ? "text-[#f4efe6]/70" : "text-[#6E7248]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Название + подпись */}
                  <span className="min-w-0">
                    <span className={`block font-display text-[14px] font-normal uppercase leading-[1.2] tracking-[0.02em] transition-colors duration-300 sm:text-[15px] lg:text-[17px] ${isOpen ? "text-[#f4efe6]" : "text-[#6E7248]"}`}>
                      {c.label[lang]}
                    </span>
                    <span className={`mt-1 block text-[11px] transition-colors duration-300 lg:text-[12px] ${isOpen ? "text-[#f4efe6]/70" : "text-[#2a2320]/55"}`}>
                      {c.sub[lang]}
                    </span>
                  </span>

                  {/* Цена «от» + стрелка-переключатель */}
                  <span className="flex items-center gap-4 lg:gap-6">
                    <span className={`hidden whitespace-nowrap rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:inline ${isOpen ? "bg-[#f4efe6]/15 text-[#f4efe6]" : "bg-[#6E7248]/10 text-[#6E7248]"}`}>
                      {c.from[lang]}
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 lg:h-12 lg:w-12 ${isOpen ? "border-[#f4efe6] bg-[#f4efe6] text-[#6E7248]" : "border-[#6E7248]/30 text-[#6E7248]"}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </button>

                {/* Раскрывающаяся плашка с прайсом */}
                <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <ul className="mx-6 mb-6 divide-y divide-[#f4efe6]/15 border-t border-[#f4efe6]/15 lg:mx-8 lg:mb-8">
                      {c.rows.map((r) => (
                        <li key={r.name.ru} className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 lg:py-3.5">
                          <span className="min-w-0">
                            <span className="block text-[14px] font-medium text-[#f4efe6] lg:text-[15px]">{r.name[lang]}</span>
                            {r.time && <span className="mt-0.5 block text-[12px] text-[#f4efe6]/60">{r.time[lang]}</span>}
                          </span>
                          <span className="whitespace-nowrap font-display text-[15px] tracking-[0.01em] text-[#f4efe6] lg:text-[17px]">{r.price[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Растянутая кнопка записи со скидкой */}
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center rounded-[20px] border border-[#6E7248] bg-[#6E7248] px-6 py-5 text-center font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#6E7248] sm:text-[14px]"
        >
          {en ? "Book now · −10% on your first visit" : "Записаться · −10% на первый визит"}
        </a>
      </div>
    </section>
  );
}
