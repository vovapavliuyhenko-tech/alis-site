"use client";
// ГАЛЕРЕЯ РАБОТ ALIS: сетка из 8 плиток фиксированного расположения, каждая
// ПЕРЕВОРАЧИВАЕТСЯ при наведении. Сверху — фильтр по категориям услуг: при
// переключении меняются только сами фотографии и подпись, а количество и
// раскладка остаются прежними.
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type CatId = "all" | "bride" | "evening" | "day" | "shoot" | "event" | "onsite";
type Tile = { n: string; label: Loc; caption: Loc; front: string; back: string; place: string };

// Исходная асимметричная раскладка: 1-й ряд 4, 2-й ряд 1, 3-й ряд 3 карточки
const PLACES = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1",
  "md:col-start-3 md:row-start-1",
  "md:col-start-4 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-1 md:row-start-3",
  "md:col-start-3 md:row-start-3",
  "md:col-start-4 md:row-start-3",
];

const CATS: { id: CatId; label: Loc; short: Loc; caption: Loc }[] = [
  { id: "all", label: { ru: "Все", en: "All" }, short: { ru: "/образ", en: "/look" }, caption: { ru: "образ ALIS", en: "ALIS look" } },
  { id: "bride", label: { ru: "Свадебные", en: "Bridal" }, short: { ru: "/невеста", en: "/bride" }, caption: { ru: "свадебный образ", en: "bridal look" } },
  { id: "evening", label: { ru: "Вечерние", en: "Evening" }, short: { ru: "/вечер", en: "/evening" }, caption: { ru: "вечерний макияж", en: "evening makeup" } },
  { id: "day", label: { ru: "Дневные", en: "Daytime" }, short: { ru: "/день", en: "/day" }, caption: { ru: "дневной образ", en: "daytime look" } },
  { id: "shoot", label: { ru: "Съёмка", en: "Editorial" }, short: { ru: "/съёмка", en: "/editorial" }, caption: { ru: "образ для фото", en: "shoot look" } },
  { id: "event", label: { ru: "События", en: "Events" }, short: { ru: "/событие", en: "/event" }, caption: { ru: "образ для события", en: "event look" } },
  { id: "onsite", label: { ru: "Выезд", en: "On-site" }, short: { ru: "/выезд", en: "/on-site" }, caption: { ru: "выездной образ", en: "on-location look" } },
];

// Пул реальных фото — из него набираем по 8 штук на каждую категорию
const POOL = [
  "/assets/tild6230-643__.jpg",
  "/assets/tild3236-393__.jpg",
  "/assets/tild6530-383_-2___1_.jpg",
  "/assets/tild3638-373_-2___1__3.jpg",
  "/assets/tild3561-646_-2___1__5.jpg",
  "/shop/care-a.jpg",
  "/shop/care-b.jpg",
  "/shop/care-c.jpg",
  "/shop/care-d.jpg",
  "/shop/care-e.jpg",
  "/shop/care-f.jpg",
  "/shop/care-g.jpg",
  "/shop/care-h.jpg",
  "/shop/type-1.jpg",
  "/shop/type-2.jpg",
  "/shop/type-3.jpg",
  "/shop/type-4.jpg",
  "/shop/type-5.jpg",
  "/shop/type-6.jpg",
  "/shop/type-7.jpg",
  "/shop/type-8.jpg",
  "/shop/ss-portrait.jpg",
];

// Фиксированно 8 плиток. Каждая категория подставляет свой набор фото.
function buildTiles(cat: (typeof CATS)[number], catIndex: number): Tile[] {
  return Array.from({ length: 8 }, (_, i) => {
    const base = catIndex * 5 + i * 2;
    return {
      n: String(i + 1).padStart(2, "0"),
      label: cat.short,
      caption: cat.caption,
      front: POOL[base % POOL.length],
      back: POOL[(base + 1) % POOL.length],
      place: PLACES[i],
    };
  });
}

function FlipTile({ t }: { t: Tile }) {
  const { lang } = useLang();
  return (
    <figure className={`${t.place} md:self-start`}>
      {/* Двусторонняя плитка: переворот по наведению */}
      <div className="group aspect-[3/4] w-full [perspective:1600px]">
        <div className="relative h-full w-full transition-transform duration-[1500ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateY(180deg)]">
          {/* Лицо */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.front} alt={t.caption[lang]} draggable={false} className="h-full w-full object-cover" />
          </div>
          {/* Оборот — вторая работа */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.back} alt={t.caption[lang]} draggable={false} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Техническая строка под плиткой */}
      <figcaption className="mt-3 grid grid-cols-3 items-center font-mono text-[10.5px] lowercase tracking-wide text-[#17191a]/45">
        <span className="tabular-nums">{t.n}</span>
        <span className="text-center text-[#4A4B33]">{t.label[lang]}</span>
        <span className="text-right">{t.caption[lang]}</span>
      </figcaption>
    </figure>
  );
}

export default function FlipGallery() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState<CatId>("all");

  const tiles = useMemo(() => {
    const idx = CATS.findIndex((c) => c.id === active);
    return buildTiles(CATS[idx], idx);
  }, [active]);

  return (
    <section id="works" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[96%] max-w-[1620px]">
        {/* Заголовок */}
        <div className="mb-8 max-w-2xl lg:mb-10">
          <h2 className="font-serif text-[34px] leading-[1.08] text-[#3B0D1A] lg:text-[56px]">
            {en ? "Our works" : "Наши работы"}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#17191a]/60 lg:text-[16px]">
            {en
              ? "Choose a category — see the looks we create for it."
              : "Выберите категорию — и посмотрите образы, которые мы создаём."}
          </p>
        </div>

        {/* Фильтр по категориям */}
        <div className="mb-10 flex flex-wrap gap-2.5 lg:mb-14">
          {CATS.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`rounded-full border px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] transition-all duration-300 ${
                  on
                    ? "border-[#3B0D1A] bg-[#3B0D1A] text-[#f4efe6]"
                    : "border-[#17191a]/15 bg-white text-[#17191a]/70 hover:border-[#3B0D1A] hover:text-[#3B0D1A]"
                }`}
              >
                {c.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Сетка 8 плиток — расположение фиксировано, меняются только фото */}
        <div
          key={active}
          className="grid animate-[fadeGrid_.5s_ease] grid-cols-2 items-start gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-9 md:gap-y-16 md:[grid-auto-rows:min-content]"
        >
          {tiles.map((t) => (
            <FlipTile key={t.n} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
