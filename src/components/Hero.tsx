"use client";
// HERO «Студия массажа» — точная копия референса: полноэкранное фоновое фото,
// верхняя панель (адрес слева · бренд по центру · пилюли-навигация справа),
// внизу слева — вводный текст, крупный серифный заголовок и широкая кнопка
// записи; внизу справа — матовая карточка-отзыв и круглая кнопка онлайн-записи.
// Двуязычно. Фото — плейсхолдеры (заменить на реальные съёмки студии).
import type { CSSProperties } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// Плейсхолдеры — заменить на настоящее фото массажа и портрет специалиста.
const BG_PHOTO = "/assets/tild6230-643__.jpg";
const SPECIALIST_PHOTO = "/assets/tild6536-613_-2___1__4.jpg";

// Единые отступы блока (совпадают с референсом)
const vars = {
  "--pad": "clamp(20px,3.2vw,54px)",
  "--btm": "clamp(28px,4vw,54px)",
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
      {/* Затемнение для читаемости: сверху и в левом-нижнем углу */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.34) 0%, rgba(20,18,16,0) 22%), linear-gradient(200deg, rgba(20,18,16,0) 42%, rgba(20,18,16,.42) 100%)",
        }}
      />

      {/* ВЕРХНЯЯ ПАНЕЛЬ: адрес · бренд · навигация */}
      <div className="flex flex-col items-center gap-3 px-6 pt-6 text-center lg:absolute lg:inset-x-0 lg:top-0 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-5 lg:px-[var(--pad)] lg:pt-8 lg:text-left">
        <p className="order-3 text-[13px] leading-snug text-white/90 lg:order-none">
          {t("Москва, ул. Архитектора", "Moscow, Arkhitektora Vlasova")}
          <br />
          {t("Власова, 71, корп. 2", "St., 71, bldg. 2")}
        </p>

        <div className="order-1 leading-tight lg:order-none lg:justify-self-center lg:text-center">
          <span className="block text-[clamp(14px,1.15vw,17px)] font-medium uppercase tracking-[0.32em]">
            {t("Студия массажа", "Massage studio")}
          </span>
          <span className="mt-1 block text-[12px] tracking-[0.02em] text-white/85">
            {t("Евгении Романовой", "by Evgenia Romanova")}
          </span>
        </div>

        <nav
          className="order-2 flex flex-wrap justify-center gap-3 lg:order-none lg:justify-self-end"
          aria-label={t("Основное меню", "Main menu")}
        >
          {[
            { label: t("Услуги", "Services"), href: "/salon#uslugi" },
            { label: t("Отзывы", "Reviews"), href: "/salon#reviews" },
            { label: t("Контакты", "Contacts"), href: "/contacts" },
          ].map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="inline-flex items-center justify-center rounded-full border border-white/55 px-6 py-2.5 text-[14px] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a]"
            >
              {i.label}
            </a>
          ))}
        </nav>
      </div>

      {/* НИЖНИЙ КОНТЕНТ */}
      <div className="mt-auto px-6 pb-7 lg:absolute lg:bottom-[var(--btm)] lg:left-0 lg:mt-0 lg:max-w-[min(900px,66vw)] lg:pb-0 lg:pl-[var(--pad)] lg:pr-6">
        <p className="text-[14px] leading-relaxed text-white/90 sm:text-[15px]">
          {t("Запишитесь на первый сеанс и почувствуйте,", "Book your first session and feel")}
          <br />
          {t("как тело отпускает накопившееся напряжение.", "how the body releases built-up tension.")}
          <br />
          <strong className="font-semibold">
            {t("Скидка 10% на первое посещение.", "10% off your first visit.")}
          </strong>
        </p>

        <h1 className="mt-8 font-serif-display text-[26px] font-semibold uppercase leading-[1.08] tracking-[0.005em] text-white [text-shadow:0_1px_30px_rgba(0,0,0,.18)] sm:text-[32px] lg:mt-9 lg:whitespace-nowrap lg:text-[clamp(28px,3.75vw,54px)]">
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
          className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#efe9e1] px-10 py-5 text-[15px] font-medium tracking-[0.01em] text-[#17191a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white lg:mt-11 lg:w-auto lg:min-w-[min(560px,80vw)]"
        >
          {t("Записаться", "Book now")}
        </a>
      </div>

      {/* КАРТОЧКА-ОТЗЫВ */}
      <figure className="mx-6 mb-5 flex gap-4 rounded-[20px] border border-white/40 bg-[#eee9e1]/70 p-4 text-[#17191a] backdrop-blur-md max-[520px]:flex-col lg:absolute lg:bottom-[var(--btm)] lg:right-[var(--pad)] lg:mx-0 lg:mb-0 lg:w-[min(560px,44vw)] lg:gap-[18px] lg:p-[18px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SPECIALIST_PHOTO}
          alt={t("Евгения Романова", "Evgenia Romanova")}
          className="w-[96px] shrink-0 self-stretch rounded-[14px] bg-[#cfc8bd] object-cover max-[520px]:h-[150px] max-[520px]:w-full lg:w-[88px]"
        />
        <div className="flex min-w-0 flex-col gap-3">
          <blockquote className="text-[13px] leading-[1.5] text-[#35322e]">
            {t(
              "«Здесь создаётся атмосфера, в которой вы чувствуете спокойствие и доверие. Вслед за этим уходит эмоциональное напряжение, а тело максимально эффективно откликается на массаж».",
              "“Here we create an atmosphere where you feel calm and trust. The emotional tension then fades, and the body responds to the massage as effectively as possible.”",
            )}
          </blockquote>
          <figcaption className="text-[13px] leading-[1.4] text-[#4a4642]">
            <strong className="font-semibold">{t("Евгения Романова,", "Evgenia Romanova,")}</strong>{" "}
            {t("специалист по работе с телом", "bodywork specialist")}
          </figcaption>
        </div>
      </figure>

      {/* КРУГЛАЯ КНОПКА ОНЛАЙН-ЗАПИСИ */}
      <a
        href={YCLIENTS}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mb-6 grid h-[118px] w-[118px] place-items-center rounded-full border border-white/55 bg-white/15 text-center font-serif-display text-[17px] leading-tight text-white backdrop-blur transition-colors duration-300 hover:bg-white hover:text-[#17191a] lg:absolute lg:bottom-[clamp(20px,3vw,40px)] lg:right-[calc(var(--pad)-6px)] lg:mx-0 lg:mb-0"
      >
        <span>
          {t("Онлайн-", "Online")}
          <br />
          {t("запись", "booking")}
        </span>
      </a>
    </section>
  );
}
