"use client";
// HERO «Студия массажа» — полноэкранное фоновое фото. Верхнюю навигацию несёт
// глобальная шапка ÁLIS (светлая над этим блоком). Внизу слева — вводный текст,
// крупный серифный заголовок и широкая кнопка записи; внизу справа — компактная
// матовая карточка-отзыв. Двуязычно. Фото — плейсхолдеры (заменить на съёмки).
import type { CSSProperties } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// Плейсхолдеры — заменить на настоящее фото массажа и портрет специалиста.
const BG_PHOTO = "/assets/tild6230-643__.jpg";
const SPECIALIST_PHOTO = "/assets/tild6536-613_-2___1__4.jpg";

// Единые отступы блока
const vars = {
  "--pad": "clamp(20px,3.2vw,54px)",
  "--btm": "clamp(26px,3.4vw,48px)",
} as CSSProperties;

export default function Hero() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  return (
    <section
      style={vars}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#b9b3a9] text-white"
    >
      {/* Фоновое фото */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BG_PHOTO} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      {/* Затемнение для читаемости: сверху (под шапку) и в левом-нижнем углу */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.42) 0%, rgba(20,18,16,0) 24%), linear-gradient(200deg, rgba(20,18,16,0) 40%, rgba(20,18,16,.5) 100%)",
        }}
      />

      {/* НИЖНИЙ КОНТЕНТ (слева) */}
      <div className="mt-auto px-6 pb-7 lg:absolute lg:bottom-[var(--btm)] lg:left-0 lg:mt-0 lg:max-w-[min(760px,58vw)] lg:pb-0 lg:pl-[var(--pad)] lg:pr-6">
        <p className="text-[11.5px] leading-relaxed text-white/90">
          {t("Волосы, ногти, брови и макияж — сразу.", "Hair, nails, brows and makeup — all at once.")}
          <br />
          {t("Приходите уставшей — выходите собранной. За один визит.", "Come in tired — leave put together. In one visit.")}
          <br />
          <strong className="font-semibold">
            {t("Первый визит — скидка −10%.", "First visit — 10% off.")}
          </strong>
        </p>

        <h1 className="mt-5 font-serif-display text-[20px] font-semibold uppercase leading-[1.12] tracking-[0.005em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,.22)] sm:text-[25px] lg:mt-6 lg:whitespace-nowrap lg:text-[clamp(22px,2.4vw,34px)]">
          {t("Полный образ", "A complete look")}
          <br />
          {t("за один визит,", "in a single visit,")}
          <br />
          {t("в одном кресле", "in one chair")}
        </h1>

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-[#6E7248] px-10 py-4 text-[14px] font-medium tracking-[0.01em] text-[#F4F1EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white hover:backdrop-blur-md lg:mt-8 lg:w-auto lg:min-w-[min(520px,68vw)]"
        >
          {t("Записаться", "Book now")}
        </a>
      </div>

      {/* КАРТОЧКА-ОТЗЫВ (справа, компактная) */}
      <figure className="mx-6 mb-6 flex items-stretch gap-3.5 rounded-[18px] border border-white/35 bg-white/15 p-3.5 text-white shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl max-[520px]:flex-col lg:absolute lg:bottom-[var(--btm)] lg:right-[var(--pad)] lg:mx-0 lg:mb-0 lg:w-[430px] lg:p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SPECIALIST_PHOTO}
          alt={t("Евгения Романова", "Evgenia Romanova")}
          className="w-[112px] shrink-0 self-stretch rounded-[12px] bg-[#cfc8bd]/40 object-cover max-[520px]:h-[150px] max-[520px]:w-full"
        />
        <div className="flex min-w-0 flex-col justify-center gap-2">
          <blockquote className="text-[12px] leading-[1.5] text-white/90">
            {t(
              "«Собираем весь образ за один визит — и дарим −10% на первое посещение. Приходите: разницу почувствуете сразу».",
              "“We build your whole look in one visit — and give −10% on your first. Come in: you'll feel the difference at once.”",
            )}
          </blockquote>
          <figcaption className="text-[11.5px] leading-[1.35] text-white/70">
            <strong className="font-semibold text-white">{t("Основатель", "Founder")}</strong>{" "}
            {t("ÁLIS BEAUTY", "of ÁLIS BEAUTY")}
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
