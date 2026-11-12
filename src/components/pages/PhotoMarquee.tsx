"use client";
// БЛОК-ЛЕНТА на главной — фотографии бегут сами (JS-автоскролл через scrollLeft),
// бег не прерывается при наведении. Клиент листает вручную: перетаскиванием/свайпом/трекпадом.
// Под фото — полоса прогресса, отражающая позицию прокрутки (как на референсе).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import LineCta from "@/components/ui/LineCta";

type Loc = { ru: string; en: string };
// Кадр: фото + подпись (услуга) + куда ведёт клик. Можно передать и просто путь к фото.
// back — оборот карточки (как на paloma.website): наведение (компьютер) / нажатие (телефон) переворачивает фото
export type MarqueeBack = { eyebrow?: Loc; title: Loc; text?: Loc; cta?: { label: Loc; href: string } };
export type MarqueeItem = string | { src: string; cap?: Loc; href?: string; back?: MarqueeBack };

const isVideo = (src: string) => /.(mp4|webm)$/i.test(src);

// Карточка-переворот: лицо — фото/видео с подписью, оборот — заголовок, текст и призыв к действию
function FlipCard({ src, cap, back, hidden, moved }: { src: string; cap?: Loc; back: MarqueeBack; hidden?: boolean; moved: React.RefObject<boolean> }) {
  const { lang } = useLang();
  const en = lang === "en";
  const [flipped, setFlipped] = useState(false);
  const media = isVideo(src) ? (
    <video src={src} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={hidden ? "" : (cap?.[lang] ?? back.title[lang])} draggable={false} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
  );
  return (
    <div
      tabIndex={hidden ? -1 : 0}
      role="button"
      aria-pressed={flipped}
      onClick={() => { if (!moved.current) setFlipped((v) => !v); }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((v) => !v); } }}
      className="group/flip relative h-full w-full cursor-pointer outline-none [perspective:2000px]"
    >
      <div
        className={`relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : "[@media(hover:hover)_and_(pointer:fine)]:group-hover/flip:[transform:rotateY(180deg)]"}`}
      >
        {/* Лицо */}
        <div className="absolute inset-0 overflow-hidden rounded-[20px] [backface-visibility:hidden]">
          {media}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[9.5px] uppercase tracking-[0.16em] text-[#17191a] backdrop-blur-md sm:right-4 sm:top-4 sm:text-[10.5px]">
            <span aria-hidden className="text-[12px] leading-none">↻</span>
            <span className="[@media(hover:hover)_and_(pointer:fine)]:hidden">{en ? "Tap" : "Нажмите"}</span>
            <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline">{en ? "Hover" : "Наведите"}</span>
          </span>
          {cap && (
            <p className="absolute inset-x-0 bottom-0 px-5 pb-5 font-serif-display text-[22px] uppercase leading-[1.1] tracking-[0.02em] text-white sm:px-6 sm:pb-6 sm:text-[26px] lg:text-[32px]">
              {cap[lang]}
            </p>
          )}
        </div>
        {/* Оборот */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[20px] border border-[#17191a]/12 bg-white px-6 py-7 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)] sm:px-7 sm:py-8 lg:px-9 lg:py-10">
          {back.eyebrow && <span className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/50 sm:text-[11px]">{back.eyebrow[lang]}</span>}
          <h3 className="mt-3 font-serif-display !text-[22px] font-normal uppercase leading-[1.15] tracking-[0.02em] text-[#17191a] sm:!text-[26px] lg:!text-[32px]">{back.title[lang]}</h3>
          {back.text && <p className="mt-auto pt-6 !text-[12px] leading-[1.6] text-[#17191a]/70 sm:!text-[13px] lg:!text-[14px]">{back.text[lang]}</p>}
          {back.cta && (
            <a
              href={back.cta.href}
              tabIndex={hidden ? -1 : undefined}
              onClick={(e) => e.stopPropagation()}
              className={`${back.text ? "mt-6" : "mt-auto"} flex items-center gap-2 border-t border-[#17191a]/12 pt-4 text-[11px] uppercase tracking-[0.16em] text-[#17191a] transition-opacity duration-300 hover:opacity-60 sm:text-[12px]`}
            >
              <span aria-hidden>→</span>
              {back.cta.label[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Кадры одного формата — единый портретный размер, минимальный зазор.
// Подписи — по тому, что видно на фото; клик ведёт в категорию услуг салона.
// TODO: заказчица сама отберёт фото работ мастеров (и подпишет мастера) — заменить список.
const ITEMS: MarqueeItem[] = [
  { src: "/assets/alis/look_red_2.jpg", cap: { ru: "Макияж + укладка", en: "Makeup & styling" } },
  { src: "/assets/alis/nails_french.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
  { src: "/assets/alis/look_leopard.jpg", cap: { ru: "Макияж + причёска", en: "Makeup & hair" } },
  { src: "/assets/alis/nails_pink_ring.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
  { src: "/assets/alis/img_3283.jpg", cap: { ru: "Укладка", en: "Styling" } },
  { src: "/assets/alis/work_nails_nude.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
  { src: "/assets/alis/work_makeup_evening.jpg", cap: { ru: "Макияж + причёска", en: "Makeup & hair" } },
  { src: "/assets/alis/work_hair_waves.jpg", cap: { ru: "Укладка", en: "Styling" } },
  { src: "/assets/alis/img_8578.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
  { src: "/assets/alis/work_makeup_bun.jpg", cap: { ru: "Макияж + причёска", en: "Makeup & hair" } },
  { src: "/assets/alis/work_hair_bun.jpg", cap: { ru: "Причёска", en: "Hairstyle" } },
  { src: "/assets/alis/work_nails_bag.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
  { src: "/assets/alis/img_6011.jpg", cap: { ru: "Укладка + макияж", en: "Look: styling & makeup" } },
  { src: "/assets/alis/img_6048.jpg", cap: { ru: "Магазин ÁLIS BEAUTY", en: "ÁLIS BEAUTY shop" } },
];

function Track({ items, hidden = false, moved }: { items: MarqueeItem[]; hidden?: boolean; moved: React.RefObject<boolean> }) {
  const { lang } = useLang();
  return (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {items.map((it, i) => {
        const { src, cap, href, back } = typeof it === "string" ? { src: it, cap: undefined, href: undefined, back: undefined } : it;
        if (back)
          return (
            <li key={i} className="mr-2 shrink-0 lg:mr-3">
              <div className="relative aspect-[3/4] h-[300px] sm:h-[380px] lg:h-[540px]">
                <FlipCard src={src} cap={cap} back={back} hidden={hidden} moved={moved} />
              </div>
            </li>
          );
        const alt = hidden ? "" : cap ? `${cap[lang]} — ÁLIS BEAUTY` : lang === "en" ? `ÁLIS BEAUTY — photo ${i + 1}` : `ÁLIS BEAUTY — фото ${i + 1}`;
        const inner = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} draggable={false} loading="lazy" decoding="async" className="h-full w-full rounded-[20px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          </>
        );
        return (
          <li key={i} className="group mr-2 shrink-0 lg:mr-3">
            <div className="relative aspect-[3/4] h-[300px] overflow-hidden rounded-[20px] sm:h-[380px] lg:h-[540px]">
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
            </div>
            {/* Подпись услуги — тихо, по низу фото */}
            {cap && <p className="mt-2.5 pl-1 text-[10.5px] uppercase tracking-[0.14em] text-[#17191a]/50 sm:text-[11px]">{cap[lang]}</p>}
          </li>
        );
      })}
    </ul>
  );
}



// Переиспользуется: главная (работы мастеров) и страница салона (#gallery).
export default function PhotoMarquee({
  items = ITEMS,
  title = { ru: "Галерея работ специалистов ÁLIS BEAUTY", en: "ÁLIS BEAUTY specialists' work" },
  sectionId,
  text,
  cta = { label: { ru: "Посмотреть услуги", en: "View services" }, href: "/salon#uslugi" },
}: {
  items?: MarqueeItem[];
  title?: Loc | null; // null — без заголовка
  sectionId?: string;
  text?: Loc; // короткая строка под заголовком
  cta?: { label: Loc; href: string } | null; // кнопка-строка под лентой
} = {}) {
  const { lang } = useLang();

  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const moved = useRef(false);
  const pos = useRef(0);
  const paused = useRef(false);
  const hasFlip = items.some((it) => typeof it !== "string" && !!it.back);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    let last = el.scrollLeft;
    // Пальцем листают нативно (с инерцией); пока трогают и ещё 2,5 с после — авто-бег на паузе
    let until = 0;
    const hold = () => { until = performance.now() + 2500; };
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("touchmove", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });
    const step = () => {
      if (performance.now() < until) {
        // человек листает сам — только следим за положением и полосой прогресса
        pos.current = el.scrollLeft;
        last = el.scrollLeft;
        const half0 = (el.scrollWidth / 2) || 1;
        if (barRef.current) barRef.current.style.width = (Math.min(1, (el.scrollLeft % half0) / half0) * 100).toFixed(2) + "%";
        raf = requestAnimationFrame(step);
        return;
      }
      const half = (el.scrollWidth / 2) || 1; // ширина одной дорожки (их две — для бесшовности)
      // Дробная позиция копится отдельно: scrollLeft на телефонах округляется до целых — отсюда были рывки
      // Если ленту прокрутили трекпадом/колесом — подхватываем её положение
      if (drag.current.active || Math.abs(el.scrollLeft - last) > 1.5) pos.current = el.scrollLeft;
      if (!drag.current.active && !paused.current) pos.current += 0.9;
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
    return () => {
      stop();
      io.disconnect();
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("touchmove", hold);
      el.removeEventListener("wheel", hold);
    };
  }, []);

  // Перетаскивание — только мышью; на телефоне лента листается нативно (плавно, с инерцией)
  const onDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || e.pointerType !== "mouse") return;
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
        <div className="r-reveal mx-auto mb-8 w-[96%] max-w-[1760px] text-center sm:mb-12 lg:mb-16">
          <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
            {title[lang]}
          </h2>
          {text && <p className="mx-auto mt-2 max-w-[44ch] sm:max-w-[66ch] !text-[11px] leading-[1.5] text-[#17191a]/60 sm:mt-3 sm:!text-[13px]">{text[lang]}</p>}
        </div>
      )}

      {/* Лента: авто-бег + ручное листание (drag / свайп / трекпад) */}
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onMouseEnter={() => { if (hasFlip) paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
        className="flex cursor-grab overflow-x-auto overscroll-x-contain overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <Track items={items} moved={moved} />
        <Track items={items} hidden moved={moved} />
      </div>

      {/* Полоса прогресса под фото */}
      <div className="mx-auto mt-10 h-[3px] w-[96%] max-w-[1760px] overflow-hidden rounded-full bg-[#C2C0B6]/40">
        <div ref={barRef} className="h-full rounded-full bg-[#17191a]" style={{ width: "0%" }} />
      </div>
      {cta && <LineCta href={cta.href} label={cta.label[lang]} />}
    </section>
  );
}
