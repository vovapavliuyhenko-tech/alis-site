"use client";
// HERO главной — полноэкранное фоновое фото, по мотивам референса bemont.ru:
// текст по центру в нижней части кадра — заголовок капсом и кнопка «Оформить визит». Верхнюю навигацию несёт глобальная
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

      <div className="flex w-full max-w-[1320px] flex-col items-center px-6 pb-[clamp(56px,11vh,120px)] text-center">
        <h1 className="font-serif-display text-[24px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[30px] lg:text-[clamp(30px,2.5vw,44px)]">
          {t("Отражаем внутреннюю красоту", "Reflecting inner beauty")}
          <br />
          {t("во внешней", "on the outside")}
        </h1>

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-w-[280px] items-center justify-center rounded-full border border-white/60 bg-white/10 px-16 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#17191a] hover:bg-[#17191a] lg:mt-8 lg:min-w-[340px]"
        >
          {t("Оформить визит", "Arrange a visit")}
        </a>
      </div>
    </section>
  );
}
