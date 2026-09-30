"use client";
// КАТАЛОГ магазина — по образцу dogguo.com/collections: сетка 4 колонки встык с тонкими зазорами,
// светлые плитки, метки-вкладки в левом верхнем углу («Новое»), при наведении — второй кадр,
// название и цена снизу. Сверху — «Фильтр» по категориям (?cat=… в адресе).
// Попасть сюда можно только со страницы магазина — в меню и подвале ссылки нет.
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice } from "@/lib/products";
import { ALT_PHOTO, NEW_IDS } from "@/components/shop/ShopShowcase";

type Loc = { ru: string; en: string };
const FILTERS: { id: string; label: Loc }[] = [
  { id: "all", label: { ru: "Все", en: "All" } },
  { id: "new", label: { ru: "Новинки", en: "New in" } },
  { id: "одежда", label: { ru: "Одежда", en: "Apparel" } },
  { id: "аксессуары", label: { ru: "Аксессуары", en: "Accessories" } },
  { id: "дом", label: { ru: "Для дома", en: "Home" } },
  { id: "уход", label: { ru: "Уход", en: "Care" } },
];

export default function ShopCatalog() {
  const { lang } = useLang();
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(false);

  // Категория из адреса (переход с плиток «Выберите нужную категорию»)
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (c && FILTERS.some((f) => f.id === c)) setCat(c);
  }, []);

  const pick = (id: string) => {
    setCat(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", id);
    window.history.replaceState(null, "", url);
  };

  const list = PRODUCTS.filter((p) => (cat === "all" ? true : cat === "new" ? NEW_IDS.has(p.id) : p.tag.ru === cat));

  return (
    <section className="bg-white pb-[clamp(72px,10vw,140px)] pt-[84px] lg:pt-[100px]">
      <h1 className="sr-only">{lang === "en" ? "ÁLIS BEAUTY shop catalogue" : "Каталог магазина ÁLIS BEAUTY"}</h1>

      {/* Фильтр */}
      <div className="px-3 py-3 lg:px-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/shop" className="text-[12px] uppercase tracking-[0.08em] text-[#17191a]/60 transition-colors hover:text-[#46131E]">
            ← {lang === "en" ? "Shop" : "Магазин"}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] text-[#17191a] transition-colors hover:text-[#46131E]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" strokeLinecap="round" />
              <circle cx="16" cy="7" r="2" />
              <circle cx="10" cy="17" r="2" />
            </svg>
            {lang === "en" ? "Filter" : "Фильтр"}
            {cat !== "all" && <span className="text-[#46131E]">· {FILTERS.find((f) => f.id === cat)?.label[lang]}</span>}
          </button>
        </div>
        {open && (
          <div className="alis-menu mt-3 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => pick(f.id)}
                aria-pressed={cat === f.id}
                className={`rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.08em] transition-colors ${
                  cat === f.id ? "border-[#46131E] bg-[#46131E] text-white" : "border-[#17191a]/15 text-[#17191a]/75 hover:border-[#46131E] hover:text-[#46131E]"
                }`}
              >
                {f.label[lang]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Сетка товаров встык */}
      {list.length ? (
        <div className="grid grid-cols-2 gap-[6px] lg:grid-cols-4">
          {list.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group relative block aspect-[4/5] overflow-hidden bg-[#f6f4f1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ALT_PHOTO[p.id] || p.img} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              {NEW_IDS.has(p.id) && (
                <span className="absolute left-0 top-0 bg-white px-4 py-2.5 text-[12px] uppercase tracking-[0.06em] text-[#17191a] lg:px-5 lg:py-3 lg:text-[14px]">
                  {lang === "en" ? "New" : "Новое"}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 bg-gradient-to-t from-black/45 to-transparent px-4 pb-4 pt-12 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 lg:px-7 lg:pb-7">
                <span className="text-[13px] leading-[1.3] lg:text-[16px]">{p.name[lang]}</span>
                <span className="shrink-0 text-[13px] lg:text-[16px]">{fmtPrice(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="px-4 py-16 text-center text-[14px] text-[#17191a]/70">
          {lang === "en" ? "Nothing here yet — take a look at other categories." : "Пока здесь пусто — загляните в другие категории."}
        </p>
      )}
    </section>
  );
}
