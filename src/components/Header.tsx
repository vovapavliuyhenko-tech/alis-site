"use client";
// Шапка ÁLIS BEAUTY — вариант «стеклянные плашки + белая карточка» (по референсу debritour.ru):
// слева плашка «Меню»/«Закрыть», по центру логотип, справа RU / EN и «Записаться».
// Над первым экраном плашки стеклянные (светлые на фото), после прокрутки за #hero-end —
// белая подложка и тёмные плашки. По «Меню» под шапкой раскрывается белая карточка во всю
// ширину: разделы колонками, справа — телефоны, часы, кнопка записи и иконки для связи.
// Названия соцсетей и мессенджеров не пишем (требование заказчицы) — только иконки.
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { LogoWord } from "@/components/Logo";

type Loc = { ru: string; en: string };
const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const WA = "https://wa.me/79888887758";
const IG = "https://www.instagram.com/alisbeauty.ru";

// Меню — три главных направления, у каждого: название страницы, 3 коротких пункта и
// одна чёрная кнопка главного действия. Ниже — строка остальных страниц и контакты.
type Sub = { label: Loc; href: string };
type Section = { label: Loc; href: string; sub: Sub[]; action: Sub };
const SECTIONS: Section[] = [
  {
    label: { ru: "Салон красоты", en: "Beauty salon" },
    href: "/salon",
    sub: [
      { label: { ru: "Услуги и цены", en: "Services & prices" }, href: "/salon#uslugi" },
      { label: { ru: "Наши работы", en: "Our work" }, href: "/salon#gallery" },
      { label: { ru: "Отзывы гостей", en: "Guest reviews" }, href: "/salon#reviews" },
    ],
    action: { label: { ru: "Записаться онлайн", en: "Book online" }, href: YCLIENTS },
  },
  {
    label: { ru: "Консьерж-сервис", en: "Concierge service" },
    href: "/concierge",
    sub: [
      { label: { ru: "Услуги и цены", en: "Services & prices" }, href: "/concierge#uslugi" },
      { label: { ru: "Как проходит выезд", en: "How a visit works" }, href: "/concierge#process" },
      { label: { ru: "О сервисе", en: "About the service" }, href: "/concierge#about" },
    ],
    action: { label: { ru: "Вызвать мастера", en: "Book an at-home visit" }, href: "/concierge#booking" },
  },
  {
    label: { ru: "Магазин", en: "Shop" },
    href: "/shop",
    sub: [
      { label: { ru: "Одежда", en: "Apparel" }, href: "/shop/catalog?cat=одежда" },
      { label: { ru: "Аксессуары", en: "Accessories" }, href: "/shop/catalog?cat=аксессуары" },
      { label: { ru: "Подарочный сертификат", en: "Gift certificate" }, href: "https://o8981.yclients.ru/certificates" },
    ],
    action: { label: { ru: "Смотреть каталог", en: "View the catalogue" }, href: "/shop/catalog" },
  },
];
const MORE: Sub[] = [
  { label: { ru: "Программа лояльности", en: "Loyalty programme" }, href: "/loyalty" },
  { label: { ru: "Новости", en: "News" }, href: "/news" },
  { label: { ru: "Сотрудничество", en: "Cooperation" }, href: "/cooperation" },
  { label: { ru: "Вакансии", en: "Vacancies" }, href: "/team" },
  { label: { ru: "Контакты", en: "Contacts" }, href: "/contacts" },
];

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

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
function IconWa() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.9.92-3-.2-.31a8.2 8.2 0 1 1 6.86 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
function IconIg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[17px] w-[17px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#17191a] px-1 text-[10px] font-medium leading-none text-white">
      {n}
    </span>
  );
}

export default function Header() {
  const { lang, setLang } = useLang();
  const shop = useShop();
  const pathname = usePathname();
  const [solid, setSolid] = useState(pathname !== "/");
  const [open, setOpen] = useState(false);
  const en = lang === "en";

  // На первом блоке фон прозрачный, плашки стеклянные; после #hero-end — подложка и тёмные плашки
  useEffect(() => {
    const sentinel = document.getElementById("hero-end");
    // Подложка включается чуть раньше конца обложки — пока кнопка героя подъезжает к шапке
    const onScroll = () => setSolid(!sentinel || sentinel.getBoundingClientRect().top <= 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Открыто меню — страница не прокручивается, плавающая кнопка записи прячется; Esc закрывает
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      html.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Светлые стеклянные плашки — над фото и при открытом меню (под ним затемнение)
  const glass = !solid || open;
  const pill = `flex h-10 items-center justify-center gap-2 rounded-xl border text-[11.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 lg:h-11 ${
    glass
      ? "border-white/50 bg-white/15 text-white backdrop-blur-md hover:bg-white hover:text-[#17191a]"
      : "border-[#17191a]/15 bg-white text-[#17191a] hover:border-[#46131E] hover:text-[#46131E]"
  }`;
  const cta = `flex h-10 items-center justify-center rounded-xl border px-3 text-[10.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 sm:px-4 sm:text-[11.5px] sm:tracking-[0.14em] lg:h-11 lg:px-6 ${
    glass
      ? "border-white bg-white text-[#17191a] hover:bg-transparent hover:text-white"
      : "border-[#17191a] bg-[#17191a] text-white hover:bg-transparent hover:text-[#17191a]"
  }`;

  const isShop = pathname.startsWith("/shop") || pathname.startsWith("/product");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !open
            ? "border-b border-[#17191a]/10 bg-white/85 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[68px] w-full max-w-[1760px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:px-6 min-[1280px]:h-[80px] min-[1680px]:h-[96px]">
          {/* Слева: «Меню»/«Закрыть» */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? (en ? "Close menu" : "Закрыть меню") : en ? "Menu" : "Меню"}
              className={`${pill} px-3 sm:px-4`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" strokeLinecap="round" />}
              </svg>
              <span className="hidden sm:inline">{open ? (en ? "Close" : "Закрыть") : en ? "Menu" : "Меню"}</span>
            </button>
          </div>

          {/* Логотип по центру */}
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center justify-self-center">
            <LogoWord variant={glass ? "cream" : "wine"} className="h-[18px] w-auto max-w-none shrink-0 sm:h-[22px] min-[1280px]:h-[26px] min-[1680px]:h-[32px]" />
          </Link>

          {/* Справа: магазин (только в магазине), язык, запись */}
          <div className="flex items-center justify-end gap-2">
            {isShop && (
              <>
                <button onClick={shop.openFav} aria-label={en ? "Favourites" : "Избранное"} className={`${pill} relative hidden w-10 sm:flex lg:w-11`}>
                  <HeartIcon />
                  {shop.favCount > 0 && <Badge n={shop.favCount} />}
                </button>
                <button onClick={shop.openCart} aria-label={en ? "Cart" : "Корзина"} className={`${pill} relative w-10 lg:w-11`}>
                  <BagIcon />
                  {shop.cartCount > 0 && <Badge n={shop.cartCount} />}
                </button>
              </>
            )}
            {/* Язык: RU / EN — нажатие переключает */}
            <button
              type="button"
              onClick={() => setLang(en ? "ru" : "en")}
              aria-label={en ? "Switch to Russian" : "Switch to English"}
              className={`${pill} hidden px-4 !tracking-[0.08em] sm:flex`}
            >
              <span className={en ? "opacity-55" : ""}>RU</span>
              <span className="opacity-55">/</span>
              <span className={en ? "" : "opacity-55"}>EN</span>
            </button>
            <a href={YCLIENTS} {...ext(YCLIENTS)} className={`${cta} ${isShop ? "hidden sm:flex" : ""}`}>
              <span className="sm:hidden">{en ? "Book" : "Запись"}</span>
              <span className="hidden sm:inline">{en ? "Book" : "Записаться"}</span>
            </a>
          </div>
        </div>
      </header>

      {open && (
        <>
          {/* Затемнение страницы под карточкой; клик — закрыть */}
          <div aria-hidden onClick={() => setOpen(false)} className="alis-menu fixed inset-0 z-40 bg-[#17191a]/45 backdrop-blur-[6px]" />
          {/* Белая карточка меню во всю ширину под шапкой */}
          <div className="fixed inset-x-0 top-[68px] z-50 mx-auto w-full max-w-[1760px] px-4 sm:px-6 min-[1280px]:top-[80px] min-[1680px]:top-[96px]">
            <nav
              aria-label={en ? "Site menu" : "Меню сайта"}
              className="alis-menu max-h-[calc(100svh-84px)] overflow-y-auto rounded-[20px] bg-white p-6 shadow-[0_30px_80px_-30px_rgba(23,25,26,0.45)] sm:p-8 lg:p-12 min-[1280px]:max-h-[calc(100svh-96px)]"
            >
              {/* Три направления */}
              <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-12">
                {SECTIONS.map((c, i) => (
                  <div key={c.href} style={{ animationDelay: `${60 + i * 60}ms` }} className="alis-menu-item flex flex-col border-b border-[#17191a]/10 pb-8 last:border-0 last:pb-0 md:border-0 md:pb-0">
                    <a href={c.href} onClick={() => setOpen(false)} className="group w-fit font-display text-[22px] leading-tight text-[#17191a] md:text-[20px] lg:text-[26px]">
                      {c.label[lang]}
                      <span aria-hidden className="ml-2 inline-block text-[16px] transition-transform duration-300 group-hover:-rotate-45">→</span>
                    </a>
                    <ul className="mt-4 flex flex-col gap-2 md:mb-6 lg:mt-5">
                      {c.sub.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} {...ext(s.href)} onClick={() => setOpen(false)} className="text-[15px] text-[#17191a]/65 transition-colors hover:text-[#17191a]">
                            {s.label[lang]}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={c.action.href}
                      {...ext(c.action.href)}
                      onClick={() => setOpen(false)}
                      className="mt-6 flex w-full items-center justify-center rounded-xl border border-[#17191a] bg-[#17191a] py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent hover:text-[#17191a] md:mt-auto lg:py-4"
                    >
                      {c.action.label[lang]}
                    </a>
                  </div>
                ))}
              </div>

              {/* Остальные страницы и контакты — одной строкой снизу */}
              <div style={{ animationDelay: "260ms" }} className="alis-menu-item mt-8 flex flex-col gap-5 border-t border-[#17191a]/10 pt-6 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:pt-8">
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {MORE.map((m) => (
                    <li key={m.href}>
                      <a href={m.href} onClick={() => setOpen(false)} className="text-[14px] text-[#17191a] transition-colors hover:text-[#17191a]/60">
                        {m.label[lang]}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-[#17191a]">
                  <a href="tel:+79888887758" className="transition-colors hover:text-[#17191a]/60">+7 988 888 77 58</a>
                  <span className="text-[#17191a]/55">{en ? "Daily 9:00–21:00" : "Ежедневно 9:00–21:00"}</span>
                  <div className="flex gap-2">
                    <a href={WA} {...ext(WA)} aria-label={en ? "Message us" : "Написать нам"} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191a]/30 text-[#17191a] transition-colors hover:bg-[#17191a] hover:text-white">
                      <IconWa />
                    </a>
                    <a href={IG} {...ext(IG)} aria-label={en ? "Our social media page" : "Наша страница в соцсети"} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191a]/30 text-[#17191a] transition-colors hover:bg-[#17191a] hover:text-white">
                      <IconIg />
                    </a>
                  </div>
                  {/* Язык — на телефоне здесь (в шапке на узком экране не помещается) */}
                  <div className="flex gap-2 sm:hidden">
                    {(["ru", "en"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        aria-pressed={lang === l}
                        className={`rounded-full border px-4 py-1.5 text-[12px] uppercase tracking-wide transition-colors ${lang === l ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/25 text-[#17191a]/70"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
