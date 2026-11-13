"use client";
// КАТАЛОГ магазина — точно по структуре dogguo-shop.tilda.ws/catalog, скругления как на сайте (12px):
// сверху «Главная / Каталог» и ссылки на категории; дальше по разделу на каждую категорию —
// большое фото на половину ширины (заголовок + #тег, стороны чередуются) и рядом сетка 2×2 товаров,
// остальные товары — рядами по 4. Карточка: светлый фон, название и цена внизу внутри карточки,
// название и цена видны сразу; при наведении — второй кадр. Попасть сюда можно только со страницы магазина.
// Заголовки разделов — черновики на согласование, фото временные.
import { useEffect, useState } from "react";
import { useShop } from "@/lib/shop";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice, type Product } from "@/lib/products";
import { ALT_PHOTO } from "@/components/shop/ShopShowcase";

type Loc = { ru: string; en: string };
type Section = { id: string; tag: string; hash: Loc; title: Loc; photo: string };

const SECTIONS: Section[] = [
  { id: "odezhda", tag: "одежда", hash: { ru: "#одежда", en: "#apparel" }, title: { ru: "Мерч, который хочется носить каждый день", en: "Merch you’ll want to wear every day" }, photo: "/assets/alis/img_1834.jpg" },
  { id: "aksessuary", tag: "аксессуары", hash: { ru: "#аксессуары", en: "#accessories" }, title: { ru: "Детали, которые напоминают о салоне", en: "Details that remind you of the salon" }, photo: "/assets/alis/img_6048.jpg" },
  { id: "uhod", tag: "уход", hash: { ru: "#уход", en: "#care" }, title: { ru: "Уход после салона — дома", en: "Salon care, continued at home" }, photo: "/assets/alis/img_5910.webp" },
];
// Старые ссылки вида ?cat=одежда (плитки на странице магазина) → нужный раздел
const CAT_TO_ID: Record<string, string> = { одежда: "odezhda", аксессуары: "aksessuary", уход: "uhod", new: "odezhda" };

// Карточка товара: при наведении — второй кадр, название и цена приподнимаются, снизу выезжает
// белая кнопка «В корзину» (на телефоне видна всегда). Нажатие — товар в корзину, «Добавлено ✓».
function Item({ p }: { p: Product }) {
  const { lang } = useLang();
  const en = lang === "en";
  const shop = useShop();
  const [added, setAdded] = useState(false);
  const add = () => {
    shop.add(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  return (
    <div className="r-reveal group relative aspect-[296/355] overflow-hidden rounded-[12px] bg-[#f6f4f1]">
      <Link href={`/product/${p.id}`} aria-label={p.name[lang]} className="absolute inset-0 z-[1]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.img} alt={p.name[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ALT_PHOTO[p.id] || p.img} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-10 text-white max-[1023px]:pb-[56px] lg:px-3.5 lg:pb-3.5">
        <div className="flex items-end justify-between gap-2 transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] [@media(hover:hover)]:group-hover:-translate-y-[46px]">
          <span className="text-[11px] uppercase leading-[1.3] tracking-[0.04em] lg:text-[12px]">{p.name[lang]}</span>
          <span className="shrink-0 text-[11px] uppercase lg:text-[12px]">{fmtPrice(p.price, en)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={add}
        className="absolute inset-x-3 bottom-3 z-[2] flex h-[38px] items-center justify-center rounded-[10px] bg-white text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#17191a] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-[#17191a] hover:text-white lg:inset-x-3.5 lg:bottom-3.5 [@media(hover:hover)]:translate-y-[140%] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100"
      >
        {added ? (en ? "Added ✓" : "Добавлено ✓") : en ? "Add to cart" : "В корзину"}
      </button>
    </div>
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
            // Сетка всегда 2×2: если в категории меньше 4 товаров, добираем из других категорий
            // (своих товаров пока мало — заменятся, когда заказчица пришлёт ассортимент)
            const fill = PRODUCTS.filter((p) => p.tag.ru !== s.tag);
            const first = [...items, ...fill].slice(0, 4);
            const rest = items.slice(4);
            const photoLeft = i % 2 === 0; // стороны фото чередуются, как у Dogguo
            return (
              <div key={s.id} id={`cat-${s.id}`} className="scroll-mt-24">
                <div className="grid grid-cols-1 gap-[6px] lg:grid-cols-2">
                  {/* Большое фото раздела */}
                  <div className={`group relative min-h-[260px] overflow-clip rounded-[12px] border border-[#17191a]/10 bg-white lg:min-h-0 lg:aspect-[598/715] ${photoLeft ? "" : "lg:order-2"}`}>
                    {/* Заголовок и тег — с самого верха плашки и едут за прокруткой, пока видна плашка */}
                    <div className="absolute inset-0 flex flex-col justify-start px-6 py-8 lg:px-8 lg:py-12">
                    <div className="sticky top-28 max-w-[440px] text-[#17191a]">
                      <p className="text-[22px] uppercase leading-[1.15] tracking-[0.02em] lg:text-[28px]">{s.title[lang]}</p>
                      <p className="mt-5 text-[13px] uppercase tracking-[0.04em] text-[#17191a]/50 lg:mt-7 lg:text-[14px]">{s.hash[lang]}</p>
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
