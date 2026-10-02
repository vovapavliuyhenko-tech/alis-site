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
// Маршрут до салона в Яндекс Картах (координаты организации «Áлис Бьюти»)
const ROUTE_URL = "https://yandex.ru/maps/?rtext=~44.704933%2C37.782638&rtt=auto";

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

  // Подписи колонок — мелкие капсом, ссылки — с тонким подчёркиванием на наведении
  const title = "mb-5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]/75";
  const link =
    "relative block w-fit text-[14px] text-[#f4efe6]/85 lg:text-[12.5px] transition-colors hover:text-[#f4efe6] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#46131E] after:transition-all after:duration-300 hover:after:w-full";
  const MENU = [
    { label: t("Салон красоты", "Beauty salon"), href: "/salon" },
    { label: t("Консьерж-сервис", "Concierge service"), href: "/concierge" },
    { label: t("Магазин", "Shop"), href: "/shop" },
    { label: t("Каталог", "Catalogue"), href: "/shop/catalog" },
    { label: t("Новости", "News"), href: "/news" },
    { label: t("Подарочный сертификат", "Gift certificate"), href: "https://o8981.yclients.ru/certificates" },
    { label: t("Программа лояльности", "Loyalty programme"), href: "/loyalty" },
    { label: t("Сотрудничество", "Cooperation"), href: "/cooperation" },
    { label: t("Вакансии", "Vacancies"), href: "/team" },
    { label: t("Контакты", "Contacts"), href: "/contacts" },
  ];
  const LEGAL = [
    { label: t("Документы", "Documents"), href: "/docs" },
    { label: t("Политика конфиденциальности", "Privacy policy"), href: "/policy" },
    { label: t("Публичная оферта", "Public offer"), href: "/offer" },
    { label: "Cookie", href: "/cookies" },
  ];

  return (
    <footer id="footer" className="relative z-20 -mt-10 overflow-hidden rounded-t-[40px] bg-[#17191a] text-[#f4efe6]">
      <div className="relative z-10 mx-auto w-[96%] max-w-[1760px] pb-8 pt-16 lg:pb-10 lg:pt-20">
        {/* Колонки + крупный контакт справа */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.6fr_auto] lg:gap-10">
          {/* Соцсети */}
          <div>
            <p className={title}>{t("Социальные сети", "Social media")}</p>
            <div className="space-y-2">
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label[lang]}*
                </a>
              ))}
            </div>
          </div>

          {/* Адрес и часы */}
          <div>
            <p className={title}>{t("Адрес", "Address")}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className={`${link} max-w-[16rem] leading-relaxed`}>
              {ADDRESS[lang]}
            </a>
            <p className="mt-3 text-[13px] leading-relaxed text-[#f4efe6]/70 lg:text-[12px]">{HOURS[lang]}</p>
            <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer" className={`${link} mt-4`}>
              {t("Построить маршрут →", "Get directions →")}
            </a>
          </div>

          {/* Меню — в две колонки, чтобы подвал был компактнее */}
          <div>
            <p className={title}>{t("Меню", "Menu")}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 lg:gap-y-2">
              {MENU.map((m) => (
                <a key={m.href} href={m.href} {...(m.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${link} whitespace-nowrap`}>{m.label}</a>
              ))}
            </div>
          </div>

          {/* Телефоны + email справа, крупно */}
          <div className="sm:col-span-2 lg:col-span-1 lg:text-right">
            <p className={title}>{concierge ? t("Консьерж-сервис", "Concierge service") : t("Салон красоты", "Beauty salon")}</p>
            <a href={`tel:${PHONE_MAIN.replace(/[^\d+]/g, "")}`} className="block whitespace-nowrap font-display text-[30px] leading-none tracking-[0.02em] text-[#f4efe6] transition-opacity hover:opacity-70 lg:text-[40px]">
              {PHONE_MAIN}
            </a>
            <a href={`tel:${PHONE_SECOND.replace(/[^\d+]/g, "")}`} className="mt-3 block text-[14px] text-[#f4efe6]/75 lg:text-[12.5px] transition-colors hover:text-[#f4efe6]">
              {PHONE_SECOND} — {secondNote}
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-5 inline-block text-[14px] text-[#f4efe6]/85 underline decoration-[#f4efe6]/25 underline-offset-[6px] transition-colors hover:text-[#f4efe6] hover:decoration-[#46131E] lg:text-[15px]">
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Нижний ряд: копирайт слева, документы в одну строку справа */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#f4efe6]/10 pt-6 text-[12px] text-[#f4efe6]/65 md:flex-row md:items-center md:justify-between lg:mt-14">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>© {new Date().getFullYear()} ÁLIS BEAUTY. {t("Все права защищены", "All rights reserved")}</span>
            <a href="https://t.me/vladimir_nvrs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f4efe6]">
              {t("Разработка сайта", "Website by")}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {LEGAL.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-[#f4efe6]">{l.label}</a>
            ))}
          </div>
        </div>
        {/* Обязательная сноска к ссылкам на соцсеть (отмечены *) */}
        <p className="mt-5 text-[11px] leading-relaxed text-[#f4efe6]/45">
          {t(
            "* Instagram является продуктом компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.",
            "* Instagram is a product of Meta Platforms Inc., whose activities are recognised as extremist and banned in the Russian Federation.",
          )}
        </p>
      </div>
    </footer>
  );
}
