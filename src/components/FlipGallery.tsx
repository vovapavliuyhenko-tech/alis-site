"use client";
// ГАЛЕРЕЯ РАБОТ ALIS: сетка плиток, каждая ПЕРЕВОРАЧИВАЕТСЯ при наведении и
// показывает вторую работу. Сверху — фильтр по категориям (как на референсе
// traffic-masters): при выборе услуги плитки плавно перефильтровываются.
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Cat = "bride" | "evening" | "day" | "shoot" | "event" | "onsite";
type Tile = {
  n: string;
  cat: Cat;
  label: Loc; // /категория
  caption: Loc; // подпись справа
  front: string;
  back: string;
};

const CATS: { id: Cat | "all"; label: Loc }[] = [
  { id: "all", label: { ru: "Все", en: "All" } },
  { id: "bride", label: { ru: "Свадебные", en: "Bridal" } },
  { id: "evening", label: { ru: "Вечерние", en: "Evening" } },
  { id: "day", label: { ru: "Дневные", en: "Daytime" } },
  { id: "shoot", label: { ru: "Съёмка", en: "Editorial" } },
  { id: "event", label: { ru: "События", en: "Events" } },
  { id: "onsite", label: { ru: "Выезд", en: "On-site" } },
];

const TILES: Tile[] = [
  {
    n: "01",
    cat: "bride",
    label: { ru: "/невеста", en: "/bride" },
    caption: { ru: "свадебный образ", en: "bridal look" },
    front: "/assets/tild6230-643__.jpg",
    back: "/assets/tild3236-393__.jpg",
  },
  {
    n: "02",
    cat: "evening",
    label: { ru: "/вечер", en: "/evening" },
    caption: { ru: "вечерний макияж", en: "evening makeup" },
    front: "/assets/tild3236-393__.jpg",
    back: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    n: "03",
    cat: "day",
    label: { ru: "/день", en: "/day" },
    caption: { ru: "дневной образ", en: "daytime look" },
    front: "/assets/tild3535-313_bergamo.png",
    back: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    n: "04",
    cat: "shoot",
    label: { ru: "/съёмка", en: "/editorial" },
    caption: { ru: "образ для фото", en: "shoot look" },
    front: "/assets/tild6536-613_-2___1__4.jpg",
    back: "/assets/tild3561-646_-2___1__5.jpg",
  },
  {
    n: "05",
    cat: "event",
    label: { ru: "/выпускной", en: "/prom" },
    caption: { ru: "образ на выпускной", en: "prom look" },
    front: "/assets/tild6436-383_fermata__1.jpg",
    back: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    n: "06",
    cat: "event",
    label: { ru: "/событие", en: "/event" },
    caption: { ru: "образ для события", en: "event look" },
    front: "/assets/tild3638-373_-2___1__3.jpg",
    back: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    n: "07",
    cat: "shoot",
    label: { ru: "/стиль", en: "/style" },
    caption: { ru: "макияж и укладка", en: "makeup & hair" },
    front: "/assets/tild6561-356_fermata__2.jpg",
    back: "/assets/tild3134-353___2024-12-08__161353.png",
  },
  {
    n: "08",
    cat: "onsite",
    label: { ru: "/выезд", en: "/on-site" },
    caption: { ru: "выездной образ", en: "on-location look" },
    front: "/assets/tild3439-633___2025-03-31__213150.png",
    back: "/assets/tild6664-386_2851782e-4c78-4475-a.png",
  },
];

function FlipTile({ t }: { t: Tile }) {
  const { lang } = useLang();
  return (
    <figure className="self-start">
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
        <span className="text-center text-[#17191a]/60">{t.label[lang]}</span>
        <span className="text-right">{t.caption[lang]}</span>
      </figcaption>
    </figure>
  );
}

export default function FlipGallery() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState<Cat | "all">("all");

  const visible = useMemo(
    () => (active === "all" ? TILES : TILES.filter((t) => t.cat === active)),
    [active]
  );

  return (
    <section id="works" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[96%] max-w-[1620px]">
        {/* Заголовок */}
        <div className="mb-8 max-w-2xl lg:mb-10">
          <h2 className="font-serif text-[34px] leading-[1.08] text-[#4E2126] lg:text-[56px]">
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
                    ? "border-[#4E2126] bg-[#4E2126] text-[#f4efe6]"
                    : "border-[#17191a]/15 bg-white text-[#17191a]/70 hover:border-[#4E2126] hover:text-[#4E2126]"
                }`}
              >
                {c.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Сетка плиток (плавно перефильтровывается) */}
        <div
          key={active}
          className="grid animate-[fadeGrid_.5s_ease] grid-cols-2 items-start gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-9 md:gap-y-16"
        >
          {visible.map((t) => (
            <FlipTile key={t.n} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
