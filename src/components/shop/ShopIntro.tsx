"use client";
// МАГАЗИН — первый блок: скруглённый фото-баннер от самого верха (шапка лежит поверх фото),
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
    <section className="bg-white pt-2 sm:pt-3">
      <div className="relative mx-auto flex h-[460px] w-[96%] max-w-[1760px] items-end overflow-hidden rounded-[22px] sm:h-[560px] sm:rounded-[28px] lg:h-[min(80svh,720px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BANNER_PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="relative flex w-full flex-col items-center px-5 pb-6 sm:px-10 sm:pb-8 lg:pb-10">
        <h1 className="w-full text-center font-serif-display text-[clamp(16px,4.4vw,20px)] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,.3)] sm:text-[24px] lg:text-[30px]">
          {lang === "en"
            ? <>The products ÁLIS BEAUTY specialists work with,<br />plus merch and accessories</>
            : <>Средства, которыми работают специалисты ÁLIS BEAUTY,<br />а также мерч и аксессуары</>}
        </h1>
        <a
          href="#categories"
          className="mt-7 flex w-full items-center justify-center whitespace-nowrap rounded-xl border border-white/70 bg-transparent px-1.5 py-3 text-center text-[9px] font-medium uppercase tracking-[0.02em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a] sm:mt-9 sm:py-3.5 sm:text-[13px] sm:tracking-[0.18em] lg:py-4 lg:text-[14px]"
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

// ПОД КАТЕГОРИЯМИ — как баннер «Выездной сервис» на главной: заголовок по центру над фото,
// невысокое скруглённое фото, внизу кнопка во всю ширину «Подобрать уход для волос за 30 секунд
// с консультантом» — раскрывает опросник HairQuiz (заявка уходит в бот команды).
export function ShopPromos() {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const base = "flex w-full items-center justify-center rounded-xl border px-2 py-3 text-center text-[9px] font-medium uppercase leading-tight tracking-[0.02em] backdrop-blur-md transition-colors duration-300 sm:py-3.5 sm:text-[12px] sm:tracking-[0.14em] lg:py-4 lg:text-[13px]";
  return (
    <section className="bg-white section-y">
      <div className="r-reveal mx-auto w-[92%] max-w-[720px] text-center">
        <h2 className="text-[#17191a]">{en ? "Hair care chosen for you" : "Подберём уход для ваших волос"}</h2>
        <p className="mx-auto mt-3 max-w-[640px] !text-[12.5px] leading-[1.5] text-[#17191a]/70 sm:!text-[15px]">
          {en ? "Answer 5 questions — a specialist will send products for your hair type and goals." : "Ответьте на 5 вопросов — специалист пришлёт подбор средств под ваш тип и цели."}
        </p>
      </div>
      <div className="relative mx-auto mt-8 flex h-[360px] w-[96%] max-w-[1760px] items-end overflow-hidden rounded-[22px] sm:h-[440px] sm:rounded-[28px] lg:mt-12 lg:h-[540px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/alis/work_hair_waves.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="relative w-full p-4 sm:p-5 lg:p-6">
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              if (!open) setTimeout(() => document.getElementById("hair")?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
            }}
            aria-expanded={open}
            className={`${base} border-white bg-white text-[#17191a] hover:bg-white/[0.18] hover:text-white`}
          >
            {en ? "Find hair care in 30 seconds with a consultant" : "Подобрать уход для волос за 30 секунд с консультантом"}
          </button>
        </div>
      </div>
      {/* Опросник по уходу — раскрывается под баннером */}
      <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">{open && <HairQuiz />}</div>
      </div>
    </section>
  );
}
