"use client";
// ФОРМА ЗАЯВКИ — единая для сайта, без фото. Светлая: тёплый фон #f6f4f1, бордовая полоса
// слева; слева заголовок, короткая строка и 2 пункта с бордовыми галочками, справа — поля
// на белой подложке и бордовая кнопка. Двуязычно.
// Используется в «Консьерж-сервисе», «Сотрудничестве» и «Вакансиях». Отправка — заглушка.
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { sendLead, type LeadKind } from "@/lib/sendLead";

type Loc = { ru: string; en: string };
export type RequestField = { key: string; label: Loc; required: boolean; textarea?: boolean; type?: string };

// Маска телефона: +7 (XXX) XXX-XX-XX по мере ввода цифр.
export function formatPhone(v: string): string {
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

export default function RequestForm({
  id,
  innerId,
  kind = "other",
  title,
  text,
  bullets,
  fields,
  submit,
  success,
}: {
  id: string; // якорь секции
  kind?: LeadKind; // тип заявки в CRM
  innerId?: string; // дополнительный якорь на плашке (например, #booking)
  title: Loc;
  text?: Loc;
  bullets?: Loc[]; // продающие пункты под текстом («прогрев» перед отправкой)
  fields: RequestField[];
  submit: Loc;
  success: Loc;
}) {
  const { lang } = useLang();
  const en = lang === "en";
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErr: Record<string, boolean> = {};
    fields.forEach((f) => {
      if (f.required && !(values[f.key] || "").trim()) nextErr[f.key] = true;
    });
    if (!consent) nextErr.consent = true;
    setErrors(nextErr);
    if (Object.keys(nextErr).length === 0) {
      // Заявка уходит в CRM: имя, телефон и компания — отдельными полями, остальное — в детали
      const { name, phone, company, ...rest } = values;
      const details: Record<string, string> = {};
      for (const f of fields) if (rest[f.key]) details[f.label.ru] = rest[f.key];
      void sendLead({ kind, name, phone, company, details: { ...details, Форма: title.ru } });
      setSent(true);
    }
  };

  const line = (err?: boolean) =>
    `w-full border-b bg-transparent py-2.5 text-[13px] sm:py-3 sm:text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#46131E] ${
      err ? "border-[#c0392b]" : "border-[#17191a]/15"
    }`;

  return (
    <section id={id} className="scroll-mt-24 bg-white section-y">
      <div
        id={innerId}
        className="mx-auto grid w-[96%] max-w-[1760px] scroll-mt-24 grid-cols-1 gap-5 rounded-[12px] bg-[#f6f4f1] px-4 py-6 text-[#17191a] shadow-[inset_3px_0_0_#46131E] sm:gap-8 sm:px-10 sm:py-8 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:px-16 lg:py-10"
      >
        {/* Слева — заголовок и строка сверху, пункты с галочками снизу (по высоте формы) */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:items-start sm:gap-6 sm:text-left lg:py-12">
          <div>
            <h2 className="text-[#17191a]">{title[lang]}</h2>
          {text && <p className="mt-2 max-w-[460px] text-[12px] leading-[1.55] text-[#17191a]/60 sm:mt-4 sm:text-[14px] lg:text-[15px]">{text[lang]}</p>}
          </div>
          {bullets && bullets.length > 0 && (
            <ul className="space-y-2 text-left sm:space-y-2.5">
              {bullets.map((b) => (
                <li key={b.ru} className="flex items-start gap-2.5 text-[12px] leading-[1.5] text-[#242424] sm:gap-3 sm:text-[14px] lg:text-[15px]">
                  <span aria-hidden className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#17191a] text-[10px] text-white">✓</span>
                  {b[lang]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Справа — форма или сообщение об отправке */}
        {sent ? (
          // Экран «Спасибо»: светлая карточка, бордовая полоса сверху, галочка прорисовывается
          <div role="status" className="alis-thanks flex flex-col items-center justify-center rounded-[12px] bg-white px-6 py-12 text-center shadow-[inset_0_3px_0_#46131E] lg:px-10 lg:py-14">
            <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-[#17191a] text-white">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path className="alis-check" d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <p className="mt-6 font-serif-display text-[28px] font-normal leading-[1.2] text-[#17191a] lg:text-[34px]">{en ? "Thank you!" : "Спасибо!"}</p>
            <p className="mt-3 max-w-[420px] text-[15px] leading-[1.65] text-[#17191a]/80">{success[lang]}</p>
            <Link
              href="/"
              className="alis-pulse-wine mt-8 inline-flex items-center justify-center rounded-xl border border-[#17191a] bg-[#17191a] px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a]"
            >
              {en ? "To the home page" : "На главную"}
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-1 rounded-[12px] bg-white px-4 py-4 sm:gap-2 sm:px-6 sm:py-7 lg:px-9 lg:py-9">
            {fields.map((f) =>
              f.textarea ? (
                <textarea
                  key={f.key}
                  rows={1}
                  aria-label={f.label[lang]}
                  placeholder={f.label[lang]}
                  value={values[f.key] || ""}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={`${line(errors[f.key])} resize-none`}
                />
              ) : (
                <input
                  key={f.key}
                  type={f.type || "text"}
                  aria-label={f.label[lang]}
                  inputMode={f.key === "phone" ? "tel" : undefined}
                  placeholder={f.key === "phone" ? "+7 (000) 000-00-00" : f.label[lang]}
                  value={values[f.key] || ""}
                  onFocus={f.key === "phone" ? () => { if (!values.phone) set("phone", "+7 "); } : undefined}
                  onChange={(e) => set(f.key, f.key === "phone" ? formatPhone(e.target.value) : e.target.value)}
                  className={line(errors[f.key])}
                />
              ),
            )}

            <label className="mt-3 flex cursor-pointer items-center gap-2.5 sm:items-start sm:gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((x) => ({ ...x, consent: false }));
                }}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]"
              />
              <span className={`min-w-0 text-[clamp(9.5px,2.7vw,11px)] leading-relaxed sm:text-[11px] ${errors.consent ? "text-[#c0392b]" : "text-[#17191a]/50"}`}>
                {/* Телефон — одной строкой, ссылка на словах «персональных данных»; компьютер — полностью */}
                <span className="lg:hidden">
                  {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                  <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
                </span>
                <span className="hidden lg:inline">
                  {en ? "I agree to the processing of my personal data." : "Даю согласие на обработку персональных данных."}{" "}
                  <a href="/policy" className="underline underline-offset-2 hover:text-[#46131E]">
                    {en ? "Privacy policy" : "Политика конфиденциальности"}
                  </a>
                </span>
              </span>
            </label>

            {/* Кнопка неактивна, пока не отмечено согласие на обработку данных */}
            <button
              type="submit"
              disabled={!consent}
              className="mt-3 flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] sm:mt-4 sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#17191a] hover:backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white"
            >
              {submit[lang]}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
