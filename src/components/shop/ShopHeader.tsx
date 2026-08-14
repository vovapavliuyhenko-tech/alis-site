"use client";
// ШАПКА витрины /shop — в стиле O'CARE: светлая бежевая полоса, меню Geologica,
// иконка поиска и зелёная кнопка-пилюля «В каталог». Слева — лого ALIS и ссылка
// назад на основной сайт. Двуязычно.
import { useLang, LangToggle } from "@/lib/i18n";

type Loc = { ru: string; en: string };
const NAV: { label: Loc; href: string }[] = [
  { label: { ru: "Каталог", en: "Catalog" }, href: "#bestsellers" },
  { label: { ru: "Линейки", en: "Lines" }, href: "#bestsellers" },
  { label: { ru: "Тип действия", en: "By action" }, href: "#bestsellers" },
  { label: { ru: "О бренде", en: "About" }, href: "/#about" },
  { label: { ru: "Блог", en: "Blog" }, href: "#blog" },
];

export default function ShopHeader() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1c1c]/8 bg-[#F3F2EE]/90 backdrop-blur-md">
      <div className="mx-auto flex w-[92%] max-w-[1280px] items-center justify-between gap-4 py-3.5">
        {/* Лого + возврат на сайт */}
        <div className="flex items-center gap-4">
          <a href="/" className="ff-cormorant text-[22px] font-bold leading-none tracking-[0.1em] text-[#1c1c1c]">
            ALIS
          </a>
          <a
            href="/"
            className="ff-geo hidden text-[12px] text-[#1c1c1c]/45 transition-colors hover:text-[#2B6F2B] sm:inline"
          >
            {en ? "← to site" : "← на сайт"}
          </a>
        </div>

        {/* Меню */}
        <nav className="ff-geo hidden items-center gap-7 text-[13px] text-[#1c1c1c]/75 lg:flex">
          {NAV.map((n) => (
            <a key={n.label.ru} href={n.href} className="transition-colors hover:text-[#2B6F2B]">
              {n.label[lang]}
            </a>
          ))}
        </nav>

        {/* Поиск + язык + CTA */}
        <div className="flex items-center gap-3">
          <button aria-label={en ? "Search" : "Поиск"} className="text-[#1c1c1c]/60 transition-colors hover:text-[#2B6F2B]">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <LangToggle className="hidden sm:flex" />
          <a
            href="#bestsellers"
            className="ff-geo rounded-full bg-[#C9F0B1] px-6 py-2.5 text-[12.5px] font-medium text-[#2B6F2B] transition-colors duration-300 hover:bg-[#b6e79a]"
          >
            {en ? "To catalog" : "В каталог"}
          </a>
        </div>
      </div>
    </header>
  );
}
