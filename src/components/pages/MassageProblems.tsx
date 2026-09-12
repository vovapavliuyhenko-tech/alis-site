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
    title: { ru: "Полдня по разным салонам", en: "Half a day across different salons" },
    desc: {
      ru: "Парикмахер в одном конце города, ногти — в другом, брови — на завтра. День уходит на дорогу, а не на себя.",
      en: "Hair at one end of town, nails at another, brows tomorrow. The day goes to traffic, not to you.",
    },
  },
  {
    n: "02",
    filled: false,
    title: { ru: "Образ не собирается в одно", en: "The look never comes together" },
    desc: {
      ru: "Причёску сделали. Но макияж не в тон, а руки — отдельная история. По кускам красиво. Вместе — нет.",
      en: "The hair is done. But the makeup is off-tone and the nails are a separate story. Pretty in pieces. Not as a whole.",
    },
  },
  {
    n: "03",
    filled: true,
    title: { ru: "Событие близко, а времени нет", en: "The event is close, and there's no time" },
    desc: {
      ru: "Свадьба, съёмка, важный выход. Нужно всё и сразу — а записи к мастерам не стыкуются.",
      en: "A wedding, a shoot, a big night out. You need it all at once — but the bookings never line up.",
    },
  },
  {
    n: "04",
    filled: false,
    title: { ru: "Стараетесь, а выглядите уставшей", en: "You try, but still look tired" },
    desc: {
      ru: "Корни, сухие кончики, руки без ухода. Зеркало напоминает об этом каждое утро.",
      en: "Roots, dry ends, hands without care. The mirror reminds you every morning.",
    },
  },
];

function Capsule({ item, lang }: { item: Item; lang: "ru" | "en" }) {
  return (
    <div
      className="relative flex min-h-[176px] w-full max-w-[515px] flex-col items-center justify-center rounded-[34px] border border-dashed border-[#F4F1EA]/45 bg-[#6E7248] px-10 py-9 text-center sm:px-16 lg:min-h-[200px] lg:px-[74px]"
    >
      <span className="text-[10px] tracking-[0.14em] text-[#F4F1EA]/55">{`{ ${item.n} }`}</span>
      <h3 className="mt-2.5 max-w-[300px] text-[14px] font-semibold leading-[1.2] text-[#F4F1EA]">{item.title[lang]}</h3>
      <p className="mt-2 max-w-[330px] text-[12.5px] leading-[1.45] text-[#F4F1EA]/85">{item.desc[lang]}</p>
    </div>
  );
}

export default function MassageProblems() {
  const { lang } = useLang();
  const en = lang === "en";
  const left = ITEMS.filter((_, i) => i % 2 === 0); // 01, 03
  const right = ITEMS.filter((_, i) => i % 2 === 1); // 02, 04

  return (
    <section id="problems" className="bg-[#F9F8F6] py-20 lg:py-28">
      <div className="mx-auto w-[94%] max-w-[1400px]">
        {/* Заголовок секции */}
        <div className="text-center">
          <p className="text-[10px] lowercase tracking-[0.05em] text-[#6E7248]">
            {en ? "let's be honest" : "давайте честно"}
          </p>
          <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#6E7248] lg:text-[28px]">
            {en ? "What eats your time and energy?" : "Что забирает ваше время и силы?"}
          </h2>
        </div>

        {/* Орбита: левая колонка — центр-круг — правая колонка */}
        <div className="relative mt-14 grid items-center gap-7 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-5">
          <div className="flex flex-col items-center gap-7 lg:items-end lg:gap-10">
            {left.map((it) => (
              <Capsule key={it.n} item={it} lang={lang} />
            ))}
          </div>

          {/* Центральное круглое фото + соединительные линии */}
          <div className="relative mx-auto my-2 shrink-0 lg:my-0">
            {/* пунктирные соединители (только десктоп) */}
            <span className="pointer-events-none absolute right-full top-[26%] hidden h-0.5 w-[64px] border-t-2 border-dashed border-[#6E7248]/70 lg:block" />
            <span className="pointer-events-none absolute right-full top-[74%] hidden h-0.5 w-[64px] border-t-2 border-dashed border-[#6E7248]/70 lg:block" />
            <span className="pointer-events-none absolute left-full top-[26%] hidden h-0.5 w-[64px] border-t-2 border-dashed border-[#6E7248]/70 lg:block" />
            <span className="pointer-events-none absolute left-full top-[74%] hidden h-0.5 w-[64px] border-t-2 border-dashed border-[#6E7248]/70 lg:block" />
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
