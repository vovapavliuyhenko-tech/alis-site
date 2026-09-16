"use client";
// БЛОК 2 «Что вас беспокоит сегодня?» — по эталону massage-romanova.ru.
// Центральное круглое фото, вокруг — 4 капсулы-карточки (левые с заливкой,
// правые контурные), пунктирные обводки и соединительные линии. Двуязычно.
import { useLang } from "@/lib/i18n";

const CIRCLE_PHOTO = "/assets/tild3236-393__.jpg"; // плейсхолдер — заменить на фото массажа

type Loc = { ru: string; en: string };
type Item = { n: string; title: Loc; desc: Loc; filled: boolean };

const ITEMS: Item[] = [
  {
    n: "01",
    filled: true,
    title: { ru: "Всё в одном месте", en: "Everything in one place" },
    desc: {
      ru: "Волосы, ногти, брови и макияж — в одной студии за один визит. Без разъездов по городу.",
      en: "Hair, nails, brows and makeup — one studio, one visit. No driving across town.",
    },
  },
  {
    n: "02",
    filled: false,
    title: { ru: "Образ собран целиком", en: "One complete look" },
    desc: {
      ru: "Мастера работают в паре и видят весь образ. Ничего не выбивается — вы выглядите гармонично.",
      en: "Masters work in pairs and see the whole image. Nothing clashes — you look put together.",
    },
  },
  {
    n: "03",
    filled: true,
    title: { ru: "Готовим точно к событию", en: "Ready right on time" },
    desc: {
      ru: "Свадьба, съёмка или выход — соберём к нужному часу. Подстроимся под вашу дату и время.",
      en: "A wedding, shoot or big night — we finish by your hour. We fit your date and time.",
    },
  },
  {
    n: "04",
    filled: false,
    title: { ru: "Свежий вид надолго", en: "Stays fresh for longer" },
    desc: {
      ru: "Корни, кончики, руки и кожа — под контролем. Уход, который держится и радует каждое утро.",
      en: "Roots, ends, hands and skin — all handled. Care that lasts and pleases every morning.",
    },
  },
];

function Capsule({ item, lang }: { item: Item; lang: "ru" | "en" }) {
  return (
    <div
      className="relative flex min-h-[176px] w-full max-w-[515px] flex-col items-center justify-center rounded-[34px] border border-[#46131E]/35 bg-white px-10 py-9 text-center sm:px-16 lg:min-h-[200px] lg:px-[74px]"
    >
      <span className="text-[10px] tracking-[0.14em] text-[#46131E]/50">{`{ ${item.n} }`}</span>
      <h3 className="mt-2.5 max-w-[300px] text-[14px] font-semibold leading-[1.2] text-[#46131E]">{item.title[lang]}</h3>
      <p className="mt-2 max-w-[330px] text-[12.5px] leading-[1.45] text-[#46131E]/70">{item.desc[lang]}</p>
    </div>
  );
}

export default function MassageProblems() {
  const { lang } = useLang();
  const en = lang === "en";
  const left = ITEMS.filter((_, i) => i % 2 === 0); // 01, 03
  const right = ITEMS.filter((_, i) => i % 2 === 1); // 02, 04

  return (
    <section id="problems" className="bg-[#F9F8F6] section-y">
      <div className="mx-auto w-[94%] max-w-[1400px]">
        {/* Заголовок секции */}
        <div className="text-center">
          <p className="text-[10px] lowercase tracking-[0.05em] text-[#46131E]">
            {en ? "why ális" : "почему ális"}
          </p>
          <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#46131E] lg:text-[28px]">
            {en ? "Why people choose ÁLIS" : "Почему выбирают ÁLIS"}
          </h2>
        </div>

        {/* Орбита: левая колонка — центр-круг — правая колонка */}
        <div className="relative mt-14 grid items-center gap-7 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-[64px] lg:gap-y-5">
          <div className="flex flex-col items-center gap-7 lg:items-end lg:gap-10">
            {left.map((it) => (
              <Capsule key={it.n} item={it} lang={lang} />
            ))}
          </div>

          {/* Центральное круглое фото + соединительные линии */}
          <div className="relative mx-auto my-2 shrink-0 lg:my-0">
            {/* пунктирные соединители (только десктоп) */}
            <span className="pointer-events-none absolute right-full top-[26%] hidden h-0.5 w-[64px] border-t-2 border-[#46131E]/70 lg:block" />
            <span className="pointer-events-none absolute right-full top-[74%] hidden h-0.5 w-[64px] border-t-2 border-[#46131E]/70 lg:block" />
            <span className="pointer-events-none absolute left-full top-[26%] hidden h-0.5 w-[64px] border-t-2 border-[#46131E]/70 lg:block" />
            <span className="pointer-events-none absolute left-full top-[74%] hidden h-0.5 w-[64px] border-t-2 border-[#46131E]/70 lg:block" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CIRCLE_PHOTO}
              alt=""
              aria-hidden
              className="h-[280px] w-[280px] rounded-full object-cover lg:h-[337px] lg:w-[337px]"
            />
          </div>

          <div className="flex flex-col items-center gap-7 lg:items-start lg:gap-10">
            {right.map((it) => (
              <Capsule key={it.n} item={it} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
