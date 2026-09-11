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
    title: { ru: "Дискомфорт в шее, спине или пояснице", en: "Discomfort in the neck, back or lower back" },
    desc: {
      ru: "Долгие часы за компьютером или работа на ногах постепенно накапливают напряжение в теле. Спина начинает ныть, плечи становятся тяжёлыми, а мысли — менее ясными.",
      en: "Long hours at the computer or on your feet build up tension. The back starts to ache, shoulders feel heavy, and thoughts less clear.",
    },
  },
  {
    n: "02",
    filled: false,
    title: { ru: "Эмоциональное истощение, тревожность", en: "Emotional exhaustion, anxiety" },
    desc: {
      ru: "Каждый день вы решаете десятки задач, заботитесь о близких и живёте в постоянном потоке новостей. Постепенно появляется чувство опустошения. И даже после сна не хватает сил и энергии.",
      en: "Every day you solve dozens of tasks, care for loved ones and live in a constant news stream. A feeling of emptiness sets in — and even after sleep there's not enough energy.",
    },
  },
  {
    n: "03",
    filled: true,
    title: { ru: "Отёки и ощущение тяжести", en: "Swelling and a feeling of heaviness" },
    desc: {
      ru: "К вечеру обувь становится теснее, ноги наливаются тяжестью, а тело кажется «отёкшим». Такое состояние знакомо многим после долгого рабочего дня, перелёта или нескольких часов без движения.",
      en: "By evening shoes feel tighter, legs grow heavy and the body feels swollen — familiar after a long day, a flight or hours without moving.",
    },
  },
  {
    n: "04",
    filled: false,
    title: { ru: "Перегруженные мышцы после тренировок", en: "Overloaded muscles after workouts" },
    desc: {
      ru: "Вы регулярно тренируетесь, но тело не успевает восстановиться между нагрузками. Чувствуете, что мышцы «забиты», и хочется размять их, чтобы вернуть лёгкость и свободу движений.",
      en: "You train regularly, but the body can't recover between sessions. Muscles feel tight, and you want to loosen them to regain lightness and freedom of movement.",
    },
  },
];

function Capsule({ item, lang }: { item: Item; lang: "ru" | "en" }) {
  return (
    <div
      className="relative flex min-h-[176px] w-full max-w-[515px] flex-col items-center justify-center rounded-[34px] border border-dashed border-[#F4F1EA]/25 bg-[#6E7248] px-10 py-9 text-center sm:px-16 lg:min-h-[200px] lg:px-[74px]"
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
            {en ? "listen to yourself…" : "прислушайтесь к себе..."}
          </p>
          <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#6E7248] lg:text-[28px]">
            {en ? "What troubles you today?" : "Что вас беспокоит сегодня?"}
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
            <span className="pointer-events-none absolute right-full top-[26%] hidden h-px w-[52px] border-t border-dashed border-[#C2C0B6] xl:block" />
            <span className="pointer-events-none absolute right-full top-[74%] hidden h-px w-[52px] border-t border-dashed border-[#C2C0B6] xl:block" />
            <span className="pointer-events-none absolute left-full top-[26%] hidden h-px w-[52px] border-t border-dashed border-[#C2C0B6] xl:block" />
            <span className="pointer-events-none absolute left-full top-[74%] hidden h-px w-[52px] border-t border-dashed border-[#C2C0B6] xl:block" />
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
