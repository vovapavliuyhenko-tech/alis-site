"use client";
// МИНИ-БЛОК СРАВНЕНИЯ (перед вакансиями) — точь-в-точь по cryome «CryoMe и салон»:
// [фото] [карточка] [карточка] [фото]. Обе карточки одинаковые — белые с тонкой
// серой обводкой. Ровные, пока не долистаешь; когда блок в виду — средние
// карточки поворачиваются друг к другу, боковые фото — в стороны, и держатся.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const PHOTO_L = "/assets/tild3236-393__.jpg";
const PHOTO_R = "/assets/tild6230-643__.jpg";
const INK = "#17191a";

const COLS: { head: Loc; points: Loc[]; foot: Loc }[] = [
  {
    head: { ru: "В обычном салоне", en: "At an ordinary salon" },
    points: [
      { ru: "поток клиентов нестабильный", en: "an unsteady flow of clients" },
      { ru: "процент занижают, условия туманные", en: "low commission, vague terms" },
      { ru: "материалы и график — как придётся", en: "materials and schedule — as it goes" },
    ],
    foot: { ru: "Обычный салон — как повезёт", en: "Ordinary salon — hit or miss" },
  },
  {
    head: { ru: "В команде ÁLIS", en: "On the ÁLIS team" },
    points: [
      { ru: "стабильный поток гостей и записи", en: "a steady flow of guests and bookings" },
      { ru: "честный процент и прозрачная оплата", en: "fair commission, transparent pay" },
      { ru: "проверенные материалы, обучение и рост", en: "trusted materials, training and growth" },
    ],
    foot: { ru: "ÁLIS — стабильно и по-честному", en: "ÁLIS — stable and fair" },
  },
];

// Мягкая кривая — как у референса: медленный старт и плавное затухание.
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export default function SalonCompare() {
  const { lang } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0); // 0 — ровно (до), 1 — повёрнуто (долистал)

  useEffect(() => {
    let raf = 0;
    // Отсчёт от РЯДА КАРТОЧЕК (а не всей секции): поворот стартует, когда ряд
    // заходит снизу в экран, и завершается, пока он поднимается к ~40% высоты.
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = gridRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const vh = window.innerHeight;
        const p = (vh - top) / (vh * 0.6);
        setK(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const e = easeInOut(k);
  const photoTilt = 7 * e; // боковые фото — в стороны
  const cardTilt = 4.5 * e; // средние карточки — друг к другу

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div ref={gridRef} className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-[0.78fr_1fr_1fr_0.78fr] lg:gap-6">
          {/* Фото слева — наклон наружу (влево) */}
          <div className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_L}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-[22px] object-cover shadow-[0_18px_44px_rgba(0,0,0,0.14)]"
              style={{ transform: `rotate(${-photoTilt}deg)`, transformOrigin: "bottom center", willChange: "transform" }}
            />
          </div>

          {/* Средние карточки: левая — бордовая, правая — оливковая полупрозрачная */}
          {COLS.map((c, i) => {
            const dir = i === 0 ? 1 : -1;
            const wine = i === 1; // правая — главная, бордовая
            const bg = wine ? "#6E7248" : "#ffffff";
            const border = wine ? "transparent" : "rgba(23,25,26,0.14)";
            const headColor = wine ? "#f4efe6" : INK;
            const subColor = wine ? "rgba(244,239,230,0.78)" : "rgba(23,25,26,0.72)";
            const bullet = wine ? "#f4efe6" : INK;
            const footColor = wine ? "#f4efe6" : INK;
            return (
              <article
                key={c.head.ru}
                className="flex min-h-[420px] flex-col justify-between rounded-[22px] border p-9 lg:p-10"
                style={{
                  backgroundColor: bg,
                  borderColor: border,
                  transform: `rotate(${dir * cardTilt}deg)`,
                  transformOrigin: "bottom center",
                  willChange: "transform",
                  boxShadow: "0 16px 44px rgba(23,25,26,0.10)",
                }}
              >
                <div>
                  <p className="font-display text-[18px] tracking-[0.01em] lg:text-[21px]" style={{ color: headColor }}>
                    {c.head[lang]}
                  </p>
                  <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed lg:text-[13px]" style={{ color: subColor }}>
                    {c.points.map((pt) => (
                      <li key={pt.ru} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: bullet }} />
                        {pt[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-10 font-display text-[15px] font-normal leading-snug lg:text-[17px]" style={{ color: footColor }}>
                  {c.foot[lang]}
                </p>
              </article>
            );
          })}

          {/* Фото справа — наклон наружу (вправо) */}
          <div className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_R}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-[22px] object-cover shadow-[0_18px_44px_rgba(0,0,0,0.14)]"
              style={{ transform: `rotate(${photoTilt}deg)`, transformOrigin: "bottom center", willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
