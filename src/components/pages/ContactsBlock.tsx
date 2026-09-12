"use client";
// СТРАНИЦА КОНТАКТОВ — раскладка и размеры 1-в-1 по paloma.website/contacts:
// контейнер во всю ширину (px-72), колонки 50/50 (gap 58px), высокое фото
// слева, справа крупный серифный заголовок + строки-реквизиты + кнопки; ниже —
// сетка карточек (3 кол., gap 22px). Палитра и типографика — как на сайте.
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
    <section className="bg-[#F9F8F6] pb-16 pt-24 lg:pb-20 lg:pt-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-[72px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-[58px]">
          {/* Слева — высокое фото */}
          <div className="overflow-hidden rounded-[24px] border border-[#6E7248]/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="" aria-hidden className="h-full min-h-[320px] w-full object-cover lg:min-h-[470px]" />
          </div>

          {/* Справа — заголовок, реквизиты, кнопки */}
          <div className="flex flex-col rounded-[24px] border border-[#6E7248]/25 bg-white/40 p-6 lg:p-8">
            <p className="text-[11px] lowercase tracking-[0.05em] text-[#6E7248]">{t("контакты", "contacts")}</p>
            <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.1] tracking-[0.01em] text-[#6E7248] sm:text-[28px] lg:whitespace-nowrap lg:text-[clamp(24px,2.2vw,34px)]">
              {t("ÁLIS BEAUTY на Пархоменко", "ÁLIS BEAUTY on Parkhomenko")}
            </h2>
            <p className="mt-3 text-[13px] italic leading-relaxed text-[#444]/70">
              {t("Салон красоты полного цикла · Новороссийск", "Full-service beauty salon · Novorossiysk")}
              <br />
              {t("Полный образ за один визит — и −10% на первый.", "Your whole look in one visit — and −10% on the first.")}
            </p>

            <span className="mt-6 block h-px w-full bg-[#C2C0B6]/50" />

            <dl>
              {ROWS.map((r) => (
                <div key={r.label.ru} className="grid grid-cols-[130px_1fr] items-baseline gap-5 border-b border-[#C2C0B6]/40 py-3.5">
                  <dt className="text-[10.5px] uppercase tracking-[0.14em] text-[#6E7248]">{r.label[lang]}</dt>
                  <dd className="font-serif-display text-[15px] leading-snug text-[#444] lg:text-[16px]">
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

            <div className="mt-7 flex flex-col gap-2.5">
              <a
                href={YCLIENTS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[#6E7248] px-[26px] py-[13px] text-[11px] font-medium uppercase tracking-[0.1em] text-[#F4F1EA] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:text-[#6E7248] hover:backdrop-blur-md"
              >
                {t("Записаться", "Book now")}
              </a>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[#6E7248]/40 px-[26px] py-[13px] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6E7248] transition-colors duration-300 hover:bg-[#6E7248] hover:text-[#F4F1EA]"
              >
                {t("Построить маршрут", "Get directions")}
              </a>
            </div>
          </div>
        </div>

        {/* Сетка карточек-контактов */}
        <div className="mt-[22px] grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <a
              key={c.title + i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-[20px] border border-[#C2C0B6]/45 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6E7248] hover:shadow-[0_16px_44px_rgba(110,114,72,0.22)]"
            >
              <span className="min-w-0">
                <span className="block text-[14px] font-bold uppercase tracking-[0.06em] text-[#6E7248]">{c.title}</span>
                <span className="mt-1 block truncate text-[13px] text-[#444]/70">{c.sub[lang]}</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6E7248]/40 text-[15px] text-[#6E7248] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#6E7248] group-hover:text-[#F4F1EA] lg:h-11 lg:w-11">
                <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
