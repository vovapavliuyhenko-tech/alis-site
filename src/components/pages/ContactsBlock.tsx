"use client";
// СТРАНИЦА КОНТАКТОВ — в стиле страниц «Сотрудничество»/«Команда»/главной:
// белый фон, полноширинные скруглённые панели (30px) с небольшим внутренним
// отступом, фото слева, справа — панель-плашка (#EAEAE4) с заголовком Marcellus,
// реквизитами и кнопками как на «Команде»; ниже — сетка карточек-контактов.
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

// Иконки контактов — как на референсе: заливная плитка + бренд-иконка.
const IconWhatsApp = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.34-.5.05-.97.22-3.27-.68-2.76-1.09-4.5-3.9-4.64-4.08-.14-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.24-.27.53-.34.71-.34l.51.01c.16.01.38-.06.6.46.24.56.79 1.94.86 2.08.07.14.12.3.02.48-.1.18-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.44.12.6-.07.18-.21.7-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.61.76 1.89.9.28.14.46.21.53.32.07.12.07.68-.17 1.36Z" />
  </svg>
);
const IconInstagram = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconPhone = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .7-.2 1L6.6 10.8Z" />
  </svg>
);
const IconPin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
    <path d="M12 21c4-4 6-7 6-10a6 6 0 1 0-12 0c0 3 2 6 6 10Z" strokeLinejoin="round" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
);
const IconMail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHONE = "+7 988 888 77 58";
const PHONE_RAW = "79888887758";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const PHOTO = "/assets/tild6536-613_-2___1__4.jpg"; // плейсхолдер

type Loc = { ru: string; en: string };

export default function ContactsBlock() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const ROWS: { label: Loc; value: string; href?: string }[] = [
    { label: { ru: "Адрес", en: "Address" }, value: t("Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL },
    { label: { ru: "Часы работы", en: "Hours" }, value: t("Без выходных, 9:00–21:00", "Open daily, 9:00–21:00") },
    { label: { ru: "Телефон", en: "Phone" }, value: PHONE, href: `tel:+${PHONE_RAW}` },
    { label: { ru: "E-mail", en: "E-mail" }, value: EMAIL, href: `mailto:${EMAIL}` },
  ];

  const CARDS: { title: string; sub: Loc; href: string; icon: ReactNode }[] = [
    { title: "WhatsApp", sub: { ru: "Написать в чат", en: "Message us" }, href: `https://wa.me/${PHONE_RAW}`, icon: IconWhatsApp },
    { title: "Instagram", sub: { ru: "@alisbeauty.ru", en: "@alisbeauty.ru" }, href: "https://www.instagram.com/alisbeauty.ru", icon: IconInstagram },
    { title: "Instagram", sub: { ru: "@alisbeauty.global", en: "@alisbeauty.global" }, href: "https://www.instagram.com/alisbeauty.global", icon: IconInstagram },
    { title: t("Позвонить", "Call"), sub: { ru: PHONE, en: PHONE }, href: `tel:+${PHONE_RAW}`, icon: IconPhone },
    { title: t("Яндекс Карты", "Yandex Maps"), sub: { ru: "Маршрут и отзывы", en: "Route & reviews" }, href: MAP_URL, icon: IconPin },
    { title: "E-mail", sub: { ru: EMAIL, en: EMAIL }, href: `mailto:${EMAIL}`, icon: IconMail },
  ];

  return (
    <section className="bg-white px-3 pt-[72px] pb-8 sm:px-4 lg:pt-[84px] lg:pb-8">
      <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Слева — высокое фото */}
        <div className="relative min-h-[300px] overflow-hidden rounded-[30px] lg:min-h-[430px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" aria-hidden loading="eager" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        {/* Справа — заголовок, реквизиты, кнопки */}
        <div className="flex flex-col rounded-[30px] border border-[#6E7248]/15 bg-white p-6 lg:p-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#6E7248]">{t("контакты", "contacts")}</p>
          <h2 className="mt-3 font-display text-[24px] font-normal uppercase leading-[1.1] tracking-[0.02em] text-[#6E7248] sm:text-[28px] lg:text-[32px]">
            {t("ÁLIS BEAUTY на Пархоменко", "ÁLIS BEAUTY on Parkhomenko")}
          </h2>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#2a2320]/70 lg:text-[14px]">
            {t(
              "Салон красоты полного цикла в Новороссийске — полный образ за один визит, в 4–6 рук, и −10% на первое посещение.",
              "A full-service beauty salon in Novorossiysk — your whole look in one visit, in 4–6 hands, and −10% on your first.",
            )}
          </p>

          <span className="mt-5 block h-px w-full bg-[#6E7248]/15" />

          <dl>
            {ROWS.map((r) => (
              <div key={r.label.ru} className="grid grid-cols-[120px_1fr] items-baseline gap-5 border-b border-[#6E7248]/15 py-3 lg:py-3.5">
                <dt className="text-[10.5px] uppercase tracking-[0.14em] text-[#6E7248]">{r.label[lang]}</dt>
                <dd className="text-[15px] leading-snug text-[#2a2320] lg:text-[16px]">
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="transition-colors hover:text-[#6E7248]">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-2xl border border-[#6E7248] bg-[#6E7248] py-3.5 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#6E7248] sm:text-[14px]"
            >
              {t("Записаться", "Book now")}
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-2xl border border-[#6E7248]/40 py-3.5 font-display text-[13px] uppercase tracking-[0.16em] text-[#6E7248] transition-colors duration-300 hover:border-[#6E7248] hover:bg-[#6E7248] hover:text-[#f4efe6] sm:text-[14px]"
            >
              {t("Построить маршрут", "Get directions")}
            </a>
          </div>
        </div>
      </div>

      {/* Сетка карточек-контактов */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-8 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <a
            key={c.title + i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 rounded-[24px] border border-[#6E7248]/15 bg-white p-4 pr-9 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6E7248] hover:shadow-[0_16px_44px_rgba(110,114,72,0.18)] lg:p-5 lg:pr-10"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6E7248]/10 text-[#6E7248] transition-colors duration-300 group-hover:bg-[#6E7248] group-hover:text-[#f4efe6]">
              {c.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold uppercase tracking-[0.06em] text-[#6E7248]">{c.title}</span>
              <span className="mt-0.5 block truncate text-[13px] text-[#2a2320]/65">{c.sub[lang]}</span>
            </span>
            <span className="absolute right-4 top-4 text-[15px] text-[#6E7248]/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#6E7248]">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
