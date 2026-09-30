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


// Иконки мессенджера и соцсети — без названий сервисов (требование заказчицы: слова не пишем)
function IconWa() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.9.92-3-.2-.31a8.2 8.2 0 1 1 6.86 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
function IconIg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactsBlock() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const COLS: { title: Loc; phone: string; phoneRaw: string; rows: Row[]; wa: string; ig: string; links: { label: Loc; href: string }[] }[] = [
    {
      title: { ru: "Салон красоты", en: "Beauty salon" },
      phone: PHONE,
      phoneRaw: PHONE_RAW,
      wa: `https://wa.me/${PHONE_RAW}`,
      ig: "https://www.instagram.com/alisbeauty.ru",
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
      wa: `https://wa.me/${PHONE_SERVICE_RAW}`,
      ig: "https://www.instagram.com/alisbeauty.global",
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
    <section className="bg-white pb-[clamp(72px,10vw,140px)] pt-24 lg:pt-40">
      {/* Заголовок страницы — только для поисковиков и экранных чтецов (визуально убран по просьбе клиента) */}
      <h1 className="sr-only">{t("Контакты салона красоты ÁLIS BEAUTY в Новороссийске", "ÁLIS BEAUTY beauty salon contacts, Novorossiysk")}</h1>

      {/* Две отдельные карточки: салон и консьерж-сервис */}
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {COLS.map((c) => (
          <div
            key={c.title.ru}
            // Отдельная карточка: белая, тонкая рамка, бордовая полоса слева (как раскрытая категория услуг)
            className="r-reveal flex flex-col rounded-[12px] border border-[#17191a]/15 bg-white px-6 py-7 shadow-[inset_3px_0_0_#46131E,0_24px_60px_-28px_rgba(23,25,26,0.22)] lg:px-10 lg:py-9"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#46131E]">{c.title[lang]}</p>
            <a
              href={`tel:+${c.phoneRaw}`}
              className="mt-3.5 w-fit whitespace-nowrap font-display text-[24px] leading-none tracking-[0.01em] text-[#17191a] transition-colors hover:text-[#46131E] lg:text-[30px]"
            >
              {c.phone}
            </a>
            {/* Написать в мессенджер и соцсеть — круглые кнопки с иконками */}
            <div className="mt-4 flex gap-2">
              <a href={c.wa} target="_blank" rel="noopener noreferrer" aria-label={t("Написать в мессенджер", "Message us")} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#46131E]/35 text-[#46131E] transition-colors duration-300 hover:border-[#46131E] hover:bg-[#46131E] hover:text-white">
                <IconWa />
              </a>
              <a href={c.ig} target="_blank" rel="noopener noreferrer" aria-label={t("Наша страница в соцсети", "Our social media page")} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#46131E]/35 text-[#46131E] transition-colors duration-300 hover:border-[#46131E] hover:bg-[#46131E] hover:text-white">
                <IconIg />
              </a>
            </div>

            <dl className="mt-6 space-y-3.5">
              {c.rows.map((r) => (
                <div key={r.label.ru}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-[#17191a]/55">{r.label[lang]}</dt>
                  <dd className="mt-1 text-[14px] leading-[1.5] lg:text-[15px] text-[#17191a]">
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

            <div className="mt-6 flex flex-col">
              {c.links.map((l) => {
                const ext = l.href.startsWith("http");
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 border-t border-[#17191a]/10 py-3 text-[14px] text-[#17191a] transition-colors last:border-b hover:text-[#46131E]"
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
