"use client";
// ПОДВАЛ витрины /shop — в стиле O'CARE: светлый бежевый фон, колонки-ссылки
// (Geologica), контакты и копирайт. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Col = { title: Loc; links: Loc[] };

const COLS: Col[] = [
  {
    title: { ru: "Каталог", en: "Catalog" },
    links: [
      { ru: "Все товары", en: "All products" },
      { ru: "Линейки уходов", en: "Care lines" },
      { ru: "Тип действия", en: "By action" },
    ],
  },
  {
    title: { ru: "Информация", en: "Information" },
    links: [
      { ru: "О бренде", en: "About" },
      { ru: "Блог", en: "Blog" },
      { ru: "Партнёрам", en: "Partners" },
    ],
  },
  {
    title: { ru: "Контакты", en: "Contacts" },
    links: [
      { ru: "Служба поддержки", en: "Support" },
      { ru: "Доставка и оплата", en: "Delivery & payment" },
      { ru: "Политика конфиденциальности", en: "Privacy policy" },
    ],
  },
];

export default function ShopFooter() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <footer className="ff-geo border-t border-[#1c1c1c]/10 bg-[#F3F2EE] pt-16 pb-10">
      <div className="mx-auto grid w-[92%] max-w-[1280px] gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Лого + контакты */}
        <div>
          <a href="/" className="ff-cormorant text-[26px] font-bold tracking-[0.1em] text-[#1c1c1c]">
            ALIS
          </a>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#1c1c1c]/55">
            {en
              ? "Cosmetics and skincare we use in the studio — available to take home."
              : "Косметика и уход, которыми мы работаем в студии — можно забрать домой."}
          </p>
          <div className="mt-5 space-y-1 text-[13px] text-[#1c1c1c]/70">
            <p>Email: info@alis.beauty</p>
            <p>Telegram: @alisbeauty</p>
          </div>
        </div>

        {COLS.map((c) => (
          <div key={c.title.ru}>
            <h4 className="text-[12px] uppercase tracking-[0.14em] text-[#1c1c1c]/40">{c.title[lang]}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.ru}>
                  <a href="#" className="text-[13.5px] text-[#1c1c1c]/70 transition-colors hover:text-[#2B6F2B]">
                    {l[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex w-[92%] max-w-[1280px] flex-col items-center justify-between gap-3 border-t border-[#1c1c1c]/10 pt-6 text-[12px] text-[#1c1c1c]/40 sm:flex-row">
        <p>© 2025—2026 ALIS beauty</p>
        <a href="/" className="transition-colors hover:text-[#2B6F2B]">
          {en ? "Back to ALIS site" : "На основной сайт ALIS"}
        </a>
      </div>
    </footer>
  );
}
