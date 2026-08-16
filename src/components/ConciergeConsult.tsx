"use client";
// БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ — выездной бьюти-консьерж по РФ и за границей.
// По мотивам блока traffic-masters: слева на бордовом градиенте — эйброу-бейдж,
// заголовок, подзаголовок и выгоды; справа белая карточка-форма (имя, телефон,
// повод/город, согласие). Палитра сайта: Burgundy + Olive + крем. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function ConciergeConsult() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, enn: string) => (en ? enn : ru);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const nameOk = name.trim().length > 1;
  const phoneOk = phone.replace(/\D/g, "").length >= 6;
  const canSend = nameOk && phoneOk && agree;

  const submit = () => {
    setTouched(true);
    if (!canSend) return;
    // TODO: реальная отправка заявки (Telegram / e-mail / CRM)
    setSent(true);
  };

  const bullets = [
    t("Не ищете мастеров на месте — привозим своих", "No hunting for local artists — we bring our own"),
    t("Никаких «разберёмся на площадке» — всё под контролем", "No “we'll sort it on the day” — everything under control"),
    t("Вы отдыхаете — логистика, тайминг и косметика на нас", "You relax — logistics, timing and cosmetics are on us"),
  ];

  return (
    <section id="concierge" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#54121F] via-[#3B0D1A] to-[#2A0810] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          {/* Мягкое свечение */}
          <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#e7c9a0]/10 blur-[90px]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-[#4A4B33]/20 blur-[90px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Левая часть */}
            <div className="flex flex-col justify-center text-[#f4efe6]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/25 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#f4efe6]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e7c9a0]" />
                {t("бесплатная консультация", "free consultation")}
              </span>
              <h2 className="mt-8 font-serif text-[26px] leading-[1.15] lg:text-[38px]">
                {t("Бьюти-консьерж", "Beauty concierge")}{" "}
                <span className="text-[#e7c9a0]">{t("на выезд", "on location")}</span>
              </h2>
              <p className="mt-8 max-w-md text-[13px] leading-[1.75] text-[#f4efe6]/70 lg:text-[14px]">
                {t(
                  "Событие вдали от дома — а довериться незнакомым мастерам страшно? Привезём свою команду и сделаем образ безупречным.",
                  "An event far from home — and trusting strangers with your look feels risky? We bring our own team and make it flawless."
                )}
              </p>

              <ul className="mt-12 space-y-5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3.5 text-[13px] leading-relaxed text-[#f4efe6]/90 lg:text-[14px]">
                    <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4A4B33]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f4efe6" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Правая часть — форма */}
            <div className="rounded-[24px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-8">
              {sent ? (
                <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#3B0D1A]/40">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#3B0D1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="font-serif text-[26px] text-[#17191a]">{t("Заявка принята!", "Request received!")}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-[#17191a]/60">
                    {t("Свяжемся с вами в ближайшее время и обсудим детали выезда.", "We'll get in touch shortly to discuss the details of your outcall.")}
                  </p>
                </div>
              ) : (
                <>
                  {/* Имя */}
                  <label className="mb-1.5 block text-[13px] font-medium text-[#17191a]">{t("Ваше имя", "Your name")}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("Например, Дайана", "e.g. Daiana")}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/30 focus:border-[#3B0D1A] ${
                      touched && !nameOk ? "border-[#b3261e]" : "border-[#17191a]/15"
                    }`}
                  />
                  {touched && !nameOk && <p className="mt-1.5 text-[12px] text-[#b3261e]">{t("Укажите имя", "Enter your name")}</p>}

                  {/* Телефон */}
                  <label className="mb-1.5 mt-5 block text-[13px] font-medium text-[#17191a]">{t("Телефон", "Phone")}</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="+7 ___ ___-__-__"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/30 focus:border-[#3B0D1A] ${
                      touched && !phoneOk ? "border-[#b3261e]" : "border-[#17191a]/15"
                    }`}
                  />
                  {touched && !phoneOk && <p className="mt-1.5 text-[12px] text-[#b3261e]">{t("Укажите телефон", "Enter your phone")}</p>}

                  {/* Повод / город */}
                  <label className="mb-1.5 mt-5 block text-[13px] font-medium text-[#17191a]">{t("Куда и по какому поводу?", "Where and for what occasion?")}</label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={2}
                    placeholder={t("Например: свадьба в Сочи, 12 июня", "e.g. wedding in Sochi, June 12")}
                    className="w-full resize-none rounded-xl border border-[#17191a]/15 bg-white px-4 py-3 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/30 focus:border-[#3B0D1A]"
                  />

                  {/* Согласие */}
                  <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[13px] text-[#17191a]/70">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#3B0D1A]" />
                    <span>
                      {t("Я даю согласие на ", "I consent to the ")}
                      <a href="/privacy" className="text-[#3B0D1A] underline underline-offset-2">{t("обработку персональных данных", "processing of personal data")}</a>
                    </span>
                  </label>
                  {touched && !agree && <p className="mt-1.5 text-[12px] text-[#b3261e]">{t("Необходимо согласие", "Consent is required")}</p>}

                  <button
                    onClick={submit}
                    className="group/btn mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#3B0D1A] px-8 py-4 text-[14px] font-medium uppercase tracking-[0.1em] text-[#f4efe6] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {t("Оставить заявку", "Send a request")}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
