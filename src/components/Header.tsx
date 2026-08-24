"use client";
// Плавающая «капсула»-шапка ALIS: лого, меню по центру (с выпадашкой «услуги»),
// тумблер языка RU/EN и CTA «Записаться». Тёмное матовое стекло.
import type { ReactNode } from "react";
import { useLang, LangToggle } from "@/lib/i18n";

// Пункт меню: при наведении текст переворачивается по X и становится бордовым
function FlipText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block [perspective:400px]">
      <span className="block transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover/nav:[transform:rotateX(180deg)]">
        <span className="block [backface-visibility:hidden]">{children}</span>
        <span className="absolute inset-0 block text-[#3B0D1A] [backface-visibility:hidden] [transform:rotateX(180deg)]">
          {children}
        </span>
      </span>
    </span>
  );
}

type NavItem = {
  label: { ru: string; en: string };
  href: string;
  sub?: { label: { ru: string; en: string }; href: string }[];
};

const NAV: NavItem[] = [
  { label: { ru: "Услуги", en: "Services" }, href: "/#services" },
  { label: { ru: "Портфолио", en: "Portfolio" }, href: "/#works" },
  { label: { ru: "Цены", en: "Prices" }, href: "/#services" },
  { label: { ru: "Мастера", en: "Masters" }, href: "/#team" },
  { label: { ru: "FAQ", en: "FAQ" }, href: "/#faq" },
  { label: { ru: "Контакты", en: "Contacts" }, href: "/#footer" },
];

export default function Header() {
  const { lang } = useLang();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-full border border-[#17191a]/10 bg-white/70 py-2.5 pl-6 pr-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
        {/* Логотип */}
        <a href="/" className="font-display text-[22px] font-semibold leading-none tracking-[0.12em] text-[#17191a]">
          ÁLIS
        </a>

        {/* Навигация по центру */}
        <nav className="hidden items-center gap-5 text-[13.5px] tracking-wide text-[#17191a]/80 lg:flex xl:gap-6">
          {NAV.map((item) =>
            item.sub ? (
              <div key={item.label.ru} className="group relative">
                <a href={item.href} className="group/nav flex items-center gap-1 py-2">
                  <FlipText>{item.label[lang]}</FlipText>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 opacity-70">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                {/* Выпадающее меню */}
                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-[#f4efe6]/10 bg-[#17191a]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
                    {item.sub.map((s) => (
                      <a
                        key={s.label.ru}
                        href={s.href}
                        className="block rounded-xl px-4 py-2.5 text-[13.5px] text-[#f4efe6]/75 transition-colors hover:bg-[#f4efe6]/10 hover:text-[#f4efe6]"
                      >
                        {s.label[lang]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.label.ru} href={item.href} className="group/nav py-2">
                <FlipText>{item.label[lang]}</FlipText>
              </a>
            )
          )}
        </nav>

        {/* Язык + CTA */}
        <div className="flex items-center gap-2.5">
          <LangToggle className="hidden sm:flex" />
          <a
            href="https://n1054895.yclients.com/company/976464/personal/menu" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-[#3B0D1A] bg-[#3B0D1A] py-2 pl-5 pr-2 text-[13px] font-medium text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A]"
          >
            {lang === "en" ? "Book" : "Записаться"}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3B0D1A" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
