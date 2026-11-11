"use client";
// МАГАЗИН — начало страницы по видео заказчицы: вместо обложки на весь экран — узкая плашка-баннер
// с фото (временное; Зера пришлёт фото с баночками) и заголовком, без кнопки.
// HairCta — маленькая плашка «Подобрать уход для волос за 30 секунд с консультантом»: по нажатию
// раскрывается короткий опросник (HairQuiz), заявка уходит администратору/мастеру.
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { HairQuiz } from "@/components/shop/ShopBlocks";

const BANNER_PHOTO = "/assets/alis/salon_cup_flatlay.jpg";

export function ShopBanner() {
  const { lang } = useLang();
  return (
    <section className="bg-white pt-[96px] min-[1280px]:pt-[110px]">
      <div className="relative mx-auto flex h-[300px] w-[96%] max-w-[1760px] items-end overflow-hidden rounded-[22px] sm:h-[460px] sm:rounded-[28px] lg:h-[580px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BANNER_PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="relative flex w-full flex-col items-center px-5 pb-6 sm:px-10 sm:pb-8 lg:pb-10">
        <h1 className="w-full text-center font-serif-display text-[clamp(16px,4.4vw,20px)] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,.3)] sm:text-[24px] lg:text-[30px]">
          {lang === "en"
            ? "The products ÁLIS BEAUTY specialists work with, plus merch and accessories"
            : "Средства, которыми работают специалисты ÁLIS BEAUTY, а также мерч и аксессуары"}
        </h1>
        <a
          href="#categories"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-white px-7 py-4 text-[11px] sm:py-5 uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-500 hover:bg-[#17191a] hover:text-white sm:mt-6 sm:text-[12px]"
        >
          {lang === "en" ? "View catalogue" : "Смотреть каталог"}
        </a>
        </div>
      </div>
    </section>
  );
}

export function HairCta() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-4 rounded-[14px] border border-[#17191a]/12 px-5 py-4 text-left text-[11px] uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-500 hover:border-[#17191a] hover:bg-[#17191a] hover:text-white sm:px-7 sm:py-5 sm:text-[12px]"
        >
          <span>{lang === "en" ? "Find your hair care in 30 seconds with a consultant" : "Подобрать уход для волос за 30 секунд с консультантом"}</span>
          <span aria-hidden className={`text-[16px] transition-transform duration-500 ${open ? "rotate-45" : "group-hover:translate-x-1.5"}`}>{open ? "+" : "→"}</span>
        </button>
      </div>
      <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">{open && <HairQuiz />}</div>
      </div>
    </div>
  );
}
