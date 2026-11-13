"use client";
// АНКЕТА «ПОДБОР ДОМАШНЕГО УХОДА ЗА ВОЛОСАМИ» (магазин, кнопка в баннере «Подобрать уход…»).
// Вопросы — от заказчицы: 5 шагов (волосы → кожа головы → что делали за год → что исправить
// (до трёх) → текущий уход) → контакты. Компьютер: слева заголовок и плитки ответов (заполняются
// по ходу), справа шаги — как в анкетах консьержа и вакансий. Заявка уходит в бот команды (тип «shop»).
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";

type Loc = { ru: string; en: string };
type Opt = Loc;
const o = (ru: string, en: string): Opt => ({ ru, en });

// 1. Какие у вас волосы — три коротких выбора на одном шаге
const HAIR_PARTS: { key: string; label: Loc; opts: Opt[] }[] = [
  { key: "structure", label: o("Структура", "Texture"), opts: [o("Прямые", "Straight"), o("Волнистые", "Wavy"), o("Кудрявые", "Curly")] },
  { key: "thickness", label: o("Толщина", "Thickness"), opts: [o("Тонкие", "Fine"), o("Средние", "Medium"), o("Густые и жёсткие", "Thick and coarse")] },
  { key: "length", label: o("Длина", "Length"), opts: [o("Короткие", "Short"), o("До плеч", "Shoulder-length"), o("Ниже лопаток", "Below the shoulder blades")] },
];
// 2. Кожа головы
const SCALP: Opt[] = [
  o("Быстро жирнеет, мою каждый день или через день", "Gets oily fast, I wash it daily or every other day"),
  o("Нормальная, мою раз в 2–3 дня", "Normal, I wash it every 2–3 days"),
  o("Сухая, бывают шелушение или зуд", "Dry, sometimes flaky or itchy"),
  o("Есть перхоть или раздражение", "Dandruff or irritation"),
];
// 3. Что делали за последний год (можно несколько; «Ничего» — отдельно)
const NOTHING = "Ничего, волосы натуральные";
const DONE: Opt[] = [
  o("Окрашивание", "Colouring"),
  o("Осветление или мелирование", "Lightening or highlights"),
  o("Кератин, ботокс, нанопластика", "Keratin, botox, nanoplasty"),
  o("Химическая завивка", "Perm"),
  o(NOTHING, "Nothing, my hair is natural"),
];
// 4. Что исправить — до трёх
const FIX: Opt[] = [
  o("Сухость", "Dryness"), o("Ломкость", "Breakage"), o("Секущиеся кончики", "Split ends"),
  o("Пушение", "Frizz"), o("Тусклость", "Dullness"), o("Выпадение", "Hair loss"),
  o("Мало объёма", "Lack of volume"), o("Быстро вымывается цвет", "Colour fades fast"), o("Медленно растут", "Slow growth"),
];
const MAX_FIX = 3;
const STEPS = 6; // 5 вопросов + контакты

export function HairQuiz() {
  const { lang } = useLang();
  const en = lang === "en";
  const T = (ru: string, e: string) => (en ? e : ru);
  const tr = (list: Opt[], ru: string) => list.find((x) => x.ru === ru)?.[lang] ?? ru;

  const [step, setStep] = useState(0); // 0..4 вопросы, 5 — контакты, 6 — готово
  const [hair, setHair] = useState<Record<string, string>>({});
  const [scalp, setScalp] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const [colour, setColour] = useState(""); // «в какой цвет?»
  const [fix, setFix] = useState<string[]>([]);
  const [tools, setTools] = useState("");
  const [products, setProducts] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [maxHint, setMaxHint] = useState(0);

  const toggleDone = (v: string) => {
    if (v === NOTHING) { setDone(done.includes(v) ? [] : [v]); return; }
    const cur = done.filter((x) => x !== NOTHING);
    setDone(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };
  const toggleFix = (v: string) => {
    if (fix.includes(v)) { setFix(fix.filter((x) => x !== v)); return; }
    if (fix.length >= MAX_FIX) { setMaxHint((n) => n + 1); return; }
    setFix([...fix, v]);
  };

  const canNext = [
    HAIR_PARTS.every((p) => hair[p.key]),
    !!scalp,
    done.length > 0,
    fix.length > 0,
    true,
  ][step];
  const ok = phoneComplete(phone) && consent;

  const send = () => {
    if (!ok) return;
    const ru = (list: Opt[], v: string) => list.find((x) => x.ru === v)?.ru ?? v;
    void sendLead({
      kind: "shop",
      name,
      phone,
      details: {
        Форма: "Анкета: подбор домашнего ухода за волосами",
        "Структура": hair.structure, "Толщина": hair.thickness, "Длина": hair.length,
        "Кожа головы": ru(SCALP, scalp),
        "За последний год": done.join(", ") + (done.includes("Окрашивание") && colour.trim() ? ` (цвет: ${colour.trim()})` : ""),
        "Что исправить": fix.join(", "),
        "Фен, утюжок, плойка, термозащита": tools,
        "Средства сейчас / что не подошло": products,
      },
    });
    setStep(6);
  };

  // Плитки «ваши ответы» слева (компьютер)
  const tiles = [
    { label: T("Волосы", "Hair"), v: HAIR_PARTS.map((p) => (hair[p.key] ? tr(p.opts, hair[p.key]) : "")).filter(Boolean).join(", "), wide: true },
    { label: T("Кожа головы", "Scalp"), v: scalp ? tr(SCALP, scalp).split(",")[0] : "" },
    { label: T("За год", "Past year"), v: done.map((d) => tr(DONE, d)).join(", ") },
    { label: T("Исправить", "To fix"), v: fix.map((d) => tr(FIX, d)).join(", "), wide: true },
  ];

  const chip = (on: boolean) =>
    `flex items-center justify-center rounded-[12px] border px-3 py-2.5 text-center text-[11.5px] leading-tight transition-all active:scale-[0.97] sm:rounded-[16px] sm:py-3 sm:text-[14px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-transparent bg-[#f6f4f1] text-[#17191a] hover:border-[#17191a]/30"}`;
  const field = "w-full rounded-[14px] bg-[#f6f4f1] px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/40 focus:ring-1 focus:ring-[#17191a]/25 sm:rounded-[16px] sm:px-5 sm:text-[15px]";
  const link = "text-[11px] uppercase tracking-[0.14em] text-[#17191a]/55 transition-colors hover:text-[#17191a]";
  const btn = "flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]";
  const qTitle = "mt-4 font-display text-[13px] uppercase tracking-[0.04em] sm:mt-5 sm:text-[17px]";
  const hint = "mt-1 !text-[11px] text-[#17191a]/50 sm:!text-[12.5px]";

  return (
    <section id="hair" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] animate-[hq-in_.5s_ease] gap-5 rounded-[22px] border border-[#17191a]/[0.06] bg-white px-4 py-7 text-[#17191a] shadow-[0_24px_50px_-28px_rgba(23,25,26,0.35)] sm:gap-8 sm:rounded-[28px] sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-14">
        {/* Слева: заголовок и ваши ответы */}
        <div className="flex flex-col text-left">
          <h2 className="text-[#17191a]">{T("Анкета: подбор домашнего ухода за волосами", "Questionnaire: home hair care selection")}</h2>
          <p className="mt-2 !text-[12.5px] leading-[1.55] text-[#17191a]/65 sm:mt-3 sm:!text-[15px]">
            {T("Ответьте на 5 вопросов, и наш стилист подберёт уход именно для ваших волос.", "Answer 5 questions and our stylist will choose care that is right for your hair.")}
          </p>
          <div className="mt-7 hidden grid-cols-2 gap-2 lg:grid">
            {tiles.map((x) => (
              <div key={x.label} className={`rounded-[14px] px-4 py-2.5 transition-colors duration-500 ${x.wide ? "col-span-2" : ""} ${x.v ? "bg-[#f6f4f1]" : "bg-[#f6f4f1]/55"}`}>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{x.label}</span>
                <p className="mt-1 overflow-hidden font-display text-[15px] leading-[1.35] tracking-[0.02em]">
                  <span key={x.v || "—"} className={`block ${x.v ? "animate-[hq-val_.55s_cubic-bezier(.2,.8,.2,1)] text-[#17191a]" : "text-[#17191a]/20"}`}>{x.v || "—"}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Справа: шаги */}
        <div className="w-full text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45">{step < 6 ? `${T("Шаг", "Step")} ${step + 1} / ${STEPS}` : T("Готово", "Done")}</span>
          <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-[#17191a]/12">
            <div className="h-full bg-[#17191a] transition-all duration-500" style={{ width: `${(Math.min(step, STEPS) / STEPS) * 100}%` }} />
          </div>

          <div key={step} className="animate-[hq-in_.4s_ease]">
            {step === 0 && (
              <>
                <p className={qTitle}>{T("1. Какие у вас волосы?", "1. What is your hair like?")}</p>
                {HAIR_PARTS.map((p) => (
                  <div key={p.key} className="mt-4">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45 sm:text-[11px]">{p.label[lang]}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {p.opts.map((x) => (
                        <button key={x.ru} type="button" onClick={() => setHair({ ...hair, [p.key]: x.ru })} aria-pressed={hair[p.key] === x.ru} className={chip(hair[p.key] === x.ru)}>{x[lang]}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

            {step === 1 && (
              <>
                <p className={qTitle}>{T("2. Какая у вас кожа головы?", "2. What is your scalp like?")}</p>
                <div className="mt-4 grid gap-2">
                  {SCALP.map((x) => (
                    <button key={x.ru} type="button" onClick={() => { setScalp(x.ru); setStep(2); }} aria-pressed={scalp === x.ru} className={`${chip(scalp === x.ru)} !justify-start !text-left`}>{x[lang]}</button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className={qTitle}>{T("3. Что вы делали с волосами за последний год?", "3. What have you done to your hair in the past year?")}</p>
                <p className={hint}>{T("Можно выбрать несколько", "You can choose several")}</p>
                <div className="mt-4 grid gap-2">
                  {DONE.map((x) => (
                    <button key={x.ru} type="button" onClick={() => toggleDone(x.ru)} aria-pressed={done.includes(x.ru)} className={`${chip(done.includes(x.ru))} !justify-start !text-left`}>{x[lang]}</button>
                  ))}
                </div>
                {/* Окрашивание — «в какой цвет?» */}
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${done.includes("Окрашивание") ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <input value={colour} onChange={(e) => setColour(e.target.value)} tabIndex={done.includes("Окрашивание") ? 0 : -1} placeholder={T("В какой цвет?", "Which colour?")} className={`${field} mt-2 h-[46px] sm:h-[48px]`} />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className={qTitle}>{T("4. Что больше всего хочется исправить?", "4. What would you most like to fix?")}</p>
                <p key={maxHint} className={`${hint} ${maxHint ? "animate-[hq-shake_.4s_ease] !text-[#17191a]" : ""}`}>
                  {T(`Можно выбрать до трёх вариантов · выбрано ${fix.length} из ${MAX_FIX}`, `Choose up to three · ${fix.length} of ${MAX_FIX} selected`)}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {FIX.map((x) => (
                    <button key={x.ru} type="button" onClick={() => toggleFix(x.ru)} aria-pressed={fix.includes(x.ru)} className={`${chip(fix.includes(x.ru))} ${!fix.includes(x.ru) && fix.length >= MAX_FIX ? "opacity-40" : ""}`}>{x[lang]}</button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className={qTitle}>{T("5. Как вы ухаживаете за волосами сейчас?", "5. How do you care for your hair now?")}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11.5px] leading-[1.4] text-[#17191a]/70 sm:text-[12.5px]">{T("Как часто пользуетесь феном, утюжком или плойкой? Наносите ли термозащиту?", "How often do you use a hairdryer, straightener or curling iron? Do you use heat protection?")}</span>
                    <textarea rows={2} value={tools} onChange={(e) => setTools(e.target.value)} className={`${field} py-3`} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11.5px] leading-[1.4] text-[#17191a]/70 sm:text-[12.5px]">{T("Какими средствами пользуетесь и что вам не подошло?", "Which products do you use, and what didn't work for you?")}</span>
                    <textarea rows={2} value={products} onChange={(e) => setProducts(e.target.value)} className={`${field} py-3`} />
                  </label>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <p className={qTitle}>{T("Куда прислать подбор?", "Where should we send your selection?")}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <input type="text" placeholder={T("Имя", "Name")} value={name} onChange={(e) => setName(e.target.value)} className={`${field} h-[46px] sm:h-[48px]`} />
                  <PhoneField lang={lang} value={phone} onChange={setPhone} className="!bg-[#f6f4f1]" />
                </div>
                <label className="mt-4 flex cursor-pointer items-center gap-2.5">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
                  <span className="text-[clamp(10px,2.8vw,11px)] text-[#17191a]/55">
                    {T("Даю согласие на обработку ", "I agree to the processing of my ")}
                    <a href="/policy" className="underline underline-offset-2">{T("персональных данных", "personal data")}</a>
                  </span>
                </label>
                <button type="button" onClick={send} disabled={!ok} className={`mt-4 ${btn}`}>{T("Подобрать уход", "Find my care")}</button>
              </>
            )}

            {step === 6 && (
              <div className="py-6 text-center">
                <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#17191a] text-[20px] text-white">✓</span>
                <p className="mt-5 font-display text-[18px] sm:text-[22px]">{T("Спасибо!", "Thank you!")}</p>
                <p className="mx-auto mt-2 max-w-[36ch] !text-[12.5px] leading-[1.55] text-[#17191a]/65 sm:!text-[14px]">
                  {T("Стилист изучит ваши ответы, свяжется с вами и подберёт уход именно для ваших волос.", "Our stylist will review your answers, get in touch and choose care that is right for your hair.")}
                </p>
              </div>
            )}

            {/* Навигация: «Далее» (на шаге с одним выбором — переход сразу по нажатию) и «Назад» */}
            {step < 5 && step !== 1 && (
              <button type="button" onClick={() => canNext && setStep(step + 1)} disabled={!canNext} className={`mt-5 ${btn}`}>
                {step === 4 && !tools.trim() && !products.trim() ? T("Пропустить", "Skip") : T("Далее", "Next")}
              </button>
            )}
            {step > 0 && step < 6 && (
              <button type="button" onClick={() => setStep(step - 1)} className={`mt-4 ${link}`}>← {T("Назад", "Back")}</button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes hq-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes hq-val { from { opacity: 0; transform: translateY(100%) } to { opacity: 1; transform: none } }
        @keyframes hq-shake { 0%,100% { transform: none } 25% { transform: translateX(-4px) } 75% { transform: translateX(4px) } }
        @media (prefers-reduced-motion: reduce) { #hair * { animation: none !important } }
      `}</style>
    </section>
  );
}
