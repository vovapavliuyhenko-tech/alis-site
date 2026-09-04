"use client";
// FOOTER ALIS — по мотивам matre.world: гигантский вордмарк слева, таглайн
// справа, ниже 4 колонки (контакты / соцсети / язык / обратный звонок) с крупным
// полем ввода, нижний ряд — разработчик, правовые ссылки, копирайт. Бордовый
// фон, кремовый текст, золотые эйброу. Двуязычно (RU/EN).
// Телефон/часы — плейсхолдеры, замените на реальные.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { LogoEmblem, LogoWord } from "@/components/Logo";

const PHONE_SALON = "+7 988 888 77 58"; // салон
const PHONE_SERVICE = "+7 988 888 77 28"; // выездной сервис
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const ADDRESS = { ru: "Новороссийск,\nул. Пархоменко, 53", en: "Novorossiysk,\nParkhomenko St., 53" };
const HOURS = { ru: "Без выходных, с 9:00 до 21:00", en: "Open daily, 9:00–21:00" };

const SOCIALS = [
  { label: "Instagram — Новороссийск", href: "https://www.instagram.com/alisbeauty.ru" },
  { label: "Instagram — Global", href: "https://www.instagram.com/alisbeauty.global" },
];

export default function Footer() {
  const { lang, setLang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);

  // Эффект «шторки»: футер зафиксирован снизу, контент уезжает вверх и открывает
  // его. Распорка резервирует высоту футера, чтобы было куда «поднять шторку».
  const footerRef = useRef<HTMLElement>(null);
  const [footerH, setFooterH] = useState(0);
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setFooterH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const canSend = phone.replace(/\D/g, "").length >= 6 && agree;
  const submit = () => {
    if (!canSend) return;
    // TODO: реальная отправка (Telegram / e-mail / CRM)
    setSent(true);
  };

  const eyebrow = "mb-4 text-[11px] uppercase tracking-[0.22em] text-[#e7c9a0]";

  return (
    <>
    {/* Распорка = высота футера (место, чтобы «шторка» открылась) */}
    <div aria-hidden style={{ height: footerH }} />
    <footer id="footer" ref={footerRef} className="fixed bottom-0 left-0 z-0 w-full scroll-mt-24 bg-[#3B0D1A] pt-12 text-white lg:pt-14">
      <div className="mx-auto w-[92%] max-w-[1360px]">
        {/* Верх: гигантский вордмарк + таглайн */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <LogoEmblem variant="cream" className="h-[76px] w-auto lg:h-[104px]" />
            <LogoWord variant="cream" className="h-[30px] w-auto lg:h-[40px]" />
          </div>
          <p className="max-w-sm font-serif text-[20px] italic leading-tight lg:text-right lg:text-[26px]">
            {t("Отражаем внутреннюю красоту во внешнем облике", "Reflecting inner beauty in your outer look")}
          </p>
        </div>

        {/* 4 колонки */}
        <div className="mt-14 grid gap-10 border-t border-[#f4efe6]/15 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Контакты */}
          <div>
            <p className={eyebrow}>{t("Контакты", "Contact")}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block whitespace-pre-line text-[14px] leading-relaxed transition-opacity hover:opacity-70">
              {ADDRESS[lang]}
            </a>
            <a href={`tel:${PHONE_SALON.replace(/[^\d+]/g, "")}`} className="mt-3 block text-[14px] transition-opacity hover:opacity-70">
              {PHONE_SALON} <span className="text-white/50">— {t("салон", "salon")}</span>
            </a>
            <a href={`tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}`} className="mt-1 block text-[14px] transition-opacity hover:opacity-70">
              {PHONE_SERVICE} <span className="text-white/50">— {t("выездной сервис", "on-location")}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-2 block text-[14px] transition-opacity hover:opacity-70">{EMAIL}</a>
            <p className="mt-2 text-[13px] text-white/55">{HOURS[lang]}</p>
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
                <p className="mb-3 text-[14px] leading-relaxed">{t("Не уверены, что вам подойдёт? Оставьте телефон", "Not sure what suits you? Leave your phone")}</p>
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
                <p className="mt-4 text-[12px] leading-relaxed text-white/55">
                  {t(
                    "Перезвоним в рабочее время, зададим несколько вопросов и честно скажем, что вам действительно нужно, а на чём можно сэкономить. Без давления и без записи «на всякий случай».",
                    "We'll call back during work hours, ask a few questions and honestly tell you what you actually need and where you can save. No pressure and no booking “just in case”.",
                  )}
                </p>
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
          <span>© {new Date().getFullYear()} ÁLIS BEAUTY</span>
        </div>
      </div>
    </footer>
    </>
  );
}
