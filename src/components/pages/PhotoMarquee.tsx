"use client";
// БЛОК-ЛЕНТА на главной — фотографии бегут сами (JS-автоскролл через scrollLeft),
// бег не прерывается при наведении. Клиент листает вручную: перетаскиванием/свайпом/трекпадом.
// Под фото — полоса прогресса, отражающая позицию прокрутки (как на референсе).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
// Кадр: фото + подпись (услуга) + куда ведёт клик. Можно передать и просто путь к фото.
export type MarqueeItem = string | { src: string; cap?: Loc; href?: string };

// Кадры одного формата — единый портретный размер, минимальный зазор.
// Подписи — по тому, что видно на фото; клик ведёт в категорию услуг салона.
// TODO: заказчица сама отберёт фото работ мастеров (и подпишет мастера) — заменить список.
const ITEMS: MarqueeItem[] = [
  { src: "/assets/alis/img_2672.jpg", cap: { ru: "Брови и макияж", en: "Brows & makeup" } },
  { src: "/assets/alis/img_2749.jpg", cap: { ru: "Макияж", en: "Makeup" } },
  { src: "/assets/alis/img_2751.jpg", cap: { ru: "Причёска и макияж", en: "Hair & makeup" } },
  { src: "/assets/alis/img_3283.jpg", cap: { ru: "Укладка", en: "Styling" } },
  { src: "/assets/alis/img_6011.jpg", cap: { ru: "Образ: укладка и макияж", en: "Look: styling & makeup" } },
  { src: "/assets/alis/img_8578.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
  { src: "/assets/alis/img_6048.jpg", cap: { ru: "Магазин ÁLIS BEAUTY", en: "ÁLIS BEAUTY shop" } },
  { src: "/assets/alis/img_5910.webp", cap: { ru: "Уход за волосами", en: "Hair care" } },
];

function Track({ items, hidden = false, moved }: { items: MarqueeItem[]; hidden?: boolean; moved: React.RefObject<boolean> }) {
  const { lang } = useLang();
  return (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {items.map((it, i) => {
        const { src, cap, href } = typeof it === "string" ? { src: it, cap: undefined, href: undefined } : it;
        const alt = hidden ? "" : cap ? `${cap[lang]} — ÁLIS BEAUTY` : lang === "en" ? `ÁLIS BEAUTY — photo ${i + 1}` : `ÁLIS BEAUTY — фото ${i + 1}`;
        const inner = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} draggable={false} loading="lazy" decoding="async" className="h-full w-full rounded-[12px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          </>
        );
        return (
          <li key={i} className="group relative mr-2 aspect-[3/4] h-[260px] shrink-0 sm:h-[320px] overflow-hidden rounded-[12px] lg:mr-3 lg:h-[440px]">
            {href ? (
              <a
                href={href}
                tabIndex={hidden ? -1 : undefined}
                draggable={false}
                // После перетаскивания ленты клик не срабатывает — иначе свайп открывал бы страницу
                onClick={(e) => { if (moved.current) e.preventDefault(); }}
                className="block h-full w-full"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}



// Переиспользуется: главная (работы мастеров) и страница салона (#gallery).
export default function PhotoMarquee({
  items = ITEMS,
  title = { ru: "То, что создают специалисты ÁLIS BEAUTY", en: "Created by ÁLIS BEAUTY specialists" },
  sectionId,
  text,
}: {
  items?: MarqueeItem[];
  title?: Loc | null; // null — без заголовка
  sectionId?: string;
  text?: Loc; // короткая строка под заголовком
} = {}) {
  const { lang } = useLang();

  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const moved = useRef(false);
  const pos = useRef(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    let last = el.scrollLeft;
    const step = () => {
      const half = (el.scrollWidth / 2) || 1; // ширина одной дорожки (их две — для бесшовности)
      // Дробная позиция копится отдельно: scrollLeft на телефонах округляется до целых — отсюда были рывки
      // Если ленту прокрутили трекпадом/колесом — подхватываем её положение
      if (drag.current.active || Math.abs(el.scrollLeft - last) > 1.5) pos.current = el.scrollLeft;
      if (!drag.current.active) pos.current += 0.9;
      // бесшовная петля
      if (pos.current >= half) pos.current -= half;
      else if (pos.current < 0) pos.current += half;
      if (!drag.current.active) el.scrollLeft = pos.current;
      last = el.scrollLeft;
      if (barRef.current) {
        const p = Math.min(1, Math.max(0, el.scrollLeft / half));
        barRef.current.style.width = (p * 100).toFixed(2) + "%";
      }
      raf = requestAnimationFrame(step);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    // Крутим анимацию только пока лента на экране — экономит ресурсы и разгружает скролл
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "200px" });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    moved.current = false;
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6 && !moved.current) {
      moved.current = true;
      el.setPointerCapture(e.pointerId); // захват — только когда реально тянут, чтобы клик по фото работал
    }
    if (moved.current) el.scrollLeft = drag.current.startScroll - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.active = false;
    if (scroller.current?.hasPointerCapture(e.pointerId)) scroller.current.releasePointerCapture(e.pointerId);
    pos.current = scroller.current?.scrollLeft ?? pos.current;
  };

  return (
    <section id={sectionId} className="scroll-mt-24 overflow-hidden bg-white section-y">
      {title && (
        <div className="r-reveal mx-auto mb-12 w-[96%] max-w-[1760px] text-center lg:mb-16">
          <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
            {title[lang]}
          </h2>
          {text && <p className="mx-auto mt-3 max-w-[56ch] !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:!text-[15px]">{text[lang]}</p>}
        </div>
      )}

      {/* Лента: авто-бег + ручное листание (drag / свайп / трекпад) */}
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex cursor-grab touch-pan-y overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <Track items={items} moved={moved} />
        <Track items={items} hidden moved={moved} />
      </div>

      {/* Полоса прогресса под фото */}
      <div className="mx-auto mt-10 h-[3px] w-[96%] max-w-[1760px] overflow-hidden rounded-full bg-[#C2C0B6]/40">
        <div ref={barRef} className="h-full rounded-full bg-[#17191a]" style={{ width: "0%" }} />
      </div>
    </section>
  );
}
