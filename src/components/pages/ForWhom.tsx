"use client";
// «Для кого ÁLIS» — как на cryome: закреплённая секция, заголовок и нумерованный
// список стоят на месте, большое фото слева меняется кросс-фейдом по мере скролла.
// Активный шаг считается от прогресса скролла внутри секции. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { line: Loc; img: string };

const ITEMS: Item[] = [
  { line: { ru: "много работает и живёт в плотном графике", en: "works a lot and lives on a tight schedule" }, img: "/assets/tild6230-643__.jpg" },
  { line: { ru: "ценит ухоженный вид без лишних действий", en: "values a groomed look without extra fuss" }, img: "/assets/tild6530-383_-2___1_.jpg" },
  { line: { ru: "любит эстетичный уход и красивые ритуалы", en: "loves aesthetic care and beautiful rituals" }, img: "/assets/tild3236-393__.jpg" },
  { line: { ru: "хочет регулярный результат без спешки", en: "wants a regular result without the rush" }, img: "/assets/tild3638-373_-2___1__3.jpg" },
];

export default function ForWhom() {
  const { lang } = useLang();
  const en = lang === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    // rAF-цикл: не зависит от событий скролла (важно из-за SmoothScroll/Lenis)
    const tick = () => {
      const total = el.offsetHeight - window.innerHeight;
      if (total > 0) {
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
        const idx = Math.max(0, Math.min(ITEMS.length - 1, Math.floor((scrolled / total) * ITEMS.length)));
        setActive((prev) => (prev === idx ? prev : idx));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="for-whom" ref={sectionRef} className="relative bg-white lg:h-[340vh]">
      {/* Закреплённый экран */}
      <div className="flex min-h-svh flex-col justify-center py-24 lg:sticky lg:top-0 lg:h-svh lg:py-0">
        <div className="mx-auto w-[92%] max-w-[1300px]">
          {/* Заголовок по центру */}
          <div className="mb-12 text-center lg:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
              {en ? "for whom ÁLIS" : "для кого ÁLIS"}
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-[28px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[42px]">
              {en ? "For women with different rhythms of life" : "Для женщин с разным ритмом жизни"}
            </h2>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Фото — кросс-фейд */}
            <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[26px]">
              {ITEMS.map((it, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={it.img}
                  src={it.img}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
                  draggable={false}
                />
              ))}
            </div>

            {/* Нумерованный список */}
            <ul className="flex flex-col">
              {ITEMS.map((it, i) => {
                const on = i === active;
                return (
                  <li
                    key={it.line.ru}
                    onMouseEnter={() => setActive(i)}
                    className="grid cursor-default grid-cols-[auto_1fr] items-start gap-6 border-t border-[#17191a]/12 py-6 last:border-b lg:gap-8 lg:py-7"
                  >
                    <span className={`font-display text-[15px] tabular-nums transition-colors duration-300 ${on ? "text-[#3B0D1A]" : "text-[#17191a]/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-[16px] leading-snug transition-colors duration-300 lg:text-[19px] ${on ? "text-[#3B0D1A]" : "text-[#17191a]/40"}`}>
                      {it.line[lang]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
