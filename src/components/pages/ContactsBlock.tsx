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

const PHONE = "+7 988 888 77 58";
const PHONE_RAW = "79888887758";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";

type Loc = { ru: string; en: string };

export default function ContactsBlock() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const INFO: { label: Loc; value: string; href?: string; accent?: boolean }[] = [
    { label: { ru: "Телефон", en: "Phone" }, value: PHONE, href: `tel:+${PHONE_RAW}` },
    { label: { ru: "Время работы", en: "Hours" }, value: t("Без выходных, 9:00–21:00", "Open daily, 9:00–21:00") },
    { label: { ru: "Адрес", en: "Address" }, value: t("г. Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL, accent: true },
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
    <section className="bg-white px-3 pt-[76px] pb-16 sm:px-4 lg:pt-[88px] lg:pb-24">
      {/* Верхняя часть — как на референсе: слева реквизиты, справа карта */}
      <div className="overflow-hidden rounded-[30px] border border-[#6E7248]/15 bg-white lg:grid lg:grid-cols-2">
        {/* Слева — надстрочник, крупный заголовок и реквизиты */}
        <div className="flex flex-col p-8 lg:p-12">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#6E7248]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12h8M12 8v8" strokeLinecap="round" />
            </svg>
            {t("контакты", "contacts")}
          </p>
          <h2 className="mt-5 font-display text-[34px] font-normal uppercase leading-[1.02] tracking-[0.01em] text-[#6E7248] sm:text-[48px] lg:text-[64px]">
            {t("Как нас найти", "How to find us")}
          </h2>

          <dl className="mt-8 flex flex-col gap-6 lg:mt-12">
            {INFO.map((r) => (
              <div key={r.label.ru} className="grid grid-cols-[110px_1fr] items-baseline gap-5 lg:grid-cols-[150px_1fr]">
                <dt className="text-[13px] text-[#2a2320]/45">{r.label[lang]}</dt>
                <dd className={`text-[15px] font-medium leading-snug lg:text-[16px] ${r.accent ? "text-[#6E7248]" : "text-[#2a2320]"}`}>
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
        </div>

        {/* Справа — интерактивная карта с кнопками */}
        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <iframe
            title={t("Карта — ÁLIS BEAUTY", "Map — ÁLIS BEAUTY")}
            src="https://yandex.ru/map-widget/v1/?text=Новороссийск%2C%20улица%20Пархоменко%2C%2053&z=16"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[12px] font-medium text-[#6E7248] shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-colors hover:bg-white"
          >
            <span className="text-[#6E7248]">{IconPin}</span>
            {t("Открыть в Яндекс Картах", "Open in Yandex Maps")}
          </a>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full bg-[#6E7248] px-6 py-3.5 font-display text-[12px] uppercase tracking-[0.14em] text-[#f4efe6] shadow-[0_10px_30px_rgba(110,114,72,0.4)] transition-colors hover:bg-[#5b5e3a] lg:px-8 lg:py-4 lg:text-[13px]"
          >
            {t("Построить маршрут", "Get directions")}
          </a>
        </div>
      </div>

      {/* Сетка карточек-контактов */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <a
            key={c.title + i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-[24px] border border-[#6E7248]/15 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6E7248] hover:shadow-[0_16px_44px_rgba(110,114,72,0.18)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6E7248]/10 text-[#6E7248] transition-colors duration-300 group-hover:bg-[#6E7248] group-hover:text-[#f4efe6]">
              {c.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold uppercase tracking-[0.06em] text-[#6E7248]">{c.title}</span>
              <span className="mt-1 block truncate text-[13px] text-[#2a2320]/65">{c.sub[lang]}</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6E7248]/40 text-[15px] text-[#6E7248] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#6E7248] group-hover:text-[#f4efe6] lg:h-11 lg:w-11">
              <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
