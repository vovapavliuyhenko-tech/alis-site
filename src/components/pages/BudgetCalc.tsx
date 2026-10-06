"use client";
// АНКЕТА «РАССЧИТАТЬ БЮДЖЕТ» (консьерж-сервис) — открывается любой ссылкой href="#calc".
// 4 коротких вопроса кнопками → контакты → подходящий пакет (SOLO / BRIDAL / TEAM /
// DESTINATION). Цен пока нет — точную смету присылает менеджер. Ответы уходят в CRM
// (тип «concierge»). Телефон — шторка снизу, компьютер — окно по центру.
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import { formatPhone } from "@/components/pages/RequestForm";

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
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // 0..3 вопросы, 4 — контакты, 5 — результат
  const [ans, setAns] = useState<Record<string, string[]>>({});
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  // Любая ссылка href="#calc" открывает анкету
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('a[href="#calc"]');
      if (!el) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  // Блокируем прокрутку страницы под окном; Esc — закрыть
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (step === 5) { setStep(0); setAns({}); setDate(""); setName(""); setPhone(""); setConsent(false); }
  };

  const choose = (q: Q, v: string) => {
    if (q.multi) {
      const cur = ans[q.key] || [];
      setAns({ ...ans, [q.key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
      return;
    }
    setAns({ ...ans, [q.key]: [v] });
    setStep((s) => s + 1);
  };

  const phoneOk = phone.replace(/\D/g, "").length === 11;
  const send = () => {
    if (!phoneOk || !consent) return;
    const pack = pickPack(ans);
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
        Пакет: pack,
      },
    });
    setStep(5);
  };

  if (!open) return null;
  const q = QS[step];
  const pack = pickPack(ans);
  const btn = "flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]";
  const field = "w-full border-b border-[#17191a]/15 bg-transparent py-2.5 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 focus:border-[#17191a] sm:text-[15px]";

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={en ? "Budget estimate" : "Расчёт бюджета"}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88svh] w-full overflow-y-auto rounded-t-[20px] bg-white px-5 pb-6 pt-5 text-[#17191a] animate-[alis-chat-in_.35s_cubic-bezier(.2,.7,.2,1)] sm:w-[min(520px,calc(100vw-2rem))] sm:rounded-[20px] sm:px-8 sm:pb-8 sm:pt-7"
      >
        {/* Шапка: прогресс + закрыть */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45">
            {step < 5 ? `${en ? "Step" : "Шаг"} ${step + 1} / 5` : en ? "Done" : "Готово"}
          </span>
          <button onClick={close} aria-label={en ? "Close" : "Закрыть"} className="-mr-1 flex h-8 w-8 items-center justify-center rounded-full text-[#17191a]/60 hover:bg-[#17191a]/5 hover:text-[#17191a]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-[#17191a]/10">
          <div className="h-full bg-[#17191a] transition-all duration-500" style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }} />
        </div>

        {step < 4 && q && (
          <>
            <p className="mt-6 font-display text-[16px] uppercase tracking-[0.04em] sm:text-[20px]">{q.q[lang]}</p>
            {q.multi && <p className="mt-1 !text-[11px] text-[#17191a]/50 sm:!text-[12.5px]">{en ? "You can pick several" : "Можно выбрать несколько"}</p>}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {q.opts.map((o) => {
                const on = (ans[q.key] || []).includes(o.ru);
                return (
                  <button
                    key={o.ru}
                    onClick={() => choose(q, o.ru)}
                    className={`rounded-[12px] border px-3 py-3.5 text-[12px] transition-colors sm:text-[14px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/15 hover:border-[#17191a]"}`}
                  >
                    {o[lang]}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="text-[11px] uppercase tracking-[0.14em] text-[#17191a]/55 hover:text-[#17191a]">← {en ? "Back" : "Назад"}</button>
              ) : <span />}
              {q.multi && (
                <button onClick={() => setStep(step + 1)} disabled={!(ans[q.key] || []).length} className="text-[11px] uppercase tracking-[0.14em] text-[#17191a] disabled:opacity-35">
                  {en ? "Next" : "Далее"} →
                </button>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="mt-6 font-display text-[16px] uppercase tracking-[0.04em] sm:text-[20px]">{en ? "Where to send the estimate?" : "Куда прислать расчёт?"}</p>
            <div className="mt-4 flex flex-col gap-1">
              <input type="date" aria-label={en ? "Event date" : "Дата события"} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
              <input type="text" placeholder={en ? "Name" : "Имя"} value={name} onChange={(e) => setName(e.target.value)} className={field} />
              <input
                type="tel"
                inputMode="tel"
                placeholder="+7 (000) 000-00-00"
                value={phone}
                onFocus={() => { if (!phone) setPhone("+7 "); }}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className={field}
              />
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
              <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-[#17191a]/50">
                {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
              </span>
            </label>
            <button onClick={send} disabled={!phoneOk || !consent} className={`mt-4 ${btn}`}>{en ? "Calculate the budget" : "Рассчитать бюджет"}</button>
            <button onClick={() => setStep(3)} className="mt-4 text-[11px] uppercase tracking-[0.14em] text-[#17191a]/55 hover:text-[#17191a]">← {en ? "Back" : "Назад"}</button>
          </>
        )}

        {step === 5 && (
          <div className="py-4 text-center">
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45">{en ? "Your package" : "Вам подходит пакет"}</p>
            <p className="mt-2 font-display text-[34px] uppercase tracking-[0.06em] sm:text-[44px]">{pack}</p>
            <p className="mx-auto mt-3 max-w-[34ch] !text-[12.5px] leading-[1.55] text-[#17191a]/70 sm:!text-[14px]">
              {en ? "Thank you! We will reply within 15 minutes and send the exact estimate." : "Спасибо! Ответим за 15 минут и пришлём точную смету."}
            </p>
            <button onClick={close} className={`mt-6 ${btn}`}>{en ? "Close" : "Закрыть"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
