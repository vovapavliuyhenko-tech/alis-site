"use client";
// БЛОК 1 (страница «Сотрудничество») — по мотивам блока преимуществ реф-сайта:
// слева большое фото на всю высоту, справа сетка 2×2 карточек. Каждая карточка —
// высокая, контент разнесён: заголовок сверху, тонкая линейная иконка в центре,
// описание снизу. Здесь в карточках — варианты сотрудничества. Двуязычно.
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Format = { title: Loc; desc: Loc; icon: ReactNode };

const PHOTO = "/assets/tild6230-643__.jpg"; // плейсхолдер — заменить на съёмку

// Тонкие линейные иконки (пунктирный круг + мотив) в стиле реф-сайта.
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconEvents = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#46131E]/70 transition-colors duration-300 group-hover:text-[#f4efe6]">
    <circle cx="24" cy="21" r="13" {...stroke} />
    <path d="M24 15v12M18 21h12" {...stroke} />
    <path d="M14 40c3-3 6-3 10-3s7 0 10 3" {...stroke} opacity="0.7" />
  </svg>
);
const IconBrands = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#46131E]/70 transition-colors duration-300 group-hover:text-[#f4efe6]">
    <circle cx="24" cy="21" r="13" {...stroke} />
    <path d="M24 14c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9Z" {...stroke} />
    <path d="M15 39h18" {...stroke} opacity="0.7" />
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

const FORMATS: Format[] = [
  {
    icon: IconBrands,
    title: { ru: "Аудитория, что платит за красоту", en: "An audience that pays for beauty" },
    desc: {
      ru: "Ваш продукт видят гости и мастера, которые уже покупают уход и услуги. Живой контакт вместо холодной рекламы.",
      en: "Your product reaches guests and masters who already buy care and services. Real contact instead of cold ads.",
    },
  },
  {
    icon: IconEvents,
    title: { ru: "Бьюти-блок под ключ", en: "The beauty block, turnkey" },
    desc: {
      ru: "Отель, ресторан, event-агентство? Берём красоту гостей на себя. Вы отвечаете за событие — мы за то, как все выглядят.",
      en: "Hotel, restaurant, event agency? We take the guests' beauty on ourselves. You own the event — we own how everyone looks.",
    },
  },
  {
    icon: IconBloggers,
    title: { ru: "Партнёрство в долгую", en: "A long-term partnership" },
    desc: {
      ru: "Работаем с теми, кто разделяет наши ценности. Реальный сервис, а не разовый бартер. Растём вместе, а не ставим галочку.",
      en: "We work with those who share our values. Real service, not a one-off barter. We grow together, not tick a box.",
    },
  },
  {
    icon: IconVenues,
    title: { ru: "Контент и репутация", en: "Content and reputation" },
    desc: {
      ru: "Совместные съёмки, честные отзывы, спецпредложения для вашей аудитории. Вы — в контенте, мы — в доверии гостей.",
      en: "Joint shoots, honest reviews, special offers for your audience. You gain content, we gain the guests' trust.",
    },
  },
];

export default function CooperationFormats() {
  const { lang } = useLang();

  return (
    <section className="bg-white section-y">
      <div className="r-reveal mx-auto mb-12 w-[92%] max-w-[1280px] text-center lg:mb-16">
        <p className="text-[10px] lowercase tracking-[0.05em] text-[#46131E]">
          {lang === "en" ? "for partners" : "партнёрам"}
        </p>
        <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#46131E] lg:text-[28px]">
          {lang === "en" ? "Why partner with ÁLIS" : "Плюсы сотрудничества с ÁLIS"}
        </h2>
      </div>
      <div className="mx-auto grid w-[92%] max-w-[1280px] grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Слева — большое фото на всю высоту блока */}
        <div className="relative min-h-[300px] overflow-hidden rounded-[30px] lg:min-h-[560px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" loading="eager" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        {/* Справа — сетка 2×2 карточек с вариантами сотрудничества */}
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
