"use client";
// ЭТАПЫ РАБОТЫ — горизонтальный editorial-блок (как olga-kulik.ru): при
// вертикальном скролле листается вбок. Каждый слайд поделён: слева кремовая
// половина с крупным разрядным заголовком и цитатой, справа большое фото с
// карточкой-подписью (название этапа + описание). На мобильном — вертикально.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Stage = {
  name: Loc;
  heading: Loc;
  desc: Loc;
  quote: Loc;
  photo: string;
};

const STAGES: Stage[] = [
  {
    name: { ru: "Знакомство", en: "Acquaintance" },
    heading: {
      ru: "Обсуждаем повод, пожелания и референсы",
      en: "We discuss the occasion, wishes and references",
    },
    desc: {
      ru: "Созваниваемся, разбираемся в задаче и понимаем, какой образ вам нужен — с референсами и первыми вариантами. Никакого «разберёмся на месте».",
      en: "We get on a call, understand the task and the look you need — with references and first options. No 'we'll figure it out on the day'.",
    },
    quote: { ru: "«Слышим вас с первого слова»", en: "“We hear you from the first word”" },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Подбор", en: "Selection" },
    heading: {
      ru: "Подбираем формат, мастеров и детали",
      en: "We choose the format, artists and details",
    },
    desc: {
      ru: "Выбираем услугу под задачу, собираем команду мастеров и продумываем всё до мелочей: макияж, укладку, тайминг.",
      en: "We pick the service for the task, assemble the team and plan everything to the smallest detail: makeup, hair, timing.",
    },
    quote: { ru: "«Каждая деталь под контролем»", en: "“Every detail under control”" },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Образ", en: "The look" },
    heading: {
      ru: "Создаём образ премиальной косметикой",
      en: "We craft the look with premium cosmetics",
    },
    desc: {
      ru: "Работаем стойко, аккуратно и точно по задумке — образ держится весь день и безупречно смотрится на любом свете.",
      en: "We work long-lasting, precise and true to the vision — the look holds all day and looks flawless in any light.",
    },
    quote: { ru: "«Красиво там, где вы»", en: "“Beautiful wherever you are”" },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Событие", en: "The event" },
    heading: {
      ru: "Сопровождаем и заботимся до конца",
      en: "We accompany and care to the very end",
    },
    desc: {
      ru: "На съёмке, свадьбе или мероприятии мы рядом до конца: правим детали, спасаем от неожиданностей и держим образ идеальным. Вы просто наслаждаетесь днём.",
      en: "At a shoot, wedding or event we're there to the end: adjusting details, handling the unexpected and keeping your look perfect. You just enjoy the day.",
    },
    quote: { ru: "«Ваш день — наша забота»", en: "“Your day is our care”" },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

// Декоративный росчерк-цветок
function Flourish() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-[#4A4B33]" fill="none">
      <path d="M20 22c0-6-4-9-9-9 3 4 4 7 4 9-2 0-5 1-8 4 5 0 9-2 13-4z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M20 22c0-6 4-9 9-9-3 4-4 7-4 9 2 0 5 1 8 4-5 0-9-2-13-4z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M20 22v14" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export default function HorizontalStory() {
  const { lang } = useLang();
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
      const vh = Math.round(window.innerHeight * 0.9);
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
    <section id="process" ref={secRef} className="relative bg-white">
      <div className="md:sticky md:top-[10vh] md:h-[90svh] md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:h-full md:flex-row md:will-change-transform"
        >
          {STAGES.map((s, i) => (
            <article
              key={s.name.ru}
              className="flex w-full shrink-0 flex-col md:h-full md:w-screen md:flex-row"
            >
              {/* Левая кремовая половина */}
              <div className="flex flex-col justify-between bg-white px-6 py-12 md:w-[46%] md:px-[4vw] md:pb-[6vh] md:pt-[12vh]">
                <div>
                  <span className="text-[12px] uppercase tracking-[0.3em] text-[#4A4B33]">
                    {lang === "en" ? "Step" : "Этап"} 0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-[34px] uppercase leading-[1.06] tracking-[0.04em] text-[#17191a] md:mt-10 md:text-[3.4vw]">
                    {(() => {
                      const w = s.heading[lang].split(" ");
                      const cut = Math.max(1, w.length - 2);
                      return (
                        <>
                          {w.slice(0, cut).join(" ")}{" "}
                          <span className="text-[#4A4B33]">{w.slice(cut).join(" ")}</span>
                        </>
                      );
                    })()}
                  </h3>
                </div>
                <div className="mt-10 md:mt-0">
                  <Flourish />
                  <p className="mt-4 font-serif text-[16px] italic text-[#17191a]/70 md:text-[18px]">
                    {s.quote[lang]}
                  </p>
                </div>
              </div>

              {/* Правая половина — фото + карточка-подпись */}
              <div className="relative min-h-[62vh] md:min-h-0 md:w-[54%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-[6%] bottom-[6%] rounded-[18px] bg-white/95 px-6 py-6 text-center backdrop-blur-sm md:px-10 md:py-8">
                  <p className="font-serif text-[24px] uppercase tracking-[0.15em] text-[#3B0D1A] md:text-[30px]">
                    {s.name[lang]}
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-[#17191a]/70 md:text-[14px]">
                    {s.desc[lang]}
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
