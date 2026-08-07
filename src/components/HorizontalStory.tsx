"use client";
// ЭТАПЫ РАБОТЫ — «колода»: при скролле каждая следующая карточка выезжает
// справа и НАКЛАДЫВАЕТСЯ на предыдущую со сдвигом (z-index растёт). Секция
// закреплена (pin). На мобильном карточки складываются в вертикаль.
import { useEffect, useRef } from "react";

type Step = {
  n: string;
  word: string;
  text: string;
  caption: string;
  photo: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    word: "знакомство",
    text: "Обсуждаем повод, ваши пожелания и референсы. Разбираемся, какой образ вам нужен и что важно учесть.",
    caption: "первый разговор",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    n: "02",
    word: "подбор",
    text: "Выбираем услугу под задачу, собираем команду мастеров и продумываем детали: макияж, укладку, тайминг.",
    caption: "детали образа",
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    n: "03",
    word: "образ",
    text: "Работаем премиальной косметикой — стойко, аккуратно и точно по задумке. Образ держится весь день.",
    caption: "в работе",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    n: "04",
    word: "событие",
    text: "На съёмке, свадьбе или мероприятии мы рядом: правим детали и заботимся о каждой мелочи до конца.",
    caption: "ваш день",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

const PER = 0.75; // доля высоты экрана на «прилёт» одной карточки

export default function HorizontalStory() {
  const secRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const deck = deckRef.current;
    if (!sec || !deck) return;
    const cards = Array.from(deck.querySelectorAll<HTMLElement>("[data-card]"));
    if (!cards.length) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      if (vw < 1024) {
        sec.style.height = "";
        cards.forEach((c) => {
          c.style.transform = "";
          c.style.zIndex = "";
        });
        return;
      }
      const vh = window.innerHeight;
      const perPx = vh * PER;
      const totalScroll = (cards.length - 1) * perPx;
      sec.style.height = `${totalScroll + vh}px`;
      const scrolled = Math.min(Math.max(-sec.getBoundingClientRect().top, 0), totalScroll);
      const global = scrolled / perPx; // 0 .. cards-1

      cards.forEach((c, i) => {
        const t = Math.min(Math.max(global - i + 1, 0), 1); // 0..1 прилёт карточки i
        const e = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const offX = i * 28; // ступенька стека вправо
        const slide = (1 - e) * 680; // старт справа за кадром
        const rot = (1 - e) * 6; // лёгкий наклон при влёте
        c.style.transform = `translate(calc(-50% + ${(offX + slide).toFixed(1)}px), -50%) rotate(${rot.toFixed(2)}deg)`;
        c.style.zIndex = String(i + 1);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process" ref={secRef} className="relative bg-[#17191a]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
        {/* Интро-заголовок */}
        <div className="px-6 pt-20 lg:w-[340px] lg:shrink-0 lg:px-0 lg:pl-[6vw] lg:pr-10 lg:pt-0">
          <span className="text-[13px] lowercase tracking-wide text-white/45">
            (этапы работы)
          </span>
          <h2 className="mt-4 font-serif text-[38px] leading-[1.05] text-white lg:text-[58px]">
            Как мы
            <br />
            работаем
          </h2>
          <p className="mt-5 max-w-[280px] text-[14px] leading-relaxed text-white/55">
            Четыре шага от первого сообщения до готового образа на вашем
            событии.
          </p>
        </div>

        {/* Колода карточек */}
        <div
          ref={deckRef}
          className="relative flex flex-col gap-6 px-6 pb-20 pt-8 lg:h-full lg:flex-1 lg:gap-0 lg:p-0"
        >
          {STEPS.map((s) => (
            <article
              key={s.n}
              data-card
              className="flex w-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#1e2021] shadow-2xl will-change-transform lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[64vh] lg:max-h-[560px] lg:w-[360px]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.caption}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-4 font-serif text-[13px] italic text-white/85 drop-shadow">
                  {s.caption}
                </span>
              </div>
              <div className="p-6">
                <p className="font-serif leading-none text-white">
                  <span className="text-[40px] lg:text-[48px]">{s.n}</span>
                  <span className="text-[18px] text-white/40 lg:text-[22px]">
                    {" "}
                    / {s.word}
                  </span>
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-white/55">
                  {s.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
