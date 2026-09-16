"use client";
// ГЕРОЙ страницы «Команда» — в стиле первого блока главной: полноэкранное фоновое
// фото, слева внизу вводный текст, крупный заголовок и широкая кнопка; справа внизу
// компактная матовая карточка со словами основателя. Всё — про команду ÁLIS.
import type { CSSProperties } from "react";
import { useLang } from "@/lib/i18n";

// Фото — заменить на съёмку команды/салона.
const BG_PHOTO = "/assets/alis/img_6009.jpg";
const FOUNDER_PHOTO = "/assets/tild6536-613_-2___1__4.jpg";

const vars = {
  "--pad": "clamp(20px,3.2vw,54px)",
  "--btm": "clamp(26px,3.4vw,48px)",
} as CSSProperties;

export default function TeamIntro() {
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
          {t("Поток гостей приводит салон и онлайн-запись.", "The salon and online booking bring the guests.")}
          <br />
          {t("Вы работаете руками — клиентов ищем мы. Стабильно, без простоев.", "You do the craft — we find the clients. Steady, no idle time.")}
          <br />
          <strong className="font-semibold">
            {t("Честный процент и материалы за счёт салона.", "Fair commission, materials on the salon.")}
          </strong>
        </p>

        <h1 className="mt-5 font-serif-display text-[18px] font-medium uppercase leading-[1.2] tracking-[0.02em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,.22)] sm:text-[22px] lg:mt-6 lg:whitespace-nowrap lg:text-[clamp(20px,2.1vw,32px)]">
          {t("Место в команде, где кресло не пустует", "A place on a team where the chair is never empty")}
          <br />
          {t("и мастер растёт каждый день", "and every master grows each day")}
        </h1>

        <a
          href="#vacancies"
          className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-[#46131E] px-10 py-4 text-[14px] font-medium tracking-[0.01em] text-[#F4F1EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white hover:backdrop-blur-md lg:mt-8 lg:w-auto lg:min-w-[min(520px,68vw)]"
        >
          {t("Смотреть вакансии", "See vacancies")}
        </a>
      </div>

      {/* КАРТОЧКА — слова основателя (справа, компактная) */}
      <figure className="mx-6 mb-6 flex items-stretch gap-3.5 rounded-[18px] border border-white/35 bg-white/15 p-3.5 text-white shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl max-[520px]:flex-col lg:absolute lg:bottom-[var(--btm)] lg:right-[var(--pad)] lg:mx-0 lg:mb-0 lg:w-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOUNDER_PHOTO}
          alt={t("Дайана Тарзян", "Diana Tarzyan")}
          className="w-[92px] shrink-0 self-stretch rounded-[12px] bg-[#cfc8bd]/40 object-cover max-[520px]:h-[140px] max-[520px]:w-full"
        />
        <div className="flex min-w-0 flex-col justify-between gap-2 py-0.5">
          <blockquote className="text-[11.5px] leading-[1.4] text-white/90">
            {t(
              "«Мы даём поток гостей, честный процент и материалы. Ваше дело — мастерство. Растите с нами, а не выживайте в одиночку».",
              "“We give you the flow of guests, a fair commission and materials. Your job is the craft. Grow with us — don't survive alone.”",
            )}
          </blockquote>
          <figcaption className="text-[11.5px] leading-[1.4] text-white/70">
            <strong className="font-semibold text-white">{t("Дайана Тарзян,", "Diana Tarzyan,")}</strong>{" "}
            {t("основатель сети студий эстетики ÁLIS", "founder of the ÁLIS aesthetics studios")}
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
