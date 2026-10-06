"use client";
// ОБЛОЖКА внутренних страниц — точно как первый блок главной (Hero); кнопка — по желанию:
// фото на весь экран, затемнение снизу, заголовок капсом по центру в нижней части кадра.
// Используется на всех страницах, кроме главной и контактов.
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { useHeroParallax } from "@/lib/useHeroParallax";

type Loc = { ru: string; en: string };

// Фото — заменить на съёмку. object-cover, тянется на весь экран.
const DEFAULT_PHOTO = "/assets/alis/img_6009.jpg";

export default function TeamIntro({
  title,
  kicker,
  photo = DEFAULT_PHOTO,
  button,
  button2,
  subtitle,
}: {
  title: Loc;
  kicker?: Loc; // короткая продающая строка мелко над заголовком (как оффер на главной)
  photo?: string;
  // Кнопка во всю ширину внизу — как «Оформить визит» на главной
  button?: { label: Loc; href: string };
  // Вторая кнопка — две плашки в ряд, как на главной: первая белая, вторая стеклянная
  button2?: { label: Loc; href: string };
  // Длинный заголовок-оффер (в несколько строк) + мелкая строка под ним
  subtitle?: Loc;
}) {
  const { lang } = useLang();
  // Эффект «статичного фона»: фото уезжает медленнее страницы
  const bg = useRef<HTMLImageElement>(null);
  useHeroParallax(bg);

  return (
    // Белая подложка — чтобы под скруглёнными нижними углами был белый фон, как у страницы
    <div className="bg-white">
    <section className="relative isolate flex min-h-[100svh] flex-col sm:min-h-[92svh] items-center justify-end overflow-hidden rounded-b-[28px] bg-[#b9b3a9] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={bg} src={photo} alt={`${title[lang]} — ÁLIS BEAUTY`} className="absolute inset-x-0 top-0 -z-20 h-full w-full object-cover object-center will-change-transform" />
      {/* Затемнение как на главной: сверху — под шапку, снизу — под заголовок */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,0) 22%), linear-gradient(to top, rgba(20,18,16,.5) 0%, rgba(20,18,16,.12) 45%, rgba(20,18,16,0) 70%)",
        }}
      />

      <div className={`flex w-full max-w-[1320px] flex-col items-center px-6 ${button ? "pb-4 sm:pb-[clamp(32px,6vh,72px)]" : "pb-[clamp(56px,11vh,120px)]"} text-center`}>
        {kicker && (
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,.35)] lg:mb-4 lg:text-[13px]">
            {kicker[lang]}
          </p>
        )}
        <h1 className={`${subtitle ? "max-w-[30ch] lg:max-w-[44ch]" : "whitespace-nowrap"} text-[clamp(18px,6vw,24px)] font-serif-display font-normal uppercase leading-[1.15] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[26px] lg:text-[clamp(26px,2.1vw,38px)]`}>
          {title[lang]}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-[620px] !text-[11.5px] leading-[1.55] text-white/85 sm:mt-4 sm:!text-[12.5px] sm:leading-[1.6] sm:text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,.35)] lg:!text-[13px]">
            {subtitle[lang]}
          </p>
        )}
      </div>

      {button && (
        <div className={`grid w-full gap-2 px-5 pb-5 sm:gap-3 sm:px-4 sm:pb-4 lg:gap-4 lg:px-6 lg:pb-6 ${button2 ? (button2.label.ru.length > 22 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2") : ""}`}>
          {[button, button2].filter((b): b is { label: Loc; href: string } => !!b).map((b, i) => (
            <a
              key={b.href}
              href={b.href}
              {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex w-full items-center justify-center whitespace-nowrap rounded-xl border px-1.5 py-3 text-[10px] font-medium uppercase tracking-[0.05em] backdrop-blur-md transition-colors duration-300 sm:py-3.5 sm:text-[13px] sm:tracking-[0.18em] lg:py-4 lg:text-[14px] ${
                i === 0
                  ? "border-white bg-white text-[#17191a] hover:bg-white/[0.18] hover:text-white"
                  : "border-white/70 bg-white/[0.18] text-white hover:border-white hover:bg-white hover:text-[#17191a]"
              }`}
            >
              {b.label[lang]}
            </a>
          ))}
        </div>
      )}
    </section>
    </div>
  );
}
