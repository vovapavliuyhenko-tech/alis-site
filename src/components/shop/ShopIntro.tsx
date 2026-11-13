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

// ДВЕ ФОТО-ПЛАШКИ под категориями (как баннеры на главной — фото с закруглением и кнопкой):
// «Подобрать уход за 30 секунд» — раскрывает опросник (HairQuiz) прямо под плашками;
// «Соберите подарочный бокс» — ведёт к конструктору бокса ниже (#box). Тексты — на согласование.
export function ShopPromos() {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const btn = "inline-flex items-center justify-center rounded-xl border border-white bg-white px-7 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-300 hover:bg-white/[0.18] hover:text-white sm:px-9 sm:py-3.5 sm:text-[12px] sm:tracking-[0.18em] lg:py-4 lg:text-[13px]";
  const cards = [
    {
      img: "/assets/alis/img_5910.webp",
      pos: "object-[50%_55%]",
      eyebrow: en ? "30 seconds" : "30 секунд",
      title: en ? "Find your hair care" : "Подберём уход для ваших волос",
      text: en ? "Answer 5 questions — a specialist will send products for your hair type and goals." : "Ответьте на 5 вопросов — специалист пришлёт подбор средств под ваш тип и цели.",
      cta: en ? (open ? "Hide" : "Find my care") : (open ? "Свернуть" : "Подобрать уход"),
      onClick: () => {
        setOpen((v) => !v);
        if (!open) setTimeout(() => document.getElementById("hair")?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
      },
    },
    {
      img: "/assets/alis/img_6048.jpg",
      pos: "object-center",
      eyebrow: en ? "Gift" : "Подарок",
      title: en ? "Build a gift box" : "Соберите подарочный бокс",
      text: en ? "Pick the size, colour and contents — a manager will get back to you within 15 minutes." : "Выберите размер, цвет и наполнение — менеджер свяжется с вами за 15 минут.",
      cta: en ? "Build a box" : "Собрать бокс",
      href: "#box",
    },
  ];
  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] gap-3 lg:grid-cols-2 lg:gap-4">
        {cards.map((c) => (
          <div key={c.title} className="r-reveal group relative flex h-[380px] items-end overflow-hidden rounded-[22px] sm:h-[440px] sm:rounded-[28px] lg:h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${c.pos} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]`} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="relative w-full p-6 text-white sm:p-9 lg:p-11">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-[11px]">{c.eyebrow}</span>
              <h2 className="mt-2 font-serif-display !text-[22px] font-normal uppercase leading-[1.15] tracking-[0.02em] text-white sm:!text-[26px] lg:!text-[32px]">{c.title}</h2>
              <p className="mt-2 max-w-[42ch] !text-[12.5px] leading-[1.55] text-white/80 sm:!text-[14px]">{c.text}</p>
              <div className="mt-5 sm:mt-6">
                {c.href ? (
                  <a href={c.href} className={btn}>{c.cta}</a>
                ) : (
                  <button type="button" onClick={c.onClick} aria-expanded={open} className={btn}>{c.cta}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Опросник по уходу — раскрывается под плашками */}
      <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">{open && <HairQuiz />}</div>
      </div>
    </section>
  );
}
