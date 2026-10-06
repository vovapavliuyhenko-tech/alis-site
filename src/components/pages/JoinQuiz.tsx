"use client";
// АНКЕТА КАНДИДАТА (страница «Вакансии», #join) — в формате анкеты «Рассчитать бюджет»
// консьерж-сервиса, тёмная. Компьютер: слева заголовок и плитки ответов (заполняются
// по ходу, пустые — пунктиром), справа шаги: направление → специализация → опыт → контакты.
// Телефон: только шаги. Анкета уходит в CRM (тип «vacancy»).
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";

type Loc = { ru: string; en: string };
type Q = { key: string; label: Loc; q: Loc; opts: Loc[] };

const QS: Q[] = [
  { key: "direction", label: { ru: "Направление", en: "Direction" }, q: { ru: "Где хотите работать?", en: "Where would you like to work?" }, opts: [
    { ru: "Салон в Новороссийске", en: "Salon in Novorossiysk" }, { ru: "Международная команда", en: "International team" },
  ] },
  { key: "role", label: { ru: "Специализация", en: "Speciality" }, q: { ru: "Ваша специализация?", en: "Your speciality?" }, opts: [
    { ru: "Визажист", en: "Makeup artist" }, { ru: "Мастер ногтевого сервиса", en: "Nail technician" }, { ru: "Бровист", en: "Brow artist" },
    { ru: "Администратор", en: "Administrator" }, { ru: "Другое", en: "Other" },
  ] },
  { key: "exp", label: { ru: "Опыт", en: "Experience" }, q: { ru: "Сколько лет опыта?", en: "How many years of experience?" }, opts: [
    { ru: "До 1 года", en: "Under 1 year" }, { ru: "1–3 года", en: "1–3 years" }, { ru: "3–5 лет", en: "3–5 years" }, { ru: "Больше 5 лет", en: "Over 5 years" },
  ] },
];

export default function JoinQuiz() {
  const { lang } = useLang();
  const en = lang === "en";
  const [step, setStep] = useState(0); // 0..2 вопросы, 3 — контакты, 4 — готово
  const [ans, setAns] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [works, setWorks] = useState("");
  const [consent, setConsent] = useState(false);

  const ok = !!name.trim() && phoneComplete(phone) && consent;
  const send = () => {
    if (!ok) return;
    void sendLead({
      kind: "vacancy",
      name,
      phone,
      details: { Форма: "Анкета кандидата", Направление: ans.direction, Специализация: ans.role, Опыт: ans.exp, "Ссылка на 10 работ": works },
    });
    setStep(4);
  };

  const label = (q: Q) => q.opts.find((o) => o.ru === ans[q.key])?.[lang] || "";
  const field = "h-[46px] w-full rounded-[14px] bg-white px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:h-[48px] sm:rounded-[16px] sm:px-5 sm:text-[15px] autofill:shadow-[inset_0_0_0_1000px_#fff]";
  const link = "text-[11px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-white disabled:opacity-35";
  const q = QS[step];

  return (
    <section id="join" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] gap-8 rounded-[28px] bg-[#17191a] px-5 py-10 text-white sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-14">
        {/* Слева: заголовок и плитки ответов */}
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="text-white">{en ? "Become part of the ÁLIS BEAUTY team" : "Стать частью команды ÁLIS BEAUTY"}</h2>
          <p className="mt-2 !text-[12.5px] text-white/60 sm:mt-3 sm:!text-[15px]">{en ? "Four short steps — we'll get back to you." : "Четыре коротких шага — и мы с вами свяжемся."}</p>
          <div className="mt-7 hidden flex-1 flex-col justify-end lg:flex">
            <div className="grid grid-cols-2 gap-2">
              {QS.map((x, i) => {
                const v = label(x);
                return (
                  <div
                    key={x.key}
                    className={`rounded-[14px] border px-4 py-2.5 transition-colors duration-500 ${i === 0 ? "col-span-2" : ""} ${v ? "border-white/10 bg-white/[0.06]" : "border-dashed border-white/15"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">{x.label[lang]}</span>
                      <span key={v ? "on" : "off"} className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${v ? "bg-white animate-[join-dot_.9s_ease-out]" : "bg-white/15"}`} />
                    </div>
                    <p className="mt-1 overflow-hidden font-display text-[16px] tracking-[0.02em]">
                      <span key={v || "—"} className={`block ${v ? "animate-[join-val_.55s_cubic-bezier(.2,.8,.2,1)] text-white" : "text-white/20"}`}>{v || "—"}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Справа: шаги */}
        <div className="w-full text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
            {step < 4 ? `${en ? "Step" : "Шаг"} ${step + 1} / 4` : en ? "Done" : "Готово"}
          </span>
          <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }} />
          </div>

          {step < 3 && q && (
            <div key={step} className="animate-[join-in_.4s_ease]">
              <p className="mt-5 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[17px]">{q.q[lang]}</p>
              <div className={`mt-4 grid gap-2 ${q.opts.length > 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                {q.opts.map((o, k) => {
                  const on = ans[q.key] === o.ru;
                  return (
                    <button
                      key={o.ru}
                      type="button"
                      onClick={() => { setAns({ ...ans, [q.key]: o.ru }); setStep(step + 1); }}
                      style={{ animationDelay: `${k * 0.06}s` }}
                      className={`animate-[join-in_.45s_ease_both] rounded-[14px] border px-3 py-3 text-[12px] transition-all active:scale-[0.97] sm:rounded-[16px] sm:text-[14px] ${on ? "border-white bg-white text-[#17191a]" : "border-white/20 text-white hover:border-white/60"}`}
                    >
                      {o[lang]}
                    </button>
                  );
                })}
              </div>
              {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className={`mt-5 ${link}`}>← {en ? "Back" : "Назад"}</button>}
            </div>
          )}

          {step === 3 && (
            <div className="animate-[join-in_.4s_ease]">
              <p className="mt-5 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[17px]">{en ? "Your contacts and works" : "Контакты и работы"}</p>
              <div className="mt-4 flex flex-col gap-2">
                <input type="text" placeholder={en ? "Name" : "Имя"} value={name} onChange={(e) => setName(e.target.value)} className={field} />
                <PhoneField lang={lang} value={phone} onChange={setPhone} />
                <input type="text" placeholder={en ? "Link to 10 works (portfolio, social, cloud)" : "Ссылка на 10 работ (портфолио, соцсеть, облако)"} value={works} onChange={(e) => setWorks(e.target.value)} className={field} />
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-white" />
                <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-white/55">
                  {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                  <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
                </span>
              </label>
              <button
                type="button"
                onClick={send}
                disabled={!ok}
                className="mt-4 flex w-full items-center justify-center rounded-[12px] border border-white bg-white py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]"
              >
                {en ? "Send" : "Отправить"}
              </button>
              <button type="button" onClick={() => setStep(2)} className={`mt-4 ${link}`}>← {en ? "Back" : "Назад"}</button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-[join-in_.4s_ease] py-6 text-center">
              <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[20px] text-[#17191a]">✓</span>
              <p className="mt-5 font-display text-[18px] sm:text-[22px]">{en ? "Thank you!" : "Спасибо!"}</p>
              <p className="mx-auto mt-2 max-w-[34ch] !text-[12.5px] leading-[1.55] text-white/65 sm:!text-[14px]">
                {en ? "We've received your application and will get back to you soon." : "Мы получили вашу анкету и скоро свяжемся с вами."}
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes join-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes join-val { from { opacity: 0; transform: translateY(100%) } to { opacity: 1; transform: none } }
        @keyframes join-dot { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,.5) } 100% { box-shadow: 0 0 0 10px rgba(255,255,255,0) } }
        @media (prefers-reduced-motion: reduce) { #join * { animation: none !important } }
      `}</style>
    </section>
  );
}
