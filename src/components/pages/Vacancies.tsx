"use client";
// БЛОК ВАКАНСИЙ (страница «Команда») — строки-вакансии салона; по нажатию раскрываются.
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { CAREER } from "@/lib/vacancies";

// Актуальные вакансии салона — тексты заказчицы слово в слово (src/lib/vacancies.ts).
// Строка раскрывается по нажатию: описание, задачи, требования и «Откликнуться» (→ анкета #join).
const POSITIONS = CAREER.salon.positions;

export default function Vacancies() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="vacancies" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-10 text-center text-[#17191a] lg:mb-14">
          {lang === "en" ? "Join the beauty salon team in Novorossiysk" : "Стать частью команды салона красоты в Новороссийске"}
        </h2>
        {/* Оглавление-журнал: закруглённые строки-карточки, при наведении — полупрозрачно-бордовые */}
        <div className="flex flex-col gap-3">
          {POSITIONS.map((v, i) => {
            const on = open === i;
            return (
              <div
                key={v.title}
                className={`rounded-[20px] border bg-white transition-[border-color,box-shadow] duration-500 ${on ? "border-[#17191a]/20 shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)]" : "border-[#17191a]/12 hover:border-[#17191a]/20 hover:shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)]"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-5 px-5 py-4 text-left sm:px-6 sm:py-6 lg:gap-8 lg:px-8 lg:py-8"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-[13px] font-normal uppercase leading-[1.15] tracking-[0.01em] text-[#17191a] transition-all duration-300 group-hover:translate-x-2 sm:text-[19px] lg:text-[24px]">
                      {v.title}
                    </span>
                  </span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[#17191a] transition-all duration-500 sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/30 group-hover:border-[#17191a] group-hover:bg-[#17191a] group-hover:text-white"}`}>
                    <span className={`text-[16px] leading-none transition-transform duration-500 lg:text-[18px] ${on ? "rotate-90" : "group-hover:-rotate-45"}`}>→</span>
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
                      {v.lead && <p className="max-w-[72ch] !text-[13px] leading-[1.6] text-[#17191a]/75 sm:!text-[15px]">{v.lead}</p>}
                      <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
                        {[{ t: v.tasksTitle || "Задачи", items: v.tasks }, { t: "Требования", items: v.reqs }].map((blk) => (
                          <div key={blk.t} className="border-t border-[#17191a]/10 pt-4">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45 sm:text-[11px]">{blk.t}</p>
                            <ul className="mt-3 flex flex-col gap-2">
                              {blk.items.map((x) => (
                                <li key={x} className="flex gap-2.5 !text-[12.5px] leading-[1.55] text-[#17191a]/80 sm:!text-[14px]">
                                  <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#17191a]/40" />
                                  {x}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <a href="#join" className="mt-6 inline-flex items-center gap-2 rounded-[12px] border border-[#17191a] bg-[#17191a] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:text-[12px]">
                        {lang === "en" ? "Apply" : "Откликнуться"} <span aria-hidden>→</span>
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
