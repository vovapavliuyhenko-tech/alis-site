"use client";
// HERO ALIS: фон-фото на весь экран, оффер внизу слева, список услуг внизу
// справа (раскладка как на референсе). Кнопка записи — растянутая внизу блока.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHOTO = "/assets/tild6230-643__.jpg";

export default function Hero() {
  const { lang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  const services = [
    t("Маникюр", "Manicure"),
    t("Педикюр", "Pedicure"),
    t("Брови", "Brows"),
    t("Ресницы", "Lashes"),
    t("Макияж", "Makeup"),
    t("Волосы", "Hair"),
    t("Выезд", "On-location"),
  ];

  return (
    <section className="relative h-svh min-h-[600px] w-full overflow-hidden bg-[#17191a]">
      {/* Фоновое фото */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      {/* Затемнение снизу для читаемости светлого текста */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#17191a]/80 via-[#17191a]/25 to-[#17191a]/5" />

      {/* Контент внизу: слева оффер, справа услуги */}
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 sm:px-8 sm:pb-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Оффер слева */}
          <div className="max-w-3xl">
            <h1 className="font-display text-[22px] font-normal uppercase leading-[1.12] tracking-[0.03em] text-[#f4efe6] sm:text-[30px] lg:text-[38px]">
              {t("Уходите как хотели,", "Leave looking how you wanted,")}
              <br />
              {t("а не «как получилось»", "not “how it turned out”")}
            </h1>
            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-[#f4efe6]/80 sm:text-[15px]">
              {t(
                "Волосы, ногти, брови и макияж — за один визит, в 4–6 рук. Разберём ваше фото до начала работы и согласуем результат с вами. −10% на первый визит.",
                "Hair, nails, brows and makeup — in one visit, in 4–6 hands. We review your reference before we start and agree the result with you. −10% on your first visit.",
              )}
            </p>
          </div>

          {/* Услуги справа */}
          <div className="shrink-0 lg:max-w-xs lg:text-right">
            <p className="mb-3 text-[13px] uppercase tracking-[0.16em] text-[#f4efe6]/60">[{t("Сделаем", "We do")}]</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] text-[#f4efe6] lg:justify-end lg:text-[16px]">
              {services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Целевое действие — растянутая кнопка (без изменений) */}
      <a
        href={YCLIENTS}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display absolute inset-x-4 bottom-5 z-10 flex items-center justify-center rounded-2xl border border-[#3B0D1A] bg-[#3B0D1A] py-5 text-[12px] uppercase tracking-[0.2em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#f4efe6] sm:inset-x-6 sm:bottom-6 sm:text-[13px]"
      >
        {t("Записаться со скидкой −10%", "Book with −10% off")}
      </a>
    </section>
  );
}
