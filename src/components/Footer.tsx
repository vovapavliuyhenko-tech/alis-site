"use client";
// FOOTER ÁLIS BEAUTY — светлый «инфо-подвал» по мотивам jodocosmetics: колонки
// (соцсети / адрес / меню), крупные телефон и e-mail справа, правовой ряд.
// Названия соцсетей не пишем — подписи «Салон красоты» / «Консьерж-сервис». Двуязычно.
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const PHONE_SALON = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";

const ADDRESS = { ru: "Новороссийск, ул. Пархоменко, 53", en: "Novorossiysk, Parkhomenko St., 53" };
const HOURS = { ru: "Без перерывов и выходных, 9:00–21:00", en: "No breaks, open daily, 9:00–21:00" };

const SOCIALS = [
  { label: { ru: "Салон красоты: @alisbeauty.ru", en: "Beauty salon: @alisbeauty.ru" }, href: "https://www.instagram.com/alisbeauty.ru" },
  { label: { ru: "Консьерж-сервис: @alisbeauty.global", en: "Concierge service: @alisbeauty.global" }, href: "https://www.instagram.com/alisbeauty.global" },
];

export default function Footer() {
  const { lang } = useLang();
  const pathname = usePathname();
  const en = lang === "en";
  // На странице консьерж-сервиса крупно — телефон сервиса, на остальных — салона
  const concierge = pathname === "/concierge";
  const PHONE_MAIN = concierge ? PHONE_SERVICE : PHONE_SALON;
  const PHONE_SECOND = concierge ? PHONE_SALON : PHONE_SERVICE;
  const t = (ru: string, e: string) => (en ? e : ru);
  const secondNote = concierge ? t("салон красоты", "beauty salon") : t("консьерж-сервис", "concierge service");

  const title = "mb-5 text-[13px] text-[#f4efe6]";
  const link = "block text-[14px] text-[#f4efe6]/60 transition-colors hover:text-[#f4efe6]";

  const MENU = [
    { label: t("Салон красоты", "Beauty salon"), href: "/salon" },
    { label: t("Консьерж-сервис", "Concierge service"), href: "/concierge" },
    { label: t("Магазин", "Shop"), href: "/shop" },
    { label: t("Сотрудничество", "Cooperation"), href: "/cooperation" },
    { label: t("Вакансии", "Vacancies"), href: "/team#vacancies" },
    { label: t("Контакты", "Contacts"), href: "/contacts" },
  ];
  const LEGAL = [
    { label: t("Политика конфиденциальности", "Privacy policy"), href: "/policy" },
    { label: t("Публичная оферта", "Public offer"), href: "/offer" },
    { label: "Cookie", href: "/cookies" },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden rounded-t-[40px] bg-[#17191a] text-[#f4efe6]">
      <div className="relative z-10 mx-auto w-[94%] max-w-[1680px] pb-10 pt-16 lg:pt-20">
        {/* Колонки + крупный контакт справа */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-8">
          {/* Соцсети */}
          <div>
            <p className={title}>{t("Социальные сети", "Social")}</p>
            <div className="space-y-2">
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label[lang]}
                </a>
              ))}
            </div>
          </div>

          {/* Адрес */}
          <div>
            <p className={title}>{t("Адрес", "Address")}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block max-w-[16rem] text-[14px] leading-relaxed text-[#f4efe6]/60 transition-colors hover:text-[#f4efe6]">
              {ADDRESS[lang]}
            </a>
            <p className="mt-2 text-[13px] text-[#f4efe6]/45">{HOURS[lang]}</p>
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
            <a href={`tel:${PHONE_MAIN.replace(/[^\d+]/g, "")}`} className="block font-display text-[30px] leading-tight tracking-[0.02em] text-[#f4efe6] transition-opacity hover:opacity-70 lg:text-[40px]">
              {PHONE_MAIN}
            </a>
            <a href={`tel:${PHONE_SECOND.replace(/[^\d+]/g, "")}`} className="mt-1 block text-[14px] text-[#f4efe6]/55 transition-colors hover:text-[#f4efe6]">
              {PHONE_SECOND} — {secondNote}
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-4 block font-display text-[20px] text-[#f4efe6]/70 transition-opacity hover:opacity-70 lg:text-[26px]">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-[#f4efe6]/10 pt-8" />

        {/* Нижний ряд */}
        <div className="flex flex-col gap-4 text-[12px] text-[#f4efe6]/55 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} ÁLIS BEAUTY</span>
            <a href="https://t.me/vladimir_nvrs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f4efe6]">
              {t("Разработка сайта", "Website by")}
            </a>
          </div>
          <div className="flex flex-col gap-1 md:items-end md:text-right">
            {LEGAL.map((l) => (
              <a key={l.href} href={l.href} className="underline-offset-4 transition-colors hover:text-white hover:underline">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
