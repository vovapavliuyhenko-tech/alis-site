"use client";
// ЭТАПЫ выездного сервиса — «шторка» (по референсу yakupova-design): каждый этап
// на весь экран, одна половина — крупное фото, другая — мелкий текст по центру,
// стороны чередуются. Панели ЗАЛИПАЮТ (sticky top-0) и наезжают друг на друга при
// скролле, как накладывающиеся шторки. На мобиле — обычная вертикальная стопка.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { type Stage } from "@/components/HorizontalStory";

type Loc = { ru: string; en: string };

export default function ConciergeStages({
  stages,
  sectionId,
  eyebrow = { ru: "как это работает", en: "how it works" },
  title = { ru: "Этапы выезда", en: "How it works" },
  stepLabel = { ru: "Этап", en: "Step" },
}: {
  stages: Stage[];
  sectionId?: string;
  eyebrow?: Loc;
  title?: Loc | null; // null — без заголовка
  stepLabel?: Loc; // подпись над номером («Этап» / «Шаг»)
}) {
  const { lang } = useLang();
  const texts = useRef<(HTMLDivElement | null)[]>([]);

  // Текст этапа «вырастает» при прокрутке, как во втором блоке главной:
  // пока панель въезжает снизу — 50 % и ниже на 50px, к моменту, когда панель встала, — 100 %
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      texts.current.forEach((el) => {
        const panel = el?.parentElement?.parentElement;
        if (!el || !panel) return;
        const top = panel.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)));
        el.style.setProperty("transform", `translate3d(0, ${(1 - p) * 50}px, 0) scale(${0.5 + p * 0.5})`);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stages.length]);

  return (
    <section id={sectionId} className="relative scroll-mt-24 bg-white section-y">
      {title && (
        <div className="r-reveal mx-auto w-[96%] max-w-[1760px] pt-12 pb-12 text-center lg:pt-[60px] lg:pb-16">
          <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
            {title[lang]}
          </h2>
        </div>
      )}

      {stages.map((s, i) => {
        const photoRight = i % 2 === 0; // 1-й: текст слева, фото справа; далее чередуется
        return (
          <div
            key={s.name.ru}
            className={`relative h-svh min-h-[560px] w-full overflow-hidden rounded-t-[28px] lg:rounded-[28px] ${i === stages.length - 1 ? "rounded-b-[28px]" : ""} shadow-[0_-4px_10px_-8px_rgba(23,25,26,0.12),0_8px_18px_-10px_rgba(23,25,26,0.18)] sticky top-0`}
          >
            <div className="grid h-full grid-cols-1 lg:grid-cols-2">
              {/* Текст — по центру, мелкий */}
              <div data-fab-avoid className={`flex flex-col items-center justify-center bg-white px-8 py-14 text-center lg:px-[6vw] ${photoRight ? "lg:order-1" : "lg:order-2"}`}>
                <div
                  ref={(el) => {
                    texts.current[i] = el;
                  }}
                  className="flex flex-col items-center will-change-transform"
                >
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#17191a]">
                  {stepLabel[lang]} 0{i + 1}
                </span>
                <h3 className="mt-4 max-w-[26ch] font-serif-display text-[20px] sm:mt-6 sm:max-w-[18ch] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[24px]">
                  {s.heading[lang]}
                </h3>
                <p className="mt-3 max-w-[335px] !text-[11px] leading-[1.55] text-[#17191a]/65 sm:mt-5 sm:max-w-md sm:!text-[13px] lg:!text-[13.5px]">
                  {s.desc[lang]}
                </p>
                </div>
              </div>

              {/* Фото — половина экрана в ширину */}
              {/* Телефон: фото без скруглений, у последнего этапа — скругление снизу */}
              <div className={`relative min-h-[42vh] overflow-hidden ${i === stages.length - 1 ? "max-lg:rounded-b-[28px]" : ""} ${photoRight ? "lg:order-2" : "lg:order-1"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.heading[lang]}
                  aria-hidden
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
