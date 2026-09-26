"use client";
// ОБЛОЖКА внутренних страниц: полноэкранное фото без логотипа и эффектов прокрутки.
// По центру экрана — заголовок страницы как на референсе bemont.ru («НАШИ ВРАЧИ /
// КОМАНДА»): мелкая строка сверху и название. Без кнопок (убраны по фидбеку).
// Используется на всех страницах, кроме главной и контактов.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

// Фото — заменить на съёмку. object-cover, тянется на весь экран.
const DEFAULT_PHOTO = "/assets/alis/img_6009.jpg";
const BRAND: Loc = { ru: "ÁLIS BEAUTY", en: "ÁLIS BEAUTY" };

export default function TeamIntro({
  title,
  kicker = BRAND,
  photo = DEFAULT_PHOTO,
}: {
  title: Loc;
  kicker?: Loc;
  photo?: string;
}) {
  const { lang } = useLang();

  return (
    <section className="relative isolate flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#3a3631] px-6 text-center text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* Затемнение: сверху — под светлую шапку, по центру — лёгкое, под заголовок */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,0) 26%), radial-gradient(ellipse at center, rgba(20,18,16,.22) 0%, rgba(20,18,16,0) 65%)",
        }}
      />

      {/* Заголовок страницы — строго по центру экрана */}
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 sm:text-[12px]">
        {kicker[lang]}
      </p>
      <h1 className="mt-3 font-serif-display text-[26px] font-normal uppercase leading-[1.15] tracking-[0.06em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,.2)] sm:text-[32px] lg:mt-4 lg:text-[clamp(32px,2.6vw,44px)]">
        {title[lang]}
      </h1>
    </section>
  );
}