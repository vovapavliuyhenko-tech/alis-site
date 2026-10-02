"use client";
// ЛЕНТА ТОВАРОВ «С этим часто покупают» на странице товара — в стиле ленты фото на главной:
// портретные карточки со скруглением 12, авто-бег + перетаскивание, полоса прогресса снизу.
// Название и цена появляются при наведении (на телефоне видны сразу). Без заголовка.
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, fmtPrice } from "@/lib/products";

export default function MerchMarquee({ sectionId = "merch", exclude }: { sectionId?: string; exclude?: string } = {}) {
  const { lang } = useLang();
  const en = lang === "en";
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
        <li key={i} className="mr-2 aspect-[3/4] h-[320px] shrink-0 lg:mr-3 lg:h-[440px]">
          <Link href={`/product/${p.id}`} tabIndex={hidden ? -1 : undefined} className="group relative block h-full w-full overflow-hidden rounded-[12px] bg-[#f2f1ee]" draggable={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={hidden ? "" : p.name[lang]} draggable={false} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-12 text-white">
              <span className="text-[12px] uppercase leading-[1.3] tracking-[0.06em] lg:text-[13px]">{p.name[lang]}</span>
              <span className="shrink-0 text-[12px] lg:text-[13px]">{fmtPrice(p.price, en)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    // Отступ сверху поменьше, снизу — отступ до подвала
    <section id={sectionId} className="scroll-mt-24 overflow-hidden bg-white pb-[clamp(72px,10vw,140px)] pt-10 lg:pt-14">
      {/* Лента */}
      <div
          ref={scroller}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClickCapture={onClickCapture}
          className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <Track />
          <Track hidden />
        </div>


      <div className="mx-auto mt-10 h-[3px] w-[96%] max-w-[1760px] overflow-hidden rounded-full bg-[#C2C0B6]/40">
        <div ref={barRef} className="h-full rounded-full bg-[#17191a]" style={{ width: "0%" }} />
      </div>
    </section>
  );
}
