"use client";
// Шапка ALIS: центрированный логотип, пункты по краям. Поверх первого экрана —
// прозрачная (светлый текст на тёмном герое). После прокрутки за первый блок
// (#hero-end) появляется белая подложка и тёмный текст. На внутренних страницах
// подложка активна сразу.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { LogoEmblem, LogoWord } from "@/components/Logo";

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
      { label: { ru: "Услуги и прайс", en: "Services & prices" }, href: "/salon#uslugi" },
      { label: { ru: "Лояльность", en: "Loyalty" }, href: "/salon#loyalty" },
      { label: { ru: "Сертификаты", en: "Certificates" }, href: "/salon#certificates" },
      { label: { ru: "Магазин", en: "Shop" }, href: "/salon#merch" },
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
      { label: { ru: "Услуги и прайс", en: "Services & prices" }, href: "/concierge#uslugi" },
      { label: { ru: "Коммерческое предложение", en: "Proposal" }, href: "/concierge#offer" },
      { label: { ru: "Как забронировать", en: "How to book" }, href: "/concierge#booking" },
    ],
  },
];

const RIGHT: NavItem[] = [
  { label: { ru: "Сотрудничество", en: "Cooperation" }, href: "/cooperation" },
  { label: { ru: "Контакты", en: "Contacts" }, href: "/contacts" },
];

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
      <path d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z" strokeLinejoin="round" />
    </svg>
  );
}

const ALL_NAV = [...LEFT, ...RIGHT];

export default function Header() {
  const { lang, setLang } = useLang();
  const shop = useShop();
  const pathname = usePathname();
  const [solid, setSolid] = useState(pathname !== "/");
  const [open, setOpen] = useState(false);

  // На первом блоке фон прозрачный, элементы светлые; после #hero-end — подложка и тёмные
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

  // Над первым экраном главной (тёмное фото) — шапка светлая; после прокрутки
  // и на внутренних страницах — тёмная на белой подложке.
  const overHero = !solid;
  const ink = overHero ? "text-white" : "text-[#17191a]";
  const inkSoft = overHero ? "text-white/80" : "text-[#17191a]/75";
  const hoverInk = overHero ? "hover:text-white" : "hover:text-[#46131E]";

  // Пункт меню + (опц.) выпадашка
  const NavLink = ({ item }: { item: NavItem }) =>
    item.sub ? (
      <div className="group relative flex h-[68px] items-center">
        <a href={item.href} className={`flex items-center gap-1 py-2 ${inkSoft} transition-colors ${hoverInk}`}>
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
            {item.label[lang]}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {/* Мега-панель: во всю ширину, светлый фон, пункты в колонках */}
        <div className="invisible fixed inset-x-0 top-[68px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="border-t border-[#46131E]/15 bg-[#F9F8F6]/98 shadow-[0_24px_50px_rgba(0,0,0,0.08)] backdrop-blur-md">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-8 gap-y-1 px-8 py-4">
              {item.sub.map((s) => (
                <a
                  key={s.label.ru}
                  href={s.href}
                  className="rounded-lg px-4 py-2 text-[12.5px] uppercase tracking-[0.12em] text-[#46131E] transition-colors hover:bg-[#46131E]/10 hover:text-[#46131E]"
                >
                  {s.label[lang]}
                </a>
              ))}
            </div>
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

  const Badge = ({ n }: { n: number }) => (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#46131E] px-1 text-[10px] font-medium leading-none text-[#f4efe6]">
      {n}
    </span>
  );
  const ShopIcons = () => (
    <div className="flex items-center">
      <button onClick={shop.openFav} aria-label={lang === "en" ? "Favourites" : "Избранное"} className={`relative flex h-8 w-8 items-center justify-center transition-colors ${ink} ${hoverInk}`}>
        <HeartIcon />
        {shop.favCount > 0 && <Badge n={shop.favCount} />}
      </button>
      <button onClick={shop.openCart} aria-label={lang === "en" ? "Cart" : "Корзина"} className={`relative flex h-8 w-8 items-center justify-center transition-colors ${ink} ${hoverInk}`}>
        <BagIcon />
        {shop.cartCount > 0 && <Badge n={shop.cartCount} />}
      </button>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-[#17191a]/10 bg-white/85 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-[68px] w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        {/* Левая часть: гамбургер (моб.) + левое меню (прижато к логотипу) */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={lang === "en" ? "Menu" : "Меню"}
            className={`flex h-10 w-10 items-center justify-center lg:hidden ${ink}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" strokeLinecap="round" />}
            </svg>
          </button>
          <nav className="hidden w-full items-center justify-end gap-7 text-[13px] uppercase tracking-[0.13em] lg:flex xl:gap-9">
            {LEFT.map((item) => (
              <NavLink key={item.label.ru} item={item} />
            ))}
          </nav>
        </div>

        {/* Логотип по центру: вензель + надпись */}
        <a href="/" className="mx-6 flex items-center gap-2.5 justify-self-center lg:mx-10">
          <LogoEmblem variant={overHero ? "cream" : "wine"} className="h-10 w-auto max-w-none shrink-0" />
          <LogoWord variant={overHero ? "cream" : "wine"} className="h-[19px] w-auto max-w-none shrink-0" />
        </a>

        {/* Правая часть: правое меню (прижато к логотипу) + действия у края */}
        <div className="flex items-center">
          <nav className="hidden items-center gap-7 text-[13px] uppercase tracking-[0.13em] lg:flex xl:gap-9">
            {RIGHT.map((item) => (
              <NavLink key={item.label.ru} item={item} />
            ))}
          </nav>

          {/* Действия — язык, избранное, корзина (+ запись на моб.) */}
          <div className="ml-auto flex items-center gap-3 lg:ml-7 lg:gap-4 xl:ml-9">
          {/* Тумблер RU/EN (десктоп) */}
          <div className={`relative hidden items-center rounded-full border p-0.5 text-[12px] font-medium lg:flex ${overHero ? "border-white/40" : "border-[#46131E]/25"}`}>
            <span
              aria-hidden
              className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full transition-transform duration-300 ease-out ${overHero ? "bg-white" : "bg-[#46131E]"}`}
              style={{ transform: lang === "en" ? "translateX(100%)" : "translateX(0)" }}
            />
            {(["ru", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`relative z-10 w-9 rounded-full py-2 uppercase tracking-wide transition-colors duration-300 ${
                  lang === l
                    ? overHero ? "text-[#17191a]" : "text-[#f4efe6]"
                    : overHero ? "text-white/70 hover:text-white" : "text-[#46131E]/60 hover:text-[#46131E]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <ShopIcons />

          {/* Запись (моб.) */}
          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-1 text-[12px] uppercase tracking-[0.12em] lg:hidden ${ink}`}
          >
            {lang === "en" ? "Book" : "Запись"}
          </a>
          </div>
        </div>
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
                    lang === l ? "border-[#46131E] bg-[#46131E] text-[#f4efe6]" : "border-[#17191a]/15 text-[#17191a]/60"
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
