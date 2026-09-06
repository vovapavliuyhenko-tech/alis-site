"use client";
// БЛОК 3 (страница «Команда») — форма «стать частью команды» по мотивам SUITE,
// но в премиальной подаче ÁLIS: тёмная бордовая сцена, крупный заголовок слева,
// поля с подчёркиванием справа. Валидация обязательных полей; отправка —
// заглушка (показываем успех, никуда не шлём). Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Field = { key: string; label: Loc; required: boolean; textarea?: boolean; type?: string };

const FIELDS: Field[] = [
  { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
  { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
  { key: "socials", label: { ru: "Ссылки на соц. сети", en: "Social links" }, required: false },
  { key: "role", label: { ru: "Желаемая должность", en: "Desired role" }, required: true },
  { key: "about", label: { ru: "Пара слов о себе", en: "A few words about you" }, required: false, textarea: true },
];

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
    if (Object.keys(nextErr).length === 0) setSent(true); // заглушка: отправку подключим отдельно
  };

  return (
    <section id="join" className="scroll-mt-24 bg-[#3B0D1A] py-24 text-[#f4efe6] lg:py-28">
      <div className="mx-auto grid w-[92%] max-w-[1240px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* Левая часть — заголовок */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#f4efe6]/60">
            {en ? "join the team" : "стать частью команды"}
          </span>
          <h2 className="mt-5 font-display text-[30px] font-normal uppercase leading-[1.08] tracking-[0.02em] lg:text-[46px]">
            {en ? (
              <>Become part<br />of ÁLIS</>
            ) : (
              <>Стать частью<br />команды ÁLIS</>
            )}
          </h2>
          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[#f4efe6]/70 lg:text-[15px]">
            {en
              ? "If the ÁLIS atmosphere and aesthetic feel close — tell us about yourself. We're open to people attentive to their craft."
              : "Если вам близка атмосфера и эстетика ÁLIS — расскажите о себе. Мы открыты новым людям, внимательным к своему делу."}
          </p>
        </div>

        {/* Правая часть — форма или успех */}
        {sent ? (
          <div className="flex min-h-[320px] flex-col items-start justify-center rounded-[26px] border border-[#f4efe6]/20 bg-[#f4efe6]/[0.04] p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7c9a0] font-display text-[22px] text-[#3B0D1A]">✓</span>
            <h3 className="mt-6 font-display text-[24px] uppercase tracking-[0.02em] lg:text-[30px]">
              {en ? "Thank you!" : "Спасибо!"}
            </h3>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#f4efe6]/70 lg:text-[15px]">
              {en
                ? "We've received your application and will get back to you soon."
                : "Мы получили вашу заявку и скоро свяжемся с вами."}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-9">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-[#f4efe6]/55">
                  {f.label[lang]}
                  {f.required && <span className="text-[#e7c9a0]"> *</span>}
                </span>
                {f.textarea ? (
                  <textarea
                    rows={3}
                    value={values[f.key] || ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={`w-full resize-none border-0 border-b bg-transparent pb-2 text-[16px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/30 focus:border-[#e7c9a0] ${
                      errors[f.key] ? "border-[#e7a0a0]" : "border-[#f4efe6]/25"
                    }`}
                  />
                ) : (
                  <input
                    type={f.type || "text"}
                    value={values[f.key] || ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={`w-full border-0 border-b bg-transparent pb-2 text-[16px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/30 focus:border-[#e7c9a0] ${
                      errors[f.key] ? "border-[#e7a0a0]" : "border-[#f4efe6]/25"
                    }`}
                  />
                )}
              </label>
            ))}

            {/* Согласие */}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((x) => ({ ...x, consent: false }));
                }}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#e7c9a0]"
              />
              <span className={`text-[12px] leading-relaxed ${errors.consent ? "text-[#e7a0a0]" : "text-[#f4efe6]/55"}`}>
                {en
                  ? "By submitting, you agree to the processing of your personal data. We handle it carefully and use it only to contact you."
                  : "Отправляя форму, вы соглашаетесь с обработкой персональных данных. Мы бережно относимся к информации и используем её только для связи с вами."}
              </span>
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#f4efe6] px-10 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#3B0D1A] transition-colors duration-300 hover:bg-[#e7c9a0] sm:text-[14px]"
            >
              {en ? "send" : "отправить"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
