"use client";
// FOOTER ALIS — по мотивам matre.world: гигантский вордмарк слева, таглайн
// справа, ниже 4 колонки (контакты / соцсети / язык / обратный звонок) с крупным
// полем ввода, нижний ряд — разработчик, правовые ссылки, копирайт. Бордовый
// фон, кремовый текст, золотые эйброу. Двуязычно (RU/EN).
// Телефон/часы — плейсхолдеры, замените на реальные.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const PHONE = "+7 (___) ___-__-__"; // TODO: реальный номер салона
const ADDRESS = { ru: "Новороссийск,\nул. Пархоменко, 53", en: "Novorossiysk,\nParkhomenko St., 53" };
const HOURS = { ru: "Принимаем записи с 9:00 до 21:00", en: "We take bookings from 9:00 to 21:00" };

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function Footer() {
  const { lang, setLang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);

  const canSend = phone.replace(/\D/g, "").length >= 6 && agree;
  const submit = () => {
    if (!canSend) return;
    // TODO: реальная отправка (Telegram / e-mail / CRM)
    setSent(true);
  };

  const eyebrow = "mb-4 text-[11px] uppercase tracking-[0.22em] text-[#e7c9a0]";

  return (
    <footer id="footer" className="scroll-mt-24 bg-[#3B0D1A] pt-16 text-white lg:pt-20">
      <div className="mx-auto w-[92%] max-w-[1360px]">
        {/* Верх: гигантский вордмарк + таглайн */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <span
            className="font-display font-semibold leading-[0.82] tracking-[0.02em]"
            style={{ fontSize: "clamp(4.5rem, 23vw, 18rem)" }}
          >
            ÁLIS
          </span>
          <p className="font-serif text-[22px] italic leading-tight lg:mt-8 lg:text-right lg:text-[30px]">
            {t("Создано для вашего образа", "Created for your look")}
          </p>
        </div>

        {/* 4 колонки */}
        <div className="mt-14 grid gap-10 border-t border-[#f4efe6]/15 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Контакты */}
          <div>
            <p className={eyebrow}>{t("Контакты", "Contact")}</p>
            <p className="whitespace-pre-line text-[14px] leading-relaxed">{ADDRESS[lang]}</p>
            <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="mt-3 block text-[14px] transition-opacity hover:opacity-70">
              {PHONE}
            </a>
            <p className="mt-1 text-[13px] text-white/55">{HOURS[lang]}</p>
          </div>

          {/* Соцсети */}
          <div>
            <p className={eyebrow}>{t("Мы в сети", "Follow us")}</p>
            <ul className="space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[14px] transition-opacity hover:opacity-70">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Язык */}
          <div>
            <p className={eyebrow}>{t("Язык", "Language")}</p>
            <ul className="space-y-2.5">
              {(["ru", "en"] as const).map((l) => (
                <li key={l}>
                  <button
                    onClick={() => setLang(l)}
                    className={`text-[14px] transition-opacity ${lang === l ? "font-medium" : "opacity-55 hover:opacity-100"}`}
                  >
                    {l === "ru" ? "Русский" : "English"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Обратный звонок — крупное поле как на референсе */}
          <div>
            <p className={eyebrow}>{t("Обратный звонок", "Callback")}</p>
            {!sent ? (
              <>
                <p className="mb-3 text-[14px] leading-relaxed">{t("Оставьте телефон — перезвоним", "Leave your phone — we'll call back")}</p>
                <div className="flex items-center gap-3 border-b border-[#f4efe6]/40 pb-2 focus-within:border-[#f4efe6]">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("Телефон", "Phone")}
                    className="w-full bg-transparent font-serif text-[24px] text-white outline-none placeholder:text-white/35 lg:text-[28px]"
                  />
                  <button
                    onClick={submit}
                    disabled={!canSend}
                    aria-label={t("Отправить", "Send")}
                    className="shrink-0 text-white transition-transform hover:translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <label className="mt-3 flex cursor-pointer items-start gap-2 text-[12px] leading-snug text-white/55">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#f4efe6]" />
                  <span>
                    {t("Согласен на обработку данных и ", "I agree to data processing and the ")}
                    <a href="/policy" className="underline underline-offset-2">{t("политику конфиденциальности", "privacy policy")}</a>
                  </span>
                </label>
              </>
            ) : (
              <p className="text-[15px] leading-relaxed">{t("Спасибо! Перезвоним в ближайшее время.", "Thank you! We'll call you back shortly.")}</p>
            )}
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-16 flex flex-col gap-4 border-t border-[#f4efe6]/15 py-7 text-[12px] text-white/55 md:flex-row md:items-center md:justify-between">
          <a href="https://t.me/vladimir_nvrs" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
            {t("Разработчик", "Developer")}
          </a>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {[
              { label: t("Политика конфиденциальности", "Privacy policy"), href: "/policy" },
              { label: t("Публичная оферта", "Public offer"), href: "/offer" },
              { label: "Cookie", href: "/cookies" },
            ].map((x, i) => (
              <span key={x.href} className="flex items-center gap-4">
                {i > 0 && <span className="text-white/25">·</span>}
                <a href={x.href} className="transition-opacity hover:opacity-70">{x.label}</a>
              </span>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} ALIS</span>
        </div>
      </div>
    </footer>
  );
}
