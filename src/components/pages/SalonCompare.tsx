"use client";
// МИНИ-БЛОК СРАВНЕНИЯ (перед вакансиями) — по мотивам cryome «CryoMe и салон»:
// [фото] [карточка] [карточка] [фото]. При скролле две средние карточки
// поворачиваются друг к другу, а боковые фото — в стороны. Палитра ÁLIS.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const PHOTO_L = "/assets/tild3236-393__.jpg";
const PHOTO_R = "/assets/tild6230-643__.jpg";

const COLS: { head: Loc; points: Loc[]; foot: Loc; accent: boolean }[] = [
  {
    head: { ru: "Как обычно", en: "The usual way" },
    points: [
      { ru: "по трём мастерам в разные дни", en: "three masters on different days" },
      { ru: "запись под каждого отдельно", en: "a separate booking for each" },
      { ru: "суббота уходит на разъезды", en: "your Saturday goes to commuting" },
    ],
    foot: { ru: "Обычно — долго и врозь", en: "Usual — slow and scattered" },
    accent: false,
  },
  {
    head: { ru: "ÁLIS BEAUTY", en: "ÁLIS BEAUTY" },
    points: [
      { ru: "всё в одном кресле, в 4–6 рук", en: "all in one chair, in 4–6 hands" },
      { ru: "один визит — полный образ", en: "one visit — a complete look" },
      { ru: "пара часов — и готово", en: "a couple of hours — and done" },
    ],
    foot: { ru: "ÁLIS — цельно и за раз", en: "ÁLIS — whole, in one go" },
    accent: true,
  },
];

export default function SalonCompare() {
  const { lang } = useLang();
  const en = lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // -1..1 прогресс прохождения секции через центр

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2;
        // 0 когда центр секции в центре экрана; ±1 на подходе/уходе
        const prog = (center - vh / 2) / (vh / 2 + rect.height / 2);
        setP(Math.max(-1, Math.min(1, prog)));
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

  // k → 0 в центре секции, 1 вдали. Разворот тем сильнее, чем дальше от центра.
  const k = Math.abs(p);
  const photoTilt = 8 * k; // боковые фото — в стороны
  const cardTilt = 5 * k; // средние карточки — друг к другу

  return (
    <section ref={ref} className="bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <h2 className="mb-14 text-center font-display text-[26px] font-normal uppercase tracking-[0.03em] text-[#3B0D1A] lg:mb-20 lg:text-[40px]">
          {en ? "ÁLIS vs the usual care" : "ÁLIS и привычный уход"}
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1fr_0.8fr] lg:gap-5">
          {/* Фото слева — наклон наружу (влево) */}
          <div className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_L}
              alt=""
              draggable={false}
              className="h-full w-full rounded-[26px] object-cover shadow-[0_20px_50px_rgba(59,13,26,0.15)]"
              style={{ transform: `rotate(${-photoTilt}deg)`, transformOrigin: "bottom center", willChange: "transform" }}
            />
          </div>

          {/* Средние карточки — поворот друг к другу */}
          {COLS.map((c, i) => {
            const dir = i === 0 ? 1 : -1; // левая кренится вправо, правая — влево (навстречу)
            return (
              <article
                key={c.head.ru}
                className={`flex min-h-[340px] flex-col justify-between rounded-[26px] border p-7 lg:p-8 ${
                  c.accent
                    ? "border-transparent bg-[#3B0D1A] text-[#f4efe6] shadow-[0_24px_60px_rgba(59,13,26,0.28)]"
                    : "border-[#3B0D1A]/20 bg-white text-[#2a2320] shadow-[0_18px_44px_rgba(0,0,0,0.08)]"
                }`}
                style={{ transform: `rotate(${dir * cardTilt}deg)`, transformOrigin: "bottom center", willChange: "transform" }}
              >
                <div>
                  <p className={`font-display text-[19px] tracking-[0.02em] lg:text-[22px] ${c.accent ? "text-[#f4efe6]" : "text-[#3B0D1A]"}`}>
                    {c.head[lang]}
                  </p>
                  <ul className={`mt-6 space-y-3 text-[14px] leading-relaxed lg:text-[15px] ${c.accent ? "text-[#f4efe6]/85" : "text-[#2a2320]/80"}`}>
                    {c.points.map((pt) => (
                      <li key={pt.ru} className="flex items-start gap-3">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.accent ? "bg-[#e7c9a0]" : "bg-[#4A4B33]"}`} />
                        {pt[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={`mt-8 font-display text-[15px] leading-snug lg:text-[17px] ${c.accent ? "text-[#f4efe6]" : "text-[#3B0D1A]"}`}>
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
              className="h-full w-full rounded-[26px] object-cover shadow-[0_20px_50px_rgba(59,13,26,0.15)]"
              style={{ transform: `rotate(${photoTilt}deg)`, transformOrigin: "bottom center", willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
