"use client";
// СТРАНИЦА КОНТАКТОВ — в стиле страниц «Сотрудничество»/«Команда»/главной:
// белый фон, полноширинные скруглённые панели (30px) с небольшим внутренним
// отступом, фото слева, справа — панель-плашка (#EAEAE4) с заголовком Marcellus,
// реквизитами и кнопками как на «Команде»; ниже — сетка карточек-контактов.
import { useLang } from "@/lib/i18n";

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

  const CARDS: { title: string; sub: Loc; href: string }[] = [
    { title: "WhatsApp", sub: { ru: "Написать в чат", en: "Message us" }, href: `https://wa.me/${PHONE_RAW}` },
    { title: "Instagram", sub: { ru: "@alisbeauty.ru", en: "@alisbeauty.ru" }, href: "https://www.instagram.com/alisbeauty.ru" },
    { title: "Instagram", sub: { ru: "@alisbeauty.global", en: "@alisbeauty.global" }, href: "https://www.instagram.com/alisbeauty.global" },
    { title: t("Позвонить", "Call"), sub: { ru: PHONE, en: PHONE }, href: `tel:+${PHONE_RAW}` },
    { title: t("Яндекс Карты", "Yandex Maps"), sub: { ru: "Маршрут и отзывы", en: "Route & reviews" }, href: MAP_URL },
    { title: "E-mail", sub: { ru: EMAIL, en: EMAIL }, href: `mailto:${EMAIL}` },
  ];

  return (
    <section className="bg-white px-3 pt-[76px] pb-16 sm:px-4 lg:pt-[88px] lg:pb-24">
      <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Слева — высокое фото */}
        <div className="relative min-h-[340px] overflow-hidden rounded-[30px] lg:min-h-[640px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" aria-hidden loading="eager" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        {/* Справа — заголовок, реквизиты, кнопки */}
        <div className="flex flex-col rounded-[30px] bg-[#EAEAE4] p-7 lg:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#6E7248]">{t("контакты", "contacts")}</p>
          <h2 className="mt-4 font-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.02em] text-[#6E7248] sm:text-[32px] lg:text-[38px]">
            {t("ÁLIS BEAUTY на Пархоменко", "ÁLIS BEAUTY on Parkhomenko")}
          </h2>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#2a2320]/70 lg:text-[14px]">
            {t(
              "Салон красоты полного цикла в Новороссийске — полный образ за один визит, в 4–6 рук, и −10% на первое посещение.",
              "A full-service beauty salon in Novorossiysk — your whole look in one visit, in 4–6 hands, and −10% on your first.",
            )}
          </p>

          <span className="mt-7 block h-px w-full bg-[#6E7248]/15" />

          <dl>
            {ROWS.map((r) => (
              <div key={r.label.ru} className="grid grid-cols-[120px_1fr] items-baseline gap-5 border-b border-[#6E7248]/15 py-[22px]">
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

          <div className="mt-8 flex flex-col gap-2.5">
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-2xl border border-[#6E7248] bg-[#6E7248] py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#6E7248] sm:text-[14px]"
            >
              {t("Записаться", "Book now")}
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-2xl border border-[#6E7248]/40 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#6E7248] transition-colors duration-300 hover:border-[#6E7248] hover:bg-[#6E7248] hover:text-[#f4efe6] sm:text-[14px]"
            >
              {t("Построить маршрут", "Get directions")}
            </a>
          </div>
        </div>
      </div>

      {/* Сетка карточек-контактов */}
      <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <a
            key={c.title + i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-[24px] bg-[#EAEAE4] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(110,114,72,0.18)]"
          >
            <span className="min-w-0">
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
