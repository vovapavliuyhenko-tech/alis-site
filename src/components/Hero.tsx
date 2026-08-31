"use client";
// HERO ALIS: оффер + выгода по центру на фоновом фото со светлой вуалью и
// растянутая кнопка целевого действия («Записаться») с полями внизу блока.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHOTO = "/assets/tild6230-643__.jpg";

export default function Hero() {
  const { lang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  return (
    <section className="relative flex h-svh min-h-[600px] w-full flex-col overflow-hidden bg-[#f4efe6]">
      {/* Фоновое фото */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />

      {/* Светлая вуаль для читаемости тёмного текста */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,239,230,0.72) 0%, rgba(244,239,230,0.55) 40%, rgba(244,239,230,0.78) 100%)",
        }}
      />
      {/* Мягкое световое пятно за текстом */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[70vh] w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(244,239,230,0.85) 0%, rgba(244,239,230,0.4) 42%, rgba(244,239,230,0) 72%)",
        }}
      />

      {/* Оффер по центру */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="font-script text-[26px] leading-none text-[#4A4B33] sm:text-[32px]">
          {t("красота под ключ", "turnkey beauty")}
        </p>

        <h1 className="mt-3 font-display text-[28px] font-semibold uppercase leading-[1.06] tracking-[0.03em] text-[#3B0D1A] sm:text-[46px]">
          {t("Безупречный образ", "A flawless look")}
          <br />
          {t("за один визит", "in a single visit")}
        </h1>

        <p className="mt-4 max-w-[460px] text-[13.5px] leading-relaxed text-[#17191a]/65 sm:text-[15px]">
          {t(
            "Маникюр, макияж, волосы и брови — в 4–6 рук. Полный образ за одно посещение и −10% в первый визит.",
            "Nails, makeup, hair and brows — in 4–6 hands. A complete look in one visit and −10% off your first time."
          )}
        </p>
      </div>

      {/* Целевое действие — растянутая кнопка с полями внизу блока */}
      <a
        href={YCLIENTS}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mx-4 mb-9 flex items-center justify-center rounded-2xl bg-[#3B0D1A] py-5 text-[12.5px] font-medium uppercase tracking-[0.22em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#4A4B33] sm:mx-6 sm:mb-11 sm:text-[13.5px]"
      >
        {t("Записаться со скидкой −10%", "Book with −10% off")}
      </a>
    </section>
  );
}
