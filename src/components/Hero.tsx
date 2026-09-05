"use client";
// HERO ALIS — центрированная раскладка по мотивам cryome: надстрочник, крупный
// заголовок с акцентными словами, подзаголовок, тёмная пилюля-кнопка, сноска и
// ряд круглых миниатюр внизу. Светлый фон. Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

const THUMBS = [
  "/assets/tild6230-643__.jpg",
  "/assets/tild3236-393__.jpg",
  "/assets/tild6530-383_-2___1_.jpg",
  "/assets/tild3638-373_-2___1__3.jpg",
  "/assets/tild3561-646_-2___1__5.jpg",
  "/assets/tild6536-613_-2___1__4.jpg",
];

export default function Hero() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  return (
    <section className="relative flex h-svh min-h-[640px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f7f3ed] to-[#efe7db] px-6 pt-20 text-center">
      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        {/* Надстрочник */}
        <p className="text-[11px] font-medium tracking-wide text-[#2a2320]/80 sm:text-[12px]">
          {t("как на вашем фото. с первого раза.", "just like in your photo. from the first visit.")}
        </p>

        {/* Заголовок с акцентами */}
        <h1 className="mt-4 font-display text-[22px] font-normal uppercase leading-[1.1] tracking-[0.02em] text-[#2a2320] sm:text-[30px] lg:text-[38px]">
          <span className="text-[#4A4B33]">ÁLIS BEAUTY</span> —{" "}
          {t("полный образ", "a complete look")}{" "}
          <span className="text-[#4A4B33]">{t("за 2 часа", "in 2 hours")}</span>{" "}
          {t("в одном кресле", "in one chair")}
        </h1>

        {/* Подзаголовок */}
        <p className="mt-5 max-w-md text-[12.5px] leading-relaxed text-[#2a2320]/70 sm:text-[13.5px]">
          {t(
            "Волосы, ногти, брови и макияж одновременно, в 4–6 рук — без разъездов по трём мастерам и без потерянной субботы.",
            "Hair, nails, brows and makeup at once, in 4–6 hands — no running between three masters and no lost Saturday.",
          )}
        </p>

        {/* Кнопка-пилюля */}
        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-[#2a2320] px-11 py-4 font-display text-[13px] uppercase tracking-[0.14em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#3B0D1A] sm:text-[14px]"
        >
          ( {t("записаться", "book now")} )
        </a>

        {/* Сноска */}
        <p className="mt-4 max-w-xs text-[11px] italic leading-snug text-[#2a2320]/50">
          {t("* один визит вместо трёх поездок по городу", "* one visit instead of three trips across town")}
        </p>
      </div>

      {/* Ряд круглых миниатюр */}
      <div className="relative z-10 mt-8 flex items-center gap-2.5 sm:mt-10 sm:gap-3">
        {THUMBS.map((src) => (
          <span
            key={src}
            className="h-10 w-10 overflow-hidden rounded-full border border-[#2a2320]/10 bg-white shadow-sm sm:h-11 sm:w-11"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
          </span>
        ))}
      </div>
    </section>
  );
}
