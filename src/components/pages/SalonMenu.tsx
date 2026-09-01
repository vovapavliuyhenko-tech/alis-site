"use client";
// Услуги и прайс салона — как на референсе: ряд овальных карточек-категорий
// (при выборе — сплошная бордовая обводка) и прайс-лист под ними, который
// меняется по выбранной категории. В стиле сайта, на всю ширину. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

type Loc = { ru: string; en: string };
type Item = { name: Loc; price: Loc };
type Cat = { label: Loc; img: string; items: Item[] };

const P = (ru: string, en: string): Loc => ({ ru, en });

const CATS: Cat[] = [
  {
    label: P("Ногти", "Nails"),
    img: "/assets/tild3236-393__.jpg",
    items: [
      { name: P("Маникюр с покрытием", "Manicure with coating"), price: P("от 1500 ₽", "from 1500 ₽") },
      { name: P("Педикюр с покрытием", "Pedicure with coating"), price: P("от 2200 ₽", "from 2200 ₽") },
      { name: P("Снятие и уход", "Removal & care"), price: P("от 500 ₽", "from 500 ₽") },
      { name: P("Дизайн (1 ноготь)", "Nail art (per nail)"), price: P("от 100 ₽", "from 100 ₽") },
    ],
  },
  {
    label: P("Брови и ресницы", "Brows & lashes"),
    img: "/assets/tild3638-373_-2___1__3.jpg",
    items: [
      { name: P("Коррекция и окрашивание бровей", "Brow shaping & tint"), price: P("от 1000 ₽", "from 1000 ₽") },
      { name: P("Ламинирование бровей", "Brow lamination"), price: P("от 1800 ₽", "from 1800 ₽") },
      { name: P("Ламинирование ресниц", "Lash lamination"), price: P("от 2000 ₽", "from 2000 ₽") },
    ],
  },
  {
    label: P("Макияж", "Makeup"),
    img: "/assets/tild6230-643__.jpg",
    items: [
      { name: P("Дневной макияж", "Daytime makeup"), price: P("от 2500 ₽", "from 2500 ₽") },
      { name: P("Вечерний макияж", "Evening makeup"), price: P("от 3500 ₽", "from 3500 ₽") },
      { name: P("Свадебный образ", "Bridal look"), price: P("от 5000 ₽", "from 5000 ₽") },
    ],
  },
  {
    label: P("Волосы", "Hair"),
    img: "/assets/tild3561-646_-2___1__5.jpg",
    items: [
      { name: P("Стрижка и укладка", "Cut & styling"), price: P("от 1500 ₽", "from 1500 ₽") },
      { name: P("Окрашивание", "Colouring"), price: P("от 3000 ₽", "from 3000 ₽") },
      { name: P("Укладка", "Styling"), price: P("от 1200 ₽", "from 1200 ₽") },
    ],
  },
];

export default function SalonMenu() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState(0);
  const cat = CATS[active];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        {/* Заголовок */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="font-display text-[30px] uppercase leading-[1.1] tracking-[0.05em] text-[#3B0D1A] lg:text-[46px]">
            {en ? "Services & prices" : "Услуги и цены"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#17191a]/55 lg:text-[15px]">
            {en
              ? "Choose a category — see what's inside. Exact prices and booking are online, −10% on your first visit."
              : "Выберите категорию — покажем, что входит. Точные цены и запись — онлайн, −10% на первое посещение."}
          </p>
        </div>

        {/* Овальные карточки категорий */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:gap-x-10">
          {CATS.map((c, i) => {
            const on = i === active;
            return (
              <button key={c.label.ru} onClick={() => setActive(i)} className="group flex flex-col items-center gap-4">
                <div
                  className={`relative aspect-[8/5] w-full overflow-hidden rounded-[50%] border-2 transition-all duration-300 ${
                    on ? "border-solid border-[#3B0D1A] shadow-[0_10px_30px_rgba(59,13,26,0.18)]" : "border-dashed border-[#17191a]/25 group-hover:border-[#3B0D1A]/60"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.label[lang]} className={`h-full w-full object-cover transition-transform duration-500 ${on ? "scale-[1.04]" : "group-hover:scale-[1.03]"}`} />
                </div>
                <span className={`text-[14px] uppercase tracking-[0.08em] transition-colors lg:text-[15px] ${on ? "text-[#3B0D1A]" : "text-[#17191a]/45 group-hover:text-[#17191a]/70"}`}>
                  {c.label[lang]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Прайс-лист выбранной категории */}
        <div key={active} className="mx-auto mt-14 max-w-[1120px] animate-[fadeGrid_.45s_ease] lg:mt-20">
          {cat.items.map((it) => (
            <div
              key={it.name.ru}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-5 border-b border-dashed border-[#17191a]/20 py-5 sm:gap-12"
            >
              <span className="text-[15px] text-[#17191a] sm:text-[17px]">{it.name[lang]}</span>
              <span className="tabular-nums text-[14px] text-[#17191a]/55 sm:text-[15px]">{it.price[lang]}</span>
              <a
                href={YCLIENTS}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={en ? "Book" : "Записаться"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a]/45 transition-colors duration-300 hover:border-[#3B0D1A] hover:bg-[#3B0D1A] hover:text-[#f4efe6]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
              </a>
            </div>
          ))}

          {/* Полный прайс — в онлайн-записи */}
          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.14em] text-[#3B0D1A]"
          >
            {en ? "Full price list & booking" : "Полный прайс и запись"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
