"use client";
// Услуги и прайс салона — как на референсе: ряд овальных карточек-категорий
// (при выборе — сплошная бордовая обводка) и прайс-лист под ними. Каждая строка
// РАСКРЫВАЕТСЯ: описание + кнопка «Записаться». Широкие строки. Двуязычно.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

type Loc = { ru: string; en: string };
type Item = { name: Loc; price: Loc; desc: Loc };
type Cat = { label: Loc; img: string; items: Item[] };

const P = (ru: string, en: string): Loc => ({ ru, en });

const CATS: Cat[] = [
  {
    label: P("Ногти", "Nails"),
    img: "/assets/tild3236-393__.jpg",
    items: [
      {
        name: P("Маникюр с покрытием", "Manicure with coating"),
        price: P("от 1500 ₽", "from 1500 ₽"),
        desc: P(
          "Аппаратный или комбинированный маникюр с гель-лаком: ровное покрытие, аккуратная форма и стойкость до 3–4 недель.",
          "Hardware or combined manicure with gel polish: even coating, neat shape and up to 3–4 weeks of wear."
        ),
      },
      {
        name: P("Педикюр с покрытием", "Pedicure with coating"),
        price: P("от 2200 ₽", "from 2200 ₽"),
        desc: P(
          "Обработка стоп и ногтей с покрытием гель-лаком — ухоженные пятки и стойкий цвет.",
          "Foot and nail care with gel polish — smooth heels and long-lasting colour."
        ),
      },
      {
        name: P("Снятие и уход", "Removal & care"),
        price: P("от 500 ₽", "from 500 ₽"),
        desc: P(
          "Бережное снятие старого покрытия и восстанавливающий уход за ногтями и кутикулой.",
          "Gentle removal of old coating and restorative care for nails and cuticles."
        ),
      },
      {
        name: P("Дизайн (1 ноготь)", "Nail art (per nail)"),
        price: P("от 100 ₽", "from 100 ₽"),
        desc: P(
          "Индивидуальный дизайн — от лаконичного акцента до сложного арта, за каждый ноготь.",
          "Custom design — from a subtle accent to detailed art, priced per nail."
        ),
      },
    ],
  },
  {
    label: P("Брови и ресницы", "Brows & lashes"),
    img: "/assets/tild3638-373_-2___1__3.jpg",
    items: [
      {
        name: P("Коррекция и окрашивание бровей", "Brow shaping & tint"),
        price: P("от 1000 ₽", "from 1000 ₽"),
        desc: P(
          "Придаём форму по вашему лицу и окрашиваем краской или хной — выразительный, но естественный взгляд.",
          "We shape brows to suit your face and tint with dye or henna for an expressive yet natural look."
        ),
      },
      {
        name: P("Ламинирование бровей", "Brow lamination"),
        price: P("от 1800 ₽", "from 1800 ₽"),
        desc: P(
          "Укладываем и фиксируем волоски, придаём объём и ухоженный вид на 4–6 недель.",
          "We set and fix the hairs, adding volume and a groomed look for 4–6 weeks."
        ),
      },
      {
        name: P("Ламинирование ресниц", "Lash lamination"),
        price: P("от 2000 ₽", "from 2000 ₽"),
        desc: P(
          "Подкручиваем и питаем ресницы — открытый взгляд без туши на несколько недель.",
          "We curl and nourish lashes — an open gaze without mascara for several weeks."
        ),
      },
    ],
  },
  {
    label: P("Макияж", "Makeup"),
    img: "/assets/tild6230-643__.jpg",
    items: [
      {
        name: P("Дневной макияж", "Daytime makeup"),
        price: P("от 2500 ₽", "from 2500 ₽"),
        desc: P(
          "Лёгкий естественный макияж на каждый день или встречу — подчёркиваем черты, не перегружая.",
          "A light, natural makeup for everyday or a meeting — we enhance your features without overloading."
        ),
      },
      {
        name: P("Вечерний макияж", "Evening makeup"),
        price: P("от 3500 ₽", "from 3500 ₽"),
        desc: P(
          "Более насыщенный и стойкий образ для события, ужина или съёмки.",
          "A richer, longer-lasting look for an event, dinner or photoshoot."
        ),
      },
      {
        name: P("Свадебный образ", "Bridal look"),
        price: P("от 5000 ₽", "from 5000 ₽"),
        desc: P(
          "Стойкий макияж для самого важного дня — с репетицией образа и учётом фотосъёмки.",
          "Long-lasting makeup for your most important day — with a trial look and photography in mind."
        ),
      },
    ],
  },
  {
    label: P("Волосы", "Hair"),
    img: "/assets/tild3561-646_-2___1__5.jpg",
    items: [
      {
        name: P("Стрижка и укладка", "Cut & styling"),
        price: P("от 1500 ₽", "from 1500 ₽"),
        desc: P(
          "Стрижка с учётом структуры волос и укладка, которую легко повторить дома.",
          "A cut that respects your hair's structure and styling you can easily recreate at home."
        ),
      },
      {
        name: P("Окрашивание", "Colouring"),
        price: P("от 3000 ₽", "from 3000 ₽"),
        desc: P(
          "Окрашивание в один тон, сложные техники и тонирование на качественных красителях.",
          "Single-tone colouring, complex techniques and toning with quality products."
        ),
      },
      {
        name: P("Укладка", "Styling"),
        price: P("от 1200 ₽", "from 1200 ₽"),
        desc: P(
          "Укладка для события или на каждый день — локоны, объём или гладкость.",
          "Styling for an event or everyday — curls, volume or a sleek finish."
        ),
      },
    ],
  },
];

export default function SalonMenu() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const cat = CATS[active];

  const selectCat = (i: number) => {
    setActive(i);
    setOpen(null);
  };

  // Переезжающее «чернильное» подчёркивание под активной категорией
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  const measure = () => {
    const el = tabsRef.current[active];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  };
  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lang]);
  useEffect(() => {
    // пересчёт после загрузки шрифтов (ширина табов меняется) и при ресайзе
    if (typeof document !== "undefined" && document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lang]);

  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1080px]">
        {/* Заголовок */}
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "Services" : "Услуги"}
          </span>
          <h2 className="mt-5 font-display text-[30px] font-normal uppercase leading-[1.12] tracking-[0.05em] text-[#3B0D1A] lg:text-[44px]">
            {en ? "Services & prices" : "Услуги и цены"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#17191a]/55 lg:text-[15px]">
            {en
              ? "Choose a category, open a service for details. Exact prices and booking are online, −10% on your first visit."
              : "Выберите категорию, раскройте услугу — там описание и запись. Точные цены — онлайн, −10% на первое посещение."}
          </p>
        </div>

        {/* Табы категорий с переезжающим «чернильным» подчёркиванием */}
        <div className="mb-14 flex justify-center lg:mb-20">
          <div className="relative flex max-w-full gap-8 overflow-x-auto border-b border-[#17191a]/10 pb-3 lg:gap-12">
            {CATS.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.label.ru}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  onClick={() => selectCat(i)}
                  className={`shrink-0 whitespace-nowrap text-[14px] uppercase tracking-[0.1em] transition-colors duration-300 lg:text-[16px] ${
                    on ? "text-[#3B0D1A]" : "text-[#17191a]/40 hover:text-[#17191a]/70"
                  }`}
                >
                  {c.label[lang]}
                </button>
              );
            })}
            <span
              aria-hidden
              className="absolute -bottom-px h-[2px] rounded-full bg-[#3B0D1A] transition-all duration-300 ease-out"
              style={{ left: ind.left, width: ind.width }}
            />
          </div>
        </div>

        {/* Прайс-лист выбранной категории — раскрывающиеся строки */}
        <div key={active} className="mt-14 animate-[fadeGrid_.45s_ease] lg:mt-20">
          {cat.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.name.ru} className="border-b border-dashed border-[#17191a]/20 first:border-t">
                {/* Заголовок строки */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-5 py-6 text-left sm:gap-14 lg:py-7"
                >
                  <span className="text-[16px] text-[#17191a] sm:text-[19px] lg:text-[21px]">{it.name[lang]}</span>
                  <span className="tabular-nums text-[14px] text-[#17191a]/55 sm:text-[16px]">{it.price[lang]}</span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-[#3B0D1A] bg-[#3B0D1A] text-[#f4efe6]" : "border-[#17191a]/15 text-[#17191a]/45"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                  </span>
                </button>

                {/* Раскрытие: описание + кнопка записи */}
                {isOpen && (
                  <div className="animate-[fadeGrid_.35s_ease] pb-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
                    <p className="max-w-[640px] text-[14px] leading-relaxed text-[#17191a]/60 lg:text-[15px]">
                      {it.desc[lang]}
                    </p>
                    <a
                      href={YCLIENTS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-[#4A4B33] px-9 py-4 text-[13px] font-medium uppercase tracking-[0.14em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#3B0D1A] lg:mt-0"
                    >
                      {en ? "Book now" : "Записаться"}
                    </a>
                  </div>
                )}
              </div>
            );
          })}

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
