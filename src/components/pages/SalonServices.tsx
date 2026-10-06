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
  search = false,
  master,
}: {
  eyebrow?: Loc; // больше не выводится (надстрочники убраны по фидбеку)
  title?: Loc; // без заголовка, если не передан
  categories: Category[];
  cta: { label: Loc; href: string };
  search?: boolean; // строка поиска по услугам над списком
  master?: { label: Loc; href: string }; // плашка «Выбрать своего мастера»
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  // Поиск: оставляем только услуги, где есть запрос, и раскрываем их категории
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const shown = query
    ? categories
        .map((c, i) => ({
          c: { ...c, groups: c.groups.map((g) => ({ ...g, rows: g.rows.filter((r) => r.name[lang].toLowerCase().includes(query) || c.label[lang].toLowerCase().includes(query)) })).filter((g) => g.rows.length) },
          i,
        }))
        .filter((x) => x.c.groups.length)
    : categories.map((c, i) => ({ c, i }));

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

        {/* Поиск по услугам + «Выбрать своего мастера» */}
        {(search || master) && (
          <div className="mb-3 grid gap-2 sm:gap-3 md:grid-cols-[1fr_auto]">
            {search && (
              <label className="flex h-[48px] items-center gap-3 rounded-[14px] border border-[#17191a]/12 bg-white px-4 transition-colors focus-within:border-[#17191a]/40 sm:h-[54px] sm:rounded-[16px] sm:px-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="shrink-0 text-[#17191a]/45"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" strokeLinecap="round" /></svg>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={lang === "en" ? "Find a service — e.g. gel polish" : "Найти услугу — например, гель-лак"}
                  aria-label={lang === "en" ? "Search services" : "Поиск по услугам"}
                  className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:text-[15px]"
                />
                {q && <button type="button" onClick={() => setQ("")} aria-label={lang === "en" ? "Clear" : "Очистить"} className="text-[18px] leading-none text-[#17191a]/40 hover:text-[#17191a]">×</button>}
              </label>
            )}
            {master && (
              <a
                href={master.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-[48px] items-center justify-between gap-4 rounded-[14px] bg-[#17191a] px-5 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#2a2c2d] sm:h-[54px] sm:rounded-[16px] sm:px-6 sm:text-[12px]"
              >
                {master.label[lang]}
                <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
              </a>
            )}
          </div>
        )}
        {query && shown.length === 0 && (
          <p className="mb-3 rounded-[14px] bg-[#f6f4f1] px-5 py-4 text-center text-[13px] text-[#17191a]/65 sm:text-[15px]">
            {lang === "en" ? "Nothing found — try another word or ask the administrator." : "Ничего не нашли — попробуйте другое слово или спросите администратора."}
          </p>
        )}

        {/* Оглавление-журнал: строки-категории, по клику раскрывается прайс-плашка */}
        <div className="flex flex-col gap-3">
          {shown.map(({ c, i }) => {
            const isOpen = query ? true : open === i;
            return (
              <div
                key={c.label.ru}
                id={c.slug ? "cat-" + c.slug : undefined}
                className={`scroll-mt-28 overflow-hidden rounded-[12px] border transition-[border-color,box-shadow] duration-500 ${
                  isOpen
                    ? "border-[#17191a]/20 bg-white shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)]"
                    : "border-[#17191a]/12 bg-white hover:border-[#17191a]/25"
                }`}
              >
                {/* Заголовок-строка */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-4 text-left sm:gap-5 sm:px-6 sm:py-6 lg:gap-8 lg:px-8 lg:py-8"
                >
                  {/* Название + подпись */}
                  <span className="min-w-0">
                    <span className={`block text-[14px] font-normal leading-[1.3] transition-colors duration-300 sm:text-[16px] lg:text-[18px] text-[#17191a]`}>
                      {c.label[lang]}
                    </span>
                    <span className={`mt-1 block text-[11px] leading-[1.4] transition-colors duration-300 sm:mt-1.5 sm:text-[12px] lg:text-[13px] text-[#2a2320]/55`}>
                      {c.sub[lang]}
                    </span>
                  </span>

                  {/* Цена «от» + стрелка-переключатель */}
                  <span className="flex items-center gap-4 lg:gap-6">
                    <span className={`hidden whitespace-nowrap rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:inline ${isOpen ? "bg-[#17191a] text-white" : "bg-[#17191a]/[0.06] text-[#17191a]"}`}>
                      {c.from[lang]}
                    </span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${isOpen ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/25 text-[#17191a] group-hover:border-[#17191a] group-hover:text-[#17191a]"}`}>
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
                            <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#17191a]/45 sm:text-[11px] sm:tracking-[0.18em]">{g.title[lang]}</p>
                          )}
                          <ul className="divide-y divide-[#17191a]/[0.08] border-t border-[#17191a]/10">
                            {g.rows.map((r) => (
                              <li key={r.name.ru} className="grid grid-cols-[1fr_auto] items-baseline gap-3 py-2.5 sm:gap-4 sm:py-3 lg:py-3.5">
                                <span className="min-w-0">
                                  <span className="block text-[12.5px] text-[#242424] sm:text-[14px] lg:text-[15px]">{r.name[lang]}</span>
                                  {r.time && <span className="mt-0.5 block text-[10.5px] text-[#17191a]/45 sm:text-[12px]">{r.time[lang]}</span>}
                                </span>
                                <span className="whitespace-nowrap text-[12.5px] text-[#17191a] sm:text-[14px] lg:text-[15px]">{r.price[lang]}</span>
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
          className="mt-3 flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] px-6 py-3.5 text-center font-display text-[11px] sm:py-5 sm:text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-all duration-300 hover:bg-transparent hover:text-[#17191a] hover:backdrop-blur-md sm:text-[14px]"
        >
          <span className="sm:hidden">{cta.label[lang].split(" · ")[0]}</span>
          <span className="hidden sm:inline">{cta.label[lang]}</span>
        </a>
      </div>
    </section>
  );
}
