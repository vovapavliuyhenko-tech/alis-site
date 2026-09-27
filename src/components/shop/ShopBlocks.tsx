"use client";
// БЛОКИ СТРАНИЦЫ «МАГАЗИН» по референсу revatiwear.ru (кроме блока категорий).
// Размеры сняты с референса при ширине 1440 и пересчитаны в vw:
//  • ShopStatement — маленькое фото 125×166 и текст 13/17px шириной 378px;
//  • ProductCarousel — «Новые поступления»: лента карточек 355×532 (≈24.7vw, 2:3)
//    от края до края с зазором 2px, название 14px слева и цена 13px справа,
//    ссылка «Перейти в раздел» 12px с подчёркиванием;
//  • ProductChoice — «Выбор покупателей»: две большие карточки 705×938 (половина
//    экрана) и ряд из четырёх 352×528.
// Оформление приведено к стилю сайта: заголовки разделов, скругления 20px,
// поля 1400px, стандартные отступы между блоками. Двуязычно.
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice, type Product } from "@/lib/products";

type Loc = { ru: string; en: string };

// Отступ сверху у каждого блока (как пустые «спейсеры» референса); снизу — только у последнего
export const SHOP_GAP = "pt-14 lg:pt-24";

/* ---------- Маленькое фото + текст ---------- */
export function ShopStatement({ photo, text }: { photo: string; text: Loc }) {
  const { lang } = useLang();
  return (
    <section className={`bg-white px-4 text-center ${SHOP_GAP}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" loading="lazy" className="r-reveal mx-auto aspect-[125/166] w-[120px] rounded-[16px] object-cover lg:w-[150px]" />
      <p className="r-reveal mx-auto mt-6 max-w-[520px] font-serif-display text-[20px] font-normal uppercase leading-[1.25] tracking-[0.02em] text-[#17191a] lg:mt-8 lg:text-[26px]">{text[lang]}</p>
    </section>
  );
}

/* ---------- Карточка товара ---------- */
function Card({ p, className = "", ratio = "aspect-[2/3]" }: { p: Product; className?: string; ratio?: string }) {
  const { lang } = useLang();
  return (
    <Link href={`/product/${p.id}`} draggable={false} className={`group block ${className}`}>
      <div className={`overflow-hidden rounded-[20px] bg-[#f2f1ee] ${ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt=""
          draggable={false}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-1 pb-1 pt-4 text-[#17191a]">
        <span className="truncate font-serif-display text-[16px] lg:text-[18px]">{p.name[lang]}</span>
        <span className="shrink-0 whitespace-nowrap font-serif-display text-[14px] text-[#17191a]/55 lg:text-[16px]">{fmtPrice(p.price, lang === "en")}</span>
      </div>
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="r-reveal mb-10 text-center font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:mb-14 lg:text-[28px]">{children}</h2>;
}

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 text-center lg:mt-10">
      <a href={href} className="text-[12px] uppercase tracking-[0.16em] text-[#17191a] underline decoration-1 underline-offset-[6px] transition-opacity hover:opacity-60">
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
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3 lg:gap-4 lg:pr-4">
      {PRODUCTS.map((p) => (
        <li key={p.id} className="w-[62vw] shrink-0 sm:w-[40vw] lg:w-[23vw] lg:max-w-[340px]">
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
        className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden px-[4%] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
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
    <section id={id} className={`scroll-mt-20 bg-white pb-14 lg:pb-24 ${SHOP_GAP}`}>
      <SectionTitle>{title[lang]}</SectionTitle>
      <div className="mx-auto w-[92%] max-w-[1400px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {big.map((p) => (
            <Card key={p.id} p={p} ratio="aspect-[4/5]" />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:grid-cols-4 lg:gap-4">
          {small.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
