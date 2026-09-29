"use client";
// УСЛУГИ САЛОНА — «оглавление-журнал» как блок вакансий: крупные строки-категории
// с номером, названием и подписью. По клику строка раскрывается в плашку с прайсом
// (услуга · время · цена). Под категориями — растянутая кнопка записи.
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Row = { name: Loc; price: Loc; time?: Loc };
type Group = { title?: Loc; rows: Row[] };
type Category = { slug?: string; label: Loc; sub: Loc; from: Loc; groups: Group[] };

export default function SalonServices({
  eyebrow,
  title,
  categories,
  cta,
}: {
  eyebrow?: Loc; // больше не выводится (надстрочники убраны по фидбеку)
  title?: Loc; // без заголовка, если не передан
  categories: Category[];
  cta: { label: Loc; href: string };
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  // Переход с главной вида /salon#uslugi-manicure — раскрываем нужную категорию и
  // прокручиваем к ней (карточки «Всё для вашего образа» ведут сюда)
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash;
      if (!h.startsWith("#uslugi-")) return;
      const slug = h.slice("#uslugi-".length);
      const i = categories.findIndex((c) => c.slug === slug);
      if (i < 0) return;
      setOpen(i);
      const go = (smooth: boolean) => {
        const el = document.getElementById("cat-" + slug);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
      };
      setTimeout(() => go(true), 350);
      // Страховка: если плавная прокрутка не сработала — переходим сразу
      setTimeout(() => {
        const el = document.getElementById("cat-" + slug);
        if (el && Math.abs(el.getBoundingClientRect().top - 110) > 160) go(false);
      }, 1400);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  return (
    <section id="uslugi" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {title && (
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
              {title[lang]}
            </h2>
          </div>
        )}

        {/* Оглавление-журнал: строки-категории, по клику раскрывается прайс-плашка */}
        <div className="flex flex-col gap-3">
          {categories.map((c, i) => {
            const isOpen = open === i;
            return (
              <div
                key={c.label.ru}
                id={c.slug ? "cat-" + c.slug : undefined}
                className={`scroll-mt-28 overflow-hidden rounded-[12px] border transition-[border-color,box-shadow] duration-500 ${
                  isOpen
                    ? "border-[#17191a]/20 bg-white shadow-[inset_3px_0_0_#46131E,0_24px_60px_-28px_rgba(23,25,26,0.22)]"
                    : "border-[#17191a]/12 bg-white hover:border-[#17191a]/25"
                }`}
              >
                {/* Заголовок-строка */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-5 px-6 py-6 text-left lg:gap-8 lg:px-8 lg:py-8"
                >
                  {/* Название + подпись */}
                  <span className="min-w-0">
                    <span className={`block text-[16px] font-normal leading-[1.3] transition-colors duration-300 lg:text-[18px] text-[#17191a]`}>
                      {c.label[lang]}
                    </span>
                    <span className={`mt-1.5 block text-[12px] transition-colors duration-300 lg:text-[13px] text-[#2a2320]/55`}>
                      {c.sub[lang]}
                    </span>
                  </span>

                  {/* Цена «от» + стрелка-переключатель */}
                  <span className="flex items-center gap-4 lg:gap-6">
                    <span className={`hidden whitespace-nowrap rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:inline ${isOpen ? "bg-[#46131E]/[0.07] text-[#46131E]" : "bg-[#17191a]/[0.06] text-[#17191a]"}`}>
                      {c.from[lang]}
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 lg:h-12 lg:w-12 ${isOpen ? "border-[#46131E] bg-[#46131E] text-white" : "border-[#17191a]/25 text-[#17191a] group-hover:border-[#46131E] group-hover:text-[#46131E]"}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </button>

                {/* Раскрывающаяся плашка с прайсом */}
                <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="mx-6 mb-6 lg:mx-8 lg:mb-8">
                      {c.groups.map((g, gi) => (
                        <div key={gi} className={gi > 0 ? "mt-5" : ""}>
                          {g.title && (
                            <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-[#17191a]/45">{g.title[lang]}</p>
                          )}
                          <ul className="divide-y divide-[#17191a]/[0.08] border-t border-[#17191a]/10">
                            {g.rows.map((r) => (
                              <li key={r.name.ru} className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 lg:py-3.5">
                                <span className="min-w-0">
                                  <span className="block text-[14px] text-[#242424] lg:text-[15px]">{r.name[lang]}</span>
                                  {r.time && <span className="mt-0.5 block text-[12px] text-[#17191a]/45">{r.time[lang]}</span>}
                                </span>
                                <span className="whitespace-nowrap text-[14px] text-[#17191a] lg:text-[15px]">{r.price[lang]}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Растянутая кнопка-CTA */}
        <a
          href={cta.href}
          target={cta.href.startsWith("http") ? "_blank" : undefined}
          rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-3 flex w-full items-center justify-center rounded-[12px] border border-[#46131E] bg-[#46131E] px-6 py-5 text-center font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#46131E] hover:bg-white hover:text-[#46131E] sm:text-[14px]"
        >
          {cta.label[lang]}
        </a>
      </div>
    </section>
  );
}
