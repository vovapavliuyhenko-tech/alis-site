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
  const field = "h-[48px] w-full rounded-[14px] bg-white px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:h-[54px] sm:rounded-[16px] sm:px-5 sm:text-[15px] autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:[-webkit-text-fill-color:#17191a]";
  const link = "text-[11px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-white disabled:opacity-35";

  return (
    <section id="calc" className="scroll-mt-24 bg-white section-y">
      {/* Компьютер: слева заголовок и ваши ответы (заполняются по ходу), справа — шаги анкеты */}
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] gap-8 rounded-[28px] bg-[#17191a] px-5 py-10 text-white sm:px-10 sm:py-14 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-20">
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="text-white">{en ? "Your date may already be taken" : "Ваша дата может быть уже занята"}</h2>
          <p className="mt-2 !text-[12.5px] text-white/65 sm:mt-3 sm:!text-[15px]">{en ? "We'll check within 15 minutes?" : "Проверим за 15 минут?"}</p>
          {/* Ваши ответы — только на компьютере */}
          <dl className="mt-auto hidden border-t border-white/12 pt-2 lg:block">
            {[...QS.map((x) => ({ k: x.q, v: (ans[x.key] || []).map((r) => x.opts.find((o) => o.ru === r)?.[lang] || r).join(", ") })),
              { k: { ru: "Дата", en: "Date" }, v: date ? date.split("-").reverse().join(".") : "" }].map((row, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 border-b border-white/12 py-3.5">
                <dt className="text-[13px] text-white/45">{row.k[lang]}</dt>
                <dd className={`text-right text-[14px] transition-colors ${row.v ? "text-white" : "text-white/25"}`}>{row.v || "—"}</dd>
              </div>
            ))}
          </dl>
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
              <p className="mt-6 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[18px]">{q.q[lang]}</p>
              {q.multi && <p className="mt-1 !text-[11px] text-white/50 sm:!text-[12.5px]">{en ? "You can pick several" : "Можно выбрать несколько"}</p>}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {q.opts.map((o) => {
                  const on = (ans[q.key] || []).includes(o.ru);
                  return (
                    <button
                      key={o.ru}
                      type="button"
                      onClick={() => choose(q, o.ru)}
                      className={`rounded-[14px] border px-3 py-3.5 text-[12px] transition-colors sm:rounded-[16px] sm:text-[14px] ${on ? "border-white bg-white text-[#17191a]" : "border-white/20 text-white hover:border-white/60"}`}
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
              <p className="mt-6 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[18px]">{en ? "Where to send the estimate?" : "Куда прислать расчёт?"}</p>
              <div className="mt-4 flex flex-col gap-2 sm:gap-2.5">
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
      <style>{`@keyframes alis-calc-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
