"use client";
// ЗАЯВКА — светлый квиз на статичном фоне. Первый шаг — выбор цели
// (Образ / Консьерж / Выезд), дальше вопросы подстраиваются под выбор.
// Общий финальный шаг — контакты. Двуязычно (RU/EN). Отправка — заглушка.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Question = { q: Loc; note: Loc; opts: Loc[] };
type GoalKey = "look" | "concierge" | "travel";

// Общий вопрос про сроки — используется во всех ветках
const WHEN: Question = {
  q: { ru: "Когда планируете?", en: "When are you planning?" },
  note: {
    ru: "Подскажите сроки — подберу свободное время мастеров.",
    en: "Tell us the timeframe — we'll find an open slot with our artists.",
  },
  opts: [
    { ru: "На этой неделе", en: "This week" },
    { ru: "В этом месяце", en: "This month" },
    { ru: "Через 1–2 месяца", en: "In 1–2 months" },
    { ru: "Пока выбираю дату", en: "Still choosing a date" },
  ],
};

// Первый шаг — выбор цели заявки
const GOAL: { q: Loc; note: Loc; opts: (Loc & { key: GoalKey })[] } = {
  q: { ru: "Что вам нужно?", en: "What do you need?" },
  note: {
    ru: "С этого начнём — подберу вопросы под вашу задачу.",
    en: "Let's start here — I'll tailor the questions to your goal.",
  },
  opts: [
    { key: "look", ru: "Образ и макияж", en: "Look & makeup" },
    { key: "concierge", ru: "Beauty-консьерж", en: "Beauty concierge" },
    { key: "travel", ru: "Выезд мастеров", en: "On-location visit" },
  ],
};

// Ветки вопросов под каждую цель (по 4 вопроса)
const BRANCHES: Record<GoalKey, Question[]> = {
  look: [
    {
      q: { ru: "Какой образ вас интересует?", en: "Which look are you after?" },
      note: {
        ru: "Под каждый повод свои мастера и материалы.",
        en: "Each occasion has its own artists and materials.",
      },
      opts: [
        { ru: "Полный образ", en: "Full look" },
        { ru: "Свадебный образ", en: "Bridal look" },
        { ru: "Макияж и укладка", en: "Makeup & hair" },
        { ru: "Сопровождение", en: "On-event support" },
        { ru: "Другое", en: "Other" },
      ],
    },
    {
      q: { ru: "На какое событие?", en: "For what event?" },
      note: {
        ru: "Событие задаёт стойкость макияжа и характер образа.",
        en: "The event sets the makeup's staying power and character.",
      },
      opts: [
        { ru: "Свадьба", en: "Wedding" },
        { ru: "Фотосъёмка", en: "Photoshoot" },
        { ru: "Выпускной", en: "Prom" },
        { ru: "Вечернее мероприятие", en: "Evening event" },
        { ru: "Повседневно", en: "Everyday" },
        { ru: "Другое", en: "Other" },
      ],
    },
    {
      q: { ru: "Где вам удобно?", en: "Where suits you?" },
      note: {
        ru: "Работаем в студии или приедем к вам — как комфортнее.",
        en: "We work in the studio or come to you — whatever is easier.",
      },
      opts: [
        { ru: "В студии", en: "In the studio" },
        { ru: "Выезд к вам", en: "We come to you" },
        { ru: "Ещё не решили", en: "Not decided yet" },
      ],
    },
    WHEN,
  ],
  concierge: [
    {
      q: { ru: "Что нужно от консьержа?", en: "What do you need from the concierge?" },
      note: {
        ru: "Возьмём на себя ровно то, что нужно.",
        en: "We'll take on exactly what you need.",
      },
      opts: [
        { ru: "Образ под ключ", en: "Turnkey look" },
        { ru: "Команда мастеров", en: "Team of artists" },
        { ru: "Планирование образа", en: "Look planning" },
        { ru: "Сопровождение на событии", en: "On-event support" },
        { ru: "Организация выезда", en: "Travel arrangement" },
        { ru: "Другое", en: "Other" },
      ],
    },
    {
      q: { ru: "Какое событие?", en: "What's the occasion?" },
      note: {
        ru: "Повод задаёт формат образа и тайминг.",
        en: "The occasion sets the look and timing.",
      },
      opts: [
        { ru: "Свадьба", en: "Wedding" },
        { ru: "Фотосъёмка", en: "Photoshoot" },
        { ru: "Мероприятие", en: "Event" },
        { ru: "Тревел / отдых", en: "Leisure & travel" },
        { ru: "Другое", en: "Other" },
      ],
    },
    {
      q: { ru: "Где?", en: "Where?" },
      note: {
        ru: "В городе, на выезде по России или за рубежом.",
        en: "In the city, on location across Russia or abroad.",
      },
      opts: [
        { ru: "В городе", en: "In the city" },
        { ru: "Выезд по России", en: "Within Russia" },
        { ru: "За рубежом", en: "Abroad" },
        { ru: "Ещё не решили", en: "Not decided yet" },
      ],
    },
    WHEN,
  ],
  travel: [
    {
      q: { ru: "Куда выезд?", en: "Where to?" },
      note: {
        ru: "От направления зависит логистика и состав команды.",
        en: "Direction defines logistics and the team.",
      },
      opts: [
        { ru: "По России", en: "Within Russia" },
        { ru: "За рубеж", en: "Abroad" },
      ],
    },
    {
      q: { ru: "Что нужно?", en: "What do you need?" },
      note: {
        ru: "Можно начать с малого — расширим на месте.",
        en: "Start small — we can expand on site.",
      },
      opts: [
        { ru: "Полный образ", en: "Full look" },
        { ru: "Макияж и укладка", en: "Makeup & hair" },
        { ru: "Команда мастеров", en: "Team of artists" },
        { ru: "Сопровождение", en: "On-event support" },
        { ru: "Всё под ключ", en: "Turnkey" },
      ],
    },
    {
      q: { ru: "Сколько человек готовим?", en: "How many people to prep?" },
      note: {
        ru: "От числа персон зависит размер команды.",
        en: "Headcount defines the team size.",
      },
      opts: [
        { ru: "1", en: "1" },
        { ru: "2–3", en: "2–3" },
        { ru: "4–6", en: "4–6" },
        { ru: "7+", en: "7+" },
      ],
    },
    WHEN,
  ],
};

const BRANCH_LEN = 4; // во всех ветках по 4 вопроса
const QCOUNT = 1 + BRANCH_LEN; // цель + вопросы ветки
const TOTAL = QCOUNT + 1; // + контакты (для прогресса)

const CONTACT_NOTE: Loc = {
  ru: "Оставьте контакты — свяжусь, чтобы обсудить детали.",
  en: "Leave your contacts — I'll get in touch to discuss the details.",
};

const UI = {
  ru: {
    eyebrow: "заявка",
    title: "Расскажите о событии — вернёмся с образом и сметой",
    step: "Шаг",
    of: "из",
    contactTitle: "Как с вами связаться?",
    name: "Ваше имя",
    namePh: "Имя",
    phone: "Телефон",
    phonePh: "+7 ___ ___-__-__",
    consent: "Оставляя заявку, вы соглашаетесь на обработку персональных данных.",
    back: "Назад",
    next: "Далее",
    submit: "Отправить заявку",
    successTitle: "Спасибо, заявка принята",
    successSub1: "Дайана свяжется с вами в ближайшее время",
    successSub2: (a: string) => `, чтобы обсудить «${a}»`,
    again: "Оставить ещё одну заявку",
    founder: "Дайана Тарзян",
    founderRole: "основатель ALIS",
  },
  en: {
    eyebrow: "request",
    title: "Tell us about your event — we'll come back with a look and a quote",
    step: "Step",
    of: "of",
    contactTitle: "How can we reach you?",
    name: "Your name",
    namePh: "Name",
    phone: "Phone",
    phonePh: "+_ ___ ___-__-__",
    consent: "By submitting, you agree to the processing of personal data.",
    back: "Back",
    next: "Next",
    submit: "Send request",
    successTitle: "Thank you, request received",
    successSub1: "Daiana will contact you shortly",
    successSub2: (a: string) => ` to discuss “${a}”`,
    again: "Submit another request",
    founder: "Daiana Tarzyan",
    founderRole: "founder of ALIS",
  },
};

export default function Booking() {
  const { lang } = useLang();
  const ui = UI[lang];

  const [goalKey, setGoalKey] = useState<GoalKey | null>(null);
  const [step, setStep] = useState(0); // 0 — цель, 1..4 — ветка, 5 — контакты, 6 — успех
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QCOUNT).fill(null));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isGoal = step === 0;
  const isContact = step === QCOUNT;
  const isSuccess = step === TOTAL;
  const branch = goalKey ? BRANCHES[goalKey] : null;
  const curQuestion: Question | null = isGoal
    ? { q: GOAL.q, note: GOAL.note, opts: GOAL.opts }
    : branch
    ? branch[step - 1]
    : null;
  const note = isContact ? CONTACT_NOTE[lang] : curQuestion?.note[lang];

  const pickGoal = (opt: (typeof GOAL.opts)[number]) => {
    setGoalKey(opt.key);
    setAnswers((a) => {
      const next = [...a];
      next[0] = opt[lang];
      for (let i = 1; i < next.length; i++) next[i] = null; // сбросить ветку
      return next;
    });
  };

  const pick = (val: string) => {
    setAnswers((a) => {
      const next = [...a];
      next[step] = val;
      return next;
    });
  };

  const canNext = isContact
    ? name.trim().length > 1 && phone.replace(/\D/g, "").length >= 6
    : !!answers[step];

  const goNext = () => {
    if (!canNext) return;
    if (isContact) {
      // TODO: реальная отправка (Telegram / e-mail / CRM)
      setStep(TOTAL);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setGoalKey(null);
    setAnswers(Array(QCOUNT).fill(null));
    setName("");
    setPhone("");
  };

  return (
    <section
      id="booking"
      className="relative scroll-mt-24 bg-white bg-fixed bg-cover bg-center py-24 text-[#17191a] lg:py-32"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(/assets/tild6230-643__.jpg)",
      }}
    >
      {/* Растушёвка верха и низа — бесшовный стык с соседними блоками */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto w-[94%] max-w-[1080px]">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {ui.eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#17191a] lg:text-[48px]">
            {ui.title}
          </h2>
        </div>

        {/* Карточка-квиз — кремовое стекло */}
        <div className="overflow-hidden rounded-[26px] border border-[#17191a]/10 bg-white/55 shadow-[0_20px_60px_rgba(42,38,34,0.15)] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[300px_1fr]">
            {/* Левая колонка — персона */}
            <div className="flex flex-col gap-6 border-b border-[#17191a]/10 p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/tild3236-393__.jpg"
                  alt={ui.founder}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-[16px] font-medium text-[#17191a]">{ui.founder}</p>
                  <p className="mt-0.5 text-[13px] text-[#17191a]/50">{ui.founderRole}</p>
                </div>
              </div>

              {/* Реплика */}
              {!isSuccess && (
                <div className="relative rounded-2xl border border-[#17191a]/10 bg-white/70 p-4 backdrop-blur-md">
                  <span className="absolute -top-1.5 left-8 h-3.5 w-3.5 rotate-45 border-l border-t border-[#17191a]/10 bg-white/70" />
                  <p key={step} className="booking-step text-[14px] leading-relaxed text-[#17191a]/75">
                    {note}
                  </p>
                </div>
              )}
            </div>

            {/* Правая колонка — квиз */}
            <div className="p-8 lg:p-12">
              {!isSuccess ? (
                <>
                  {/* Прогресс */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full border border-[#17191a]/15 bg-[#17191a]/[0.06] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wide text-[#17191a]/80">
                      {ui.step} {step + 1} {ui.of} {TOTAL}
                    </span>
                    <span className="text-[13px] text-[#17191a]/40">
                      {step + 1} / {TOTAL}
                    </span>
                  </div>
                  <div className="mb-9 h-1.5 w-full overflow-hidden rounded-full bg-[#17191a]/10">
                    <div
                      className="h-full rounded-full bg-[#4E2126] transition-all duration-500 ease-out"
                      style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                    />
                  </div>

                  {/* Тело шага */}
                  <div key={step} className="booking-step">
                    {!isContact ? (
                      <>
                        <h3 className="mb-7 font-serif text-[26px] leading-tight text-[#17191a] lg:text-[32px]">
                          {curQuestion!.q[lang]}
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {(isGoal ? GOAL.opts : curQuestion!.opts).map((opt) => {
                            const val = opt[lang];
                            const selected = isGoal
                              ? goalKey === (opt as (typeof GOAL.opts)[number]).key
                              : answers[step] === val;
                            const onClick = isGoal
                              ? () => pickGoal(opt as (typeof GOAL.opts)[number])
                              : () => pick(val);
                            return (
                              <button
                                key={opt.ru}
                                onClick={onClick}
                                className={`flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left text-[15px] transition-all ${
                                  selected
                                    ? "border-[#4E2126] bg-[#4E2126] text-[#f4efe6]"
                                    : "border-[#17191a]/15 bg-white/50 text-[#17191a]/85 hover:border-[#4E2126]/50 hover:bg-white/80"
                                }`}
                              >
                                <span
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                    selected ? "border-[#f4efe6] bg-[#f4efe6]" : "border-[#17191a]/40"
                                  }`}
                                >
                                  {selected && (
                                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                                      <path
                                        d="M5 12.5l4.5 4.5L19 7.5"
                                        stroke="#4E2126"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </span>
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="mb-7 font-serif text-[26px] leading-tight text-[#17191a] lg:text-[32px]">
                          {ui.contactTitle}
                        </h3>
                        <label className="mb-3 block text-[13px] tracking-wide text-[#17191a]/50">
                          {ui.name}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={ui.namePh}
                          className="mb-7 w-full border-b border-[#17191a]/25 bg-transparent pb-3 text-[16px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/30 focus:border-[#17191a]"
                        />
                        <label className="mb-3 block text-[13px] tracking-wide text-[#17191a]/50">
                          {ui.phone}
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={ui.phonePh}
                          className="w-full border-b border-[#17191a]/25 bg-transparent pb-3 text-[16px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/30 focus:border-[#17191a]"
                        />
                        <p className="mt-7 text-[12px] leading-relaxed text-[#17191a]/40">
                          {ui.consent}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Навигация */}
                  <div className="mt-10 flex items-center justify-between">
                    {step > 0 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="inline-flex items-center gap-2 text-[14px] text-[#17191a]/50 transition-colors hover:text-[#17191a]"
                      >
                        <span aria-hidden>←</span> {ui.back}
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={goNext}
                      disabled={!canNext}
                      className="inline-flex items-center gap-2.5 rounded-full border border-[#4E2126] bg-[#4E2126] py-3 pl-6 pr-2.5 text-[13px] font-medium uppercase tracking-wide text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#4E2126] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[#4E2126] disabled:hover:text-[#f4efe6]"
                    >
                      {isContact ? ui.submit : ui.next}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4E2126" strokeWidth="2.2">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                /* Экран успеха */
                <div className="booking-step flex min-h-[320px] flex-col items-center justify-center py-6 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#4E2126]/40">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        stroke="#4E2126"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-[28px] text-[#17191a] lg:text-[32px]">
                    {ui.successTitle}
                  </h3>
                  <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-[#17191a]/60">
                    {ui.successSub1}
                    {answers[0] ? ui.successSub2(answers[0]) : ""}.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-8 text-[14px] text-[#17191a]/50 transition-colors hover:text-[#17191a]"
                  >
                    {ui.again}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
