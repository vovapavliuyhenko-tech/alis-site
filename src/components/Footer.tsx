"use client";
// FOOTER ALIS — формат «фото-обложка»: фон-фото с бордовой вуалью, по центру
// логотип + слоган + кнопка «Записаться» + соцсети в пунктирных кружках; ниже —
// колонки (контакты / меню / реквизиты / правовое) и копирайт. Двуязычно.
import { useLang } from "@/lib/i18n";
import { LogoEmblem, LogoWord } from "@/components/Logo";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHONE_SALON = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const PHOTO = "/assets/tild6530-383_-2___1_.jpg";

const ADDRESS = { ru: "Новороссийск,\nул. Пархоменко, 53", en: "Novorossiysk,\nParkhomenko St., 53" };
const HOURS = { ru: "Без выходных, 9:00–21:00", en: "Open daily, 9:00–21:00" };

const SOCIALS = [
  { label: "Instagram — Новороссийск", href: "https://www.instagram.com/alisbeauty.ru" },
  { label: "Instagram — Global", href: "https://www.instagram.com/alisbeauty.global" },
];

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const eyebrow = "mb-4 text-[11px] uppercase tracking-[0.22em] text-[#e7c9a0]";
  const link = "block text-[14px] text-[#f4efe6]/80 transition-opacity hover:opacity-70";

  const MENU = [
    { label: t("Салон", "Salon"), href: "/salon" },
    { label: t("Команда", "Team"), href: "/team" },
    { label: t("Бьюти-консьерж", "Concierge"), href: "/concierge" },
    { label: t("Сотрудничество", "Cooperation"), href: "/cooperation" },
  ];
  const LEGAL = [
    { label: t("Политика конфиденциальности", "Privacy policy"), href: "/policy" },
    { label: t("Публичная оферта", "Public offer"), href: "/offer" },
    { label: "Cookie", href: "/cookies" },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden rounded-t-[40px] bg-[#3B0D1A] text-[#f4efe6]">
      {/* Фон-фото + бордовая вуаль */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#3B0D1A]/85 via-[#3B0D1A]/80 to-[#3B0D1A]/95" />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1200px]">
        {/* Центр: логотип + слоган + кнопка + соцсети */}
        <div className="flex flex-col items-center py-20 text-center lg:py-28">
          <LogoEmblem variant="cream" className="h-[84px] w-auto max-w-none lg:h-[100px]" />
          <LogoWord variant="cream" className="mt-5 h-[26px] w-auto max-w-none lg:h-[30px]" />
          <p className="mt-6 max-w-md font-serif text-[19px] italic leading-tight text-[#f4efe6]/85 lg:text-[22px]">
            {t("Отражаем внутреннюю красоту во внешнем облике", "Reflecting inner beauty in your outer look")}
          </p>

          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-[#f4efe6] px-12 py-4 font-display text-[13px] uppercase tracking-[0.18em] text-[#3B0D1A] transition-transform duration-300 hover:scale-[1.03]"
          >
            {t("Записаться", "Book now")}
          </a>

          <div className="mt-8 flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[#f4efe6]/40 text-[#f4efe6]/80 transition-colors hover:border-[#f4efe6] hover:text-[#f4efe6]"
              >
                <IgIcon />
              </a>
            ))}
          </div>
        </div>

        {/* Колонки */}
        <div className="grid gap-10 border-t border-[#f4efe6]/15 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Адрес */}
          <div>
            <p className={eyebrow}>{t("Адрес", "Address")}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className={`${link} whitespace-pre-line`}>
              {ADDRESS[lang]}
            </a>
            <p className="mt-2 text-[13px] text-[#f4efe6]/55">{HOURS[lang]}</p>
          </div>

          {/* Меню */}
          <div>
            <p className={eyebrow}>{t("Меню", "Menu")}</p>
            <ul className="space-y-2.5">
              {MENU.map((m) => (
                <li key={m.href}>
                  <a href={m.href} className={link}>{m.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <p className={eyebrow}>{t("Контакты", "Contact")}</p>
            <a href={`tel:${PHONE_SALON.replace(/[^\d+]/g, "")}`} className={link}>
              {PHONE_SALON} <span className="text-[#f4efe6]/45">— {t("салон", "salon")}</span>
            </a>
            <a href={`tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}`} className={`${link} mt-1`}>
              {PHONE_SERVICE} <span className="text-[#f4efe6]/45">— {t("выезд", "on-location")}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={`${link} mt-2`}>{EMAIL}</a>
          </div>

          {/* Правовое */}
          <div>
            <p className={eyebrow}>{t("Документы", "Legal")}</p>
            <ul className="space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#f4efe6]/15 py-7 text-[12px] text-[#f4efe6]/55 md:flex-row md:items-center md:justify-between">
          <a href="https://t.me/vladimir_nvrs" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
            {t("Разработка сайта", "Website by")}
          </a>
          <span>© {new Date().getFullYear()} ÁLIS BEAUTY</span>
        </div>
      </div>
    </footer>
  );
}
