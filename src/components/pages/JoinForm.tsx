"use client";
// БЛОК 3 (страница «Команда») — «стать частью команды», сплит на весь экран по
// мотивам cryome «Глубокое увлажнение»: слева цветная (бордовая) панель с
// заголовком по центру и полями-строками на светлых плашках; справа большое
// фото на всю высоту. Минимум отступов, помещается в экран. Отправка — заглушка.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Field = { key: string; label: Loc; required: boolean; textarea?: boolean; type?: string };

const PHOTO = "/assets/tild6530-383_-2___1_.jpg";

const FIELDS: Field[] = [
  { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
  { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
];

// Маска телефона: +7 (XXX) XXX-XX-XX по мере ввода цифр.
function formatPhone(v: string): string {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1); // до 10 цифр без кода страны
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export default function JoinForm() {
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErr: Record<string, boolean> = {};
    FIELDS.forEach((f) => {
      if (f.required && !(values[f.key] || "").trim()) nextErr[f.key] = true;
    });
    if (!consent) nextErr.consent = true;
    setErrors(nextErr);
    if (Object.keys(nextErr).length === 0) setSent(true); // заглушка
  };

  return (
    <section id="join" className="scroll-mt-24 bg-white px-3 pt-3 pb-16 sm:px-4 sm:pt-4 sm:pb-24">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Левая бордовая панель */}
        <div className="flex flex-col justify-center rounded-[28px] bg-[#3B0D1A] px-6 py-10 text-[#f4efe6] sm:px-10 lg:min-h-[600px] lg:px-14">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="text-center font-display text-[24px] font-normal uppercase leading-[1.1] tracking-[0.02em] lg:text-[34px]">
              {en ? "Become part of ÁLIS" : "Стать частью команды ÁLIS"}
            </h2>

            {sent ? (
              <div className="mt-10 flex flex-col items-center rounded-[20px] bg-white/[0.06] p-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7c9a0] font-display text-[22px] text-[#3B0D1A]">✓</span>
                <h3 className="mt-5 font-display text-[22px] uppercase tracking-[0.02em]">{en ? "Thank you!" : "Спасибо!"}</h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#f4efe6]/70">
                  {en ? "We've received your application and will get back to you soon." : "Мы получили вашу заявку и скоро свяжемся с вами."}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-3">
                {FIELDS.map((f) => (
                  <label
                    key={f.key}
                    className={`block rounded-2xl border bg-white/[0.06] px-5 py-3 transition-colors focus-within:border-[#e7c9a0] ${
                      errors[f.key] ? "border-[#e7a0a0]" : "border-transparent"
                    }`}
                  >
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-[#f4efe6]/55">
                      {f.label[lang]}
                      {f.required && <span className="text-[#e7c9a0]"> *</span>}
                    </span>
                    <input
                      type={f.type || "text"}
                      inputMode={f.key === "phone" ? "tel" : undefined}
                      placeholder={f.key === "phone" ? "+7 (___) ___-__-__" : undefined}
                      value={f.key === "phone" ? (values[f.key] || "+7 ") : values[f.key] || ""}
                      onFocus={f.key === "phone" ? () => { if (!values.phone) set("phone", "+7 "); } : undefined}
                      onChange={(e) => set(f.key, f.key === "phone" ? formatPhone(e.target.value) : e.target.value)}
                      className="w-full bg-transparent text-[15px] text-[#f4efe6] outline-none placeholder:text-[#f4efe6]/30"
                    />
                  </label>
                ))}

                <label className="mt-1 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) setErrors((x) => ({ ...x, consent: false }));
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#e7c9a0]"
                  />
                  <span className={`text-[11px] leading-relaxed ${errors.consent ? "text-[#e7a0a0]" : "text-[#f4efe6]/55"}`}>
                    {en
                      ? "By submitting, you agree to the processing of your personal data."
                      : "Отправляя форму, вы соглашаетесь с обработкой персональных данных."}
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-2xl border border-[#f4efe6] bg-[#f4efe6] px-10 py-3.5 font-display text-[13px] uppercase tracking-[0.16em] text-[#3B0D1A] transition-colors duration-300 hover:bg-transparent hover:text-[#f4efe6] sm:text-[14px]"
                >
                  {en ? "send" : "отправить"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Правая колонка — большое фото на всю высоту */}
        <div className="relative min-h-[320px] overflow-hidden rounded-[28px] lg:min-h-[600px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        </div>
      </div>
    </section>
  );
}
