"use client";
// АНКЕТА «РАССЧИТАТЬ БЮДЖЕТ» (консьерж-сервис) — встроена в тёмную плашку
// «Ваша дата может быть уже занята» (#calc), без всплывающего окна. Ссылки href="#calc"
// просто прокручивают к ней. 4 коротких вопроса кнопками → дата, имя, телефон → подходящий
// пакет (SOLO / BRIDAL / TEAM / DESTINATION). Цен пока нет — точную смету присылает
// менеджер. Ответы уходят в CRM (тип «concierge»).
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";

type Loc = { ru: string; en: string };
type Q = { key: string; q: Loc; opts: Loc[]; multi?: boolean };

const QS: Q[] = [
  { key: "format", q: { ru: "Какой у вас повод?", en: "What's the occasion?" }, opts: [
    { ru: "Свадьба", en: "Wedding" }, { ru: "Съёмка", en: "Shoot" }, { ru: "Мероприятие", en: "Event" }, { ru: "Для бизнеса", en: "For business" },
  ] },
  { key: "people", q: { ru: "Сколько человек готовим?", en: "How many people?" }, opts: [
    { ru: "1", en: "1" }, { ru: "2–4", en: "2–4" }, { ru: "5–10", en: "5–10" }, { ru: "Больше 10", en: "More than 10" },
  ] },
  { key: "place", q: { ru: "Где событие?", en: "Where is the event?" }, opts: [
    { ru: "Новороссийск и край", en: "Novorossiysk & region" }, { ru: "Другой город России", en: "Elsewhere in Russia" }, { ru: "Европа", en: "Europe" }, { ru: "СНГ", en: "CIS" },
  ] },
  { key: "services", multi: true, q: { ru: "Что нужно?", en: "What do you need?" }, opts: [
    { ru: "Макияж", en: "Makeup" }, { ru: "Причёска", en: "Hair" }, { ru: "Ногти", en: "Nails" }, { ru: "Сопровождение", en: "Stay-on support" },
  ] },
];

// Плитки «ваши ответы» слева (компьютер)
const SUMMARY: { key: string; label: Loc }[] = [
  { key: "format", label: { ru: "Повод", en: "Occasion" } },
  { key: "people", label: { ru: "Гостей", en: "People" } },
  { key: "place", label: { ru: "Место", en: "Place" } },
  { key: "date", label: { ru: "Дата", en: "Date" } },
  { key: "services", label: { ru: "Услуги", en: "Services" } },
];

// Подходящий пакет по ответам
function pickPack(a: Record<string, string[]>): string {
  const place = a.place?.[0];
  if (place && place !== "Новороссийск и край") return "DESTINATION";
  if (a.format?.[0] === "Свадьба") return "BRIDAL";
  if (a.people?.[0] && a.people[0] !== "1") return "TEAM";
  return "SOLO";
}

export default function BudgetCalc() {
  const { lang } = useLang();
  const en = lang === "en";
  const [step, setStep] = useState(0); // 0..3 вопросы, 4 — контакты, 5 — результат
  const [ans, setAns] = useState<Record<string, string[]>>({});
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const choose = (q: Q, v: string) => {
    if (q.multi) {
      const cur = ans[q.key] || [];
      setAns({ ...ans, [q.key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
      return;
    }
    setAns({ ...ans, [q.key]: [v] });
    setStep((s) => s + 1);
  };

  const phoneOk = phoneComplete(phone);
  const send = () => {
    if (!phoneOk || !consent) return;
    void sendLead({
      kind: "concierge",
      name,
      phone,
      details: {
        Форма: "Рассчитать бюджет (анкета)",
        Повод: ans.format?.join(", "),
        Человек: ans.people?.join(", "),
        Место: ans.place?.join(", "),
        Услуги: ans.services?.join(", "),
        Дата: date,
        Пакет: pickPack(ans),
      },
    });
    setStep(5);
  };

  const q = QS[step];
  const pack = pickPack(ans);
  const btn = "flex w-full items-center justify-center rounded-[12px] border border-white bg-white py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]";
  const field = "h-[46px] w-full rounded-[14px] bg-white px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:h-[48px] sm:rounded-[16px] sm:px-5 sm:text-[15px] autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:[-webkit-text-fill-color:#17191a]";
  const link = "text-[11px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-white disabled:opacity-35";

  return (
    <section id="calc" className="scroll-mt-24 bg-white section-y">
      {/* Компьютер: слева заголовок и ваши ответы (заполняются по ходу), справа — шаги анкеты */}
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] gap-8 rounded-[28px] bg-[#17191a] px-5 py-10 text-white sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-14">
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="text-white">{en ? "Your date may already be taken" : "Ваша дата может быть уже занята"}</h2>
          <p className="mt-2 !text-[12.5px] text-white/65 sm:mt-3 sm:!text-[15px]">{en ? "We'll check within 15 minutes?" : "Проверим за 15 минут?"}</p>
          {/* Ваши ответы — только на компьютере: плитки заполняются по ходу анкеты,
              пустые — пунктиром; внизу — пакет, который подходит по ответам */}
          <div className="mt-7 hidden flex-1 flex-col justify-end lg:flex">
            <div className="grid grid-cols-2 gap-2">
              {SUMMARY.map((row) => {
                const v = row.key === "date"
                  ? (date ? date.split("-").reverse().join(".") : "")
                  : (ans[row.key] || []).map((r) => QS.find((x) => x.key === row.key)?.opts.find((o) => o.ru === r)?.[lang] || r);
                const filled = Array.isArray(v) ? v.length > 0 : !!v;
                return (
                  <div
                    key={row.key}
                    className={`rounded-[14px] border px-4 py-2.5 transition-colors duration-500 ${row.key === "services" ? "col-span-2" : ""} ${
                      filled ? "border-white/10 bg-white/[0.06]" : "border-dashed border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">{row.label[lang]}</span>
                      <span key={filled ? "on" : "off"} className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${filled ? "bg-[#a9874f] animate-[alis-dot_.9s_ease-out]" : "bg-white/15"}`} />
                    </div>
                    {Array.isArray(v) && row.key === "services" ? (
                      <div className="mt-2 flex min-h-[26px] flex-wrap gap-1.5">
                        {v.length ? v.map((x) => (
                          <span key={x} className="animate-[alis-chip_.45s_cubic-bezier(.2,.9,.3,1.3)] rounded-full border border-white/20 px-2.5 py-0.5 text-[12px] text-white">{x}</span>
                        )) : <span className="text-[16px] text-white/20">—</span>}
                      </div>
                    ) : (
                      <p className="mt-1 overflow-hidden font-display text-[16px] tracking-[0.02em]">
                        <span key={(Array.isArray(v) ? v.join(",") : v) || "—"} className={`block ${filled ? "animate-[alis-val_.55s_cubic-bezier(.2,.8,.2,1)] text-white" : "text-white/20"}`}>{(Array.isArray(v) ? v.join(", ") : v) || "—"}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Подходящий пакет — появляется после первого ответа */}
            <div className={`mt-4 flex items-baseline justify-between border-t border-white/12 pt-4 transition-opacity duration-500 ${ans.format?.length ? "opacity-100" : "opacity-0"}`}>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">{en ? "Your package" : "Вам подходит"}</span>
              <span key={pack} className="relative font-display text-[24px] uppercase tracking-[0.08em] text-[#a9874f]">
                {pack.split("").map((ch, k) => (
                  <span key={k} className="inline-block animate-[alis-letter_.5s_cubic-bezier(.2,.8,.2,1)_both]" style={{ animationDelay: `${k * 0.04}s` }}>{ch}</span>
                ))}
                <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left animate-[alis-line_.8s_cubic-bezier(.4,0,.2,1)_.2s_both] bg-[#a9874f]/60" />
              </span>
            </div>
          </div>
        </div>

        <div className="w-full text-left">
          {/* Прогресс */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
              {step < 5 ? `${en ? "Step" : "Шаг"} ${step + 1} / 5` : en ? "Done" : "Готово"}
            </span>
          </div>
          <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }} />
          </div>

          {step < 4 && q && (
            <div key={step} className="animate-[alis-calc-in_.4s_ease]">
              <p className="mt-5 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[17px]">{q.q[lang]}</p>
              {q.multi && <p className="mt-1 !text-[11px] text-white/50 sm:!text-[12.5px]">{en ? "You can pick several" : "Можно выбрать несколько"}</p>}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {q.opts.map((o) => {
                  const on = (ans[q.key] || []).includes(o.ru);
                  return (
                    <button
                      key={o.ru}
                      style={{ animationDelay: `${q.opts.indexOf(o) * 0.06}s` }}
                      type="button"
                      onClick={() => choose(q, o.ru)}
                      className={`animate-[alis-calc-in_.45s_ease_both] rounded-[14px] border px-3 py-3 text-[12px] transition-all active:scale-[0.97] sm:rounded-[16px] sm:text-[14px] ${on ? "border-white bg-white text-[#17191a]" : "border-white/20 text-white hover:border-white/60"}`}
                    >
                      {o[lang]}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center justify-between">
                {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className={link}>← {en ? "Back" : "Назад"}</button> : <span />}
                {q.multi && (
                  <button type="button" onClick={() => setStep(step + 1)} disabled={!(ans[q.key] || []).length} className={link}>
                    {en ? "Next" : "Далее"} →
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-[alis-calc-in_.4s_ease]">
              <p className="mt-5 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[17px]">{en ? "Where to send the estimate?" : "Куда прислать расчёт?"}</p>
              <div className="mt-4 flex flex-col gap-2">
                <input type="date" aria-label={en ? "Event date" : "Дата события"} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
                <input type="text" placeholder={en ? "Name" : "Имя"} value={name} onChange={(e) => setName(e.target.value)} className={field} />
                <PhoneField lang={lang} value={phone} onChange={setPhone} />
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-white" />
                <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-white/55">
                  {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                  <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
                </span>
              </label>
              <button type="button" onClick={send} disabled={!phoneOk || !consent} className={`mt-4 ${btn}`}>{en ? "Calculate the budget" : "Рассчитать бюджет"}</button>
              <button type="button" onClick={() => setStep(3)} className={`mt-4 ${link}`}>← {en ? "Back" : "Назад"}</button>
            </div>
          )}

          {step === 5 && (
            <div className="animate-[alis-calc-in_.4s_ease] py-4 text-center">
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/45">{en ? "Your package" : "Вам подходит пакет"}</p>
              <p className="mt-2 font-display text-[34px] uppercase tracking-[0.06em] sm:text-[44px]">{pack}</p>
              <p className="mx-auto mt-3 max-w-[34ch] !text-[12.5px] leading-[1.55] text-white/70 sm:!text-[14px]">
                {en ? "Thank you! We will reply within 15 minutes and send the exact estimate." : "Спасибо! Ответим за 15 минут и пришлём точную смету."}
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes alis-calc-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes alis-val { from { opacity: 0; transform: translateY(100%) } to { opacity: 1; transform: none } }
        @keyframes alis-chip { from { opacity: 0; transform: scale(.6) } to { opacity: 1; transform: none } }
        @keyframes alis-dot { 0% { box-shadow: 0 0 0 0 rgba(169,135,79,.7) } 100% { box-shadow: 0 0 0 10px rgba(169,135,79,0) } }
        @keyframes alis-letter { from { opacity: 0; transform: translateY(60%) } to { opacity: 1; transform: none } }
        @keyframes alis-line { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @media (prefers-reduced-motion: reduce) { #calc * { animation: none !important } }
      `}</style>
    </section>
  );
}
