"use client";
// ЭТАПЫ РАБОТЫ — лента компактных карточек, которая при вертикальном скролле
// едет ГОРИЗОНТАЛЬНО. Слева интро-заголовок, затем карточки: фото сверху,
// номер + название + короткий текст. На мобильном лента складывается вертикально.
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

export default function HorizontalStory() {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      if (vw < 1024) {
        track.style.transform = "";
        sec.style.height = "";
        return;
      }
      const vh = window.innerHeight;
      const maxX = track.scrollWidth - vw;
      // высота секции = горизонтальный оверфлоу + экран → скорость 1:1
      sec.style.height = `${maxX + vh}px`;
      const scrolled = Math.min(Math.max(-sec.getBoundingClientRect().top, 0), maxX);
      track.style.transform = `translate3d(${(-scrolled).toFixed(1)}px,0,0)`;
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
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 py-20 lg:h-[64vh] lg:max-h-[580px] lg:flex-row lg:items-stretch lg:gap-7 lg:px-[6vw] lg:py-0 lg:will-change-transform"
        >
          {/* Интро-заголовок */}
          <div className="flex shrink-0 flex-col justify-center lg:w-[320px]">
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

          {/* Карточки этапов */}
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="flex w-full shrink-0 flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] lg:h-full lg:w-[360px]"
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
