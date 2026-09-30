"use client";
// КАТАЛОГ магазина — точно по структуре dogguo-shop.tilda.ws/catalog, скругления как на сайте (12px):
// сверху «Главная / Каталог» и ссылки на категории; дальше по разделу на каждую категорию —
// большое фото на половину ширины (заголовок + #тег, стороны чередуются) и рядом сетка 2×2 товаров,
// остальные товары — рядами по 4. Карточка: светлый фон, название и цена внизу внутри карточки,
// при наведении — второй кадр. Попасть сюда можно только со страницы магазина.
// Заголовки разделов — черновики на согласование, фото временные.
import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice, type Product } from "@/lib/products";
import { ALT_PHOTO } from "@/components/shop/ShopShowcase";

type Loc = { ru: string; en: string };
type Section = { id: string; tag: string; hash: Loc; title: Loc; photo: string };

const SECTIONS: Section[] = [
  { id: "odezhda", tag: "одежда", hash: { ru: "#одежда", en: "#apparel" }, title: { ru: "Мерч, который хочется носить каждый день", en: "Merch you’ll want to wear every day" }, photo: "/assets/alis/img_1834.jpg" },
  { id: "aksessuary", tag: "аксессуары", hash: { ru: "#аксессуары", en: "#accessories" }, title: { ru: "Детали, которые напоминают о салоне", en: "Details that remind you of the salon" }, photo: "/assets/alis/img_6048.jpg" },
  { id: "dom", tag: "дом", hash: { ru: "#для дома", en: "#home" }, title: { ru: "Атмосфера ÁLIS BEAUTY у вас дома", en: "The ÁLIS BEAUTY mood at home" }, photo: "/assets/alis/img_0521.jpg" },
  { id: "uhod", tag: "уход", hash: { ru: "#уход", en: "#care" }, title: { ru: "Уход после салона — дома", en: "Salon care, continued at home" }, photo: "/assets/alis/img_5910.webp" },
];
// Старые ссылки вида ?cat=одежда (плитки на странице магазина) → нужный раздел
const CAT_TO_ID: Record<string, string> = { одежда: "odezhda", аксессуары: "aksessuary", дом: "dom", уход: "uhod", new: "odezhda" };

function Item({ p }: { p: Product }) {
  const { lang } = useLang();
  return (
    <Link href={`/product/${p.id}`} className="r-reveal group relative block aspect-[296/355] overflow-hidden rounded-[12px] bg-[#f6f4f1]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.img} alt={p.name[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ALT_PHOTO[p.id] || p.img} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-2 bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-10 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 lg:px-3.5 lg:pb-3.5">
        <span className="text-[11px] uppercase leading-[1.3] tracking-[0.04em] lg:text-[12px]">{p.name[lang]}</span>
        <span className="shrink-0 text-[11px] uppercase lg:text-[12px]">{fmtPrice(p.price, lang === "en")}</span>
      </div>
    </Link>
  );
}

export default function ShopCatalog() {
  const { lang } = useLang();

  // Переход с плитки категории (?cat=…) — прокручиваем к разделу
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    const id = c && CAT_TO_ID[c];
    if (id) setTimeout(() => document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
  }, []);

  return (
    <section className="bg-white pb-[clamp(72px,10vw,140px)] pt-[68px] min-[1280px]:pt-[80px] min-[1680px]:pt-[96px]">
      <h1 className="sr-only">{lang === "en" ? "ÁLIS BEAUTY shop catalogue" : "Каталог магазина ÁLIS BEAUTY"}</h1>
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {/* Верхняя строка: крошки слева, категории справа */}
        <div className="flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between lg:py-6">
          <nav aria-label={lang === "en" ? "Breadcrumbs" : "Навигация"} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-[#17191a]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
              <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3L12 3Z" />
            </svg>
            <Link href="/" className="transition-colors hover:text-[#46131E]">{lang === "en" ? "Home" : "Главная"}</Link>
            <span className="text-[#17191a]/40">/</span>
            <Link href="/shop" className="transition-colors hover:text-[#46131E]">{lang === "en" ? "Shop" : "Магазин"}</Link>
            <span className="text-[#17191a]/40">/</span>
            <span className="text-[#46131E]">{lang === "en" ? "Catalogue" : "Каталог"}</span>
          </nav>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#cat-${s.id}`} className="text-[11px] uppercase tracking-[0.08em] text-[#17191a] transition-colors hover:text-[#46131E]">
                {s.hash[lang].replace("#", "")}
              </a>
            ))}
          </div>
        </div>

        {/* Разделы категорий */}
        <div className="flex flex-col gap-[6px]">
          {SECTIONS.map((s, i) => {
            const items = PRODUCTS.filter((p) => p.tag.ru === s.tag);
            if (!items.length) return null;
            const first = items.slice(0, 4);
            const rest = items.slice(4);
            const photoLeft = i % 2 === 0; // стороны фото чередуются, как у Dogguo
            return (
              <div key={s.id} id={`cat-${s.id}`} className="scroll-mt-24">
                <div className="grid grid-cols-1 gap-[6px] lg:grid-cols-2">
                  {/* Большое фото раздела */}
                  <div className={`group relative min-h-[460px] overflow-clip rounded-[12px] lg:min-h-0 lg:aspect-[598/715] ${photoLeft ? "" : "lg:order-2"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.photo} alt={s.title[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/50" />
                    {/* Заголовок и тег прижаты к низу экрана и едут за прокруткой, пока видно фото (как на странице магазина) */}
                    <div className="absolute inset-0 flex flex-col justify-end px-6 py-8 lg:px-8 lg:py-12">
                    <div className="sticky bottom-8 max-w-[440px] text-white lg:bottom-12">
                      <p className="text-[22px] uppercase leading-[1.15] tracking-[0.02em] lg:text-[28px]">{s.title[lang]}</p>
                      <p className="mt-5 text-[13px] uppercase tracking-[0.04em] lg:mt-7 lg:text-[14px]">{s.hash[lang]}</p>
                    </div>
                    </div>
                  </div>
                  {/* Сетка 2×2 товаров */}
                  <div className={`grid grid-cols-2 content-start gap-[6px] ${photoLeft ? "" : "lg:order-1"}`}>
                    {first.map((p) => (
                      <Item key={p.id} p={p} />
                    ))}
                  </div>
                </div>
                {/* Остальные товары раздела — рядами по 4 */}
                {rest.length > 0 && (
                  <div className="mt-[6px] grid grid-cols-2 gap-[6px] lg:grid-cols-4">
                    {rest.map((p) => (
                      <Item key={p.id} p={p} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
