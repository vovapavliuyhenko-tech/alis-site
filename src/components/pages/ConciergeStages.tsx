"use client";
// ЭТАПЫ выездного сервиса — «шторка» (по референсу yakupova-design): каждый этап
// на весь экран, одна половина — крупное фото, другая — мелкий текст по центру,
// стороны чередуются. Панели ЗАЛИПАЮТ (sticky top-0) и наезжают друг на друга при
// скролле, как накладывающиеся шторки. На мобиле — обычная вертикальная стопка.
import { useLang } from "@/lib/i18n";
import { type Stage } from "@/components/HorizontalStory";

export default function ConciergeStages({ stages, sectionId }: { stages: Stage[]; sectionId?: string }) {
  const { lang } = useLang();

  return (
    <section id={sectionId} className="relative scroll-mt-24 bg-white">
      {stages.map((s, i) => {
        const photoRight = i % 2 === 0; // 1-й: текст слева, фото справа; далее чередуется
        return (
          <div
            key={s.name.ru}
            className="relative h-svh min-h-[560px] w-full overflow-hidden rounded-t-[28px] lg:sticky lg:top-0"
          >
            <div className="grid h-full grid-cols-1 lg:grid-cols-2">
              {/* Текст — по центру, мелкий */}
              <div className={`flex flex-col items-center justify-center bg-white px-8 py-14 text-center lg:px-[6vw] ${photoRight ? "lg:order-1" : "lg:order-2"}`}>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#46131E]">
                  {lang === "en" ? "Step" : "Этап"} 0{i + 1}
                </span>
                <h3 className="mt-6 max-w-[18ch] font-serif-display text-[20px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[24px]">
                  {s.heading[lang]}
                </h3>
                <p className="mt-5 max-w-md text-[13px] leading-relaxed text-[#17191a]/65 lg:text-[13.5px]">
                  {s.desc[lang]}
                </p>
              </div>

              {/* Фото — половина экрана в ширину */}
              <div className={`relative min-h-[42vh] ${photoRight ? "lg:order-2" : "lg:order-1"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt=""
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
