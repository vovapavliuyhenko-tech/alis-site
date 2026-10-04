"use client";
// БЛОК «О СЕРВИСЕ» (страница «Консьерж-сервис», якорь #about). Тексты — со старого
// сайта alisbeauty.ru (по просьбе заказчицы). Меньше чтения, больше движения:
// пять преимуществ — раскрывающиеся фото-панели: видно только заголовки,
//     описание — у активной панели (сама листается, на наведении — выбранная).
// Ч/б. Двуязычно. TODO: фото панелей заменить на съёмку, которую пришлёт заказчица.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export type BenefitPoint = { title: Loc; desc: Loc; img: string };

// Тексты переписаны от боли клиента (черновик на согласование): только факты со старого сайта,
// порядок — от главной боли к заявке: образ целиком → выезд с оборудованием → гости → опыт → пакеты.
const POINTS: BenefitPoint[] = [
  {
    title: { ru: "Весь образ — одна команда", en: "One team, the whole look" },
    desc: {
      ru: "Не нужно искать визажиста, парикмахера и стилиста по отдельности: макияж, укладку и образ берём на себя в день события.",
      en: "No need to find a makeup artist, hairstylist and stylist separately: we handle makeup, hair and the look on the day of your event.",
    },
    img: "/assets/alis/img_1834.jpg",
  },
  {
    title: { ru: "Приезжаем со всем необходимым", en: "We bring everything" },
    desc: {
      ru: "Никакого плохого света и мятого платья: привозим профессиональный свет и отпариватель туда, где вам удобно.",
      en: "No bad lighting or creased dress: we bring professional lighting and a steamer wherever suits you.",
    },
    img: "/assets/alis/img_2672.jpg",
  },
  {
    title: { ru: "Готовим и вас, и гостей", en: "You and your guests" },
    desc: {
      ru: "Выезжаем командой стилистов и готовим к мероприятию большое количество гостей.",
      en: "We arrive as a team of stylists and get a large number of guests ready for the event.",
    },
    img: "/assets/alis/img_0569.jpg",
  },
  {
    title: { ru: "Образ, который вы задумали", en: "The look you envisioned" },
    desc: {
      ru: "Опыт и экспертность в индустрии красоты: понимаем задачу с полуслова и воплощаем её.",
      en: "Experience and expertise in the beauty industry: we understand the brief and bring it to life.",
    },
    img: "/assets/alis/img_0521.jpg",
  },
  {
    title: { ru: "Понятные пакеты", en: "Clear packages" },
    desc: {
      ru: "Готовые пакеты услуг для событий разного масштаба, бизнес- и творческих проектов.",
      en: "Ready-made service packages for events of any scale, business and creative projects.",
    },
    img: "/assets/alis/img_2455.jpg",
  },
];

const AUTO_MS = 4500;

// points — свои пункты (например, для страницы салона); по умолчанию — преимущества консьержа
// title — необязательный заголовок над панелями (например, «Почему выбирают» на главной)
export default function ConciergeBenefits({ points = POINTS, title, sectionId = "about" }: { points?: BenefitPoint[]; title?: Loc; sectionId?: string }) {
  const { lang } = useLang();

  // Панели преимуществ: авто-листание, пауза при наведении
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Телефон/планшет: панель раскрывается при прокрутке — активна та, что ближе к центру экрана
  const [mobile, setMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = matchMedia("(max-width: 1023px)");
    const upd = () => setMobile(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const box0 = wrap.current;
    let raf = 0;
    // Высота каждой панели плавно следует за прокруткой: прогресс t по блоку → «колокол» вокруг
    // текущей панели (соседняя растёт ровно настолько, насколько сжимается текущая — без рывков).
    const OPEN = innerWidth >= 640 ? 360 : 300, SHUT = 64, STEP = 150;
    const pick = () => {
      raf = 0;
      const box = wrap.current;
      if (!box) return;
      const items = Array.from(box.children) as HTMLElement[];
      const n = items.length;
      let t = (innerHeight * 0.55 - box.getBoundingClientRect().top) / STEP;
      t = Math.min(n - 0.5, Math.max(0.5, t));
      items.forEach((el, i) => {
        const o = Math.max(0, 1 - Math.abs(t - (i + 0.5)));
        const e = o * o * (3 - 2 * o); // мягкое ускорение/замедление
        el.style.setProperty("height", `${SHUT + (OPEN - SHUT) * e}px`);
        el.style.setProperty("transition", "none");
      });
      setActive(Math.min(n - 1, Math.max(0, Math.round(t - 0.5))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    pick();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      // вернуть управление высотой классам (для компьютера)
      (box0 ? (Array.from(box0.children) as HTMLElement[]) : []).forEach((el) => { el.style.removeProperty("height"); el.style.removeProperty("transition"); });
    };
  }, [mobile]);
  // Компьютер: авто-листание, пауза при наведении
  useEffect(() => {
    if (paused || mobile) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % points.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, paused, mobile, points.length]);

  return (
    <section id={sectionId} className="scroll-mt-24 overflow-hidden bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {title && <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{title[lang]}</h2>}
        {/* Пять преимуществ — раскрывающиеся фото-панели */}
        <div
          ref={wrap}
          className="flex flex-col gap-2 lg:h-[min(520px,62vh)] lg:flex-row lg:gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {points.map((pt, i) => {
            const on = i === active;
            return (
              <button
                key={pt.title.ru}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={`group relative isolate overflow-hidden rounded-[12px] text-left text-white transition-[flex-grow,height] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] lg:h-auto lg:min-w-0 ${
                  on ? "h-[300px] sm:h-[360px] lg:flex-[3.6_1_0%]" : "h-[64px] lg:flex-[1_1_0%]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pt.img}
                  alt={pt.title[lang]}
                  loading="lazy"
                  className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${on ? "scale-100" : "scale-110"}`}
                />
                <div
                  className={`absolute inset-0 -z-10 transition-colors duration-700 ${on ? "bg-black/5" : "bg-black/30"}`}
                  style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,.25) 45%, rgba(0,0,0,0) 70%)" }}
                />

                {/* Номер */}
                <span className={`absolute left-5 top-5 font-serif-display text-[13px] tracking-[0.12em] text-white/90 lg:left-6 lg:top-6 ${on ? "" : "max-lg:hidden"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Свёрнутая панель на десктопе — вертикальный заголовок */}
                <span
                  className={`absolute bottom-6 top-16 left-1/2 hidden origin-center -translate-x-1/2 text-[15px] leading-[1.25] transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block ${
                    on ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {pt.title[lang]}
                </span>

                {/* Заголовок (мобильная версия — всегда; десктоп — у активной) и описание */}
                <div className="absolute inset-x-5 bottom-5 lg:inset-x-8 lg:bottom-8">
                  <h3
                    className={`font-serif-display text-[14px] uppercase leading-[1.2] tracking-[0.03em] sm:text-[17px] transition-all duration-500 lg:text-[22px] ${
                      on ? "lg:translate-y-0 lg:opacity-100 lg:delay-300" : "lg:translate-y-4 lg:opacity-0"
                    }`}
                  >
                    {pt.title[lang]}
                  </h3>
                  {pt.desc[lang] && <p
                    className={`max-w-[460px] !text-[10px] leading-[1.5] sm:!text-[12.5px] sm:leading-[1.55] text-white/70 transition-all duration-500 [text-shadow:0_1px_12px_rgba(0,0,0,.45)] lg:!text-[14px] ${
                      on ? "mt-3 max-h-40 translate-y-0 opacity-100 delay-300" : "max-h-0 translate-y-4 opacity-0"
                    }`}
                  >
                    {pt.desc[lang]}
                  </p>}
                </div>

                {/* Полоса таймера авто-листания */}
                {on && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20">
                    <span
                      key={`${active}-${paused}`}
                      className="block h-full bg-white"
                      style={{ animation: paused ? "none" : `alis-progress ${AUTO_MS}ms linear forwards`, width: paused ? "100%" : undefined }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes alis-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
