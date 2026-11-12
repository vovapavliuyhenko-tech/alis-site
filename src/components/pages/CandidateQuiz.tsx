"use client";
// АНКЕТА КАНДИДАТА (консьерж-сервис) — вторая вкладка последнего блока страницы консьержа
// («Хочу в команду»). Те же вопросы из документа заказчицы (src/lib/vacancies.ts), но по шагам,
// как клиентская анкета: позиция → 2–3 вопроса на шаг → согласие и «Отправить заявку».
import { useState } from "react";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import DateField from "@/components/ui/DateField";
import { CAREER, type Dir, type Field } from "@/lib/vacancies";

// Используется и на странице «Команда» (анкета салона, dir="salon"), и на консьерже (dir="concierge")
const DATA = CAREER.concierge;

// Шаги: 0 — позиция, дальше группы по 2–3 вопроса
const STEPS_BY: Record<Dir, { title: string; keys: string[] }[]> = {
  salon: [
    { title: "Позиция", keys: ["position"] },
    { title: "Контактная информация", keys: ["name", "age", "phone"] },
    { title: "Контактная информация", keys: ["contact", "profile", "district"] },
    { title: "Профессиональный опыт", keys: ["experience", "workplace"] },
    { title: "Профессиональный опыт", keys: ["services", "growth"] },
    { title: "Профессиональный опыт", keys: ["education", "brands"] },
    { title: "Портфолио", keys: ["portfolio", "photo"] },
    { title: "Условия сотрудничества", keys: ["start", "income"] },
    { title: "Условия сотрудничества", keys: ["medbook", "trial"] },
    { title: "Мотивация", keys: ["why", "env"] },
  ],
  concierge: [
  { title: "Позиция", keys: ["position"] },
  { title: "Контактная информация", keys: ["name", "age", "phone"] },
  { title: "Контактная информация", keys: ["contact", "email", "profile"] },
  { title: "География и текущая занятость", keys: ["country", "city", "workplace"] },
  { title: "География и текущая занятость", keys: ["travel", "passport", "languages"] },
  { title: "Профессиональный опыт", keys: ["experience", "outcall", "looks"] },
  { title: "Профессиональный опыт", keys: ["education", "kit"] },
  { title: "Портфолио", keys: ["portfolio", "video", "photo"] },
  { title: "Условия сотрудничества", keys: ["availability", "rate", "why"] },
  ],
};

const chip = (on: boolean) =>
  `rounded-[12px] border px-3.5 py-2.5 text-[12px] leading-tight transition-all active:scale-[0.97] sm:rounded-[16px] sm:text-[14px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-transparent bg-[#f6f4f1] text-[#17191a] hover:border-[#17191a]/30"}`;
const field = "h-[46px] w-full rounded-[14px] bg-[#f6f4f1] px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 focus:ring-1 focus:ring-[#17191a]/25 sm:h-[48px] sm:rounded-[16px] sm:px-5 sm:text-[15px]";
const link = "text-[11px] uppercase tracking-[0.14em] text-[#17191a]/55 transition-colors hover:text-[#17191a] disabled:opacity-35";
const btn = "flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]";

// Слева (компьютер) — коротко о карьере: «Мы предлагаем» и международная команда по нажатию
export function CandidateIntro() {
  const [intl, setIntl] = useState(false);
  return (
    <div className="flex flex-col text-left">
      <h2 className="text-[#17191a]">{DATA.title}</h2>
      <p className="mt-2 !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:mt-3 sm:!text-[14px]">{DATA.intro[1]}</p>
      <div className="mt-6 hidden rounded-[16px] bg-[#f6f4f1] px-5 py-4 lg:block">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{DATA.offerTitle}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {DATA.offer.map((x) => (
            <li key={x} className="flex gap-2.5 !text-[13px] leading-[1.5] text-[#17191a]/80"><span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#17191a]/40" />{x}</li>
          ))}
        </ul>
      </div>
      {DATA.extra && (
        <div className="mt-2 hidden rounded-[16px] bg-[#f6f4f1] px-5 py-4 lg:block">
          <button type="button" onClick={() => setIntl((v) => !v)} className="flex w-full items-center justify-between text-left">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{DATA.extra.title}</span>
            <span aria-hidden className={`text-[14px] text-[#17191a]/60 transition-transform duration-500 ${intl ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`grid transition-[grid-template-rows] duration-500 ${intl ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              {DATA.extra.text && <p className="mt-2 !text-[13px] leading-[1.55] text-[#17191a]/75">{DATA.extra.text}</p>}
              {DATA.extra.blocks.map((b) => (
                <div key={b.title} className="mt-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{b.title}</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {b.items.map((x) => <li key={x} className="!text-[12.5px] leading-[1.5] text-[#17191a]/75">— {x}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CandidateQuiz({
  dir = "concierge",
  onValues,
  onBack,
  initial,
}: {
  dir?: Dir;
  onValues?: (v: Record<string, string | string[]>) => void; // для плиток «ваши ответы» слева
  onBack?: () => void; // «Назад» на первом шаге (к выбору направления)
  initial?: Record<string, string>; // например, позиция, выбранная в списке вакансий
} = {}) {
  const D = CAREER[dir];
  const ALL: Field[] = D.form.flatMap((s) => s.fields);
  const F = (k: string) => ALL.find((f) => f.key === k)!;
  const STEPS = STEPS_BY[dir];
  const [step, setStep] = useState(0);
  const [v, setV0] = useState<Record<string, string | string[]>>(initial ?? {});
  const setV = (x: Record<string, string | string[]>) => { setV0(x); onValues?.(x); };
  const [consent, setConsent] = useState(false);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [more, setMore] = useState(false);

  const filled = (f: Field) => {
    const x = v[f.key];
    if (f.type === "phone") return phoneComplete(String(x || ""));
    return Array.isArray(x) ? x.length > 0 : !!String(x || "").trim();
  };
  const last = step === STEPS.length - 1;
  const fields = STEPS[step].keys.map(F);
  // Выбран Telegram — нужен ник
  const needTg = STEPS[step].keys.includes("contact") && v.contact === "Telegram";
  const tgOk = !needTg || String(v.tg || "").replace("@", "").trim().length > 1;
  const stepOk = fields.every((f) => !f.required || filled(f)) && tgOk && (!last || consent);

  const next = () => {
    if (!stepOk) { setTried(true); return; }
    setTried(false);
    if (!last) { setStep(step + 1); return; }
    const details: Record<string, unknown> = { Направление: dir === "salon" ? "Салон красоты" : "Консьерж-сервис / международная команда", Форма: "Анкета кандидата" };
    for (const f of ALL) { const x = v[f.key]; if (x && (Array.isArray(x) ? x.length : String(x).trim())) details[f.label] = Array.isArray(x) ? x.join(", ") : x; }
    if (v.contact === "Telegram" && v.tg) details["Ник в Telegram"] = "@" + String(v.tg).replace(/^@+/, "").trim();
    void sendLead({ kind: "vacancy", name: String(v.name || ""), phone: String(v.phone || ""), details });
    setSent(true);
  };

  if (sent)
    return (
      <div className="animate-[alis-calc-in_.4s_ease] py-8 text-center">
        <span aria-hidden className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#17191a] text-[18px] text-white">✓</span>
        <p className="mt-4 font-display text-[18px]">Спасибо!</p>
        <p className="mx-auto mt-2 max-w-[38ch] !text-[13px] text-[#17191a]/65">Мы получили вашу анкету. Каждая заявка рассматривается лично — при соответствии требованиям мы свяжемся с вами.</p>
      </div>
    );

  // Задачи и требования выбранной позиции (визажист-стилист — как визажист)
  const posTitle = String(v.position || "");
  const pos = D.positions.find((p) => p.title === (posTitle === "Визажист-стилист" ? "Визажист" : posTitle));

  return (
    <div className="w-full text-left">
      <style>{`@keyframes alis-calc-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }`}</style>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45">Шаг {step + 1} / {STEPS.length} · {STEPS[step].title}</span>
      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-[#17191a]/12">
        <div className="h-full bg-[#17191a] transition-all duration-500" style={{ width: `${(step / STEPS.length) * 100}%` }} />
      </div>

      <div key={step} className="mt-4 flex animate-[alis-calc-in_.4s_ease] flex-col gap-4 sm:mt-5">
        {step === 0 && <p className="!text-[12px] leading-[1.55] text-[#17191a]/60 sm:!text-[13px]">Заполнение анкеты займёт около 7 минут. Каждая заявка рассматривается лично.</p>}
        {fields.map((f) => {
          const bad = tried && f.required && !filled(f);
          const label = f.key === "position" ? "На какую позицию вы претендуете?" : f.label;
          return (
            <div key={f.key} className="flex flex-col gap-2">
              <span className={`${f.key === "position" ? "font-display text-[13px] uppercase tracking-[0.04em] sm:text-[17px]" : "text-[11.5px] leading-[1.4] sm:text-[12.5px]"} ${bad ? "text-[#b42318]" : f.key === "position" ? "text-[#17191a]" : "text-[#17191a]/70"}`}>
                {label}{f.required && f.key !== "position" ? " *" : ""}
              </span>
              {f.type === "phone" ? (
                <PhoneField lang="ru" value={String(v[f.key] || "")} onChange={(x) => setV({ ...v, [f.key]: x })} className="!bg-[#f6f4f1]" />
              ) : f.type === "textarea" ? (
                <textarea rows={2} value={String(v[f.key] || "")} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} className={`${field} h-auto py-3`} />
              ) : f.type === "select" || f.type === "multi" ? (
                <div className={f.key === "position" ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap gap-2"}>
                  {f.options!.map((o) => {
                    const cur = v[f.key];
                    const on = f.type === "multi" ? ((cur as string[]) || []).includes(o) : cur === o;
                    const pick = () => {
                      if (f.type === "multi") { const c = (cur as string[]) || []; setV({ ...v, [f.key]: on ? c.filter((x) => x !== o) : [...c, o] }); }
                      else setV({ ...v, [f.key]: o });
                    };
                    return <button key={o} type="button" onClick={pick} className={`${chip(on)} ${f.key === "position" ? "py-3.5" : ""}`}>{o}</button>;
                  })}
                </div>
              ) : f.type === "date" ? (
                <DateField lang="ru" value={String(v[f.key] || "")} onChange={(x) => setV({ ...v, [f.key]: x })} className="[&>button]:!bg-[#f6f4f1]" />
              ) : (
                <input type={f.type === "email" ? "email" : "text"} value={String(v[f.key] || "")} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} className={field} />
              )}
              {f.note && <span className="text-[11px] leading-[1.5] text-[#17191a]/50 sm:text-[12px]">{f.note}</span>}
              {/* Telegram — плавно появляется поле для ника */}
              {f.key === "contact" && (
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${v.contact === "Telegram" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="relative mt-1">
                      <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#17191a]/45 sm:left-5 sm:text-[15px]">@</span>
                      <input
                        type="text"
                        inputMode="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="username"
                        aria-label="Ник в Telegram"
                        tabIndex={v.contact === "Telegram" ? 0 : -1}
                        value={String(v.tg || "")}
                        onChange={(e) => setV({ ...v, tg: e.target.value.replace(/^@+/, "").replace(/\s/g, "") })}
                        className={`${field} pl-8 sm:pl-9 ${tried && needTg && !tgOk ? "ring-1 ring-[#b42318]/60" : ""}`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Задачи и требования — раскрываются по нажатию, только после выбора позиции */}
        {step === 0 && pos && (
          <div className="rounded-[16px] bg-[#f6f4f1] px-5 py-4">
            <button type="button" onClick={() => setMore((x) => !x)} className="flex w-full items-center justify-between text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/55">Задачи и требования · {pos.title}</span>
              <span aria-hidden className={`text-[14px] text-[#17191a]/60 transition-transform duration-500 ${more ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ${more ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                {[{ t: pos.tasksTitle || "Задачи", items: pos.tasks }, { t: "Требования", items: pos.reqs }].map((b) => (
                  <div key={b.t} className="mt-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{b.t}</p>
                    <ul className="mt-1.5 flex flex-col gap-1">
                      {b.items.map((x) => <li key={x} className="!text-[12.5px] leading-[1.5] text-[#17191a]/75">— {x}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {last && (
          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
            <span className={`text-[11.5px] ${tried && !consent ? "text-[#b42318]" : "text-[#17191a]/55"}`}>
              Даю согласие на обработку <a href="/policy" className="underline underline-offset-2">персональных данных</a> *
            </span>
          </label>
        )}
        {tried && !stepOk && <p className="text-[12px] text-[#b42318]">Заполните, пожалуйста, поля со звёздочкой.</p>}

        <button type="button" onClick={next} className={btn}>{last ? "Отправить заявку" : "Далее"}</button>
        {(step > 0 || onBack) && <button type="button" onClick={() => { setTried(false); if (step > 0) setStep(step - 1); else onBack?.(); }} className={`self-start ${link}`}>← Назад</button>}
      </div>
    </div>
  );
}
