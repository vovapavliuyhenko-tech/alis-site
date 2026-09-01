"use client";
// Первый блок страницы «Салон» — сплит-герой в стиле PALOMA:
// слева фото на всю высоту, справа белая панель (лого сверху, крупный заголовок,
// подзаголовок и растянутая кнопка записи внизу). В бордовой палитре ÁLIS.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHOTO = "/assets/tild6530-383_-2___1_.jpg";

export default function SalonHero() {
  const { lang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  return (
    <section className="relative w-full lg:grid lg:min-h-svh lg:grid-cols-2">
      {/* Левая часть — фото */}
      <div className="relative h-[40vh] min-h-[280px] lg:h-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Правая часть — белая панель */}
      <div className="relative flex min-h-[60vh] flex-col bg-white px-6 pb-6 pt-24 lg:min-h-svh lg:px-14 lg:pb-8 lg:pt-28">
        {/* Лого сверху справа */}
        <div className="flex justify-end">
          <span className="font-logo text-[18px] uppercase leading-none tracking-[0.22em] text-[#3B0D1A] sm:text-[20px]">
            ÁLIS&nbsp;BEAUTY
          </span>
        </div>

        {/* Заголовок + подзаголовок по центру */}
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h1 className="font-display text-[30px] font-semibold uppercase leading-[1.1] tracking-[0.02em] text-[#3B0D1A] sm:text-[44px] lg:text-[50px]">
            {t("Салон красоты,", "A beauty salon")}
            <br />
            {t("в который хочется", "you'll want to")}
            <br />
            {t("возвращаться", "come back to")}
          </h1>
          <p className="mt-6 max-w-[460px] text-[14px] leading-relaxed text-[#17191a]/60 sm:text-[15.5px]">
            {t(
              "ÁLIS BEAUTY — салон полного цикла: маникюр, педикюр, брови, макияж и волосы. Полный образ за один визит — сервис и забота под ключ.",
              "ÁLIS BEAUTY — a full-service salon: nails, brows, makeup and hair. A complete look in one visit — turnkey service and care."
            )}
          </p>
        </div>

        {/* Кнопка записи — растянута внизу панели */}
        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#3B0D1A] bg-[#3B0D1A] py-5 text-[12.5px] font-medium uppercase tracking-[0.2em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A] sm:text-[13.5px]"
        >
          {t("Записаться", "Book now")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 21s-7.5-4.6-10-9.2C.6 8.9 2 6 5 6c1.8 0 3 .9 3.9 2.2C9.8 6.9 11.2 6 13 6c3 0 4.4 2.9 3 5.8C20.5 16.4 12 21 12 21z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
