"use client";
// HERO главной — полноэкранное фоновое фото, по мотивам референса bemont.ru:
// текст по центру в нижней части кадра — мелкая строка-подводка, крупный
// заголовок капсом и кнопка «Оформить визит». Верхнюю навигацию несёт глобальная
// шапка ÁLIS (светлая над этим блоком). Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// TODO: заменить на светлое фото — его подберёт Зера.
const BG_PHOTO = "/assets/alis/img_2745.jpg";

export default function Hero() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-end overflow-hidden bg-[#b9b3a9] text-white">
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

      <div className="flex w-full max-w-[1320px] flex-col items-center px-6 pb-[130px] text-center sm:pb-[clamp(56px,11vh,120px)]">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 sm:text-[13px]">
          {t("Салон красоты и бьюти-консьерж в Новороссийске", "Beauty salon & beauty concierge in Novorossiysk")}
        </p>

        <h1 className="mt-4 font-serif-display text-[30px] font-normal uppercase leading-[1.08] tracking-[0.01em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[44px] lg:mt-5 lg:text-[clamp(40px,3.9vw,68px)]">
          {t("Отражаем внутреннюю красоту", "Reflecting inner beauty")}
          <br />
          {t("во внешней", "on the outside")}
        </h1>

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#46131E] hover:bg-[#46131E] lg:mt-10"
        >
          {t("Оформить визит", "Arrange a visit")}
        </a>
      </div>
    </section>
  );
}
