"use client";
// БЛОК «О СЕРВИСЕ» (страница «Консьерж-сервис», якорь #about). Тексты — со старого
// сайта alisbeauty.ru (по просьбе заказчицы). Меньше чтения, больше движения:
// пять преимуществ — раскрывающиеся фото-панели: видно только заголовки,
//     описание — у активной панели (сама листается, на наведении — выбранная).
// Ч/б. Двуязычно. TODO: фото панелей заменить на съёмку, которую пришлёт заказчица.
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const POINTS: { title: Loc; desc: Loc; img: string }[] = [
  {
    title: { ru: "Мастерство и опыт", en: "Skill & experience" },
    desc: {
      ru: "Благодаря экспертности в индустрии красоты мы с лёгкостью закрываем потребности наших клиентов.",
      en: "Thanks to our expertise in the beauty industry, we easily meet our clients' needs.",
    },
    img: "/assets/alis/img_0521.jpg",
  },
  {
    title: { ru: "Большая команда", en: "A large team" },
    desc: {
      ru: "Можем подготовить большое количество гостей на вашем мероприятии и выехать командой стилистов в любую локацию.",
      en: "We can get a large number of guests ready at your event and send a team of stylists to any location.",
    },
    img: "/assets/alis/img_0569.jpg",
  },
  {
    title: { ru: "Полный образ «под ключ»", en: "Turnkey full look" },
    desc: {
      ru: "Разнообразный штат специалистов берёт на себя все заботы по подбору макияжа, укладки, одежды и прочего в день вашего мероприятия.",
      en: "A diverse team of specialists takes care of makeup, hair, outfit and everything else on the day of your event.",
    },
    img: "/assets/alis/img_1834.jpg",
  },
  {
    title: { ru: "Коммерческие предложения", en: "Commercial packages" },
    desc: {
      ru: "Комфортные пакеты услуг для мероприятий разной величины, бизнес- и творческих интеграций.",
      en: "Convenient service packages for events of any size, business and creative collaborations.",
    },
    img: "/assets/alis/img_2455.jpg",
  },
  {
    title: { ru: "Качественное оборудование", en: "Quality equipment" },
    desc: {
      ru: "Команда выезжает на место с полным набором необходимого оборудования: от профессионального света до отпаривателя одежды.",
      en: "The team arrives fully equipped: from professional lighting to a garment steamer.",
    },
    img: "/assets/alis/img_2672.jpg",
  },
];

const AUTO_MS = 4500;

export default function ConciergeBenefits() {
  const { lang } = useLang();

  // Панели преимуществ: авто-листание, пауза при наведении
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % POINTS.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section id="about" className="scroll-mt-24 overflow-hidden bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="text-center font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
          {lang === "en" ? "About ÁLIS BEAUTY CONCIERGE" : "О сервисе ÁLIS BEAUTY CONCIERGE"}
        </h2>

        {/* Пять преимуществ — раскрывающиеся фото-панели */}
        <div
          className="mt-10 flex flex-col gap-2 lg:mt-14 lg:h-[min(520px,62vh)] lg:flex-row lg:gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {POINTS.map((pt, i) => {
            const on = i === active;
            return (
              <button
                key={pt.title.ru}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={`group relative isolate overflow-hidden rounded-[12px] text-left text-white transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] lg:h-auto lg:min-w-0 ${
                  on ? "h-[380px] lg:flex-[3.6_1_0%]" : "h-[84px] lg:flex-[1_1_0%]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pt.img}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${on ? "scale-100" : "scale-110"}`}
                />
                <div
                  className={`absolute inset-0 -z-10 transition-colors duration-700 ${on ? "bg-black/35" : "bg-black/60"}`}
                  style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,0) 60%)" }}
                />

                {/* Номер */}
                <span className="absolute left-5 top-5 font-serif-display text-[13px] tracking-[0.12em] text-white/70 lg:left-6 lg:top-6">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Свёрнутая панель на десктопе — вертикальный заголовок */}
                <span
                  className={`absolute bottom-6 left-1/2 hidden origin-center -translate-x-1/2 whitespace-nowrap text-[15px] transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block ${
                    on ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {pt.title[lang]}
                </span>

                {/* Заголовок (мобильная версия — всегда; десктоп — у активной) и описание */}
                <div className="absolute inset-x-5 bottom-5 lg:inset-x-8 lg:bottom-8">
                  <h3
                    className={`font-serif-display text-[17px] uppercase leading-[1.2] tracking-[0.03em] transition-all duration-500 lg:text-[22px] ${
                      on ? "lg:translate-y-0 lg:opacity-100 lg:delay-300" : "lg:translate-y-4 lg:opacity-0"
                    }`}
                  >
                    {pt.title[lang]}
                  </h3>
                  <p
                    className={`max-w-[460px] text-[14px] leading-[1.55] text-white/85 transition-all duration-500 lg:text-[15px] ${
                      on ? "mt-3 max-h-40 translate-y-0 opacity-100 delay-300" : "max-h-0 translate-y-4 opacity-0"
                    }`}
                  >
                    {pt.desc[lang]}
                  </p>
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
