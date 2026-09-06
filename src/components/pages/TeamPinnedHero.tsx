"use client";
// БЛОК 1 (страница «Команда») — «закреплённый» герой: фон стоит на месте
// (sticky), а поверх ПО ОДНОЙ сменяются сцены: название → оффер → кнопка.
// В любой момент видна только одна сцена (без наложения). Нативный скролл
// (на этой странице нет Lenis). Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const BG = "/assets/tild6530-383_-2___1_.jpg";

type Scene = { kind: "title" | "offer" | "button" };

const SCENES: Scene[] = [{ kind: "title" }, { kind: "offer" }, { kind: "button" }];

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

  // Видна только одна сцена: ядро (|d|<=0.3) — полностью, край (0.3..0.5) — гаснет,
  // дальше 0. Соседние сцены не показываются одновременно.
  const vis = (i: number) => {
    const ad = Math.abs(phase - i);
    if (ad >= 0.5) return 0;
    if (ad <= 0.3) return 1;
    return (0.5 - ad) / 0.2;
  };

  return (
    <div ref={wrapRef} data-hide-fab className="relative" style={{ height: `${SCENES.length * 135}vh` }}>
      <div className="sticky top-0 h-svh min-h-[560px] w-full px-2 pb-2 pt-[72px] sm:px-2.5 sm:pb-2.5 sm:pt-[80px]">
        {/* Скруглённая «сцена» с небольшим отступом от краёв */}
        <div className="relative h-full w-full overflow-hidden rounded-[26px]">
        {/* Фон стоит на месте */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />

        {/* Сцены — каждая по центру, поверх друг друга, но видна только одна */}
        {SCENES.map((s, i) => {
          const opacity = vis(i);
          const active = Math.abs(phase - i) < 0.5;
          const dy = (phase - i) * -12;
          return (
            <div
              key={i}
              aria-hidden={!active}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity,
                transform: `translateY(${dy}px)`,
                pointerEvents: active ? "auto" : "none",
                willChange: "opacity, transform",
              }}
            >
              {s.kind === "title" && (
                <>
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
                    {en ? "team" : "команда"}
                  </span>
                  <h1 className="mt-4 font-display text-[20px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-white sm:text-[26px] lg:text-[32px]">
                    {en ? "The ÁLIS team" : "Команда ÁLIS"}
                  </h1>
                </>
              )}

              {s.kind === "offer" && (
                <p className="max-w-xl font-display text-[15px] font-normal uppercase leading-[1.35] tracking-[0.02em] text-white sm:text-[18px] lg:text-[22px]">
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
                  className="inline-flex items-center justify-center rounded-2xl border border-white bg-white px-14 py-5 font-display text-[12px] uppercase tracking-[0.16em] text-[#3B0D1A] transition-colors duration-300 hover:bg-transparent hover:text-white sm:text-[13px]"
                >
                  {en ? "our masters" : "наши мастера"}
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
