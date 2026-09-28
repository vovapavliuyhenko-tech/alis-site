"use client";
// ВТОРОЙ БЛОК СТРАНИЦЫ «САЛОН КРАСОТЫ» — список направлений в духе Made on Tilda:
// крупные тонкие строки на белом. При наведении остальные строки приглушаются,
// выбранная сдвигается и под ней вырастает бордовая линия, а за курсором плавно
// «плывёт» фото направления (с инерцией, смена фото — мягкой сменой кадра).
// На телефоне — строки с маленьким фото справа. Клик ведёт к прайсу (#uslugi).
// Тексты — из категорий салона (без новых формулировок). Фото — временные.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
export type HoverItem = { label: Loc; sub: Loc; img: string };

export default function SalonHoverList({ items, href = "#uslugi" }: { items: HoverItem[]; href?: string }) {
  const { lang } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // Плавное следование фото за курсором (lerp в requestAnimationFrame)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (float.current) {
        float.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(48px, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section className="bg-white section-y">
      <div
        ref={wrap}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
        className="relative mx-auto w-[96%] max-w-[1760px]"
      >
        <ul className="border-t border-[#17191a]/10">
          {items.map((it, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li key={it.label.ru} className="border-b border-[#17191a]/10">
                <a
                  href={href}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex items-center gap-5 py-6 transition-opacity duration-500 lg:gap-10 lg:py-9 ${dim ? "opacity-30" : "opacity-100"}`}
                >
                  <span className="w-8 shrink-0 text-[12px] tabular-nums text-[#17191a]/40 lg:w-12 lg:text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span
                      className={`block text-[22px] font-light leading-[1.15] text-[#17191a] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] sm:text-[28px] lg:text-[clamp(30px,3vw,52px)] ${on ? "translate-x-3 lg:translate-x-6" : ""}`}
                    >
                      {it.label[lang]}
                    </span>
                    {/* Бордовая линия, вырастающая под строкой */}
                    <span
                      aria-hidden
                      className={`absolute -bottom-2 left-0 h-px bg-[#46131E] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] lg:-bottom-3 ${on ? "w-24 lg:w-40" : "w-0"}`}
                    />
                  </span>

                  <span className="hidden max-w-[320px] text-right text-[13px] leading-[1.5] text-[#17191a]/50 lg:block">
                    {it.sub[lang]}
                  </span>

                  {/* Мобильная миниатюра */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.img} alt="" loading="lazy" className="h-14 w-11 shrink-0 rounded-[8px] object-cover lg:hidden" />

                  <span
                    aria-hidden
                    className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[16px] transition-all duration-500 lg:flex ${on ? "-rotate-45 border-[#46131E] bg-[#46131E] text-white" : "border-[#17191a]/20 text-[#17191a]"}`}
                  >
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Плавающее фото за курсором (только десктоп) */}
        <div
          ref={float}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
        >
          <div
            className={`relative h-[340px] w-[260px] overflow-hidden rounded-[12px] shadow-[0_30px_60px_-20px_rgba(23,25,26,0.35)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${active !== null ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
          >
            {items.map((it, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={it.img + i}
                src={it.img}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
