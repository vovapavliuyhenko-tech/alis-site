"use client";
// ВОПРОСЫ — раскладка как на sevara-sr: слева крупный заголовок «Вы спрашиваете
// — я решаю» и фото; справа вертикальный список карточек-вопросов (аккордеон):
// вопрос от лица клиента в «ёлочках», по клику раскрывается ответ. В стиле ÁLIS.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc };

const PHOTO = "/assets/tild3236-393__.jpg";

const ITEMS: Item[] = [
  {
    q: { ru: "«А вдруг мне не понравится результат?»", en: "“What if I don't like the result?”" },
    a: {
      ru: "Скажите сразу, не выходя из кресла — поправим на месте. Если ошибка техническая, исправляем в течение 7 дней за наш счёт. Вы не платите дважды за одну работу.",
      en: "Tell us right away, before you leave the chair — we fix it on the spot. If it's a technical fault, we correct it within 7 days at our expense. You don't pay twice for one job.",
    },
  },
  {
    q: { ru: "«У меня совсем нет времени — реально всё за один визит?»", en: "“I'm short on time — can it all be done in one visit?”" },
    a: {
      ru: "Да. Волосы, ногти, брови и макияж делаем одновременно, в 4–6 рук — полный образ за пару часов, без разъездов по трём мастерам.",
      en: "Yes. Hair, nails, brows and makeup at once, in 4–6 hands — a complete look in a couple of hours, with no running between three masters.",
    },
  },
  {
    q: { ru: "«Боюсь испортить волосы после домашней краски»", en: "“I'm afraid of ruining my hair after home colour.”" },
    a: {
      ru: "Сначала тест пряди и разбор истории волос. Если осветлять нельзя — скажем прямо и дадим план по шагам, а не оставим вас с последствиями.",
      en: "First a strand test and a look at your hair's history. If bleaching isn't safe, we say so straight and give a step-by-step plan.",
    },
  },
  {
    q: { ru: "«Не хочу сюрпризов в чеке»", en: "“I don't want surprises on the bill.”" },
    a: {
      ru: "Стоимость называем до начала, после осмотра. Нужен дополнительный шаг — остановимся и спросим. Точные цены видно в онлайн-записи.",
      en: "We name the price before we start, after examining you. If an extra step is needed, we stop and ask. Exact prices are in the online booking.",
    },
  },
  {
    q: { ru: "«Боюсь аллергии на ресницы и краску для бровей»", en: "“I'm afraid of an allergy to lashes and brow tint.”" },
    a: {
      ru: "Перед первой процедурой предлагаем тест за 48 часов. Аллергия на клей и красители часто накопительная — лучше подстраховаться, чем жить с последствиями.",
      en: "Before the first procedure we offer a 48-hour patch test. Allergy to glue and dyes is often cumulative — better safe than sorry.",
    },
  },
  {
    q: { ru: "«Не знаю, что мне подойдёт»", en: "“I don't know what suits me.”" },
    a: {
      ru: "Разберём ваше фото и пожелания до начала работы и честно скажем, что подойдёт именно вам, а что — нет. Решаем вместе, без импровизаций на ходу.",
      en: "We review your reference and wishes before we start and honestly tell you what suits you. We decide together, no improvising on the go.",
    },
  },
  {
    q: { ru: "«Хочу образ на свадьбу — переживаю за стойкость»", en: "“I want a wedding look — I worry it won't last.”" },
    a: {
      ru: "Делаем пробный образ заранее и фиксируем его фото. В день события повторяем точно — образ держится до последнего кадра, даже на жаре и у моря.",
      en: "We do a trial look in advance and capture it in photos. On the day we repeat it exactly — it holds to the last frame, even in heat and by the sea.",
    },
  },
];

export default function Faq() {
  const { lang } = useLang();
  const en = lang === "en";
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section id="faq" className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid w-[92%] max-w-[1400px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Левая колонка: заголовок + фото */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-[34px] font-normal uppercase leading-[1.06] tracking-[0.02em] text-[#3B0D1A] sm:text-[48px] lg:text-[60px]">
            {en ? "You ask —" : "Вы спрашиваете —"}
            <br />
            <span className="text-[#4A4B33]">{en ? "we solve" : "я решаю"}</span>
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO}
            alt=""
            className="mt-10 aspect-[3/4] w-full max-w-[280px] rounded-[24px] object-cover lg:mt-14"
            draggable={false}
          />
        </div>

        {/* Правая колонка: карточки-аккордеон */}
        <div className="flex flex-col gap-4 lg:gap-5">
          {ITEMS.map((it, i) => {
            const isOpen = openSet.has(i);
            return (
              <div key={it.q.ru} className="overflow-hidden rounded-[24px] bg-[#faf7f2]">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 px-8 py-7 text-left lg:px-10 lg:py-8"
                >
                  <span className="font-serif text-[19px] italic leading-snug text-[#3B0D1A] lg:text-[23px]">
                    {it.q[lang]}
                  </span>
                  <span
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-[#3B0D1A] bg-[#3B0D1A] text-[#f4efe6]" : "border-[#3B0D1A]/25 text-[#3B0D1A]"
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                  </span>
                </button>
                <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0">
                    <p className="px-8 pb-8 text-[14px] font-light leading-relaxed text-[#2a2320]/75 lg:px-10 lg:text-[15px]">
                      {it.a[lang]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
