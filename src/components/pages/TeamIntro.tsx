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
}: {
  title: Loc;
  kicker?: Loc; // короткая продающая строка мелко над заголовком (как оффер на главной)
  photo?: string;
  // Кнопка во всю ширину внизу — как «Оформить визит» на главной
  button?: { label: Loc; href: string };
}) {
  const { lang } = useLang();
  // Эффект «статичного фона»: фото уезжает медленнее страницы
  const bg = useRef<HTMLImageElement>(null);
  useHeroParallax(bg);

  return (
    // Белая подложка — чтобы под скруглёнными нижними углами был белый фон, как у страницы
    <div className="bg-white">
    <section className="relative isolate flex min-h-[92svh] flex-col items-center justify-end overflow-hidden rounded-b-[28px] bg-[#b9b3a9] text-white">
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

      <div className={`flex w-full max-w-[1320px] flex-col items-center px-6 ${button ? "pb-[clamp(32px,6vh,72px)]" : "pb-[clamp(56px,11vh,120px)]"} text-center`}>
        {kicker && (
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,.35)] lg:mb-4 lg:text-[13px]">
            {kicker[lang]}
          </p>
        )}
        <h1 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[26px] lg:text-[clamp(26px,2.1vw,38px)]">
          {title[lang]}
        </h1>
      </div>

      {button && (
        <div className="w-full px-4 pb-4 lg:px-6 lg:pb-6">
          <a
            href={button.href}
            {...(button.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="alis-pulse flex w-full items-center justify-center rounded-xl border border-white/70 bg-white/[0.18] py-3.5 text-[13px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a] lg:py-4 lg:text-[14px]"
          >
            {button.label[lang]}
          </a>
        </div>
      )}
    </section>
    </div>
  );
}
