"use client";
// БЛОК «КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ + ЗАЯВКА» (бьюти-консьерж). Слева — оффер по AIDA
// (что входит), справа — оливковая панель-форма заявки (как на «Сотрудничестве»).
// Отправка — заглушка. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Field = { key: string; label: Loc; required: boolean; textarea?: boolean; type?: string };

const FIELDS: Field[] = [
  { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
  { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
  { key: "event", label: { ru: "Повод и дата", en: "Occasion & date" }, required: false, textarea: true },
];

const INCLUDED: Loc[] = [
  { ru: "Команда мастеров на выезд — в 4–6 рук", en: "A team of masters on location — in 4–6 hands" },
  { ru: "Своё оборудование и профессиональная косметика", en: "Own equipment and professional cosmetics" },
  { ru: "Работа строго по таймингу события", en: "Work strictly to the event timing" },
  { ru: "Единый стиль для всех участниц", en: "One consistent style for everyone" },
  { ru: "−10% на первый выезд", en: "−10% on your first booking" },
];

function formatPhone(v: string): string {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export default function ConciergeOffer() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErr: Record<string, boolean> = {};
    FIELDS.forEach((f) => { if (f.required && !(values[f.key] || "").trim()) nextErr[f.key] = true; });
    if (!consent) nextErr.consent = true;
    setErrors(nextErr);
    if (Object.keys(nextErr).length === 0) setSent(true);
  };

  return (
    <section id="offer" className="scroll-mt-24 bg-white px-3 section-y sm:px-4">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Левая колонка — оффер */}
        <div className="flex flex-col justify-center rounded-[28px] border border-[#46131E]/15 bg-[#F9F8F6] p-8 lg:p-12">
          <p className="text-[10px] lowercase tracking-[0.05em] text-[#46131E]">{t("коммерческое предложение", "our proposal")}</p>
          <h2 className="mt-3 font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#46131E] lg:text-[28px]">
            {t("Бьюти-консьерж под ключ", "Beauty concierge, turnkey")}
          </h2>
          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-[#2a2320]/60 lg:text-[14px]">
            {t(
              "Событие требует безупречного вида — а у вас нет времени на салон и организацию. Берём бьюти-часть на себя полностью.",
              "The occasion demands a flawless look — but there's no time for the salon and logistics. We take the whole beauty part on ourselves.",
            )}
          </p>

          <p className="mt-9 text-[10px] uppercase tracking-[0.2em] text-[#46131E]/50">{t("что входит", "what's included")}</p>
          <ul className="mt-2 flex flex-col">
            {INCLUDED.map((it, i) => (
              <li key={it.ru} className={`flex items-center gap-4 py-4 ${i > 0 ? "border-t border-[#46131E]/12" : ""}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#46131E] text-[#f4efe6]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[14px] leading-snug text-[#2a2320] lg:text-[15px]">
                  {it[lang]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Правая колонка — форма заявки */}
        <div id="booking" className="scroll-mt-24 flex flex-col rounded-[28px] bg-[#46131E] px-6 py-12 text-[#f4efe6] sm:px-10 lg:px-14 lg:py-16">
          {sent ? (
            <div className="flex flex-1 flex-col justify-center gap-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8a5a3c] font-display text-[22px]">✓</span>
              <div>
                <h3 className="font-display text-[22px] uppercase tracking-[0.02em]">{t("Заявка отправлена", "Request sent")}</h3>
                <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#f4efe6]/70">
                  {t("Свяжемся с вами в течение дня — подберём формат выезда и назовём стоимость.", "We'll reach out within a day — shape the format and confirm the price.")}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-1 flex-col justify-between gap-8">
              <div className="mx-auto w-full max-w-lg text-center">
                <h2 className="font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] lg:text-[28px]">
                  {t("Оставить заявку", "Leave a request")}
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed text-[#f4efe6]/70">
                  {t("Расскажите о событии — подберём формат выезда и назовём стоимость.", "Tell us about the event — we'll shape the format and confirm the price.")}
                </p>
              </div>

              <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
                {FIELDS.map((f) => (
                  <label key={f.key} className={`block rounded-2xl border bg-white/[0.06] px-5 py-3 transition-colors focus-within:border-[#8a5a3c] ${errors[f.key] ? "border-[#e7a0a0]" : "border-transparent"}`}>
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-[#f4efe6]/55">
                      {f.label[lang]}
                      {f.required && <span className="text-[#8a5a3c]"> *</span>}
                    </span>
                    {f.textarea ? (
                      <textarea rows={2} value={values[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} className="w-full resize-none bg-transparent text-[15px] text-[#f4efe6] outline-none placeholder:text-[#f4efe6]/30" />
                    ) : (
                      <input
                        type={f.type || "text"}
                        inputMode={f.key === "phone" ? "tel" : undefined}
                        placeholder={f.key === "phone" ? "+7 (___) ___-__-__" : undefined}
                        value={f.key === "phone" ? (values[f.key] || "+7 ") : values[f.key] || ""}
                        onFocus={f.key === "phone" ? () => { if (!values.phone) set("phone", "+7 "); } : undefined}
                        onChange={(e) => set(f.key, f.key === "phone" ? formatPhone(e.target.value) : e.target.value)}
                        className="w-full bg-transparent text-[15px] text-[#f4efe6] outline-none placeholder:text-[#f4efe6]/30"
                      />
                    )}
                  </label>
                ))}

                <label className="mt-1 flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); if (errors.consent) setErrors((x) => ({ ...x, consent: false })); }} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#8a5a3c]" />
                  <span className={`text-[11px] leading-relaxed ${errors.consent ? "text-[#e7a0a0]" : "text-[#f4efe6]/55"}`}>
                    {t("Отправляя форму, вы соглашаетесь с обработкой персональных данных.", "By submitting, you agree to the processing of your personal data.")}
                  </span>
                </label>
              </div>

              <button type="submit" className="mx-auto flex w-full max-w-lg items-center justify-center rounded-2xl border border-[#f4efe6] bg-[#f4efe6] py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#46131E] transition-colors duration-300 hover:bg-transparent hover:text-[#f4efe6] sm:text-[14px]">
                {t("Оставить заявку", "Leave a request")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
