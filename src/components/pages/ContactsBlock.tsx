"use client";
// СТРАНИЦА КОНТАКТОВ — воздушно и минималистично, без встроенной карты (она долго грузилась):
// заголовок по центру → две колонки (салон красоты / консьерж-сервис) с крупными телефонами →
// фото салона со «стеклянными» кнопками маршрута (Яндекс Карты, 2ГИС).
// Названия соцсетей и мессенджеров на сайте не пишем (требование заказчицы).
import { useLang } from "@/lib/i18n";

const PHONE = "+7 988 888 77 58";
const PHONE_RAW = "79888887758";
const PHONE_SERVICE = "+7 988 888 77 28";
const PHONE_SERVICE_RAW = "79888887728";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
// Маршрут до салона в Яндекс Картах (координаты организации «Áлис Бьюти»)
const ROUTE_URL = "https://yandex.ru/maps/?rtext=~44.704933%2C37.782638&rtt=auto";
const GIS_URL = "https://2gis.ru/novorossiysk/firm/70000001086737494";
// Фото под кнопками маршрута — временное, заменить на фото входа/интерьера салона
const PHOTO = "/assets/alis/img_0521.jpg";

type Loc = { ru: string; en: string };
type Row = { label: Loc; value: string; href?: string; external?: boolean };

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-rotate-45">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactsBlock() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const COLS: { title: Loc; phone: string; phoneRaw: string; rows: Row[]; links: { label: Loc; href: string }[] }[] = [
    {
      title: { ru: "Салон красоты", en: "Beauty salon" },
      phone: PHONE,
      phoneRaw: PHONE_RAW,
      rows: [
        { label: { ru: "Адрес", en: "Address" }, value: t("Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL, external: true },
        { label: { ru: "Часы", en: "Hours" }, value: t("Без перерывов и выходных, 9:00–21:00", "No breaks, open daily, 9:00–21:00") },
      ],
      links: [
        { label: { ru: "Написать нам", en: "Message us" }, href: `https://wa.me/${PHONE_RAW}` },
        { label: { ru: "Салон красоты: @alisbeauty.ru", en: "Beauty salon: @alisbeauty.ru" }, href: "https://www.instagram.com/alisbeauty.ru" },
      ],
    },
    {
      title: { ru: "Консьерж-сервис", en: "Concierge service" },
      phone: PHONE_SERVICE,
      phoneRaw: PHONE_SERVICE_RAW,
      rows: [
        { label: { ru: "Почта", en: "E-mail" }, value: EMAIL, href: `mailto:${EMAIL}` },
        { label: { ru: "Выезд", en: "On location" }, value: t("Мастера приедут туда, где вам удобно", "Our artists come wherever suits you") },
      ],
      links: [
        { label: { ru: "Консьерж-сервис: @alisbeauty.global", en: "Concierge service: @alisbeauty.global" }, href: "https://www.instagram.com/alisbeauty.global" },
        { label: { ru: "Всё о консьерж-сервисе", en: "About the concierge service" }, href: "/concierge" },
      ],
    },
  ];

  const glass =
    "group inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#17191a]";

  return (
    <section className="bg-white pb-[clamp(72px,10vw,140px)] pt-32 lg:pt-44">
      {/* Заголовок */}
      <div className="r-reveal mx-auto w-[92%] max-w-[760px] text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#46131E]">
          {t("Без выходных, 9:00–21:00", "Open daily, 9:00–21:00")}
        </p>
        <h1 className="mt-4 font-serif-display text-[30px] font-normal uppercase leading-[1.15] tracking-[0.04em] text-[#17191a] lg:text-[44px]">
          {t("Контакты", "Contacts")}
        </h1>
        <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.7] text-[#17191a]/75 lg:text-[16px]">
          {t(
            "Салон ÁLIS BEAUTY в Новороссийске, ул. Пархоменко, 53. Звоните, пишите или приходите — мы рядом каждый день.",
            "ÁLIS BEAUTY salon in Novorossiysk, Parkhomenko St., 53. Call, message or drop in — we’re here every day.",
          )}
        </p>
      </div>

      {/* Две колонки: салон и консьерж-сервис, между ними тонкая линия */}
      <div className="mx-auto mt-14 grid w-[92%] max-w-[1320px] grid-cols-1 lg:mt-24 lg:grid-cols-2">
        {COLS.map((c, i) => (
          <div
            key={c.title.ru}
            className={`r-reveal flex flex-col py-10 lg:px-16 lg:py-2 ${i === 0 ? "border-b border-[#17191a]/10 lg:border-b-0 lg:border-r" : ""}`}
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#46131E]">{c.title[lang]}</p>
            <a
              href={`tel:+${c.phoneRaw}`}
              className="mt-5 w-fit whitespace-nowrap font-display text-[32px] leading-none tracking-[0.01em] text-[#17191a] transition-colors hover:text-[#46131E] lg:text-[44px]"
            >
              {c.phone}
            </a>

            <dl className="mt-8 space-y-5">
              {c.rows.map((r) => (
                <div key={r.label.ru}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-[#17191a]/55">{r.label[lang]}</dt>
                  <dd className="mt-1.5 text-[16px] leading-[1.5] text-[#17191a]">
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="underline decoration-[#17191a]/20 underline-offset-[6px] transition-colors hover:decoration-[#46131E]"
                      >
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col">
              {c.links.map((l) => {
                const ext = l.href.startsWith("http");
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 border-t border-[#17191a]/10 py-4 text-[15px] text-[#17191a] transition-colors last:border-b hover:text-[#46131E]"
                  >
                    {l.label[lang]}
                    <Arrow />
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Фото + маршрут — вместо тяжёлой встроенной карты */}
      <div className="r-reveal relative mx-auto mt-14 flex h-[62svh] min-h-[440px] w-[96%] max-w-[1760px] items-end overflow-hidden rounded-[12px] lg:mt-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTO}
          alt={t("Салон красоты ÁLIS BEAUTY на ул. Пархоменко, 53 в Новороссийске", "ÁLIS BEAUTY beauty salon at Parkhomenko St., 53, Novorossiysk")}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="relative z-10 flex w-full flex-col items-start gap-6 p-6 text-white lg:flex-row lg:items-end lg:justify-between lg:p-12">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-white/85">{t("Как добраться", "How to get here")}</p>
            <p className="mt-3 font-serif-display text-[24px] uppercase leading-[1.2] tracking-[0.03em] lg:text-[32px]">
              {t("Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={ROUTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="alis-pulse inline-flex items-center justify-center rounded-xl border border-white/70 bg-white/15 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#17191a]"
            >
              {t("Построить маршрут", "Get directions")}
            </a>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className={glass}>
              {t("Яндекс Карты", "Yandex Maps")} <Arrow />
            </a>
            <a href={GIS_URL} target="_blank" rel="noopener noreferrer" className={glass}>
              {t("2ГИС", "2GIS")} <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
