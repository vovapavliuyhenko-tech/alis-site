"use client";
// FOOTER ALIS — тёмный расширенный подвал по типу референса: слева форма
// обратного звонка + соцсети-плитки, колонки «Услуги» и «Информация», справа
// контакты (телефон, часы, соцкнопки, адрес). Внизу — копирайт и правовые
// ссылки. Тёмный фон, светлый текст, бордовые заливки. Двуязычно (RU/EN).
// Телефон/часы — плейсхолдеры, замените на реальные.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const PHONE = "+7 (___) ___-__-__"; // TODO: реальный номер салона
const ADDRESS = { ru: "Новороссийск,\nул. Пархоменко, 53", en: "Novorossiysk,\nParkhomenko St., 53" };
const HOURS = { ru: "Принимаем записи с 9:00 до 21:00", en: "We take bookings from 9:00 to 21:00" };

const SERVICES = [
  { ru: "Полный образ", en: "Full look", href: "/#services" },
  { ru: "Свадебный образ", en: "Bridal look", href: "/#services" },
  { ru: "Макияж и укладка", en: "Makeup & hair", href: "/#services" },
  { ru: "Выезд мастеров", en: "On-location team", href: "/#services" },
  { ru: "Онлайн-запись", en: "Online booking", href: "/#online" },
];
const INFO = [
  { ru: "Обо мне", en: "About", href: "/#about" },
  { ru: "Галерея работ", en: "Gallery", href: "/#gallery" },
  { ru: "Отзывы", en: "Reviews", href: "/#reviews" },
  { ru: "Частые вопросы", en: "FAQ", href: "/#faq" },
  { ru: "Контакты", en: "Contacts", href: "/#footer" },
];
const SOCIAL_TILES = [
  { label: "Instagram", href: "#", img: "/assets/tild3236-393__.jpg" },
  { label: "Telegram", href: "#", img: "/assets/tild6230-643__.jpg" },
  { label: "WhatsApp", href: "#", img: "/assets/tild3535-313_bergamo.png" },
];

export default function Footer() {
  const { lang } = useLang();
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);

  const canSend = phone.replace(/\D/g, "").length >= 6 && agree;
  const submit = () => {
    if (!canSend) return;
    // TODO: реальная отправка (Telegram / e-mail / CRM)
    setSent(true);
  };

  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  return (
    <footer id="footer" className="scroll-mt-24 bg-[#141414] pt-24 pb-8 text-cream">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Колонка 1 — форма обратного звонка + соцсети */}
          <div>
            <p className="max-w-xs font-serif text-[20px] italic leading-snug text-cream">
              {t("Остались вопросы? Оставьте телефон — перезвоним и всё расскажем",
                 "Still have questions? Leave your phone — we'll call back and tell you everything")}
            </p>

            {!sent ? (
              <div className="mt-8 max-w-sm">
                <label className="mb-2 block text-[13px] text-cream/50">{t("Телефон", "Phone")}</label>
                <div className="flex items-center gap-3">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-2xl border border-cream/15 bg-transparent px-4 py-3 text-[15px] text-cream outline-none focus:border-cream/50 placeholder:text-cream/30"
                  />
                  <button
                    onClick={submit}
                    disabled={!canSend}
                    aria-label={t("Отправить", "Send")}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wine text-cream transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] leading-snug text-cream/50">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-wine" />
                  <span>
                    {t("Даю согласие на обработку персональных данных и соглашаюсь с ",
                       "I consent to the processing of personal data and agree to the ")}
                    <a href="/policy" className="underline underline-offset-2 hover:text-cream">
                      {t("политикой конфиденциальности", "privacy policy")}
                    </a>
                  </span>
                </label>
              </div>
            ) : (
              <div className="mt-8 max-w-sm rounded-2xl border border-cream/15 bg-cream/5 px-5 py-4 text-[14px] text-cream/80">
                {t("Спасибо! Перезвоним в ближайшее время.", "Thank you! We'll call you back shortly.")}
              </div>
            )}

            {/* Соцсети-плитки */}
            <div className="mt-10 grid max-w-sm grid-cols-3 gap-4">
              {SOCIAL_TILES.map((s) => (
                <a key={s.label} href={s.href} className="group block">
                  <div className="aspect-square overflow-hidden rounded-[14px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="mt-2.5 block font-serif text-[15px] italic text-cream transition-opacity group-hover:opacity-70">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Колонка 2 — услуги */}
          <FooterCol title={t("Услуги", "Services")} items={SERVICES} lang={lang} />

          {/* Колонка 3 — информация + контакты */}
          <div>
            <FooterCol title={t("Информация", "Information")} items={INFO} lang={lang} />
            <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="mt-9 block font-serif text-[26px] text-cream transition-opacity hover:opacity-70 lg:text-[30px]">
              {PHONE}
            </a>
            <p className="mt-2 text-[13px] text-cream/45">{HOURS[lang]}</p>
            <div className="mt-6 flex gap-3">
              {["telegram", "whatsapp"].map((n) => (
                <a key={n} href="#" aria-label={n} className="flex h-11 w-11 items-center justify-center rounded-full bg-wine text-cream transition-transform hover:scale-105">
                  {n === "telegram" ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M21.9 4.3l-3 14.2c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6 8.5-7.7c.4-.3-.1-.5-.6-.2L7.3 13 2.8 11.6c-1-.3-1-1 .2-1.5L20.6 3c.8-.3 1.5.2 1.3 1.3z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.9 5-1.3A10 10 0 1012 2zm5.5 14c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.2.2-.4.4-.2.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.3z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Колонка 4 — бренд + адрес */}
          <div>
            <div className="font-display text-[40px] font-semibold leading-none tracking-[0.1em] text-cream lg:text-[52px]">ÁLIS</div>
            <p className="mt-8 whitespace-pre-line font-serif text-[22px] leading-tight text-cream lg:text-[26px]">
              {ADDRESS[lang]}
            </p>
            <p className="mt-3 font-serif text-[15px] italic text-cream/50">
              {t("Сеть студий эстетики и beauty-concierge", "Aesthetics studios & beauty concierge")}
            </p>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-20 flex flex-col gap-4 border-t border-cream/12 pt-8 text-[13px] text-cream/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} ALIS — {t("образ, забота, вы", "look, care, you")}</span>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {[
              { label: t("Политика конфиденциальности", "Privacy policy"), href: "/policy" },
              { label: t("Публичная оферта", "Public offer"), href: "/offer" },
              { label: "Cookie", href: "/cookies" },
            ].map((x, i) => (
              <span key={x.href} className="flex items-center gap-4">
                {i > 0 && <span className="text-cream/25">·</span>}
                <a href={x.href} className="transition-colors hover:text-cream">{x.label}</a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  lang,
}: {
  title: string;
  items: { ru: string; en: string; href: string }[];
  lang: "ru" | "en";
}) {
  return (
    <div>
      <p className="mb-6 text-[16px] font-semibold text-cream">{title}</p>
      <ul className="space-y-3.5">
        {items.map((it) => (
          <li key={it.ru}>
            <a href={it.href} className="text-[15px] text-cream/55 transition-colors hover:text-cream">
              {it[lang]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
