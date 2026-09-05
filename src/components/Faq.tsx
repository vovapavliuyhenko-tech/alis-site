"use client";
// ВОПРОСЫ — формат «Вы спрашиваете — я решаю» (как на sevara-sr): горизонтальная
// лента карточек со стрелками; в каждой — вопрос от лица клиента в «ёлочках» и
// ответ. В стиле ÁLIS. Двуязычно.
import { useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc };

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
      en: "First a strand test and a look at your hair's history. If bleaching isn't safe, we say so straight and give a step-by-step plan instead of leaving you with the consequences.",
    },
  },
  {
    q: { ru: "«Не хочу сюрпризов в чеке»", en: "“I don't want surprises on the bill.”" },
    a: {
      ru: "Стоимость называем до начала, после осмотра. Нужен дополнительный шаг — остановимся и спросим. Точные цены видно в онлайн-записи.",
      en: "We name the price before we start, after examining you. If an extra step is needed, we stop and ask. Exact prices are shown in the online booking.",
    },
  },
  {
    q: { ru: "«Боюсь аллергии на ресницы и краску для бровей»", en: "“I'm afraid of an allergy to lashes and brow tint.”" },
    a: {
      ru: "Перед первой процедурой предлагаем тест за 48 часов. Аллергия на клей и красители часто накопительная — лучше подстраховаться, чем жить с последствиями.",
      en: "Before the first procedure we offer a 48-hour patch test. Allergy to glue and dyes is often cumulative — better to play it safe than live with the consequences.",
    },
  },
  {
    q: { ru: "«Не знаю, что мне подойдёт»", en: "“I don't know what suits me.”" },
    a: {
      ru: "Разберём ваше фото и пожелания до начала работы и честно скажем, что подойдёт именно вам, а что — нет. Решаем вместе, без импровизаций на ходу.",
      en: "We review your reference and wishes before we start and honestly tell you what suits you and what doesn't. We decide together, no improvising on the go.",
    },
  },
  {
    q: { ru: "«Хочу образ на свадьбу — переживаю за стойкость»", en: "“I want a wedding look — I worry it won't last.”" },
    a: {
      ru: "Делаем пробный образ заранее и фиксируем его фото. В день события повторяем точно — образ держится до последнего кадра, даже на жаре и у моря.",
      en: "We do a trial look in advance and capture it in photos. On the day we repeat it exactly — the look holds to the last frame, even in heat and by the sea.",
    },
  },
];

export default function Faq() {
  const { lang } = useLang();
  const en = lang === "en";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card && card.offsetWidth > 0 ? card.offsetWidth + 20 : el.clientWidth * 0.85 || 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="faq" className="overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1400px]">
        {/* Заголовок + стрелки */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
              {en ? "FAQ" : "Вопросы"}
            </span>
            <h2 className="mt-5 font-display text-[30px] font-normal uppercase tracking-[0.05em] leading-[1.12] text-[#3B0D1A] lg:text-[44px]">
              {en ? "You ask — " : "Вы спрашиваете — "}
              <span className="text-[#4A4B33]">{en ? "we solve" : "я решаю"}</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#17191a]/55 lg:text-[16px]">
              {en
                ? "The honest answers to what you'd rather not ask out loud — including where we say “no”."
                : "Честные ответы на то, о чём неудобно спрашивать вслух — включая случаи, когда мы говорим «нет»."}
            </p>
          </div>
          {/* Стрелки */}
          <div className="flex shrink-0 gap-3">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => scrollBy(d as 1 | -1)}
                aria-label={d === -1 ? (en ? "Previous" : "Назад") : en ? "Next" : "Вперёд"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3B0D1A]/25 text-[#3B0D1A] transition-colors duration-300 hover:border-[#3B0D1A] hover:bg-[#3B0D1A] hover:text-[#f4efe6]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={d === -1 ? "rotate-180" : ""}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Лента карточек */}
        <div
          ref={scrollRef}
          className="hide-scrollbar -mx-[4%] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[4%] pb-2"
        >
          {ITEMS.map((it) => (
            <article
              key={it.q.ru}
              data-card
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-[24px] border border-[#17191a]/12 bg-[#faf7f2] p-8 sm:w-[420px] lg:p-10"
            >
              <p className="font-serif text-[19px] italic leading-snug text-[#3B0D1A] lg:text-[22px]">{it.q[lang]}</p>
              <span className="mt-5 mb-6 block h-px w-12 bg-[#e7c9a0]" />
              <p className="text-[14px] font-light leading-relaxed text-[#2a2320]/75 lg:text-[15px]">{it.a[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
