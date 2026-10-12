"use client";
// СТРАНИЦА КОНТАКТОВ — карта на весь блок (подгружается, только когда блок в кадре) и поверх
// неё справа тёмная карточка: салон красоты и консьерж-сервис, адрес, часы, выезд, маршрут.
// Названия соцсетей и мессенджеров на сайте не пишем (требование заказчицы).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const PHONE = "+7 988 888 77 58";
const PHONE_RAW = "79888887758";
const PHONE_SERVICE = "+7 988 888 77 28";
const PHONE_SERVICE_RAW = "79888887728";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
// Маршрут и встроенная карта (центр чуть правее салона — чтобы метка не пряталась под карточкой)
const ROUTE_URL = "https://yandex.ru/maps/?rtext=~44.704933%2C37.782638&rtt=auto";
const MAP_EMBED = "https://yandex.ru/map-widget/v1/?ll=37.7905%2C44.7049&z=15&pt=37.782638%2C44.704933%2Cpm2dgl";

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


  // Карта подгружается только когда блок попал в кадр (раньше встроенная карта тормозила страницу);
  // карточка контактов выезжает справа
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white pb-[clamp(72px,10vw,140px)] pt-24 lg:pt-36">
      {/* Заголовок страницы — только для поисковиков и экранных чтецов (визуально убран по просьбе клиента) */}
      <h1 className="sr-only">{t("Контакты салона красоты ÁLIS BEAUTY в Новороссийске", "ÁLIS BEAUTY beauty salon contacts, Novorossiysk")}</h1>

      <div ref={box} className="relative mx-auto w-[96%] max-w-[1760px] overflow-hidden rounded-[28px] bg-[#e9e6e1] lg:h-[clamp(560px,72vh,720px)]">
        {/* Карта: на телефоне — сверху, на компьютере — на весь блок */}
        <div className="relative h-[320px] sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto">
          {/* Заглушка до загрузки карты */}
          <div aria-hidden className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 lg:justify-start lg:pl-[22%] ${mapReady ? "opacity-0" : "opacity-100"}`}>
            <span className="relative flex h-4 w-4">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#17191a]/30" />
              <span className="relative h-4 w-4 rounded-full bg-[#17191a]" />
            </span>
          </div>
          {inView && (
            <iframe
              title={t("Карта: ÁLIS BEAUTY, Новороссийск, ул. Пархоменко, 53", "Map: ÁLIS BEAUTY, Novorossiysk, Parkhomenko St., 53")}
              src={MAP_EMBED}
              loading="lazy"
              onLoad={() => setMapReady(true)}
              className={`absolute inset-0 h-full w-full border-0 grayscale-[0.85] transition-opacity duration-700 ${mapReady ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        {/* Тёмная карточка с контактами — выезжает справа */}
        <div
          className="relative bg-[#17191a] p-6 text-white transition-[opacity,translate] duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] sm:p-8 lg:absolute lg:bottom-6 lg:right-6 lg:top-6 lg:w-[min(520px,42%)] lg:overflow-y-auto lg:rounded-[22px] lg:p-10"
          style={{ opacity: inView ? 1 : 0, translate: inView ? "0 0" : "40px 0" }}
        >
          <p className="text-[12px] leading-[1.6] text-white/60 lg:text-[13px]">
            {t("Салон красоты в Новороссийске и международная beauty-команда для событий.", "A beauty salon in Novorossiysk and an international beauty team for events.")}
          </p>
          {COLS.map((c, i) => (
            <div key={c.title.ru} className={i > 0 ? "mt-6 border-t border-white/12 pt-6" : "mt-6"}>
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-white/50 sm:text-[11px]">{c.title[lang]}</p>
              <div className="mt-2.5 flex items-center justify-between gap-4">
                <a href={`tel:+${c.phoneRaw}`} className="whitespace-nowrap font-display text-[22px] leading-none tracking-[0.01em] text-white transition-opacity hover:opacity-70 lg:text-[26px]">{c.phone}</a>
                <div className="flex gap-2">
                  <a href={c.wa} target="_blank" rel="noopener noreferrer" aria-label={t("Написать в мессенджер", "Message us") + " — " + c.title[lang]} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#17191a]">
                    <IconWa />
                  </a>
                  <a href={c.ig} target="_blank" rel="noopener noreferrer" aria-label={t("Наша страница в соцсети", "Our social media page") + " — " + c.title[lang]} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#17191a]">
                    <IconIg />
                  </a>
                </div>
              </div>
              <dl className="mt-4 space-y-2.5">
                {c.rows.map((r) => (
                  <div key={r.label.ru} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                    <dt className="w-16 shrink-0 text-[10.5px] uppercase tracking-[0.16em] text-white/45">{r.label[lang]}</dt>
                    <dd className="text-[13px] leading-[1.5] text-white/85 lg:text-[14px]">
                      {r.href ? (
                        <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="underline decoration-white/25 underline-offset-[5px] transition-colors hover:decoration-white">{r.value}</a>
                      ) : r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer" className="group mt-8 flex items-center justify-between rounded-[12px] border border-white bg-white px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-white">
            {t("Построить маршрут", "Get directions")}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
