"use client";
// ОБЛОЖКА внутренних страниц: полноэкранное фото без логотипа и эффектов прокрутки.
// Внизу по центру — заголовок страницы как на референсе bemont.ru («НАШИ ВРАЧИ /
// КОМАНДА»): мелкая строка сверху и крупное название. Ниже — опциональная
// широкая стеклянная кнопка. Используется на всех страницах, кроме главной и контактов.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

// Фото — заменить на съёмку. object-cover, тянется на весь экран.
const DEFAULT_PHOTO = "/assets/alis/img_6009.jpg";
const BRAND: Loc = { ru: "ÁLIS BEAUTY", en: "ÁLIS BEAUTY" };

export default function TeamIntro({
  title,
  kicker = BRAND,
  cta,
  photo = DEFAULT_PHOTO,
}: {
  title: Loc;
  kicker?: Loc;
  cta?: { label: Loc; href: string };
  photo?: string;
}) {
  const { lang } = useLang();

  return (
    <section className="relative isolate flex h-[100svh] flex-col overflow-hidden bg-[#3a3631] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* Затемнение: сверху — под светлую шапку, снизу — под заголовок */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,0) 26%), linear-gradient(to top, rgba(20,18,16,.45) 0%, rgba(20,18,16,.1) 40%, rgba(20,18,16,0) 60%)",
        }}
      />

      {/* Заголовок страницы — внизу по центру */}
      <div className={`mt-auto flex flex-col items-center px-6 text-center ${cta ? "pb-8 lg:pb-12" : "pb-[clamp(56px,11vh,120px)]"}`}>
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/90 sm:text-[14px]">
          {kicker[lang]}
        </p>
        <h1 className="mt-4 font-serif-display text-[34px] font-normal uppercase leading-[1.05] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[48px] lg:mt-6 lg:text-[clamp(48px,4.6vw,76px)]">
          {title[lang]}
        </h1>
      </div>

      {cta && (
        <div className="px-4 pb-4 lg:px-5 lg:pb-5">
          <a
            href={cta.href}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/15 px-8 py-5 text-[13px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#17191a] lg:text-[14px]"
          >
            {cta.label[lang]}
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </section>
  );
}
