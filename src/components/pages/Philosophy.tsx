"use client";
// ФИЛОСОФИЯ САЛОНА — по образцу «что такое …»: крупный заголовок сверху,
// слева небольшое фото основателя, справа выделенная фраза (рисованный кружок)
// и два коротких абзаца. Фирменные цвета/шрифты ÁLIS. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHOTO = "/shop/ss-portrait.jpg";

export default function Philosophy() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="bg-[#f4efe6] py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        {/* Заголовок */}
        <h2 className="r-reveal font-display text-[34px] font-normal leading-[1.05] tracking-[0.01em] text-[#2a2320] sm:text-[46px] lg:text-[58px]">
          {en ? "What " : "Что такое "}
          <span className="text-[#3B0D1A]">«ÁLIS BEAUTY»</span>
          {en ? " is" : ""}
        </h2>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Фото основателя */}
          <div className="r-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt=""
              draggable={false}
              className="aspect-[4/5] w-full max-w-[320px] rounded-[24px] object-cover"
            />
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#2a2320]/55">
              {en ? "founder of ÁLIS BEAUTY" : "основатель ÁLIS BEAUTY"}
            </p>
          </div>

          {/* Текст — прижат к верху, фраза в верхней трети (как на референсе) */}
          <div className="r-reveal max-w-[520px] lg:pt-12">
            {/* Выделенная фраза с рисованным кружком */}
            <span className="relative inline-block font-serif text-[19px] italic leading-snug text-[#3B0D1A] lg:text-[22px]">
              <span className="relative z-10">{en ? "«Beauty without the fuss»" : "«Красота без суеты»"}</span>
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[calc(100%+26px)] w-[calc(100%+34px)] -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 320 96"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M24,52 C46,18 128,10 210,14 C280,17 312,32 306,53 C300,74 216,86 132,83 C58,80 10,70 16,47"
                  stroke="#8a5a3c"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <p className="mt-7 text-[14px] leading-relaxed text-[#2a2320]/85 lg:text-[15px]">
              {en
                ? "— we bring your whole look together in one place and one pair of hands: hair, nails, brows, makeup and care in a single visit — no running across town, no lost day."
                : "— это когда весь ваш образ собирается в одном месте и в одних руках: волосы, ногти, брови, макияж и уход за один визит — без разъездов по городу и потерянного дня."}
            </p>

            <p className="mt-5 text-[14px] leading-relaxed text-[#2a2320]/70 lg:text-[15px]">
              {en
                ? "We don't chase trends for the sake of it. First we listen and tell you honestly what suits you and what doesn't. Our job is simple: you leave still yourself — only rested and sure of it."
                : "Мы не гонимся за трендами ради трендов. Сначала слушаем и честно говорим, что подойдёт именно вам, а что — нет. Наша работа проста: вы выходите собой — только отдохнувшей и уверенной."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
