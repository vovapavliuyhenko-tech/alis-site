"use client";
// БЛОК 1 (страница «Команда») — «закреплённый» герой по мотивам cryome:
// фон-фотография стоит на месте (sticky), а текст-оффер сменяется по мере
// скролла кросс-фейдом. Нативный скролл (на этой странице нет Lenis), поэтому
// position: sticky работает штатно. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const BG = "/assets/tild6530-383_-2___1_.jpg";

type Loc = { ru: string; en: string };

const STEPS: Loc[] = [
  { ru: "Команда, которая делает образ целиком", en: "A team that creates the whole look" },
  { ru: "Волосы, ногти, брови и макияж — в одном кресле", en: "Hair, nails, brows and makeup — in one chair" },
  { ru: "Мастера, которым доверяют свою красоту", en: "Masters people trust with their beauty" },
];

export default function TeamPinnedHero() {
  const { lang } = useLang();
  const en = lang === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0); // 0..(STEPS.length-1)

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh; // путь закрепления
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setPhase(p * (STEPS.length - 1));
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

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-svh min-h-[560px] w-full items-center justify-center overflow-hidden">
        {/* Фон стоит на месте */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />

        {/* Контент */}
        <div className="relative z-10 flex w-[90%] max-w-4xl flex-col items-center px-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/75 sm:text-[12px]">
            {en ? "the ÁLIS team" : "команда ÁLIS"}
          </span>

          {/* Сменяющиеся строки — кросс-фейд */}
          <div className="relative mt-6 h-[3.6em] w-full sm:h-[2.6em] lg:h-[2.4em]">
            {STEPS.map((s, i) => {
              const opacity = Math.max(0, 1 - Math.abs(phase - i));
              const dy = (phase - i) * -18;
              return (
                <h1
                  key={i}
                  aria-hidden={opacity < 0.5}
                  className="absolute inset-0 flex items-center justify-center font-display text-[24px] font-normal uppercase leading-[1.12] tracking-[0.02em] text-white sm:text-[34px] lg:text-[44px]"
                  style={{ opacity, transform: `translateY(${dy}px)`, willChange: "opacity, transform" }}
                >
                  <span className="max-w-3xl">{s[lang]}</span>
                </h1>
              );
            })}
          </div>

          {/* Кнопка-пилюля по центру, как на референсе */}
          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-8 py-3.5 font-display text-[12px] uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#3B0D1A] sm:text-[13px]"
          >
            {en ? "( our masters )" : "( наши мастера )"}
          </a>

          {/* Индикатор шагов */}
          <div className="mt-12 flex items-center gap-2">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full bg-white transition-all duration-300"
                style={{ width: Math.abs(phase - i) < 0.5 ? 22 : 6, opacity: Math.abs(phase - i) < 0.5 ? 1 : 0.4 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
