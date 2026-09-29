"use client";
// HERO главной — полноэкранное фоновое фото, по мотивам референса bemont.ru:
// текст по центру в нижней части кадра — заголовок капсом и кнопка «Оформить визит». Верхнюю навигацию несёт глобальная
// шапка ÁLIS BEAUTY (светлая над этим блоком). Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// TODO: заменить на светлое фото — его подберёт Зера.
const BG_PHOTO = "/assets/alis/img_2745.jpg";

export default function Hero() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  return (
    // Белая подложка — чтобы под скруглёнными нижними углами был белый фон, как у страницы
    <div className="bg-white">
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-end overflow-hidden rounded-b-[28px] bg-[#b9b3a9] text-white">
      {/* Фоновое фото */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BG_PHOTO} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      {/* Лёгкое затемнение: сверху — под шапку, снизу — под текст */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,0) 22%), linear-gradient(to top, rgba(20,18,16,.5) 0%, rgba(20,18,16,.12) 45%, rgba(20,18,16,0) 70%)",
        }}
      />

      <div className="flex w-full max-w-[1320px] flex-col items-center px-6 pb-[clamp(32px,6vh,72px)] text-center">
        <h1 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[26px] lg:text-[clamp(26px,2.1vw,38px)]">
          {t("Отражаем внутреннюю красоту", "Reflecting inner beauty")}
          <br />
          {t("во внешней", "on the outside")}
        </h1>
      </div>

      {/* Кнопка — во всю ширину экрана внизу блока: размытое стекло, при наведении — светлая */}
      <div className="w-full px-4 pb-4 lg:px-6 lg:pb-6">
        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-xl border border-white/70 bg-white/[0.18] py-3.5 text-[13px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a] lg:py-4 lg:text-[14px]"
        >
          {t("Оформить визит", "Arrange a visit")}
        </a>
      </div>
    </section>
    </div>
  );
}
