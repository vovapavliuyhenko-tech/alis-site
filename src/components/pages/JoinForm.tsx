"use client";
// БЛОК 3 (страница «Команда») — форма «стать частью команды», сплит по мотивам
// топовых Tilda-сайтов: слева форма на кремовой карточке, справа большое
// атмосферное фото на всю высоту. Валидация обязательных полей; отправка —
// заглушка (показываем успех, никуда не шлём). Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Field = { key: string; label: Loc; required: boolean; textarea?: boolean; type?: string };

const PHOTO = "/assets/tild6530-383_-2___1_.jpg";

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

  const inputBase =
    "w-full border-0 border-b bg-transparent pb-2 text-[16px] text-[#2a2320] outline-none transition-colors placeholder:text-[#2a2320]/30 focus:border-[#3B0D1A]";

  return (
    <section id="join" className="scroll-mt-24 bg-[#f7f3ed] py-24 lg:py-28">
      <div className="mx-auto grid w-[92%] max-w-[1240px] items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Левая карточка — заголовок + форма / успех */}
        <div className="rounded-[26px] bg-white p-8 shadow-[0_20px_60px_rgba(59,13,26,0.10)] lg:p-12">
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#4A4B33]">
            {en ? "join the team" : "стать частью команды"}
          </span>
          <h2 className="mt-4 font-display text-[26px] font-normal uppercase leading-[1.08] tracking-[0.02em] text-[#3B0D1A] lg:text-[38px]">
            {en ? (
              <>Become part of ÁLIS</>
            ) : (
              <>Стать частью команды ÁLIS</>
            )}
          </h2>
          <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-[#2a2320]/65 lg:text-[14.5px]">
            {en
              ? "If the ÁLIS atmosphere feels close — tell us about yourself. We're open to people attentive to their craft."
              : "Если вам близка атмосфера и эстетика ÁLIS — расскажите о себе. Мы открыты новым людям, внимательным к своему делу."}
          </p>

          {sent ? (
            <div className="mt-10 flex flex-col items-start rounded-[20px] border border-[#3B0D1A]/15 bg-[#f7f3ed] p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7c9a0] font-display text-[22px] text-[#3B0D1A]">✓</span>
              <h3 className="mt-5 font-display text-[22px] uppercase tracking-[0.02em] text-[#3B0D1A] lg:text-[26px]">
                {en ? "Thank you!" : "Спасибо!"}
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#2a2320]/65">
                {en ? "We've received your application and will get back to you soon." : "Мы получили вашу заявку и скоро свяжемся с вами."}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-9 flex flex-col gap-7">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#2a2320]/50">
                    {f.label[lang]}
                    {f.required && <span className="text-[#4A4B33]"> *</span>}
                  </span>
                  {f.textarea ? (
                    <textarea
                      rows={2}
                      value={values[f.key] || ""}
                      onChange={(e) => set(f.key, e.target.value)}
                      className={`${inputBase} resize-none ${errors[f.key] ? "border-[#b3474b]" : "border-[#2a2320]/20"}`}
                    />
                  ) : (
                    <input
                      type={f.type || "text"}
                      value={values[f.key] || ""}
                      onChange={(e) => set(f.key, e.target.value)}
                      className={`${inputBase} ${errors[f.key] ? "border-[#b3474b]" : "border-[#2a2320]/20"}`}
                    />
                  )}
                </label>
              ))}

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors((x) => ({ ...x, consent: false }));
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#3B0D1A]"
                />
                <span className={`text-[12px] leading-relaxed ${errors.consent ? "text-[#b3474b]" : "text-[#2a2320]/50"}`}>
                  {en
                    ? "By submitting, you agree to the processing of your personal data. We handle it carefully and use it only to contact you."
                    : "Отправляя форму, вы соглашаетесь с обработкой персональных данных. Мы бережно относимся к информации и используем её только для связи с вами."}
                </span>
              </label>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center rounded-2xl bg-[#3B0D1A] px-10 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#4A4B33] sm:text-[14px]"
              >
                {en ? "send" : "отправить"}
              </button>
            </form>
          )}
        </div>

        {/* Правая колонка — большое атмосферное фото */}
        <div className="relative min-h-[360px] overflow-hidden rounded-[26px] lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
