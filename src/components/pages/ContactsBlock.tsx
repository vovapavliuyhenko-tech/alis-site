"use client";
// СТРАНИЦА КОНТАКТОВ: слева две группы контактов (салон красоты / консьерж-сервис)
// и три мягкие кнопки с ↘-стрелкой; справа — интерактивная карта Яндекс.
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

// Пин для кнопки «Открыть в Яндекс Картах».
const IconPin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
    <path d="M12 21c4-4 6-7 6-10a6 6 0 1 0-12 0c0 3 2 6 6 10Z" strokeLinejoin="round" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
);

type Loc = { ru: string; en: string };

export default function ContactsBlock() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  // Две группы контактов: салон красоты и консьерж-сервис
  const GROUPS: { title: Loc; rows: { label: Loc; value: string; href?: string }[] }[] = [
    {
      title: { ru: "Салон красоты", en: "Beauty salon" },
      rows: [
        { label: { ru: "Телефон", en: "Phone" }, value: PHONE, href: `tel:+${PHONE_RAW}` },
        { label: { ru: "Адрес", en: "Address" }, value: t("г. Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL },
        { label: { ru: "Время работы", en: "Hours" }, value: t("Без перерывов и выходных, 9:00–21:00", "No breaks, open daily, 9:00–21:00") },
      ],
    },
    {
      title: { ru: "Консьерж-сервис", en: "Concierge service" },
      rows: [
        { label: { ru: "Телефон", en: "Phone" }, value: PHONE_SERVICE, href: `tel:+${PHONE_SERVICE_RAW}` },
        { label: { ru: "Почта", en: "E-mail" }, value: EMAIL, href: `mailto:${EMAIL}` },
      ],
    },
  ];

  // Названия соцсетей и мессенджеров на сайте не указываем — подписи нейтральные
  const BTNS: { label: Loc; handle?: string; href: string }[] = [
    { label: { ru: "Написать нам", en: "Message us" }, href: `https://wa.me/${PHONE_RAW}` },
    { label: { ru: "Салон красоты", en: "Beauty salon" }, handle: "@alisbeauty.ru", href: "https://www.instagram.com/alisbeauty.ru" },
    { label: { ru: "Консьерж-сервис", en: "Concierge service" }, handle: "@alisbeauty.global", href: "https://www.instagram.com/alisbeauty.global" },
  ];
  return (
    <section className="bg-white px-3 pt-28 pb-12 sm:px-4 lg:pt-36 lg:pb-[60px]">
      {/* Слева реквизиты и кнопки, справа карта — одна скруглённая панель */}
      <div className="overflow-hidden rounded-[12px] border border-[#17191a]/15 bg-white lg:grid lg:grid-cols-2">
        {/* Левая колонка */}
        <div className="flex flex-col p-8 lg:p-12">
          <div className="flex flex-col gap-10">
            {GROUPS.map((g) => (
              <div key={g.title.ru}>
                <h2 className="font-display text-[18px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-[#17191a] lg:text-[20px]">
                  {g.title[lang]}
                </h2>
                <dl className="mt-5 flex flex-col gap-4">
                  {g.rows.map((r) => (
                    <div key={r.label.ru} className="grid grid-cols-[110px_1fr] items-baseline gap-5 lg:grid-cols-[150px_1fr]">
                      <dt className="text-[13px] text-[#2a2320]/45">{r.label[lang]}</dt>
                      <dd className="text-[15px] font-medium leading-snug text-[#17191a] lg:text-[16px]">
                        {r.href ? (
                          <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
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
            ))}
          </div>

          {/* Три кнопки: написать нам и соцсети салона/консьерж-сервиса (без названий площадок) */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {BTNS.map((b, i) => (
              <a
                key={i}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[124px] flex-col rounded-[12px] border border-[#17191a]/15 bg-white p-5 transition-colors duration-300 hover:border-[#17191a]/40 lg:min-h-[140px] lg:p-6"
              >
                <span className="max-w-[80%] text-[14px] leading-[1.3] text-[#242424] lg:text-[15px]">
                  {b.label[lang]}
                </span>
                {b.handle && <span className="mt-1 text-[12px] text-[#17191a]/60">{b.handle}</span>}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="absolute bottom-5 right-5 h-6 w-6 text-[#17191a] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                >
                  <path d="M8 8 16 16M16 10v6h-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Правая колонка — интерактивная карта с кнопками */}
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
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[12px] font-medium text-[#17191a] shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-colors hover:bg-white"
          >
            <span className="text-[#17191a]">{IconPin}</span>
            {t("Открыть в Яндекс Картах", "Open in Yandex Maps")}
          </a>
          <a
            href={ROUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full bg-[#46131E] px-6 py-3.5 font-display text-[12px] uppercase tracking-[0.14em] text-[#f4efe6] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-[#46131E] transition-all duration-300 hover:border-white/70 hover:bg-white/20 hover:backdrop-blur-md lg:px-8 lg:py-4 lg:text-[13px]"
          >
            {t("Построить маршрут", "Get directions")}
          </a>
        </div>
      </div>
    </section>
  );
}
