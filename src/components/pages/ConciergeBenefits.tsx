"use client";
// БЛОК ПРЕИМУЩЕСТВ БЬЮТИ-КОНСЬЕРЖА (страница «Бьюти-консьерж») — та же вёрстка,
// что у блока форматов на «Сотрудничестве»: слева большое фото, справа сетка 2×2
// карточек. Тексты — о плюсах выездного бьюти-сервиса ÁLIS. Двуязычно.
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Format = { title: Loc; desc: Loc; icon: ReactNode };

const PHOTO = "/assets/tild6230-643__.jpg"; // фото — заменить на съёмку выезда

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconEvents = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#46131E]/70 transition-colors duration-300 group-hover:text-[#f4efe6]">
    <circle cx="24" cy="21" r="13" {...stroke} />
    <path d="M24 15v12M18 21h12" {...stroke} />
    <path d="M14 40c3-3 6-3 10-3s7 0 10 3" {...stroke} opacity="0.7" />
  </svg>
);
const IconVenues = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#46131E]/70 transition-colors duration-300 group-hover:text-[#f4efe6]">
    <circle cx="24" cy="21" r="13" {...stroke} />
    <path d="M24 15c3 0 5.5 2.4 5.5 5.5C29.5 24.5 24 29 24 29s-5.5-4.5-5.5-8.5C18.5 17.4 21 15 24 15Z" {...stroke} />
    <circle cx="24" cy="20.5" r="1.8" {...stroke} />
  </svg>
);
const IconBloggers = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#46131E]/70 transition-colors duration-300 group-hover:text-[#f4efe6]">
    <circle cx="24" cy="21" r="13" {...stroke} />
    <path d="M24 27.5c-3-2.4-6-4.6-6-7.6a3.3 3.3 0 0 1 6-1.9 3.3 3.3 0 0 1 6 1.9c0 3-3 5.2-6 7.6Z" {...stroke} />
    <path d="M15 39c3-2 6-2 9-2s6 0 9 2" {...stroke} opacity="0.7" />
  </svg>
);
const IconBrands = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#46131E]/70 transition-colors duration-300 group-hover:text-[#f4efe6]">
    <circle cx="24" cy="21" r="13" {...stroke} />
    <path d="M24 14c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9Z" {...stroke} />
    <path d="M15 39h18" {...stroke} opacity="0.7" />
  </svg>
);

const FORMATS: Format[] = [
  {
    icon: IconEvents,
    title: { ru: "Бьюти-команда приезжает к вам", en: "The beauty team comes to you" },
    desc: {
      ru: "Волосы, макияж и ногти — в 4–6 рук на вашей площадке. Никуда не едете и ничего не организуете — просто открываете дверь.",
      en: "Hair, makeup and nails — in 4–6 hands at your place. No travel, no logistics — you just open the door.",
    },
  },
  {
    icon: IconVenues,
    title: { ru: "Готовы точно к сроку", en: "Ready right on time" },
    desc: {
      ru: "Работаем строго по таймингу события. К выходу, съёмке или свадьбе все собраны минута в минуту — без спешки и нервов.",
      en: "We work strictly to your event timing. For the exit, shoot or wedding — everyone ready to the minute, calm and unhurried.",
    },
  },
  {
    icon: IconBloggers,
    title: { ru: "Единый образ для всех", en: "One look for everyone" },
    desc: {
      ru: "Невеста, подруги, гости — в одном стиле и настроении. Образ собран целиком и смотрится красиво и вживую, и в кадре.",
      en: "Bride, friends, guests — one style and mood. The whole look comes together and reads beautifully in life and on camera.",
    },
  },
  {
    icon: IconBrands,
    title: { ru: "Салонный уровень на выезде", en: "Salon-level, on location" },
    desc: {
      ru: "Своё оборудование и профессиональная косметика. Дома, в отеле или на площадке — как в кресле у мастера, и −10% на первый выезд.",
      en: "Own equipment and professional cosmetics. At home, in a hotel or on set — like in the master's chair, and −10% on your first booking.",
    },
  },
];

export default function ConciergeBenefits() {
  const { lang } = useLang();

  return (
    <section className="bg-white section-y">
      <div className="mx-auto mb-12 w-[92%] max-w-[1280px] text-center lg:mb-16">
        <p className="text-[10px] lowercase tracking-[0.05em] text-[#46131E]">
          {lang === "en" ? "beauty concierge" : "бьюти-консьерж"}
        </p>
        <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#46131E] lg:text-[28px]">
          {lang === "en" ? "Why our beauty concierge" : "Чем хорош наш бьюти-консьерж"}
        </h2>
      </div>
      <div className="mx-auto grid w-[92%] max-w-[1280px] grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Слева — большое фото на всю высоту блока */}
        <div className="relative min-h-[300px] overflow-hidden rounded-[30px] lg:min-h-[560px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        {/* Справа — сетка 2×2 карточек с преимуществами */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-rows-2">
          {FORMATS.map((f) => (
            <article
              key={f.title.ru}
              className="group flex min-h-[240px] flex-col justify-between rounded-[30px] border border-[#46131E]/20 bg-white p-6 transition-colors duration-300 hover:border-transparent hover:bg-[#46131E] lg:min-h-0 lg:p-7"
            >
              <h3 className="max-w-[20ch] text-[14px] font-semibold leading-[1.25] text-[#444] transition-colors duration-300 group-hover:text-[#f4efe6] lg:text-[15px]">
                {f.title[lang]}
              </h3>
              <span aria-hidden className="my-3 block">{f.icon}</span>
              <p className="text-[12.5px] leading-[1.5] text-[#444]/75 transition-colors duration-300 group-hover:text-[#f4efe6]/80 lg:text-[13px]">
                {f.desc[lang]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
