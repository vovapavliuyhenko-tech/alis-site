"use client";
// ЭТАПЫ РАБОТЫ — горизонтальный editorial-блок (как olga-kulik.ru): при
// вертикальном скролле листается вбок. Каждый слайд поделён: слева кремовая
// половина с крупным разрядным заголовком и цитатой, справа большое фото с
// карточкой-подписью (название этапа + описание). На мобильном — вертикально.
import { useEffect, useRef } from "react";

type Stage = {
  name: string;
  heading: string;
  desc: string;
  quote: string;
  photo: string;
};

const STAGES: Stage[] = [
  {
    name: "Знакомство",
    heading: "Обсуждаем повод, пожелания и референсы",
    desc: "Созваниваемся, разбираемся в задаче и понимаем, какой образ вам нужен. Уже на этом этапе — первые ориентиры и варианты.",
    quote: "«Слышим вас с первого слова»",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: "Подбор",
    heading: "Подбираем формат, мастеров и детали",
    desc: "Выбираем услугу под задачу, собираем команду мастеров и продумываем всё до мелочей: макияж, укладку, тайминг.",
    quote: "«Каждая деталь под контролем»",
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: "Образ",
    heading: "Создаём образ премиальной косметикой",
    desc: "Работаем стойко, аккуратно и точно по задумке — образ держится весь день и безупречно смотрится на любом свете.",
    quote: "«Красиво там, где вы»",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: "Событие",
    heading: "Сопровождаем и заботимся до конца",
    desc: "На съёмке, свадьбе или мероприятии мы рядом: правим детали, помогаем с образом и заботимся о каждой мелочи.",
    quote: "«Ваш день — наша забота»",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

// Декоративный росчерк-цветок
function Flourish() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-[#2a2622]/70" fill="none">
      <path d="M20 22c0-6-4-9-9-9 3 4 4 7 4 9-2 0-5 1-8 4 5 0 9-2 13-4z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M20 22c0-6 4-9 9-9-3 4-4 7-4 9 2 0 5 1 8 4-5 0-9-2-13-4z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M20 22v14" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

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
      if (vw < 768) {
        track.style.transform = "";
        sec.style.height = "";
        return;
      }
      const vh = window.innerHeight;
      const maxX = track.scrollWidth - vw;
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
    <section id="process" ref={secRef} className="relative bg-[#f4efe6]">
      <div className="md:sticky md:top-0 md:h-svh md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:h-full md:flex-row md:will-change-transform"
        >
          {STAGES.map((s, i) => (
            <article
              key={s.name}
              className="flex w-full shrink-0 flex-col md:h-full md:w-screen md:flex-row"
            >
              {/* Левая кремовая половина */}
              <div className="flex flex-col justify-between bg-[#f4efe6] px-6 py-12 md:w-[46%] md:px-[4vw] md:py-[8vh]">
                <div>
                  <span className="text-[12px] uppercase tracking-[0.3em] text-[#2a2622]/45">
                    Этап 0{i + 1}
                  </span>
                  <h3 className="mt-6 font-thunder text-[34px] uppercase leading-[1.06] tracking-[0.04em] text-[#2a2622] md:mt-10 md:text-[3.4vw]">
                    {s.heading}
                  </h3>
                </div>
                <div className="mt-10 md:mt-0">
                  <Flourish />
                  <p className="mt-4 font-serif text-[16px] italic text-[#2a2622]/70 md:text-[18px]">
                    {s.quote}
                  </p>
                </div>
              </div>

              {/* Правая половина — фото + карточка-подпись */}
              <div className="relative min-h-[62vh] md:min-h-0 md:w-[54%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-[6%] bottom-[6%] rounded-[6px] bg-[#f4efe6]/95 px-6 py-6 text-center backdrop-blur-sm md:px-10 md:py-8">
                  <p className="font-serif text-[24px] uppercase tracking-[0.15em] text-[#2a2622] md:text-[30px]">
                    {s.name}
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-[#2a2622]/70 md:text-[14px]">
                    {s.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
