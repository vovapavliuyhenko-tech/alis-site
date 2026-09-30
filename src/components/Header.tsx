"use client";
// Шапка ÁLIS BEAUTY: центрированный логотип, пункты по краям. Поверх первого экрана —
// прозрачная (светлый текст на тёмном герое). После прокрутки за первый блок
// (#hero-end) появляется белая подложка и тёмный текст. На внутренних страницах
// подложка активна сразу.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { LogoWord } from "@/components/Logo";

type NavItem = {
  label: { ru: string; en: string };
  href: string;
  sub?: { label: { ru: string; en: string }; href: string }[];
};

// Левая группа (до логотипа) и правая (после)
const LEFT: NavItem[] = [
  {
    label: { ru: "Салон красоты", en: "Beauty salon" },
    href: "/salon",
    sub: [
      { label: { ru: "Услуги и прайс", en: "Services & prices" }, href: "/salon#uslugi" },
      { label: { ru: "Программа лояльности", en: "Loyalty programme" }, href: "/loyalty" },
      { label: { ru: "Подарочный сертификат", en: "Gift certificate" }, href: "https://o8981.yclients.ru/certificates" },
      { label: { ru: "Отзывы", en: "Reviews" }, href: "/salon#reviews" },
    ],
  },
  {
    label: { ru: "Консьерж-сервис", en: "Concierge service" },
    href: "/concierge",
    sub: [
      { label: { ru: "О сервисе", en: "About the service" }, href: "/concierge#about" },
      { label: { ru: "Услуги и прайс", en: "Services & prices" }, href: "/concierge#uslugi" },
      { label: { ru: "Фотогалерея", en: "Gallery" }, href: "/concierge#gallery" },
      { label: { ru: "Как забронировать", en: "How to book" }, href: "/concierge#booking" },
    ],
  },
  { label: { ru: "Магазин", en: "Shop" }, href: "/shop" },
  { label: { ru: "Новости", en: "News" }, href: "/news" },
];

const RIGHT: NavItem[] = [
  {
    label: { ru: "Сотрудничество", en: "Cooperation" },
    href: "/cooperation",
    sub: [
      { label: { ru: "Частным лицам", en: "For individuals" }, href: "/cooperation#private" },
      { label: { ru: "Агентствам и бизнесу", en: "For agencies & business" }, href: "/cooperation#business" },
    ],
  },
  { label: { ru: "Вакансии", en: "Vacancies" }, href: "/team" },
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
    // Подложка включается чуть раньше конца обложки — пока кнопка героя
    // (внизу первого экрана) подъезжает к шапке, иначе она наезжает на логотип
    const onScroll = () => setSolid(sentinel.getBoundingClientRect().top <= 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Открыто мобильное меню — страница под ним не прокручивается
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.classList.add("menu-open"); // прячет плавающую кнопку записи (globals.css)
    return () => {
      html.style.overflow = prev;
      html.classList.remove("menu-open");
    };
  }, [open]);

  // Над первым экраном главной (тёмное фото) — шапка светлая; после прокрутки
  // и на внутренних страницах — тёмная на белой подложке.
  // Открыто мобильное меню — шапка белая и тёмная, как на внутренних страницах
  const overHero = !solid && !open;
  const ink = overHero ? "text-white" : "text-[#17191a]";
  const inkSoft = overHero ? "text-white/90" : "text-[#17191a]/90";
  const hoverInk = overHero ? "hover:text-white" : "hover:text-[#17191a]";

  // Пункт меню + (опц.) выпадашка
  const NavLink = ({ item }: { item: NavItem }) =>
    item.sub ? (
      <div className="group relative flex h-[68px] items-center min-[1280px]:h-[80px] min-[1680px]:h-[96px]">
        <a href={item.href} className={`flex items-center gap-1 py-2 ${inkSoft} transition-colors ${hoverInk}`}>
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
            {item.label[lang]}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {/* Компактная выпадашка — раскрывается прямо из-под пункта */}
        <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2.5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="relative min-w-[230px] origin-top scale-95 rounded-[12px] border border-[#17191a]/12 bg-white/95 p-2 shadow-[0_20px_50px_rgba(23,25,26,0.16)] backdrop-blur-md transition-transform duration-200 group-hover:scale-100">
            {/* «Клювик» к пункту меню */}
            <span aria-hidden className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-[#17191a]/12 bg-white/95" />
            {item.sub.map((s) => (
              <a
                key={s.label.ru}
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block rounded-xl px-4 py-2.5 text-center text-[13px] uppercase tracking-[0.12em] text-[#17191a] transition-colors hover:bg-[#17191a]/[0.08]"
              >
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

  const Badge = ({ n }: { n: number }) => (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#46131E] px-1 text-[10px] font-medium leading-none text-white">
      {n}
    </span>
  );
  const bubble = overHero ? "bg-white/10 hover:bg-white/20 text-white" : "bg-[#46131E]/[0.07] hover:bg-[#46131E]/[0.14] text-[#46131E]";
  const ShopIcons = () => (
    <div className="flex items-center gap-1">
      <button onClick={shop.openFav} aria-label={lang === "en" ? "Favourites" : "Избранное"} className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors ${bubble}`}>
        <HeartIcon />
        {shop.favCount > 0 && <Badge n={shop.favCount} />}
      </button>
      <button onClick={shop.openCart} aria-label={lang === "en" ? "Cart" : "Корзина"} className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors ${bubble}`}>
        <BagIcon />
        {shop.cartCount > 0 && <Badge n={shop.cartCount} />}
      </button>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open
          ? "border-b border-[#17191a]/10 bg-white/85 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-[68px] w-full max-w-[1760px] min-[1280px]:h-[80px] min-[1680px]:h-[96px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-5 sm:px-8">
        {/* Левая часть: гамбургер (моб.) + левое меню (прижато к логотипу) */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={lang === "en" ? "Menu" : "Меню"}
            className={`flex h-10 w-10 items-center justify-center xl:hidden ${ink}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" strokeLinecap="round" />}
            </svg>
          </button>
          <nav className="hidden w-full items-center justify-end gap-4 whitespace-nowrap text-[12.5px] uppercase tracking-[0.1em] xl:flex min-[1440px]:gap-7 min-[1440px]:text-[13px] min-[1680px]:gap-9 min-[1680px]:text-[14px]">
            {LEFT.map((item) => (
              <NavLink key={item.label.ru} item={item} />
            ))}
          </nav>
        </div>

        {/* Логотип по центру: только надпись (вензель убран по фидбеку) */}
        <a href="/" className="mx-6 flex items-center justify-self-center min-[1280px]:mx-8 min-[1440px]:mx-12 min-[1680px]:mx-16">
          <LogoWord variant={overHero ? "cream" : "wine"} className="h-[19px] w-auto max-w-none shrink-0 min-[1280px]:h-[20px] min-[1440px]:h-[24px] min-[1680px]:h-[30px]" />
        </a>

        {/* Правая часть: правое меню (прижато к логотипу) + действия у края */}
        <div className="flex items-center">
          <nav className="hidden items-center gap-4 whitespace-nowrap text-[12.5px] uppercase tracking-[0.1em] xl:flex min-[1440px]:gap-7 min-[1440px]:text-[13px] min-[1680px]:gap-9 min-[1680px]:text-[14px]">
            {RIGHT.map((item) => (
              <NavLink key={item.label.ru} item={item} />
            ))}
          </nav>

          {/* Действия — язык, избранное, корзина (+ запись на моб.) */}
          <div className="ml-auto flex items-center gap-2 min-[1280px]:ml-4 min-[1440px]:ml-8 min-[1680px]:ml-10 min-[1680px]:gap-3">
          {/* Тумблер RU/EN (десктоп) */}
          <div className={`relative hidden items-center rounded-full border p-0.5 text-[11px] font-medium xl:flex ${overHero ? "border-white/40" : "border-[#46131E]/30"}`}>
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
                className={`relative z-10 w-8 rounded-full py-1.5 uppercase tracking-wide transition-colors duration-300 ${
                  lang === l
                    ? overHero ? "text-[#46131E]" : "text-white"
                    : overHero ? "text-white/70 hover:text-white" : "text-[#46131E]/60 hover:text-[#46131E]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Избранное и корзина — только в магазине, чтобы не путать гостей салона */}
          {(pathname.startsWith("/shop") || pathname.startsWith("/product")) && <ShopIcons />}
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        // Мобильное меню на весь экран (как на paloma.website): пункты появляются по очереди,
        // внизу — запись, телефон и язык
        <div className="alis-menu fixed inset-x-0 bottom-0 top-[68px] flex flex-col overflow-y-auto border-t border-[#17191a]/10 bg-white px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 xl:hidden">
          <nav className="flex flex-col">
            {ALL_NAV.map((item, i) => (
              <div key={item.label.ru} style={{ animationDelay: `${60 + i * 45}ms` }} className="alis-menu-item border-b border-[#17191a]/8 py-2 last:border-0">
                <a href={item.href} onClick={() => setOpen(false)} className="block py-2.5 text-[16px] uppercase tracking-[0.1em] text-[#17191a]">
                  {item.label[lang]}
                </a>
                {item.sub && (
                  <div className="mb-1 flex flex-col gap-0.5 pl-3">
                    {item.sub.map((s) => (
                      <a key={s.label.ru} href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => setOpen(false)} className="py-2 text-[15px] text-[#17191a]/80">
                        {s.label[lang]}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="alis-menu-item mt-auto flex flex-col gap-3 pt-8" style={{ animationDelay: "420ms" }}>
            <a
              href="https://n1054895.yclients.com/company/976464/personal/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="alis-pulse-wine flex w-full items-center justify-center rounded-xl border border-[#46131E] bg-[#46131E] py-4 text-[13px] font-medium uppercase tracking-[0.16em] text-white"
            >
              {lang === "en" ? "Book a visit" : "Оформить визит"}
            </a>
            <a href="tel:+79888887758" className="py-2 text-center text-[18px] tracking-[0.02em] text-[#17191a]">+7 988 888 77 58</a>
            <div className="flex items-center justify-center gap-3 text-[13px]">
              {(["ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full border px-4 py-2 uppercase tracking-wide transition-colors ${
                    lang === l ? "border-[#46131E] bg-[#46131E] text-white" : "border-[#46131E]/20 text-[#46131E]/60"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
