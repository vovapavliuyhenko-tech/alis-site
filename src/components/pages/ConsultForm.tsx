"use client";
// Блок заявки на консультацию: слева оффер (бордовый фон, кремовый текст),
// справа белая карточка-форма. Без бэкенда — заявка уходит в WhatsApp салона
// с предзаполненным сообщением. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const WA_PHONE = "79888887758"; // +7 988 888 77 58

export default function ConsultForm() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, enn: string) => (en ? enn : ru);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !agree) {
      setErr(true);
      return;
    }
    const text = t(
      `Заявка с сайта ÁLIS BEAUTY:\nИмя: ${name}\nТелефон: ${phone}\nЗапрос: ${msg || "—"}`,
      `Request from ÁLIS BEAUTY site:\nName: ${name}\nPhone: ${phone}\nRequest: ${msg || "—"}`
    );
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const inputCls =
    "w-full rounded-xl border border-[#17191a]/15 bg-white px-4 py-3.5 text-[14px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/40 focus:border-[#3B0D1A]";
  const label = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#17191a]/55";

  return (
    <section id="request" className="scroll-mt-24 bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="grid overflow-hidden rounded-[32px] bg-[#3B0D1A] text-[#f4efe6] lg:grid-cols-2">
          {/* Левая часть — оффер */}
          <div className="relative flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
            <span aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#4A4B33]/25 blur-[90px]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f4efe6]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#f4efe6]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
                {t("Бесплатная консультация", "Free consultation")}
              </span>
              <h2 className="mt-5 font-display text-[30px] font-normal uppercase leading-[1.12] tracking-[0.04em] lg:text-[44px]">
                {t("Обсудим ваш образ", "Let's discuss your look")}
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-[#f4efe6]/75 lg:text-[15px]">
                {t(
                  "Оставьте заявку — подберём услуги под вашу задачу, ответим на вопросы и запишем на удобное время.",
                  "Leave a request — we'll match services to your goal, answer your questions and book a convenient time.",
                )}
              </p>
              <ul className="mt-8 space-y-3 text-[14px] text-[#f4efe6]/85">
                {[
                  t("Ответим в течение часа в рабочее время", "We reply within an hour during work hours"),
                  t("Без спама и навязчивых продаж", "No spam or pushy sales"),
                  t("−10% на первое посещение", "−10% off your first visit"),
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A4B33]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Правая часть — карточка-форма */}
          <div className="bg-[#f4efe6] p-6 sm:p-9 lg:p-11">
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center text-[#17191a]">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3B0D1A] text-[#f4efe6]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <p className="mt-6 font-display text-[24px] uppercase tracking-[0.04em] text-[#3B0D1A]">{t("Заявка отправлена", "Request sent")}</p>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[#17191a]/60">
                  {t("Мы открыли WhatsApp с вашим сообщением — отправьте его, и мы свяжемся с вами.", "We've opened WhatsApp with your message — send it and we'll get in touch.")}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className={label}>{t("Ваше имя", "Your name")}</label>
                  <input value={name} onChange={(e) => { setName(e.target.value); setErr(false); }} placeholder={t("Как к вам обращаться", "How to address you")} className={inputCls} />
                </div>
                <div>
                  <label className={label}>{t("Телефон", "Phone")}</label>
                  <input value={phone} onChange={(e) => { setPhone(e.target.value); setErr(false); }} inputMode="tel" placeholder="+7 ___ ___ __ __" className={inputCls} />
                </div>
                <div>
                  <label className={label}>{t("Что хотите сделать?", "What would you like?")}</label>
                  <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder={t("Например: свадебный образ, маникюр, макияж…", "e.g. bridal look, nails, makeup…")} className={`${inputCls} resize-none`} />
                </div>

                <label className="flex items-start gap-3 text-[12.5px] leading-relaxed text-[#17191a]/60">
                  <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErr(false); }} className="mt-0.5 h-4 w-4 shrink-0 accent-[#3B0D1A]" />
                  <span>
                    {t("Согласен на обработку данных и ", "I agree to data processing and the ")}
                    <a href="/policy" className="text-[#3B0D1A] underline underline-offset-2">{t("политику конфиденциальности", "privacy policy")}</a>
                  </span>
                </label>

                {err && (
                  <p className="text-[12.5px] text-[#3B0D1A]">{t("Заполните имя, телефон и согласие.", "Please fill in name, phone and consent.")}</p>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#3B0D1A] py-4 font-display text-[13px] uppercase tracking-[0.18em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#4A4B33]"
                >
                  {t("Оставить заявку", "Send request")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
