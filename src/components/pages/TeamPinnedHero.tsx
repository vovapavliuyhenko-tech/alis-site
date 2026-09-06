"use client";
// БЛОК 1 (страница «Команда») — «закреплённый» герой: фон стоит на месте
// (sticky), а поверх по очереди появляются сцены: сначала название, затем
// оффер, затем только кнопка. Каждая сцена держится дольше и плавно сменяет
// предыдущую. Нативный скролл (на этой странице нет Lenis). Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const BG = "/assets/tild6530-383_-2___1_.jpg";

type Scene =
  | { kind: "title"; ru: string; en: string }
  | { kind: "offer"; ru: string; en: string }
  | { kind: "button" };

const SCENES: Scene[] = [
  { kind: "title", ru: "Команда ÁLIS", en: "The ÁLIS team" },
  {
    kind: "offer",
    ru: "Полный образ за один визит — волосы, ногти, брови и макияж, в 4–6 рук",
    en: "A complete look in one visit — hair, nails, brows and makeup, in 4–6 hands",
  },
  { kind: "button" },
];

export default function TeamPinnedHero() {
  const { lang } = useLang();
  const en = lang === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0); // 0..(SCENES.length-1)

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setPhase(p * (SCENES.length - 1));
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

  // Плато: сцена полностью видна рядом со своим индексом и мягко гаснет к соседней.
  const vis = (i: number) => {
    const d = Math.abs(phase - i);
    return Math.max(0, Math.min(1, (0.9 - d) / 0.5));
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: `${SCENES.length * 135}vh` }}
    >
      <div className="sticky top-0 flex h-svh min-h-[560px] w-full items-center justify-center overflow-hidden">
        {/* Фон стоит на месте */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />

        {/* Сцены — по очереди, по центру */}
        <div className="relative z-10 flex w-[90%] max-w-4xl items-center justify-center px-4 text-center">
          {SCENES.map((s, i) => {
            const opacity = vis(i);
            const dy = (phase - i) * -16;
            const active = Math.abs(phase - i) < 0.5;
            return (
              <div
                key={i}
                aria-hidden={!active}
                className="col-start-1 row-start-1 flex w-full flex-col items-center [grid-area:1/1]"
                style={{
                  gridArea: "1 / 1",
                  opacity,
                  transform: `translateY(${dy}px)`,
                  pointerEvents: active ? "auto" : "none",
                  willChange: "opacity, transform",
                  position: "absolute",
                }}
              >
                {s.kind === "title" && (
                  <>
                    <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70 sm:text-[12px]">
                      {en ? "team" : "команда"}
                    </span>
                    <h1 className="mt-5 font-display text-[34px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-white sm:text-[52px] lg:text-[68px]">
                      {en ? "The ÁLIS team" : "Команда ÁLIS"}
                    </h1>
                  </>
                )}

                {s.kind === "offer" && (
                  <p className="max-w-3xl font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-white sm:text-[32px] lg:text-[40px]">
                    {en
                      ? "A complete look in one visit — hair, nails, brows and makeup, in 4–6 hands"
                      : "Полный образ за один визит — волосы, ногти, брови и макияж, в 4–6 рук"}
                  </p>
                )}

                {s.kind === "button" && (
                  <a
                    href={YCLIENTS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-9 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#3B0D1A] sm:text-[15px]"
                  >
                    {en ? "( our masters )" : "( наши мастера )"}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
