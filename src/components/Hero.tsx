"use client";
// HERO ALIS: оффер + выгода по центру на мягком световом фоне и растянутая
// кнопка целевого действия («Записаться») во всю ширину внизу блока.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function Hero() {
  const { lang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  return (
    <section className="relative flex h-svh min-h-[600px] w-full flex-col overflow-hidden bg-[#f4efe6]">
      {/* Мягкое световое пятно за текстом */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-[78vh] w-[86vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,13,26,0.12) 0%, rgba(74,75,51,0.06) 34%, rgba(244,239,230,0) 70%)",
        }}
      />

      {/* Оффер по центру */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="font-script text-[30px] leading-none text-[#4A4B33] sm:text-[38px]">
          {t("красота под ключ", "turnkey beauty")}
        </p>

        <h1 className="mt-3 font-display text-[34px] font-semibold uppercase leading-[1.04] tracking-[0.02em] text-[#3B0D1A] sm:text-[58px]">
          {t("Безупречный образ", "A flawless look")}
          <br />
          {t("за один визит", "in a single visit")}
        </h1>

        <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-[#17191a]/65 sm:text-[17px]">
          {t(
            "Маникюр, макияж, волосы и брови — в 4–6 рук. Полный образ за одно посещение и −10% в первый визит.",
            "Nails, makeup, hair and brows — in 4–6 hands. A complete look in one visit and −10% off your first time."
          )}
        </p>
      </div>

      {/* Целевое действие — растянутая кнопка внизу блока */}
      <a
        href={YCLIENTS}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-10 mx-3 mb-3 flex items-center justify-center gap-3 rounded-2xl bg-[#3B0D1A] py-6 text-[13px] font-medium uppercase tracking-[0.2em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#4A4B33] sm:mx-4 sm:mb-4 sm:text-[14px]"
      >
        {t("Записаться со скидкой −10%", "Book with −10% off")}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
