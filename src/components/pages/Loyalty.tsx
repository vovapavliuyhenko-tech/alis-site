"use client";
// БЛОК «ЛОЯЛЬНОСТЬ» (страница «Салон») — горизонтальный таймлайн «путь гостя»:
// шаги с точками на линии (первый визит → постоянный гость → сертификаты), у
// каждого своя привилегия. Линия прогресса заполняется при скролле (rAF).
// На мобильном — вертикальная лента. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Step = { n: string; title: Loc; text: Loc };

const STEPS: Step[] = [
  {
    n: "01",
    title: { ru: "Первый визит", en: "First visit" },
    text: { ru: "−10% на услуги при первом посещении — попробуйте сервис ÁLIS выгоднее.", en: "−10% on services on your first visit — try ÁLIS for less." },
  },
  {
    n: "02",
    title: { ru: "Постоянным гостям", en: "Regular guests" },
    text: { ru: "Приятные бонусы и внимание к деталям для тех, кто с нами постоянно.", en: "Nice perks and attention to detail for those who stay with us." },
  },
  {
    n: "03",
    title: { ru: "Подарочные сертификаты", en: "Gift certificates" },
    text: { ru: "Дарите красоту ÁLIS близким — сертификат на любую услугу или сумму.", en: "Gift ÁLIS beauty to loved ones — a certificate for any service or amount." },
  },
];

export default function Loyalty() {
  const { lang } = useLang();
  const en = lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0..1 — заполнение линии

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const prog = (vh * 0.78 - r.top) / (r.height * 0.7);
        setP(Math.max(0, Math.min(1, prog)));
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

  const activeUpTo = p * (STEPS.length - 1); // докуда дошёл прогресс

  return (
    <section id="loyalty" className="scroll-mt-24 bg-[#f7f3ed] py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="mb-16 text-center lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "loyalty" : "лояльность"}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[40px]">
            {en ? "We value those who value themselves" : "Ценим тех, кто ценит себя"}
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Горизонтальная линия (десктоп) */}
          <div className="pointer-events-none absolute inset-x-0 top-[10px] hidden h-px bg-[#3B0D1A]/15 lg:block" />
          <div
            className="pointer-events-none absolute left-0 top-[10px] hidden h-px bg-[#3B0D1A] transition-[width] duration-150 ease-out lg:block"
            style={{ width: `${p * 100}%` }}
          />
          {/* Вертикальная линия (мобайл) */}
          <div className="pointer-events-none absolute bottom-2 left-[9px] top-2 w-px bg-[#3B0D1A]/15 lg:hidden" />
          <div
            className="pointer-events-none absolute left-[9px] top-2 w-px bg-[#3B0D1A] transition-[height] duration-150 ease-out lg:hidden"
            style={{ height: `${p * 100}%` }}
          />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {STEPS.map((s, i) => {
              const on = activeUpTo >= i - 0.15;
              return (
                <div key={s.n} className="relative pl-9 lg:pl-0">
                  {/* Точка */}
                  <span
                    className="absolute left-[3px] top-1 h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 lg:left-0 lg:top-[3px]"
                    style={{ borderColor: "#3B0D1A", backgroundColor: on ? "#3B0D1A" : "#f7f3ed" }}
                  />
                  <div className="lg:pt-10">
                    <span
                      className="font-display text-[26px] leading-none tabular-nums transition-colors duration-300 lg:text-[34px]"
                      style={{ color: on ? "#4A4B33" : "rgba(74,75,51,0.35)" }}
                    >
                      {s.n}
                    </span>
                    <h3 className="mt-4 font-display text-[17px] uppercase tracking-[0.02em] text-[#3B0D1A] lg:text-[20px]">
                      {s.title[lang]}
                    </h3>
                    <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-[#2a2320]/65 lg:text-[14px]">
                      {s.text[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
