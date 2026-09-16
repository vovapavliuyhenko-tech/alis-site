"use client";
// БЛОК МЕРЧА — бегущая лента карточек товаров по мотивам магазина PALOMA:
// авто-скролл + ручное листание (drag) + круглые стрелки ←/→. Карточка: фото,
// серифное название, цена и широкая кнопка «Подробнее» (открывает модалку). Двуязычно.
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice } from "@/lib/products";

type Loc = { ru: string; en: string };

export default function MerchMarquee({
  sectionId = "merch",
  eyebrow = { ru: "мерч", en: "merch" },
  title = { ru: "Немного ÁLIS — с собой", en: "A little ÁLIS to take home" },
  exclude,
  catalogHref,
}: {
  sectionId?: string;
  eyebrow?: Loc;
  title?: Loc;
  exclude?: string;
  catalogHref?: string;
} = {}) {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const items = exclude ? PRODUCTS.filter((p) => p.id !== exclude) : PRODUCTS;

  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    const step = () => {
      const half = (el.scrollWidth / 2) || 1;
      if (!drag.current.active) el.scrollLeft += 0.6;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
      if (barRef.current) {
        const p = Math.min(1, Math.max(0, el.scrollLeft / half));
        barRef.current.style.width = (p * 100).toFixed(2) + "%";
      }
      raf = requestAnimationFrame(step);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "200px" });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }, []);

  const nudge = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(360, el.clientWidth * 0.8), behavior: "smooth" });
  };

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
  // Если это было перетаскивание — гасим клик по карточке (чтобы не открылась страница)
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };

  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {items.map((p, i) => (
        <li key={i} className="mr-4 w-[260px] shrink-0 lg:mr-5 lg:w-[340px]">
          <Link href={`/product/${p.id}`} className="group block w-full overflow-hidden rounded-[10px]" aria-label={p.name[lang]} draggable={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" draggable={false} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          </Link>
          <h3 className="mt-4 font-serif-display text-[22px] leading-tight text-[#2a2320] lg:text-[26px]">{p.name[lang]}</h3>
          <p className="mt-1 font-serif-display text-[15px] text-[#2a2320]/55 lg:text-[16px]">{fmtPrice(p.price, en)}</p>
          <Link
            href={`/product/${p.id}`}
            className="mt-4 flex w-full items-center justify-center rounded-[10px] border border-[#46131E]/35 py-3 text-[11px] uppercase tracking-[0.18em] text-[#46131E] transition-colors duration-300 hover:border-transparent hover:bg-[#46131E] hover:text-[#f4efe6]"
          >
            {t("Подробнее", "View")}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section id={sectionId} className="scroll-mt-24 overflow-hidden bg-white pt-16 pb-20 lg:pt-20 lg:pb-24">
      <div className="r-reveal mx-auto mb-12 w-[94%] max-w-[1440px] text-center lg:mb-16">
        <p className="text-[10px] lowercase tracking-[0.05em] text-[#46131E]">{eyebrow[lang]}</p>
        <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#46131E] lg:text-[28px]">
          {title[lang]}
        </h2>
        {catalogHref && (
          <Link href={catalogHref} className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em] text-[#46131E] underline-offset-4 transition-colors hover:underline">
            {t("в каталог", "view all")} →
          </Link>
        )}
      </div>

      {/* Лента + круглые стрелки навигации */}
      <div className="relative">
        <div
          ref={scroller}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClickCapture={onClickCapture}
          className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden px-[3%] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <Track />
          <Track hidden />
        </div>

        <button
          onClick={() => nudge(-1)}
          aria-label={t("Назад", "Previous")}
          className="absolute left-4 top-[30%] z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[18px] text-[#46131E] shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur transition-colors hover:bg-white lg:flex"
        >
          ←
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label={t("Вперёд", "Next")}
          className="absolute right-4 top-[30%] z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[18px] text-[#46131E] shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur transition-colors hover:bg-white lg:flex"
        >
          →
        </button>
      </div>

      <div className="mx-auto mt-10 h-[3px] w-[94%] max-w-[1440px] overflow-hidden rounded-full bg-[#C2C0B6]/40">
        <div ref={barRef} className="h-full rounded-full bg-[#46131E]" style={{ width: "0%" }} />
      </div>
    </section>
  );
}
