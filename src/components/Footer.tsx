"use client";
// FOOTER ALIS — светлый «инфо-подвал» по мотивам jodocosmetics: колонки
// (соцсети / адрес / меню), крупные телефон и e-mail справа, гигантский
// бренд-вотермарк снизу, правовой ряд. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHONE_SALON = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";

const ADDRESS = { ru: "Новороссийск, ул. Пархоменко, 53", en: "Novorossiysk, Parkhomenko St., 53" };
const HOURS = { ru: "Без выходных, 9:00–21:00", en: "Open daily, 9:00–21:00" };

const SOCIALS = [
  { label: "Instagram: @alisbeauty.ru", href: "https://www.instagram.com/alisbeauty.ru" },
  { label: "Instagram: @alisbeauty.global", href: "https://www.instagram.com/alisbeauty.global" },
];

export default function Footer() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const title = "mb-5 text-[13px] text-[#2a2320]";
  const link = "block text-[14px] text-[#2a2320]/60 transition-colors hover:text-[#2a2320]";

  const MENU = [
    { label: t("Салон", "Salon"), href: "/salon" },
    { label: t("Команда", "Team"), href: "/team" },
    { label: t("Бьюти-консьерж", "Concierge"), href: "/concierge" },
    { label: t("Сотрудничество", "Cooperation"), href: "/cooperation" },
    { label: t("Контакты", "Contacts"), href: "/contacts" },
  ];
  const LEGAL = [
    { label: t("Политика конфиденциальности", "Privacy policy"), href: "/policy" },
    { label: t("Публичная оферта", "Public offer"), href: "/offer" },
    { label: "Cookie", href: "/cookies" },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden rounded-t-[40px] bg-[#efe7db] text-[#2a2320]">
      {/* Гигантский бренд-вотермарк снизу */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center font-display uppercase leading-[0.8] tracking-[0.02em] text-[#e2d4c1] translate-y-[26%]"
        style={{ fontSize: "clamp(90px, 22vw, 360px)" }}
      >
        ÁLIS&nbsp;BEAUTY
      </span>

      <div className="relative z-10 mx-auto w-[94%] max-w-[1680px] pb-10 pt-16 lg:pt-20">
        {/* Колонки + крупный контакт справа */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-8">
          {/* Соцсети */}
          <div>
            <p className={title}>{t("Социальные сети", "Social")}</p>
            <div className="space-y-2">
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Адрес */}
          <div>
            <p className={title}>{t("Адрес", "Address")}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block max-w-[16rem] text-[14px] leading-relaxed text-[#2a2320]/60 transition-colors hover:text-[#2a2320]">
              {ADDRESS[lang]}
            </a>
            <p className="mt-2 text-[13px] text-[#2a2320]/45">{HOURS[lang]}</p>
          </div>

          {/* Меню */}
          <div>
            <p className={title}>{t("Меню", "Menu")}</p>
            <div className="space-y-2">
              {MENU.map((m) => (
                <a key={m.href} href={m.href} className={link}>{m.label}</a>
              ))}
            </div>
          </div>

          {/* Телефон + email справа, крупно */}
          <div className="lg:text-right">
            <a href={`tel:${PHONE_SALON.replace(/[^\d+]/g, "")}`} className="block font-display text-[30px] leading-tight tracking-[0.02em] text-[#2a2320] transition-opacity hover:opacity-70 lg:text-[40px]">
              {PHONE_SALON}
            </a>
            <a href={`tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}`} className="mt-1 block text-[14px] text-[#2a2320]/55 transition-colors hover:text-[#2a2320]">
              {PHONE_SERVICE} — {t("выезд", "on-location")}
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-4 block font-display text-[20px] text-[#2a2320]/70 transition-opacity hover:opacity-70 lg:text-[26px]">
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Слоган */}
        <p className="mt-12 max-w-md font-serif text-[18px] italic leading-tight text-[#2a2320]/70 lg:text-[22px]">
          {t("Отражаем внутреннюю красоту во внешнем облике", "Reflecting inner beauty in your outer look")}
        </p>

        {/* Место под вотермарк */}
        <div className="h-[26vh] min-h-[180px] lg:h-[34vh]" />

        {/* Нижний ряд */}
        <div className="flex flex-col gap-4 text-[12px] text-[#2a2320]/55 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} ÁLIS BEAUTY</span>
            <a href="https://t.me/vladimir_nvrs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#2a2320]">
              {t("Разработка сайта", "Website by")}
            </a>
          </div>
          <div className="flex flex-col gap-1 md:items-end md:text-right">
            {LEGAL.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-[#2a2320]">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
