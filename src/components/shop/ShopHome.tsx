"use client";
// СТРАНИЦА «МАГАЗИН» — структура и анимации по референсу aurorebrand.com (Made on Tilda),
// оформление — в стиле ÁLIS BEAUTY: наши ширины (96% / 1760px), ритм .section-y,
// скругления 12px, заголовки обычным регистром, бордовые кнопки, ч/б.
// Блоки: «Новинки» и «Все товары» — самолистающиеся ленты с полосой прогресса (как галерея
// салона), категории (мозаика), баннер коллекции, о бренде
// (фото с бегущей строкой логотипов ÁLIS BEAUTY).
// Тексты — только уже согласованные. Фото — временные.
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { PRODUCTS, fmtPrice, type Product } from "@/lib/products";
import PhotoBanner from "@/components/pages/PhotoBanner";

type Loc = { ru: string; en: string };

/* ---------- Шапка блока: заголовок слева, ссылка справа ---------- */

/* ---------- Карточка товара: фото, избранное, название и цена ---------- */
function Card({ p, ratio = "aspect-[3/4]" }: { p: Product; ratio?: string }) {
  const { lang } = useLang();
  const s = useShop();
  const fav = s.isFav(p.id);
  return (
    <div className="group relative">
      <Link href={`/product/${p.id}`} draggable={false} className="block overflow-hidden rounded-[12px] bg-[#f2f1ee]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={p.name[lang]}
          draggable={false}
          loading="lazy"
          className={`${ratio} w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]`}
        />
      </Link>
      <button
        type="button"
        onClick={() => s.toggleFav(p.id)}
        aria-label={lang === "en" ? "Favourite" : "В избранное"}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-colors ${fav ? "text-[#46131E]" : "text-[#17191a]"}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="flex items-baseline justify-between gap-3 px-1 pt-3 text-[#242424]">
        <Link href={`/product/${p.id}`} className="truncate text-[14px] lg:text-[15px]">{p.name[lang]}</Link>
        <span className="shrink-0 whitespace-nowrap text-[13px] text-[#17191a]/60 lg:text-[14px]">{fmtPrice(p.price, lang === "en")}</span>
      </div>
    </div>
  );
}

/* ---------- Лента товаров, как галерея на странице салона: сама листается,
   бесшовная петля, перетаскивание мышью/пальцем, полоса прогресса под карточками ---------- */
function ProductMarquee({ items, id }: { items: Product[]; id?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    const step = () => {
      const half = el.scrollWidth / 2 || 1; // две одинаковые дорожки — для бесшовности
      if (!drag.current.active) el.scrollLeft += 0.7;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
      if (barRef.current) barRef.current.style.width = (Math.min(1, Math.max(0, el.scrollLeft / half)) * 100).toFixed(2) + "%";
      raf = requestAnimationFrame(step);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "200px" });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4 && !drag.current.moved) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.active = false;
    try { scroller.current?.releasePointerCapture(e.pointerId); } catch {}
  };
  // После перетаскивания гасим клик, чтобы не открылась карточка
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };

  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0">
      {items.map((p) => (
        <li key={p.id} className="mr-3 w-[62vw] shrink-0 sm:w-[40vw] lg:mr-4 lg:w-[22vw] lg:max-w-[400px]">
          <Card p={p} />
        </li>
      ))}
    </ul>
  );

  return (
    <section id={id} className="scroll-mt-24 overflow-hidden bg-white section-y">
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={onClickCapture}
        className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden pl-[2%] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {track(false)}
        {track(true)}
      </div>
      {/* Полоса прогресса под карточками — как в галерее на странице салона */}
      <div className="mx-auto mt-10 h-[3px] w-[96%] max-w-[1760px] overflow-hidden rounded-full bg-[#C2C0B6]/40">
        <div ref={barRef} className="h-full rounded-full bg-[#17191a]" style={{ width: "0%" }} />
      </div>
    </section>
  );
}

/* ---------- 1. «Новинки» — лента товаров ---------- */
export function ShopNew() {
  return (
    <ProductMarquee
      items={PRODUCTS}
    />
  );
}

/* ---------- 2. Категории: мозаика — большая слева, 2×2 справа ---------- */
const CATS: { tag: string; label: Loc; img: string }[] = [
  { tag: "одежда", label: { ru: "Одежда", en: "Apparel" }, img: "/assets/tild6530-383_-2___1_.jpg" },
  { tag: "аксессуары", label: { ru: "Аксессуары", en: "Accessories" }, img: "/assets/tild6230-643__.jpg" },
  { tag: "дом", label: { ru: "Для дома", en: "Home" }, img: "/assets/tild3561-646_-2___1__5.jpg" },
  { tag: "уход", label: { ru: "Уход", en: "Care" }, img: "/assets/tild6536-613_-2___1__4.jpg" },
  { tag: "подарок", label: { ru: "Подарочный сертификат", en: "Gift certificate" }, img: "/assets/alis/img_1855.jpg" },
];

export function ShopCategories() {
  const { lang } = useLang();
  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-2 gap-3 lg:h-[560px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
        {CATS.map((c, i) => {
          const gift = c.tag === "подарок";
          return (
            <a
              key={c.tag}
              href={gift ? "https://o8981.yclients.ru/certificates" : "#all"}
              {...(gift ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`r-reveal group relative overflow-hidden rounded-[12px] bg-[#f2f1ee] ${i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:row-span-2 lg:aspect-auto" : "aspect-[3/4] lg:aspect-auto"} ${i === 4 ? "col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-auto" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.label[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-out group-hover:scale-105 group-hover:blur-lg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent transition-colors duration-500 group-hover:from-black/55 group-hover:via-black/25 group-hover:to-black/30" />
              <div className="absolute inset-x-5 top-5 flex items-start justify-between text-white lg:inset-x-6 lg:top-6">
                <span className="text-[16px] lg:text-[18px]">{c.label[lang]}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition-all duration-500 group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-[#17191a]">→</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- 3. Все товары — лента товаров (в обратном порядке, чтобы не повторять «Новинки») ---------- */
export function ShopAll() {
  return <ProductMarquee id="all" items={[...PRODUCTS].reverse()} />;
}

/* ---------- 4. Баннер «подарочный сертификат» — общий фото-баннер ---------- */
export function ShopCollection() {
  return (
    <PhotoBanner
      photo="/assets/alis/img_2746.jpg"
      label={{ ru: "Подарочный сертификат", en: "Gift certificate" }}
      title={{ ru: "Немного ÁLIS BEAUTY — с собой", en: "A little ÁLIS BEAUTY to take home" }}
      button={{ label: { ru: "Купить сертификат", en: "Buy a certificate" }, href: "https://o8981.yclients.ru/certificates" }}
    />
  );
}

