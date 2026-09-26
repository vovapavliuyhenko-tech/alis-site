"use client";
// БЛОК «О СЕРВИСЕ» (страница «Консьерж-сервис», якорь #about). Тексты — со старого
// сайта alisbeauty.ru (по просьбе заказчицы). Меньше чтения, больше движения:
//  1) главная мысль крупно — слова «проявляются» по мере прокрутки;
//  2) строка с меняющимся поводом (свадебная церемония → день рождения → …);
//  3) пять преимуществ — раскрывающиеся фото-панели: видно только заголовки,
//     описание — у активной панели (сама листается, на наведении — выбранная).
// Ч/б. Двуязычно. TODO: фото панелей заменить на съёмку, которую пришлёт заказчица.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const LEAD: Loc = {
  ru: "Единственный в своём роде консьерж-сервис, организованный на базе салона красоты",
  en: "A one-of-a-kind concierge service built on the basis of a beauty salon",
};
const LINE: Loc = {
  ru: "Мы будем рядом и поможем создать незабываемый образ для",
  en: "We'll be by your side and help create an unforgettable look for your",
};
const OCCASIONS: Loc[] = [
  { ru: "свадебной церемонии", en: "wedding ceremony" },
  { ru: "дня рождения", en: "birthday" },
  { ru: "семейного праздника", en: "family celebration" },
  { ru: "значимой даты", en: "special date" },
];
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

  // 1) Проявление слов заголовка по прокрутке: 0 → 1 пока блок проходит экран
  const leadRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = leadRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // старт — верх текста у 90% экрана, финиш — низ текста у 45%
      const p = (vh * 0.9 - r.top) / (vh * 0.9 - vh * 0.45 + r.height);
      setProgress(Math.min(1, Math.max(0, p)));
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
  const words = LEAD[lang].split(" ");

  // 2) Меняющийся повод
  const [occ, setOcc] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOcc((i) => (i + 1) % OCCASIONS.length), 2400);
    return () => clearInterval(id);
  }, []);

  // 3) Панели преимуществ: авто-листание, пауза при наведении
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % POINTS.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section id="about" className="scroll-mt-24 overflow-hidden bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1400px]">
        <h2 className="text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[#17191a]/55">
          {lang === "en" ? "About ÁLIS BEAUTY CONCIERGE" : "О сервисе ÁLIS BEAUTY CONCIERGE"}
        </h2>

        {/* Главная мысль — слова темнеют по мере прокрутки */}
        <p
          ref={leadRef}
          className="mx-auto mt-6 max-w-[1100px] text-center font-serif-display text-[28px] font-normal leading-[1.18] tracking-[0.01em] text-[#17191a] sm:text-[36px] lg:mt-8 lg:text-[clamp(40px,3.6vw,60px)]"
        >
          {words.map((w, i) => {
            const t = Math.min(1, Math.max(0, progress * words.length - i));
            return (
              <span
                key={i}
                className="inline-block transition-[opacity,transform] duration-300 ease-out"
                style={{ opacity: 0.12 + 0.88 * t, transform: `translateY(${(1 - t) * 10}px)` }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>

        {/* Строка с меняющимся поводом */}
        <p className="mx-auto mt-8 max-w-[900px] text-center text-[15px] leading-[1.6] text-[#17191a]/65 lg:mt-10 lg:text-[18px]">
          {LINE[lang]}{" "}
          <span className="relative inline-grid text-[#17191a] [clip-path:inset(0_-2px)]">
            {OCCASIONS.map((o, i) => (
              <span
                key={o.ru}
                aria-hidden={i !== occ}
                className={`col-start-1 row-start-1 whitespace-nowrap border-b border-[#17191a] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                  i === occ ? "translate-y-0 opacity-100" : i === (occ + OCCASIONS.length - 1) % OCCASIONS.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                }`}
              >
                {o[lang]}
              </span>
            ))}
          </span>
        </p>

        {/* Пять преимуществ — раскрывающиеся фото-панели */}
        <div
          className="mt-14 flex flex-col gap-2 lg:mt-20 lg:h-[560px] lg:flex-row lg:gap-3"
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
                className={`group relative isolate overflow-hidden rounded-[20px] text-left text-white transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] lg:h-auto lg:min-w-0 ${
                  on ? "h-[340px] lg:flex-[3.6_1_0%]" : "h-[84px] lg:flex-[1_1_0%]"
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
                  className={`absolute bottom-6 left-1/2 hidden origin-center -translate-x-1/2 whitespace-nowrap font-serif-display text-[15px] uppercase tracking-[0.08em] transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block ${
                    on ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {pt.title[lang]}
                </span>

                {/* Заголовок (мобильная версия — всегда; десктоп — у активной) и описание */}
                <div className="absolute inset-x-5 bottom-5 lg:inset-x-8 lg:bottom-8">
                  <h3
                    className={`font-serif-display text-[17px] uppercase leading-[1.2] tracking-[0.03em] transition-all duration-500 lg:text-[26px] ${
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
