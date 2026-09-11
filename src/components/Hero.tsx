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
        <p className="text-[13px] leading-relaxed text-white/90">
          {t("Запишитесь на первый сеанс и почувствуйте,", "Book your first session and feel")}
          <br />
          {t("как тело отпускает накопившееся напряжение.", "how the body releases built-up tension.")}
          <br />
          <strong className="font-semibold">
            {t("Скидка 10% на первое посещение.", "10% off your first visit.")}
          </strong>
        </p>

        <h1 className="mt-6 font-serif-display text-[24px] font-semibold uppercase leading-[1.1] tracking-[0.005em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,.22)] sm:text-[30px] lg:mt-7 lg:whitespace-nowrap lg:text-[clamp(26px,3vw,44px)]">
          {t("Студия массажа,", "A massage studio")}
          <br />
          {t("где каждое прикосновение", "where every touch")}
          <br />
          {t("расслабляет тело и мысли", "relaxes body and mind")}
        </h1>

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#efe9e1] px-10 py-4 text-[14px] font-medium tracking-[0.01em] text-[#17191a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white lg:mt-8 lg:w-auto lg:min-w-[min(520px,68vw)]"
        >
          {t("Записаться", "Book now")}
        </a>
      </div>

      {/* КАРТОЧКА-ОТЗЫВ (справа, компактная) */}
      <figure className="mx-6 mb-6 flex items-stretch gap-3.5 rounded-[18px] border border-white/40 bg-[#eee9e1]/72 p-3.5 text-[#17191a] backdrop-blur-md max-[520px]:flex-col lg:absolute lg:bottom-[var(--btm)] lg:right-[var(--pad)] lg:mx-0 lg:mb-0 lg:w-[420px] lg:p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SPECIALIST_PHOTO}
          alt={t("Евгения Романова", "Evgenia Romanova")}
          className="w-[84px] shrink-0 self-stretch rounded-[12px] bg-[#cfc8bd] object-cover max-[520px]:h-[140px] max-[520px]:w-full"
        />
        <div className="flex min-w-0 flex-col justify-center gap-2.5">
          <blockquote className="text-[12px] leading-[1.5] text-[#35322e]">
            {t(
              "«Здесь создаётся атмосфера, в которой вы чувствуете спокойствие и доверие. Вслед за этим уходит эмоциональное напряжение, а тело максимально эффективно откликается на массаж».",
              "“Here we create an atmosphere where you feel calm and trust. The emotional tension then fades, and the body responds to the massage as effectively as possible.”",
            )}
          </blockquote>
          <figcaption className="text-[12px] leading-[1.35] text-[#4a4642]">
            <strong className="font-semibold">{t("Евгения Романова,", "Evgenia Romanova,")}</strong>{" "}
            {t("специалист по работе с телом", "bodywork specialist")}
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
