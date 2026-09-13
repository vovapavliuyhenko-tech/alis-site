"use client";
// БЛОК МЕРЧА — бегущая лента карточек товаров (по мотивам блока «Атмосфера»):
// авто-скролл + ручное листание. У карточки фото, сердечко (в избранное), название,
// цена и кнопка «Подробнее» — открывает модалку товара. Двуязычно.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { PRODUCTS, fmtPrice } from "@/lib/products";

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <path d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z" strokeLinejoin="round" />
    </svg>
  );
}

export default function MerchMarquee() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const s = useShop();

  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

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
    // Не перехватываем перетаскивание, если жмут на кнопку/сердечко
    if ((e.target as HTMLElement).closest("button")) return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.active = false;
    try { scroller.current?.releasePointerCapture(e.pointerId); } catch {}
  };

  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {PRODUCTS.map((p, i) => (
        <li key={i} className="mr-3 w-[220px] shrink-0 lg:mr-4 lg:w-[280px]">
          <div className="group relative overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" draggable={false} loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <button
              onClick={() => s.toggleFav(p.id)}
              aria-label={t("В избранное", "Add to favourites")}
              className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors ${
                s.isFav(p.id) ? "bg-[#6E7248] text-[#f4efe6]" : "bg-white/80 text-[#6E7248] hover:bg-white"
              }`}
            >
              <Heart filled={s.isFav(p.id)} />
            </button>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <h3 className="truncate font-display text-[15px] uppercase tracking-[0.02em] text-[#6E7248] lg:text-[16px]">{p.name[lang]}</h3>
            <span className="shrink-0 text-[14px] text-[#2a2320]/70">{fmtPrice(p.price, en)}</span>
          </div>
          <button
            onClick={() => s.openProduct(p.id)}
            className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#6E7248]/40 py-2.5 font-display text-[11px] uppercase tracking-[0.14em] text-[#6E7248] transition-colors duration-300 hover:border-transparent hover:bg-[#6E7248] hover:text-[#f4efe6]"
          >
            {t("Подробнее", "View")}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="overflow-hidden bg-[#F9F8F6] pt-16 pb-20 lg:pt-20 lg:pb-24">
      <div className="r-reveal mx-auto mb-12 w-[94%] max-w-[1440px] text-center lg:mb-16">
        <p className="text-[10px] lowercase tracking-[0.05em] text-[#6E7248]">{t("мерч", "merch")}</p>
        <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#6E7248] lg:text-[28px]">
          {t("Немного ÁLIS — с собой", "A little ÁLIS to take home")}
        </h2>
      </div>

      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden px-[3%] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <Track />
        <Track hidden />
      </div>

      <div className="mx-auto mt-10 h-[3px] w-[94%] max-w-[1440px] overflow-hidden rounded-full bg-[#C2C0B6]/40">
        <div ref={barRef} className="h-full rounded-full bg-[#6E7248]" style={{ width: "0%" }} />
      </div>
    </section>
  );
}
