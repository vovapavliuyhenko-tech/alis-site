"use client";
// БЛОК-ЛЕНТА на главной — фотографии бегут сами (JS-автоскролл через scrollLeft),
// пауза при наведении. Клиент листает вручную: перетаскиванием/свайпом/трекпадом.
// Под фото — полоса прогресса, отражающая позицию прокрутки (как на референсе).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

// Кадры одного формата — единый портретный размер, минимальный зазор.
const ITEMS: string[] = [
  "/assets/tild6230-643__.jpg",
  "/assets/tild3236-393__.jpg",
  "/assets/tild6530-383_-2___1_.jpg",
  "/assets/tild3638-373_-2___1__3.jpg",
  "/assets/tild3561-646_-2___1__5.jpg",
  "/assets/tild6536-613_-2___1__4.jpg",
  "/shop/ss-portrait.jpg",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {ITEMS.map((src, i) => (
        <li key={i} className="mr-2 aspect-[3/4] h-[320px] shrink-0 lg:mr-3 lg:h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" draggable={false} loading="lazy" decoding="async" className="h-full w-full rounded-[14px] object-cover" />
        </li>
      ))}
    </ul>
  );
}

export default function PhotoMarquee() {
  const { lang } = useLang();
  const en = lang === "en";

  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      const half = (el.scrollWidth / 2) || 1; // ширина одной дорожки (их две — для бесшовности)
      if (!hovering.current && !drag.current.active) el.scrollLeft += 0.7;
      // бесшовная петля
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
      if (barRef.current) {
        const p = Math.min(1, Math.max(0, el.scrollLeft / half));
        barRef.current.style.width = (p * 100).toFixed(2) + "%";
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => {
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
    scroller.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="overflow-hidden rounded-t-[40px] bg-white pt-12 pb-24 lg:pt-14 lg:pb-32">
      <div className="r-reveal mx-auto mb-12 w-[94%] max-w-[1440px] lg:mb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {en ? "gallery" : "галерея"}
        </span>
        <h2 className="mt-5 font-display text-[28px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-[#3B0D1A] lg:text-[42px]">
          {en ? "The ÁLIS atmosphere" : "Атмосфера ÁLIS"}
        </h2>
      </div>

      {/* Лента: авто-бег + ручное листание (drag / свайп / трекпад) */}
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <Track />
        <Track hidden />
      </div>

      {/* Полоса прогресса под фото */}
      <div className="mx-auto mt-10 h-[3px] w-[94%] max-w-[1440px] overflow-hidden rounded-full bg-[#3B0D1A]/12">
        <div ref={barRef} className="h-full rounded-full bg-[#3B0D1A]" style={{ width: "0%" }} />
      </div>
    </section>
  );
}
