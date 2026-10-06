"use client";
// FOOTER ÁLIS BEAUTY — как мобильная версия: сверху крупный телефон с иконками (на компьютере
// справа — второй телефон и почта), ниже три раскрывающихся раздела — «Меню», «Адрес и часы»,
// «Соцсети и почта» (на компьютере в ряд). Плавное раскрытие, пункты выезжают по очереди.
// Названия соцсетей не пишем — подписи «Салон красоты» / «Консьерж-сервис». Двуязычно.
import { useState } from "react";
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
  // На странице консьерж-сервиса первым идёт телефон сервиса, на остальных — салона
  const concierge = pathname === "/concierge";
  const t = (ru: string, e: string) => (en ? e : ru);

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

  // Разделы-аккордеоны (как в мобильной версии): плавно раскрываются, пункты выезжают по очереди
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (k: string) => setOpen((o) => (o.includes(k) ? o.filter((x) => x !== k) : [...o, k]));
  const PHONES = (concierge
    ? [{ label: t("Консьерж-сервис", "Concierge service"), num: PHONE_SERVICE }, { label: t("Салон красоты", "Beauty salon"), num: PHONE_SALON }]
    : [{ label: t("Салон красоты", "Beauty salon"), num: PHONE_SALON }, { label: t("Консьерж-сервис", "Concierge service"), num: PHONE_SERVICE }]);
  const SECTIONS: { key: string; label: string; items: { label: string; href?: string }[] }[] = [
    { key: "menu", label: t("Меню", "Menu"), items: MENU },
    {
      key: "addr",
      label: t("Адрес и часы", "Address & hours"),
      items: [
        { label: ADDRESS[lang], href: MAP_URL },
        { label: HOURS[lang] },
        { label: t("Построить маршрут →", "Get directions →"), href: ROUTE_URL },
      ],
    },
    {
      key: "soc",
      label: t("Соцсети и почта", "Social & e-mail"),
      items: [
        ...SOCIALS.map((so) => ({ label: so.label[lang] + "*", href: so.href })),
        { label: EMAIL, href: `mailto:${EMAIL}` },
      ],
    },
  ];

  return (
    <footer id="footer" className="relative z-20 -mt-10 overflow-hidden rounded-t-[40px] bg-[#17191a] text-[#f4efe6]">
      <div className="relative z-10 mx-auto w-[90%] max-w-[1760px] pb-6 pt-10 sm:w-[96%] lg:pb-10 lg:pt-20">
        {/* Верх: два телефона (салон и консьерж-сервис) — компактно, у каждого свой мессенджер;
            справа — соцсеть и почта. Первым идёт номер текущего направления. */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-10 lg:flex lg:gap-14">
            {PHONES.map((ph) => (
              <div key={ph.num}>
                <p className="mb-1.5 text-[9.5px] uppercase tracking-[0.18em] text-[#f4efe6]/55 sm:text-[10.5px]">{ph.label}</p>
                <div className="flex items-center gap-3">
                  <a href={`tel:${ph.num.replace(/[^\d+]/g, "")}`} className="group relative whitespace-nowrap font-display text-[20px] leading-none tracking-[0.02em] text-[#f4efe6] sm:text-[24px] lg:text-[28px]">
                    {ph.num}
                    <span aria-hidden className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#f4efe6]/60 transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-x-100" />
                  </a>
                  <a href={`https://wa.me/${ph.num.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label={t("Написать в мессенджер", "Message us") + " — " + ph.label} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f4efe6]/35 text-[#f4efe6] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#f4efe6] hover:bg-[#f4efe6] hover:text-[#17191a]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.9.92-3-.2-.31a8.2 8.2 0 1 1 6.86 3.74Z" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 lg:gap-5">
            <a href={SOCIALS[concierge ? 1 : 0].href} target="_blank" rel="noopener noreferrer" aria-label={t("Наша страница в соцсети", "Our social media page")} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f4efe6]/35 text-[#f4efe6] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#f4efe6] hover:bg-[#f4efe6] hover:text-[#17191a]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-3.5 w-3.5" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href={`mailto:${EMAIL}`} className="text-[12.5px] text-[#f4efe6]/85 underline decoration-[#f4efe6]/25 underline-offset-[6px] transition-colors hover:text-[#f4efe6] hover:decoration-[#f4efe6] sm:text-[14px]">{EMAIL}</a>
          </div>
        </div>

        {/* Раскрывающиеся разделы: на телефоне — друг под другом, на компьютере — три в ряд */}
        <div className="mt-6 grid border-t border-[#f4efe6]/12 lg:mt-12 lg:grid-cols-3 lg:gap-10 lg:border-t-0">
          {SECTIONS.map((sec) => {
            const isOpen = open.includes(sec.key);
            return (
              <div key={sec.key} className="border-b border-[#f4efe6]/12 lg:border-b-0 lg:border-t">
                <button
                  type="button"
                  onClick={() => toggle(sec.key)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between py-3.5 text-left text-[12px] uppercase tracking-[0.14em] text-[#f4efe6] lg:py-5 lg:text-[13px]"
                >
                  <span className="relative">
                    {sec.label}
                    <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#f4efe6]/50 transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                  <span aria-hidden className={`flex h-7 w-7 items-center justify-center rounded-full border text-[15px] font-light leading-none transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] lg:h-8 lg:w-8 ${isOpen ? "rotate-45 border-[#f4efe6] bg-[#f4efe6] text-[#17191a]" : "border-[#f4efe6]/30 group-hover:border-[#f4efe6]"}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className={`pb-5 ${sec.key === "menu" ? "grid grid-cols-2 gap-x-4 gap-y-2" : "flex flex-col gap-2"}`}>
                      {sec.items.map((it, k) => {
                        const cls = "w-fit text-[12px] transition-[opacity,translate,color] duration-500 sm:text-[13px]";
                        const st = { opacity: isOpen ? 1 : 0, translate: isOpen ? "0 0" : "0 8px", transitionDelay: isOpen ? `${0.12 + k * 0.04}s` : "0s" };
                        return it.href ? (
                          <a key={k} href={it.href} {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} text-[#f4efe6]/80 hover:text-[#f4efe6]`} style={st}>{it.label}</a>
                        ) : (
                          <p key={k} className={`${cls} text-[#f4efe6]/55`} style={st}>{it.label}</p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Нижний ряд: копирайт слева, документы в одну строку справа */}
        <div className="mt-6 flex flex-col gap-3 border-t sm:mt-8 border-[#f4efe6]/10 pt-5 text-[10.5px] text-[#f4efe6]/65 sm:pt-6 sm:text-[12px] md:flex-row md:items-center md:justify-between lg:mt-14">
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
        <p className="mt-4 text-[9.5px] leading-relaxed text-[#f4efe6]/45 sm:mt-5 sm:text-[11px]">
          {t(
            "* Instagram является продуктом компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.",
            "* Instagram is a product of Meta Platforms Inc., whose activities are recognised as extremist and banned in the Russian Federation.",
          )}
        </p>
      </div>
    </footer>
  );
}
