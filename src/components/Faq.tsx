"use client";
// ВОПРОСЫ — как на sevara-sr: слева зафиксированный заголовок + фото; справа
// карточки-ответы на боли клиентов, которые при скролле НАЕЗЖАЮТ друг на друга
// (sticky-stacking). Листается только правая колонка. В стиле ÁLIS. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc };

const PHOTO = "/assets/tild3236-393__.jpg";
const DEFAULT_EYEBROW: Loc = { ru: "Вопросы", en: "FAQ" };
const DEFAULT_TITLE_TOP: Loc = { ru: "Вы спрашиваете —", en: "You ask —" };
const DEFAULT_TITLE_BOTTOM: Loc = { ru: "я решаю", en: "we solve" };

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
      ru: "Да. Волосы, ногти, брови и макияж делаем одновременно, в 4–6 рук — полный образ за пару часов, без разъездов по трём мастерам и без потерянной субботы.",
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
      ru: "Стоимость называем до начала, после осмотра. Нужен дополнительный шаг — остановимся и спросим. Точные цены видно в онлайн-записи, а на первое посещение — −10%.",
      en: "We name the price before we start, after examining you. If an extra step is needed, we stop and ask. Exact prices are in the online booking, and your first visit is −10%.",
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

export default function Faq({
  items = ITEMS,
  photo = PHOTO,
  eyebrow = DEFAULT_EYEBROW,
  titleTop = DEFAULT_TITLE_TOP,
  titleBottom = DEFAULT_TITLE_BOTTOM,
  sectionId = "faq",
}: {
  items?: Item[];
  photo?: string;
  eyebrow?: Loc;
  titleTop?: Loc;
  titleBottom?: Loc;
  sectionId?: string;
} = {}) {
  const { lang } = useLang();

  // Какая карточка сейчас в верхней (передней) позиции стека — она акцентно-бордовая.
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const STICK = 96 + 6; // top-24 (6rem) + небольшой допуск
    let raf = 0;
    let running = false;
    const loop = () => {
      let idx = 0;
      cardRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= STICK) idx = i;
      });
      setActive((prev) => (prev === idx ? prev : idx));
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    // Считаем активную карточку только пока блок на экране
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "200px" });
    io.observe(sec);
    return () => { stop(); io.disconnect(); };
  }, []);

  return (
    <section ref={sectionRef} id={sectionId} className="scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="mx-auto grid w-[92%] max-w-[1400px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Левая колонка — заголовок рядом с фото, зафиксирована */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="r-reveal text-[10px] lowercase tracking-[0.05em] text-[#6E7248]">{eyebrow[lang]}</p>
          <h2 className="r-reveal mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.15] tracking-[0.02em] text-[#6E7248] sm:text-[26px] lg:text-[28px]">
            {titleTop[lang]}
            <br />
            {titleBottom[lang]}
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" loading="lazy" decoding="async" className="mt-8 aspect-[3/4] w-full max-w-[260px] rounded-[22px] object-cover lg:mt-10" draggable={false} />
        </div>

        {/* Правая колонка — карточки идут вплотную и НАЕЗЖАЮТ друг на друга при скролле */}
        <div className="flex flex-col">
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <div
                key={it.q.ru}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="sticky top-24 pb-3 last:pb-0"
              >
                <article
                  className={`flex min-h-[190px] flex-col justify-center rounded-[20px] border p-5 transition-colors duration-300 lg:p-6 ${
                    isActive
                      ? "border-transparent bg-[#6E7248]"
                      : "border-[#6E7248]/30 bg-white hover:border-transparent hover:bg-[#EAEAE4]"
                  }`}
                >
                  <p className={`font-serif text-[16px] italic leading-snug lg:text-[19px] ${isActive ? "text-[#F4F1EA]" : "text-[#6E7248]"}`}>
                    {it.q[lang]}
                  </p>
                  <span className={`mt-4 mb-4 block h-px w-10 ${isActive ? "bg-[#F4F1EA]/60" : "bg-[#6E7248]"}`} />
                  <p className={`text-[12.5px] font-light leading-relaxed lg:text-[13.5px] ${isActive ? "text-[#F4F1EA]/80" : "text-[#444444]/70"}`}>
                    {it.a[lang]}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
