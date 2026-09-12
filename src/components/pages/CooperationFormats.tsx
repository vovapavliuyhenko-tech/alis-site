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
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#6E7248]/70">
    <circle cx="24" cy="21" r="13" {...stroke} strokeDasharray="3 3.4" />
    <path d="M24 15v12M18 21h12" {...stroke} />
    <path d="M14 40c3-3 6-3 10-3s7 0 10 3" {...stroke} opacity="0.7" />
  </svg>
);
const IconBrands = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#6E7248]/70">
    <circle cx="24" cy="21" r="13" {...stroke} strokeDasharray="3 3.4" />
    <path d="M24 14c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9Z" {...stroke} />
    <path d="M15 39h18" {...stroke} opacity="0.7" />
  </svg>
);
const IconVenues = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#6E7248]/70">
    <circle cx="24" cy="21" r="13" {...stroke} strokeDasharray="3 3.4" />
    <path d="M24 15c3 0 5.5 2.4 5.5 5.5C29.5 24.5 24 29 24 29s-5.5-4.5-5.5-8.5C18.5 17.4 21 15 24 15Z" {...stroke} />
    <circle cx="24" cy="20.5" r="1.8" {...stroke} />
  </svg>
);
const IconBloggers = (
  <svg viewBox="0 0 48 48" className="h-11 w-11 text-[#6E7248]/70">
    <circle cx="24" cy="21" r="13" {...stroke} strokeDasharray="3 3.4" />
    <path d="M24 27.5c-3-2.4-6-4.6-6-7.6a3.3 3.3 0 0 1 6-1.9 3.3 3.3 0 0 1 6 1.9c0 3-3 5.2-6 7.6Z" {...stroke} />
    <path d="M15 39c3-2 6-2 9-2s6 0 9 2" {...stroke} opacity="0.7" />
  </svg>
);

const FORMATS: Format[] = [
  {
    icon: IconEvents,
    title: { ru: "Соберём бьюти-команду на ваше мероприятие", en: "We'll bring a beauty team to your event" },
    desc: {
      ru: "Мастера по волосам, макияжу и ногтям работают прямо на площадке — гости и модели всегда собраны и готовы к кадру.",
      en: "Hair, makeup and nail masters work right on site — guests and models always put together and camera-ready.",
    },
  },
  {
    icon: IconBrands,
    title: { ru: "Покажем ваш бренд гостям салона", en: "We'll show your brand to our guests" },
    desc: {
      ru: "Работаем на профессиональной косметике и открыты к совместным проектам: тесты продукции, контент и спецпредложения.",
      en: "We work on professional cosmetics and welcome joint projects: product tests, content and special offers.",
    },
  },
  {
    icon: IconVenues,
    title: { ru: "Возьмём бьюти-часть мероприятия под ключ", en: "We'll handle the beauty side turnkey" },
    desc: {
      ru: "Отели, рестораны и event-агентства — берём на себя весь бьюти-блок под ваш формат и тайминг, без забот с вашей стороны.",
      en: "Hotels, restaurants and event agencies — we take on the whole beauty block, matched to your format and timing.",
    },
  },
  {
    icon: IconBloggers,
    title: { ru: "Растём вместе в долгую", en: "We grow together, for the long run" },
    desc: {
      ru: "Долгосрочные коллаборации с теми, кто разделяет наши ценности. Честный обмен и реальный сервис, а не разовый бартер.",
      en: "Long-term collaborations with people who share our values. A fair exchange and real service, not a one-off barter.",
    },
  },
];

export default function CooperationFormats() {
  const { lang } = useLang();

  return (
    <section className="bg-white px-3 pt-[76px] pb-6 sm:px-4 lg:pt-[88px] lg:pb-8">
      <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Слева — большое фото на всю высоту блока */}
        <div className="relative min-h-[320px] overflow-hidden rounded-[30px] lg:min-h-[680px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" loading="eager" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        {/* Справа — сетка 2×2 карточек с вариантами сотрудничества */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-rows-2">
          {FORMATS.map((f) => (
            <article
              key={f.title.ru}
              className="flex min-h-[300px] flex-col justify-between rounded-[30px] bg-[#EAEAE4] p-7 lg:min-h-0 lg:p-9"
            >
              <h3 className="max-w-[18ch] text-[18px] font-semibold leading-[1.2] text-[#444] lg:text-[20px]">
                {f.title[lang]}
              </h3>
              <span aria-hidden className="my-6 block">{f.icon}</span>
              <p className="text-[14px] leading-relaxed text-[#444]/75 lg:text-[15px]">
                {f.desc[lang]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
