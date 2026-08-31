"use client";
// Шапка ALIS: центрированный логотип, пункты по краям. Поверх первого экрана —
// прозрачная (светлый текст на тёмном герое). После прокрутки за первый блок
// (#hero-end) появляется белая подложка и тёмный текст. На внутренних страницах
// подложка активна сразу.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

type NavItem = {
  label: { ru: string; en: string };
  href: string;
  sub?: { label: { ru: string; en: string }; href: string }[];
};

// Левая группа (до логотипа) и правая (после)
const LEFT: NavItem[] = [
  {
    label: { ru: "Салон", en: "Salon" },
    href: "/salon",
    sub: [
      { label: { ru: "Услуги", en: "Services" }, href: "/salon#uslugi" },
      { label: { ru: "Прайс", en: "Prices" }, href: "/salon#price" },
      { label: { ru: "Лояльность", en: "Loyalty" }, href: "/salon#loyalty" },
      { label: { ru: "Сертификаты", en: "Certificates" }, href: "/salon#certificates" },
      { label: { ru: "Отзывы", en: "Reviews" }, href: "/salon#reviews" },
    ],
  },
  {
    label: { ru: "Команда", en: "Team" },
    href: "/team",
    sub: [
      { label: { ru: "Наша команда", en: "Our team" }, href: "/team#team" },
      { label: { ru: "Вакансии", en: "Vacancies" }, href: "/team#vacancies" },
      { label: { ru: "Стать мастером бьюти-консьержа", en: "Become a concierge master" }, href: "/team#become" },
    ],
  },
  {
    label: { ru: "Бьюти-консьерж", en: "Concierge" },
    href: "/concierge",
    sub: [
      { label: { ru: "Услуги", en: "Services" }, href: "/concierge#uslugi" },
      { label: { ru: "Прайс", en: "Prices" }, href: "/concierge#price" },
      { label: { ru: "Коммерческое предложение", en: "Proposal" }, href: "/concierge#offer" },
      { label: { ru: "Как забронировать", en: "How to book" }, href: "/concierge#booking" },
    ],
  },
];

const RIGHT: NavItem[] = [
  { label: { ru: "Сотрудничество", en: "Cooperation" }, href: "/cooperation" },
  { label: { ru: "Контакты", en: "Contacts" }, href: "/contacts" },
];

const ALL_NAV = [...LEFT, ...RIGHT];

export default function Header() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const [solid, setSolid] = useState(pathname !== "/");
  const [open, setOpen] = useState(false);

  // Подложка: следим за меткой #hero-end. Пока она ниже шапки — прозрачно.
  useEffect(() => {
    const sentinel = document.getElementById("hero-end");
    if (!sentinel) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(sentinel.getBoundingClientRect().top <= 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const dark = !solid; // прозрачная шапка на тёмном герое → светлый текст
  const ink = dark ? "text-[#f4efe6]" : "text-[#17191a]";
  const inkSoft = dark ? "text-[#f4efe6]/85" : "text-[#17191a]/70";
  const hoverInk = dark ? "hover:text-[#f4efe6]" : "hover:text-[#3B0D1A]";

  // Пункт меню + (опц.) выпадашка
  const NavLink = ({ item }: { item: NavItem }) =>
    item.sub ? (
      <div className="group relative">
        <a href={item.href} className={`flex items-center gap-1 py-2 ${inkSoft} transition-colors ${hoverInk}`}>
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
            {item.label[lang]}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 opacity-60">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#17191a]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
            {item.sub.map((s) => (
              <a key={s.label.ru} href={s.href} className="block rounded-xl px-4 py-2.5 text-[13px] text-[#f4efe6]/70 transition-colors hover:bg-white/10 hover:text-[#f4efe6]">
                {s.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <a href={item.href} className={`group py-2 ${inkSoft} transition-colors ${hoverInk}`}>
        <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
          {item.label[lang]}
        </span>
      </a>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-[#17191a]/10 bg-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-[68px] w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        {/* Левая группа (desktop) */}
        <nav className="hidden items-center gap-7 text-[13px] uppercase tracking-[0.14em] lg:flex">
          {LEFT.map((item) => (
            <NavLink key={item.label.ru} item={item} />
          ))}
        </nav>

        {/* Гамбургер (моб.) — слева */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={lang === "en" ? "Menu" : "Меню"}
          className={`flex h-10 w-10 items-center justify-center lg:hidden ${ink}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" strokeLinecap="round" />}
          </svg>
        </button>

        {/* Логотип по центру */}
        <a
          href="/"
          className={`font-display justify-self-center text-[22px] font-semibold leading-none tracking-[0.16em] transition-colors duration-500 sm:text-[24px] ${
            dark ? "text-[#f4efe6]" : "text-[#3B0D1A]"
          }`}
        >
          ÁLIS BEAUTY
        </a>

        {/* Правая группа (desktop) */}
        <div className="hidden items-center justify-end gap-7 text-[13px] uppercase tracking-[0.14em] lg:flex">
          {RIGHT.map((item) => (
            <NavLink key={item.label.ru} item={item} />
          ))}
          {/* Мини RU/EN */}
          <div className={`flex items-center gap-1 text-[12px] ${inkSoft}`}>
            {(["ru", "en"] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i === 1 && <span className="opacity-40">/</span>}
                <button
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`uppercase tracking-wide transition-colors ${
                    lang === l ? (dark ? "text-[#f4efe6]" : "text-[#3B0D1A]") : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Правый край на моб. — запись */}
        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className={`justify-self-end text-[12px] uppercase tracking-[0.12em] lg:hidden ${ink}`}
        >
          {lang === "en" ? "Book" : "Запись"}
        </a>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="absolute inset-x-0 top-[68px] max-h-[80vh] overflow-y-auto border-t border-[#17191a]/10 bg-white/97 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-md lg:hidden">
          <nav className="flex flex-col">
            {ALL_NAV.map((item) => (
              <div key={item.label.ru} className="border-b border-[#17191a]/8 py-2 last:border-0">
                <a href={item.href} onClick={() => setOpen(false)} className="block py-2 text-[15px] uppercase tracking-[0.12em] text-[#17191a]">
                  {item.label[lang]}
                </a>
                {item.sub && (
                  <div className="mb-1 flex flex-col gap-0.5 pl-3">
                    {item.sub.map((s) => (
                      <a key={s.label.ru} href={s.href} onClick={() => setOpen(false)} className="py-1.5 text-[13px] text-[#17191a]/55">
                        {s.label[lang]}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex items-center gap-3 text-[13px]">
              {(["ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full border px-4 py-2 uppercase tracking-wide transition-colors ${
                    lang === l ? "border-[#3B0D1A] bg-[#3B0D1A] text-[#f4efe6]" : "border-[#17191a]/15 text-[#17191a]/60"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
