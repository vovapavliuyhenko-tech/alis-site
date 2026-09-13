"use client";
// СТРАНИЦА КОНТАКТОВ — верхняя часть как на референсе we-are-padel: слева
// надстрочник, крупный заголовок «Как нас найти», реквизиты и три мягкие кнопки
// (WhatsApp + два Instagram) с ↘-стрелкой; справа — интерактивная карта Яндекс.
import { useLang } from "@/lib/i18n";

const PHONE = "+7 988 888 77 58";
const PHONE_RAW = "79888887758";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";

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

  const INFO: { label: Loc; value: string; href?: string; accent?: boolean }[] = [
    { label: { ru: "Телефон", en: "Phone" }, value: PHONE, href: `tel:+${PHONE_RAW}` },
    { label: { ru: "Время работы", en: "Hours" }, value: t("Без выходных, 9:00–21:00", "Open daily, 9:00–21:00") },
    { label: { ru: "Адрес", en: "Address" }, value: t("г. Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL, accent: true },
  ];

  const BTNS: { label: Loc; handle?: string; href: string }[] = [
    { label: { ru: "Написать в WhatsApp", en: "Message on WhatsApp" }, href: `https://wa.me/${PHONE_RAW}` },
    { label: { ru: "Следить в Instagram", en: "Follow on Instagram" }, handle: "@alisbeauty.ru", href: "https://www.instagram.com/alisbeauty.ru" },
    { label: { ru: "Следить в Instagram", en: "Follow on Instagram" }, handle: "@alisbeauty.global", href: "https://www.instagram.com/alisbeauty.global" },
  ];

  return (
    <section className="bg-white px-3 pt-[76px] pb-16 sm:px-4 lg:pt-[88px] lg:pb-24">
      {/* Слева реквизиты и кнопки, справа карта — одна скруглённая панель */}
      <div className="overflow-hidden rounded-[30px] border border-[#6E7248]/15 bg-white lg:grid lg:grid-cols-2">
        {/* Левая колонка */}
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

          <dl className="mt-8 flex flex-col gap-6 lg:mt-10">
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

          {/* Три мягкие кнопки — WhatsApp и два Instagram */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {BTNS.map((b, i) => (
              <a
                key={i}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[124px] flex-col rounded-[20px] bg-[#ECE7DB] p-5 transition-colors duration-300 hover:bg-[#e3dccb] lg:min-h-[140px] lg:p-6"
              >
                <span className="max-w-[80%] font-display text-[13px] uppercase leading-[1.3] tracking-[0.06em] text-[#6E7248] lg:text-[14px]">
                  {b.label[lang]}
                </span>
                {b.handle && <span className="mt-1 text-[12px] text-[#6E7248]/60">{b.handle}</span>}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="absolute bottom-5 right-5 h-6 w-6 text-[#6E7248] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
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
    </section>
  );
}
