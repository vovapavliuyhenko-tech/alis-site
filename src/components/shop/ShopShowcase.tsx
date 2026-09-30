"use client";
// Три блока магазина по образцу dogguo-shop.tilda.ws, в стиле сайта ÁLIS BEAUTY:
// 1) ShopStory — маленькое фото-слайдшоу по центру (смена кадра каждые 2 с) под заголовком;
//    при прокрутке фото «вырастает» из 50 % до полного размера (как sbs-анимация в Tilda).
// 2) ShopPick — «Выберите нужную категорию»: ряд из 6 светлых плиток с фото и подписью.
// 3) ShopTrend — «Узнайте о последних новинках»: большое фото с заголовком и кнопкой слева,
//    сетка 2×2 товаров справа; при наведении фото товара сменяется вторым кадром.
// Тексты — черновики на согласование с клиенткой, фото — временные.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice } from "@/lib/products";

type Loc = { ru: string; en: string };
const CERTS = "https://o8981.yclients.ru/certificates";

/* ---------- 1. Фото-история: слайдшоу + рост при прокрутке ---------- */
const STORY = [
  "/assets/alis/img_6048.jpg",
  "/assets/alis/img_3283.jpg",
  "/assets/alis/img_1834.jpg",
  "/assets/alis/img_8578.jpg",
  "/assets/alis/img_5910.webp",
];

export function ShopStory() {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const txt = useRef<HTMLDivElement>(null);

  // Кадры сменяются сами каждые 2 секунды, мягкой сменой прозрачности
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % STORY.length), 2000);
    return () => clearInterval(id);
  }, []);

  // Рост при прокрутке: блок входит снизу — фото 50 % и ниже на 50px; за 400px прокрутки — 100 %
  useEffect(() => {
    const el = box.current;
    const tx = txt.current;
    if (!el || !tx || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const top = el.parentElement!.getBoundingClientRect().top;
      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const tfOf = (p: number) => `translate3d(0, ${(1 - p) * 50}px, 0) scale(${0.5 + p * 0.5})`;
      // Фото: полный размер за первые 400px прокрутки
      const p = clamp((window.innerHeight - top) / 400);
      el.style.setProperty("transform", tfOf(p));
      // Текст — тот же эффект, но с запаздыванием: фото уже встало, а текст ещё растёт
      // и встаёт на место примерно через 250px после фото (как на dogguo-shop.tilda.ws)
      const pt = clamp((window.innerHeight - top - 250) / 400);
      tx.style.setProperty("transform", tfOf(pt));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-white section-y">
      <div className="mx-auto flex w-[92%] max-w-[560px] flex-col items-center text-center">
        <div ref={box} className="relative aspect-[3/4] w-[180px] origin-bottom overflow-hidden rounded-[8px] bg-[#f2f1ee] will-change-transform lg:w-[220px]">
          {STORY.map((src, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={k === i ? (lang === "en" ? "ÁLIS BEAUTY merch" : "Мерч ÁLIS BEAUTY") : ""}
              aria-hidden={k !== i}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        {/* Текст — мелко и минималистично, растёт при прокрутке вместе с фото */}
        <div ref={txt} className="mt-10 flex origin-top flex-col items-center will-change-transform">
          <h2 className="!text-[16px] !font-normal uppercase tracking-[0.04em] text-[#17191a] lg:!text-[20px]">
            {lang === "en" ? "Things that carry the salon’s mood." : "Вещи, в которых живёт атмосфера салона."}
          </h2>
          <p className="mt-3 max-w-[380px] !text-[12.5px] !font-normal leading-[1.6] text-[#17191a]/80 lg:!text-[13px]">
            {lang === "en"
              ? "Hoodies, tees, accessories and care — take a little ÁLIS BEAUTY home or give it to someone close. Take a look!"
              : "Худи, футболки, аксессуары и уход — заберите немного ÁLIS BEAUTY с собой или подарите близким. Смотрите сами!"}
          </p>
          <span aria-hidden className="mt-8 text-[16px] font-light text-[#17191a]/40">+</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Выберите нужную категорию ---------- */
const PICK: { label: Loc; img: string; href: string }[] = [
  { label: { ru: "Все категории", en: "All categories" }, img: "/assets/tild3561-646_-2___1__5.jpg", href: "/shop/catalog" },
  { label: { ru: "Одежда", en: "Apparel" }, img: "/assets/alis/img_1834.jpg", href: "/shop/catalog?cat=%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0" },
  { label: { ru: "Аксессуары", en: "Accessories" }, img: "/assets/alis/img_6048.jpg", href: "/shop/catalog?cat=%D0%B0%D0%BA%D1%81%D0%B5%D1%81%D1%81%D1%83%D0%B0%D1%80%D1%8B" },
  { label: { ru: "Уход", en: "Care" }, img: "/assets/alis/img_5910.webp", href: "/shop/catalog?cat=%D1%83%D1%85%D0%BE%D0%B4" },
  { label: { ru: "Новинки", en: "New in" }, img: "/assets/alis/img_8578.jpg", href: "/shop/catalog?cat=new" },
  { label: { ru: "Сертификаты", en: "Certificates" }, img: "/assets/alis/img_1855.jpg", href: CERTS },
];

export function ShopPick() {
  const { lang } = useLang();
  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="mb-8 !text-[16px] uppercase tracking-[0.06em] text-[#17191a] lg:mb-10 lg:!text-[18px]">
          {lang === "en" ? "Choose a category" : "Выберите нужную категорию"}
        </h2>
        {/* На телефоне — лента с прокруткой пальцем, на компьютере — ряд из 6 */}
        <div className="-mx-[2%] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[2%] pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {PICK.map((c) => {
            const ext = c.href.startsWith("http");
            return (
              <a
                key={c.label.ru}
                href={c.href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex w-[42%] shrink-0 snap-start flex-col items-center rounded-[8px] bg-[#f6f4f1] px-4 pb-6 pt-8 sm:w-[30%] lg:w-auto"
              >
                <div className="aspect-square w-[78%] overflow-hidden rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.label[lang]}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                </div>
                <span className="mt-6 text-center text-[12px] uppercase tracking-[0.08em] text-[#17191a] transition-colors group-hover:text-[#46131E] lg:text-[13px]">
                  {c.label[lang]}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Узнайте о последних новинках ---------- */
// Второй кадр для смены фото при наведении (временные)
export const ALT_PHOTO: Record<string, string> = {
  hoodie: "/assets/alis/img_1834.jpg",
  tshirt: "/assets/alis/img_1855.jpg",
  shopper: "/assets/alis/img_6048.jpg",
  candle: "/assets/alis/img_0521.jpg",
  mug: "/assets/alis/img_0569.jpg",
  careset: "/assets/alis/img_5910.webp",
};
export const NEW_IDS = new Set(["hoodie", "careset"]);

export function ShopTrend() {
  const { lang } = useLang();
  const items = PRODUCTS.slice(0, 4);
  return (
    <section id="all" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {/* Шапка блока: заголовок слева, «+» над товарами, «смотреть все» справа */}
        <div className="mb-8 grid grid-cols-2 items-baseline lg:mb-10 lg:grid-cols-[1fr_1fr]">
          <h2 className="!text-[16px] uppercase tracking-[0.06em] text-[#17191a] lg:!text-[18px]">
            {lang === "en" ? "Discover what’s new" : "Узнайте о последних новинках"}
          </h2>
          <div className="flex items-baseline justify-end lg:justify-between">
            <span aria-hidden className="hidden text-[20px] font-light text-[#17191a]/40 lg:inline">+</span>
            <Link href="/shop/catalog" className="group inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.1em] text-[#17191a] transition-colors hover:text-[#46131E]">
              {lang === "en" ? "View all" : "Смотреть все"}
              <span className="inline-block transition-transform duration-300 group-hover:-rotate-45">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2">
          {/* Большое фото: заголовок с кнопкой прижаты к низу экрана и «едут» за прокруткой, пока видна карточка (sticky bottom, как на dogguo).
              overflow-clip, а не hidden — иначе sticky внутри не работает */}
          <div className="relative min-h-[520px] overflow-clip rounded-[8px] lg:min-h-[720px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/alis/img_6011.jpg" alt={lang === "en" ? "New ÁLIS BEAUTY collection" : "Новая коллекция ÁLIS BEAUTY"} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/45" />
            <div className="absolute inset-0 flex flex-col justify-end px-6 py-8 lg:px-10 lg:py-12">
              <div className="sticky bottom-8 text-white lg:bottom-12">
              <p className="max-w-[420px] font-serif-display text-[24px] uppercase leading-[1.15] tracking-[0.02em] lg:text-[32px]">
                {lang === "en" ? "New: the ÁLIS BEAUTY collection" : "Новинка: коллекция ÁLIS BEAUTY"}
              </p>
              <Link
                href="/shop/catalog?cat=new"
                className="alis-pulse group mt-6 inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/15 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#17191a]"
              >
                {lang === "en" ? "See new arrivals" : "Смотреть новинки"}
                <span className="inline-block transition-transform duration-300 group-hover:-rotate-45">→</span>
              </Link>
              </div>
            </div>
          </div>

          {/* Сетка 2×2 товаров: при наведении — второй кадр */}
          <div className="grid grid-cols-2 gap-2">
            {items.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="r-reveal group relative flex aspect-[296/355] flex-col overflow-hidden rounded-[8px] bg-[#f6f4f1]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ALT_PHOTO[p.id] || p.img} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                {NEW_IDS.has(p.id) && (
                  <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#46131E]">
                    New
                  </span>
                )}
                <div className="relative mt-auto flex translate-y-2 items-end justify-between gap-2 bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-10 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 lg:px-4 lg:pb-4">
                  <span className="text-[11px] uppercase leading-[1.3] tracking-[0.06em] lg:text-[12px]">{p.name[lang]}</span>
                  <span className="shrink-0 text-[11px] lg:text-[12px]">{fmtPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
