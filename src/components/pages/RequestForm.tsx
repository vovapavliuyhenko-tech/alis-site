"use client";
// ФОРМА ЗАЯВКИ — единая для сайта, без фото (по просьбе заказчицы, формат «Остались
// вопросы?»): тёмная плашка во всю ширину блока. Слева заголовок и короткий текст,
// справа поля с тонкой линией снизу, согласие и светлая кнопка. Ч/б. Двуязычно.
// Используется в «Консьерж-сервисе», «Сотрудничестве» и «Вакансиях». Отправка — заглушка.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
export type RequestField = { key: string; label: Loc; required: boolean; textarea?: boolean; type?: string };

// Маска телефона: +7 (XXX) XXX-XX-XX по мере ввода цифр.
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

export default function RequestForm({
  id,
  innerId,
  title,
  text,
  bullets,
  fields,
  submit,
  success,
}: {
  id: string; // якорь секции
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
    if (Object.keys(nextErr).length === 0) setSent(true); // заглушка
  };

  const line = (err?: boolean) =>
    `w-full border-b bg-transparent py-3 text-[15px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/40 focus:border-[#f4efe6] ${
      err ? "border-[#e7a0a0]" : "border-[#f4efe6]/30"
    }`;

  return (
    <section id={id} className="scroll-mt-24 bg-white section-y">
      <div
        id={innerId}
        className="mx-auto grid w-[96%] max-w-[1760px] scroll-mt-24 grid-cols-1 gap-10 rounded-[12px] bg-[#17191a] px-6 py-12 text-[#f4efe6] sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16"
      >
        {/* Слева — заголовок и текст */}
        <div className="lg:pt-2">
          <h2 className="text-[#f4efe6]">{title[lang]}</h2>
          {text && <p className="mt-4 max-w-[460px] text-[14px] leading-[1.6] text-[#f4efe6]/75 lg:text-[15px]">{text[lang]}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="mt-8 space-y-3.5 lg:mt-10">
              {bullets.map((b) => (
                <li key={b.ru} className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#f4efe6]/85 lg:text-[15px]">
                  <span aria-hidden className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#46131E] text-[10px] text-white">✓</span>
                  {b[lang]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Справа — форма или сообщение об отправке */}
        {sent ? (
          <div className="flex flex-col justify-center">
            <p className="text-[18px] font-light">{en ? "Thank you!" : "Спасибо!"}</p>
            <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-[#f4efe6]/60">{success[lang]}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
            {fields.map((f) =>
              f.textarea ? (
                <textarea
                  key={f.key}
                  rows={2}
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

            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((x) => ({ ...x, consent: false }));
                }}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#f4efe6]"
              />
              <span className={`text-[11px] leading-relaxed ${errors.consent ? "text-[#e7a0a0]" : "text-[#f4efe6]/55"}`}>
                {en ? "I agree to the processing of my personal data." : "Даю согласие на обработку персональных данных."}{" "}
                <a href="/policy" className="underline underline-offset-2 hover:text-[#f4efe6]">
                  {en ? "Privacy policy" : "Политика конфиденциальности"}
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center rounded-[12px] border border-[#f4efe6] bg-[#f4efe6] py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-[#f4efe6]"
            >
              {submit[lang]}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
