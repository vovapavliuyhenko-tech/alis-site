"use client";
// КАТАЛОГ магазина в стиле сайта: рубрики-«пилюли» (активная — бордовая) и сетка
// тех же карточек товаров, что на странице магазина (скругление 12, избранное, название и цена).
// Категория берётся из адреса (?cat=…) — на неё ведут плитки «Выберите нужную категорию».
// Попасть сюда можно только со страницы магазина — в меню и подвале ссылки нет.
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";
import { Card } from "@/components/shop/ShopHome";
import { NEW_IDS } from "@/components/shop/ShopShowcase";

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
    <section className="bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {/* Рубрики */}
        <div className="mb-10 flex flex-wrap gap-2 lg:mb-14">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => pick(f.id)}
              aria-pressed={cat === f.id}
              className={`rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                cat === f.id
                  ? "border-[#46131E] bg-[#46131E] text-white"
                  : "border-[#17191a]/15 text-[#17191a]/70 hover:border-[#46131E] hover:text-[#46131E]"
              }`}
            >
              {f.label[lang]}
            </button>
          ))}
        </div>

        {list.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-14">
            {list.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-[14px] text-[#17191a]/70">
            {lang === "en" ? "Nothing here yet — take a look at other categories." : "Пока здесь пусто — загляните в другие категории."}
          </p>
        )}
      </div>
    </section>
  );
}
