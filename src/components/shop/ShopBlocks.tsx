"use client";
// БЛОКИ СТРАНИЦЫ «МАГАЗИН» по референсу revatiwear.ru (кроме блока категорий).
// Размеры сняты с референса при ширине 1440 и пересчитаны в vw:
//  • ShopHero — фото на весь экран, крупный логотип по центру (620px ≈ 43vw), подпись 16px;
//  • ShopStatement — маленькое фото 125×166 и текст 13/17px шириной 378px;
//  • ProductCarousel — «Новые поступления»: лента карточек 355×532 (≈24.7vw, 2:3)
//    от края до края с зазором 2px, название 14px слева и цена 13px справа,
//    ссылка «Перейти в раздел» 12px с подчёркиванием;
//  • ProductChoice — «Выбор покупателей»: две большие карточки 705×938 (половина
//    экрана) и ряд из четырёх 352×528.
// Отступ между блоками на референсе — 178px (≈12.4vw) → SHOP_GAP. Двуязычно.
import { useEffect, useRef } from "react";
import Link from "next/link";
import { LogoWord } from "@/components/Logo";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice, type Product } from "@/lib/products";

type Loc = { ru: string; en: string };

// Отступ сверху у каждого блока (как пустые «спейсеры» референса); снизу — только у последнего
export const SHOP_GAP = "pt-[clamp(72px,12.4vw,178px)]";

/* ---------- Обложка ---------- */
export function ShopHero({ photo, caption }: { photo: string; caption: Loc }) {
  const { lang } = useLang();
  return (
    <section className="relative isolate flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#3a3631] px-6 text-center text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgba(20,18,16,.35) 0%, rgba(20,18,16,0) 25%), rgba(20,18,16,.12)" }}
      />
      <LogoWord variant="cream" className="h-auto w-[72vw] max-w-[760px] sm:w-[56vw] lg:w-[43vw]" />
      <p className="mt-7 text-[14px] leading-[1.3] text-white lg:text-[16px]">{caption[lang]}</p>
    </section>
  );
}

/* ---------- Маленькое фото + текст ---------- */
export function ShopStatement({ photo, text }: { photo: string; text: Loc }) {
  const { lang } = useLang();
  return (
    <section className={`bg-white px-4 text-center ${SHOP_GAP}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" loading="lazy" className="r-reveal mx-auto aspect-[125/166] w-[110px] object-cover lg:w-[125px]" />
      <p className="r-reveal mx-auto mt-[18px] max-w-[378px] text-[13px] leading-[17px] text-[#242424]">{text[lang]}</p>
    </section>
  );
}

/* ---------- Карточка товара ---------- */
function Card({ p, className = "", ratio = "aspect-[2/3]" }: { p: Product; className?: string; ratio?: string }) {
  const { lang } = useLang();
  return (
    <Link href={`/product/${p.id}`} draggable={false} className={`group block ${className}`}>
      <div className={`overflow-hidden rounded-[12px] bg-[#f2f1ee] ${ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt=""
          draggable={false}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-2.5 pb-1 pt-[7px] text-[#242424]">
        <span className="truncate text-[13px] lg:text-[14px]">{p.name[lang]}</span>
        <span className="shrink-0 whitespace-nowrap text-[12px] lg:text-[13px]">{fmtPrice(p.price, lang === "en")}</span>
      </div>
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-center text-[13px] uppercase tracking-[0.02em] text-[#242424] lg:mb-6">{children}</h2>;
}

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 text-center lg:mt-7">
      <a href={href} className="text-[12px] text-[#242424] underline decoration-1 underline-offset-[5px] transition-opacity hover:opacity-60">
        {children}
      </a>
    </div>
  );
}

/* ---------- «Новые поступления»: бесконечная лента с перетаскиванием ---------- */
export function ProductCarousel({ title, linkHref }: { title: Loc; linkHref: string }) {
  const { lang } = useLang();
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  // Медленная автопрокрутка; лента задублирована для бесшовного цикла
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    const step = () => {
      const half = el.scrollWidth / 2 || 1;
      if (!drag.current.active) el.scrollLeft += 0.5;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
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
    if (Math.abs(dx) > 4) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.active = false;
    try { scroller.current?.releasePointerCapture(e.pointerId); } catch {}
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };

  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-[2px] pr-[2px]">
      {PRODUCTS.map((p) => (
        <li key={p.id} className="w-[62vw] shrink-0 sm:w-[40vw] lg:w-[24.65vw]">
          <Card p={p} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className={`overflow-hidden bg-white ${SHOP_GAP}`}>
      <SectionTitle>{title[lang]}</SectionTitle>
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={onClickCapture}
        className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden px-[6px] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {track(false)}
        {track(true)}
      </div>
      <SectionLink href={linkHref}>{lang === "en" ? "Go to section" : "Перейти в раздел"}</SectionLink>
    </section>
  );
}

/* ---------- «Выбор покупателей»: 2 большие + 4 маленькие ---------- */
export function ProductChoice({ id, title }: { id?: string; title: Loc }) {
  const { lang } = useLang();
  const big = PRODUCTS.slice(0, 2);
  const small = PRODUCTS.slice(2, 6);
  return (
    <section id={id} className={`scroll-mt-20 bg-white pb-[clamp(72px,12.4vw,178px)] ${SHOP_GAP}`}>
      <SectionTitle>{title[lang]}</SectionTitle>
      <div className="px-[6px]">
        <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
          {big.map((p) => (
            <Card key={p.id} p={p} ratio="aspect-square" />
          ))}
        </div>
        <div className="mt-[2px] grid grid-cols-2 gap-[2px] lg:grid-cols-4">
          {small.map((p) => (
            <Card key={p.id} p={p} ratio="aspect-[3/4]" />
          ))}
        </div>
      </div>
    </section>
  );
}
