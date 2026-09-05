"use client";
// Первый блок страницы «Салон» — сплит-герой в стиле PALOMA:
// слева фото на всю высоту, справа белая панель (лого сверху, крупный заголовок,
// подзаголовок и растянутая кнопка записи внизу). В бордовой палитре ÁLIS.
import { useLang } from "@/lib/i18n";
import { LogoEmblem, LogoWord } from "@/components/Logo";

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
        {/* Логотип наверху панели */}
        <div className="flex items-center justify-center gap-3">
          <LogoEmblem variant="wine" className="h-10 w-auto max-w-none" />
          <LogoWord variant="wine" className="h-[20px] w-auto max-w-none" />
        </div>

        {/* Заголовок + подзаголовок по центру */}
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h1 className="font-display text-[19px] font-normal uppercase leading-[1.16] tracking-[0.03em] text-[#3B0D1A] sm:text-[25px] lg:text-[31px]">
            {t("Салон красоты,", "A beauty salon")}
            <br />
            {t("в который хочется", "you'll want to")}
            <br />
            {t("возвращаться", "come back to")}
          </h1>
          <p className="mt-5 max-w-[420px] text-[12.5px] leading-relaxed text-[#17191a]/60 sm:text-[13.5px]">
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
          className="font-display flex w-full items-center justify-center rounded-2xl border border-[#3B0D1A] bg-[#3B0D1A] py-5 text-[12px] uppercase tracking-[0.2em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A] sm:text-[13px]"
        >
          {t("Записаться", "Book now")}
        </a>
      </div>
    </section>
  );
}
