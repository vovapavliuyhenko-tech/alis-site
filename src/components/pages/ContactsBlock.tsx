"use client";
// СТРАНИЦА КОНТАКТОВ — один блок в стиле главной: светлый фон, центрированный
// серифный заголовок, оливковый акцент, карточка с реквизитами + фото, кнопки
// с эффектом стекла на наведении и ряд мессенджеров-пилюль. Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHONE = "+7 988 888 77 58";
const PHONE_RAW = "79888887758";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const PHOTO = "/assets/tild6530-383_-2___1_.jpg"; // плейсхолдер

type Loc = { ru: string; en: string };

export default function ContactsBlock() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const ROWS: { label: Loc; value: string; href?: string }[] = [
    { label: { ru: "Адрес", en: "Address" }, value: t("Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL },
    { label: { ru: "Часы работы", en: "Hours" }, value: t("Без выходных, 9:00–21:00", "Open daily, 9:00–21:00") },
    { label: { ru: "Телефон", en: "Phone" }, value: PHONE, href: `tel:+${PHONE_RAW}` },
    { label: { ru: "E-mail", en: "E-mail" }, value: EMAIL, href: `mailto:${EMAIL}` },
  ];

  const SOCIALS: { label: string; href: string }[] = [
    { label: "WhatsApp", href: `https://wa.me/${PHONE_RAW}` },
    { label: "Instagram @alisbeauty.ru", href: "https://www.instagram.com/alisbeauty.ru" },
    { label: "Instagram @alisbeauty.global", href: "https://www.instagram.com/alisbeauty.global" },
    { label: t("Яндекс Карты", "Yandex Maps"), href: MAP_URL },
    { label: t("Позвонить", "Call"), href: `tel:+${PHONE_RAW}` },
    { label: "E-mail", href: `mailto:${EMAIL}` },
  ];

  return (
    <section className="bg-[#F9F8F6] pb-20 pt-28 lg:pb-28 lg:pt-32">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        {/* Заголовок секции — как на главной */}
        <div className="text-center">
          <p className="text-[10px] lowercase tracking-[0.05em] text-[#6E7248]">{t("контакты", "contacts")}</p>
          <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#6E7248] lg:text-[28px]">
            {t("Мы всегда на связи", "We're always in touch")}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[12.5px] leading-[1.6] text-[#444]/75">
            {t(
              "Запишитесь онлайн, позвоните или напишите в мессенджер — как удобнее. На первый визит действует скидка −10%.",
              "Book online, call or message us — whatever suits you. Your first visit gets −10% off.",
            )}
          </p>
        </div>

        {/* Реквизиты + фото */}
        <div className="mt-14 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="flex flex-col rounded-[24px] border border-[#C2C0B6]/45 bg-white/60 p-7 lg:p-9">
            <dl className="divide-y divide-[#C2C0B6]/40">
              {ROWS.map((r) => (
                <div key={r.label.ru} className="grid grid-cols-[130px_1fr] items-baseline gap-4 py-3.5 first:pt-0">
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#6E7248]">{r.label[lang]}</dt>
                  <dd className="text-[13.5px] text-[#444]">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={YCLIENTS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-transparent bg-[#6E7248] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-[#F4F1EA] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:text-[#6E7248] hover:backdrop-blur-md"
              >
                {t("Записаться", "Book now")}
              </a>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#6E7248]/40 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-[#6E7248] transition-colors duration-300 hover:bg-[#6E7248] hover:text-[#F4F1EA]"
              >
                {t("Построить маршрут", "Get directions")}
              </a>
            </div>
          </div>

          {/* Фото */}
          <div className="overflow-hidden rounded-[24px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="" aria-hidden className="h-full min-h-[300px] w-full object-cover" />
          </div>
        </div>

        {/* Мессенджеры и соцсети — пилюли */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#6E7248]/30 px-6 py-2.5 text-[12px] uppercase tracking-[0.06em] text-[#6E7248] transition-colors duration-300 hover:border-transparent hover:bg-[#6E7248] hover:text-[#F4F1EA]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
