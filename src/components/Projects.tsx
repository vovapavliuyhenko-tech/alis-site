"use client";
// ГАЛЕРЕЯ РАБОТ ALIS: экран делится на 2 фото (по пол-экрана), растянутых на
// всю высоту. Поверх каждого фото — по центру карточка с работой.
// При наведении карточка ПЕРЕВОРАЧИВАЕТСЯ: на обороте короткий продающий текст
// и кнопка «Записаться». При скролле карточки слегка «догоняют» (parallax).
// Панели ЗАЛИПАЮТ (sticky) при скролле. Фото — заглушки.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

const SLIDES = [
  { title: { ru: "Свадебный образ", en: "Bridal look" }, blurb: { ru: "Свадьбу не переснять. Образ, в котором вы — та самая, и который держится от сборов до последнего танца.", en: "You can't reshoot a wedding. A look that's unmistakably you — holding from the morning prep to the last dance." }, num: "/assets/tild3930-303_1.svg", bg: "/assets/tild6530-383_-2___1_.jpg", thumb: "/assets/tild6230-643__.jpg" },
  { title: { ru: "Вечерний макияж", en: "Evening makeup" }, blurb: { ru: "Макияж, который не плывёт к полуночи. Вы свежи на каждом фото — от первого тоста до финального кадра.", en: "Makeup that won't slide by midnight. Fresh in every photo — from the first toast to the last frame." }, num: "/assets/tild3639-373_2.svg", bg: "/assets/tild3638-373_-2___1__3.jpg", thumb: "/assets/tild3236-393__.jpg" },
  { title: { ru: "Дневной образ", en: "Daytime look" }, blurb: { ru: "Не «накрашено», а ухоженно. Естественный образ, в котором вас узнают — только отдохнувшей и сияющей.", en: "Not 'made up' — cared for. A natural look where people still recognise you, just rested and glowing." }, num: "/assets/tild6538-633_3.svg", bg: "/assets/tild6536-613_-2___1__4.jpg", thumb: "/assets/tild3535-313_bergamo.png" },
  { title: { ru: "Съёмочный образ", en: "Editorial look" }, blurb: { ru: "Что красиво вживую — не всегда красиво в кадре. Делаем образ, который камера любит с первого дубля.", en: "What looks good in person doesn't always look good on camera. A look the lens loves from the first take." }, num: "/assets/tild6538-653_4.svg", bg: "/assets/tild3561-646_-2___1__5.jpg", thumb: "/assets/tild6536-613_-2___1__4.jpg" },
  { title: { ru: "Образ на выпускной", en: "Prom look" }, blurb: { ru: "Ваш вечер — ваш выход. Взрослый образ, в котором вы — главная на этом вечере.", en: "Your night, your entrance. A grown-up look that makes you the one everyone remembers." }, num: "/assets/tild3632-303_5.svg", bg: "/assets/tild6436-383_fermata__1.jpg", thumb: "/assets/tild6561-356_fermata__2.jpg" },
  { title: { ru: "Образ для мероприятия", en: "Event look" }, blurb: { ru: "Под дресс-код, под повод, под вас. Образ, в котором вы уместны и заметны одновременно.", en: "For the dress code, the occasion and you. A look that fits in and stands out at once." }, num: "/assets/tild6637-663_6.svg", bg: "/assets/tild6561-356_fermata__2.jpg", thumb: "/assets/tild3561-646_-2___1__5.jpg" },
];

// Одна ячейка: фон-фото на пол-экрана + карточка-флип с работой по центру.
function Cell({ s, i }: { s: (typeof SLIDES)[number]; i: number }) {
  const { lang } = useLang();
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Фон-фото, растянутое на пол-экрана */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#17191a]/45" />

      {/* Карточка-флип по центру фото (data-parallax — лёгкая подвижка при скролле) */}
      <div data-parallax="0.14" className="absolute inset-0 flex items-center justify-center px-6 will-change-transform">
        <div className="group relative aspect-[3/4] w-[86%] max-w-[360px] [perspective:1400px]">
          <div className="relative h-full w-full transition-transform duration-[2000ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(180deg)]">
            {/* ЛИЦО — фото работы */}
            <div className="absolute inset-0 overflow-hidden rounded-[22px] shadow-2xl [backface-visibility:hidden]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.thumb} alt={s.title[lang]} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <span className="text-center font-serif text-[24px] leading-tight text-[#f4efe6] drop-shadow lg:text-[28px]">
                  {s.title[lang]}
                </span>
              </div>
              {/* Подсказка «наведите» */}
              <span className="absolute right-4 top-4 rounded-full bg-[#f4efe6]/15 px-3 py-1 text-[11px] lowercase tracking-wide text-[#f4efe6]/90 backdrop-blur-sm">
                {lang === "en" ? "hover" : "наведите"}
              </span>
              <p className="absolute inset-x-0 bottom-5 text-center text-[12px] lowercase tracking-wide text-[#f4efe6]/85">
                instagram / telegram
              </p>
            </div>

            {/* ОБОРОТ — заголовок сверху, текст по центру, кнопка во всю ширину внизу */}
            <div className="absolute inset-0 flex flex-col rounded-[22px] border border-[#17191a]/10 bg-white px-8 py-8 text-center shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="flex flex-1 items-center justify-center text-[15px] leading-relaxed text-[#17191a]/80">
                {s.blurb[lang]}
              </p>
              <a
                href="/#online"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#3B0D1A] bg-[#3B0D1A] px-6 py-3.5 text-[13px] font-medium text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A]"
              >
                {lang === "en" ? "Book" : "Записаться"}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Счётчик работы */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.num} alt={`(${i + 1})`} className="absolute left-6 top-6 h-5 w-auto opacity-90" />
    </div>
  );
}

export default function Projects() {
  // Разбиваем 6 работ на пары — каждая пара = один экран из 2 фото.
  const pairs: (typeof SLIDES)[] = [];
  for (let i = 0; i < SLIDES.length; i += 2) pairs.push(SLIDES.slice(i, i + 2));

  const rootRef = useRef<HTMLDivElement>(null);

  // Лёгкий параллакс: пока панель залипла, карточка плавно смещается по вертикали
  // в такт скроллу — эффект «следования». Разная сила у левой/правой (глубина).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      for (const el of items) {
        const section = el.closest("section");
        if (!section) continue;
        // абсолютная позиция панели в документе (устойчиво к sticky)
        const abTop = section.getBoundingClientRect().top + sy;
        // прогресс скролла ВНУТРИ залипшей панели: 0 (вошла) → 1 (уходит)
        const p = (sy - abTop) / vh;
        const factor = parseFloat(el.dataset.parallax || "0.08");
        // карточка «догоняет» скролл: по центру панели в покое, дрейф ±
        const shift = (p - 0.5) * vh * factor;
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      }
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
    <div ref={rootRef} id="gallery" className="relative">
      {pairs.map((pair, p) => (
        <section
          key={p}
          className="sticky top-0 grid h-svh w-full grid-cols-1 overflow-hidden bg-white md:grid-cols-2"
        >
          {pair.map((s, j) => (
            <Cell key={s.title.ru} s={s} i={p * 2 + j} />
          ))}
        </section>
      ))}
    </div>
  );
}
