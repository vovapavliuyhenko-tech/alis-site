"use client";
// ВЫЕЗД — анкета оформления выезда по России и за рубежом. Пошаговая форма:
// направление, город/страна, повод, состав услуг, даты, число персон, контакты.
// Двуязычно (RU/EN). Отправка — заглушка (TODO: Telegram/e-mail/CRM).
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Step =
  | { kind: "choice"; q: Loc; note: Loc; opts: Loc[] }
  | { kind: "text"; q: Loc; note: Loc; placeholder: Loc }
  | { kind: "contact"; q: Loc; note: Loc };

const UI = {
  ru: {
    eyebrow: "выезд",
    title: "Оформление выезда по России и за рубежом",
    sub: "Заполните короткую анкету — соберём команду, посчитаем смету и вернёмся с предложением.",
    step: "Шаг",
    of: "из",
    back: "Назад",
    next: "Далее",
    submit: "Отправить заявку",
    name: "Ваше имя",
    namePh: "Имя",
    phone: "Телефон",
    phonePh: "+7 ___ ___-__-__",
    comment: "Комментарий (необязательно)",
    commentPh: "Детали, пожелания, ссылки на референсы",
    consent: "Оставляя заявку, вы соглашаетесь на обработку персональных данных.",
    successTitle: "Спасибо, заявка принята",
    successSub: "Свяжемся с вами в ближайшее время, чтобы уточнить детали выезда.",
    again: "Оставить ещё одну заявку",
  },
  en: {
    eyebrow: "travel",
    title: "Arrange an on-location visit across Russia and abroad",
    sub: "Fill out a short form — we'll assemble the team, prepare a quote and get back with a proposal.",
    step: "Step",
    of: "of",
    back: "Back",
    next: "Next",
    submit: "Send request",
    name: "Your name",
    namePh: "Name",
    phone: "Phone",
    phonePh: "+_ ___ ___-__-__",
    comment: "Comment (optional)",
    commentPh: "Details, wishes, reference links",
    consent: "By submitting, you agree to the processing of personal data.",
    successTitle: "Thank you, request received",
    successSub: "We'll contact you shortly to clarify the details of the visit.",
    again: "Submit another request",
  },
};

const STEPS: Step[] = [
  {
    kind: "choice",
    q: { ru: "Куда планируете выезд?", en: "Where is the visit?" },
    note: { ru: "От направления зависит логистика и состав команды.", en: "Direction defines logistics and the team." },
    opts: [
      { ru: "По России", en: "Within Russia" },
      { ru: "За рубеж", en: "Abroad" },
    ],
  },
  {
    kind: "text",
    q: { ru: "Город или страна", en: "City or country" },
    note: { ru: "Укажите место события — так точнее посчитаем выезд.", en: "Tell us the location — for a precise estimate." },
    placeholder: { ru: "Например: Сочи / Италия, Комо", en: "e.g. Sochi / Italy, Como" },
  },
  {
    kind: "choice",
    q: { ru: "Какой повод?", en: "What's the occasion?" },
    note: { ru: "Повод задаёт формат образа и тайминг.", en: "The occasion sets the look and timing." },
    opts: [
      { ru: "Свадьба", en: "Wedding" },
      { ru: "Фотосъёмка", en: "Photoshoot" },
      { ru: "Мероприятие", en: "Event" },
      { ru: "Отдых / тревел", en: "Leisure / travel" },
      { ru: "Другое", en: "Other" },
    ],
  },
  {
    kind: "choice",
    q: { ru: "Что нужно?", en: "What do you need?" },
    note: { ru: "Можно начать с малого — расширим на месте.", en: "Start small — we can expand on site." },
    opts: [
      { ru: "Полный образ", en: "Full look" },
      { ru: "Макияж и укладка", en: "Makeup & hair" },
      { ru: "Команда мастеров", en: "Team of artists" },
      { ru: "Сопровождение", en: "On-event support" },
      { ru: "Всё под ключ", en: "Turnkey" },
    ],
  },
  {
    kind: "text",
    q: { ru: "Когда планируете?", en: "When is it?" },
    note: { ru: "Даты помогут забронировать мастеров заранее.", en: "Dates help us reserve artists ahead." },
    placeholder: { ru: "Например: 12–15 июня", en: "e.g. June 12–15" },
  },
  {
    kind: "choice",
    q: { ru: "Сколько человек готовим?", en: "How many people to prep?" },
    note: { ru: "От числа персон зависит размер команды.", en: "Headcount defines the team size." },
    opts: [
      { ru: "1", en: "1" },
      { ru: "2–3", en: "2–3" },
      { ru: "4–6", en: "4–6" },
      { ru: "7+", en: "7+" },
    ],
  },
  {
    kind: "contact",
    q: { ru: "Как с вами связаться?", en: "How to reach you?" },
    note: { ru: "Оставьте контакты — вернёмся с предложением и сметой.", en: "Leave your contacts — we'll return with a proposal and quote." },
  },
];

export default function TravelForm() {
  const { lang } = useLang();
  const ui = UI[lang];
  const TOTAL = STEPS.length;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(TOTAL).fill(null)
  );
  const [text, setText] = useState<string[]>(Array(TOTAL).fill(""));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);

  const cur = STEPS[step];
  const note = cur.note[lang];

  const canNext = (() => {
    if (cur.kind === "choice") return !!answers[step];
    if (cur.kind === "text") return text[step].trim().length > 0;
    return name.trim().length > 1 && phone.replace(/\D/g, "").length >= 6;
  })();

  const goNext = () => {
    if (!canNext) return;
    if (step === TOTAL - 1) {
      // TODO: реальная отправка (Telegram / e-mail / CRM)
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <section className="relative min-h-[92svh] bg-[#17191a] px-4 pb-24 pt-32 text-[#f4efe6]">
      <div className="mx-auto w-full max-w-[860px]">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {ui.eyebrow}
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl font-serif text-[30px] leading-[1.1] text-[#f4efe6] lg:text-[46px]">
            {ui.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#f4efe6]/60">
            {ui.sub}
          </p>
        </div>

        {/* Карточка формы */}
        <div className="rounded-[26px] border border-[#4E2126]/50 bg-[#4E2126]/[0.08] p-7 lg:p-12">
          {!done ? (
            <>
              {/* Прогресс */}
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#f4efe6]/15 bg-[#f4efe6]/[0.06] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wide text-[#f4efe6]/80">
                  {ui.step} {step + 1} {ui.of} {TOTAL}
                </span>
                <span className="text-[13px] text-[#f4efe6]/40">
                  {step + 1} / {TOTAL}
                </span>
              </div>
              <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-[#f4efe6]/10">
                <div
                  className="h-full rounded-full bg-[#4E2126] transition-all duration-500 ease-out"
                  style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                />
              </div>

              <div key={step} className="booking-step">
                <h2 className="mb-2 font-serif text-[24px] leading-tight text-[#f4efe6] lg:text-[30px]">
                  {cur.q[lang]}
                </h2>
                <p className="mb-7 text-[13.5px] text-[#f4efe6]/55">{note}</p>

                {cur.kind === "choice" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {cur.opts.map((opt) => {
                      const val = opt[lang];
                      const selected = answers[step] === val;
                      return (
                        <button
                          key={opt.ru}
                          onClick={() =>
                            setAnswers((a) => {
                              const n = [...a];
                              n[step] = val;
                              return n;
                            })
                          }
                          className={`flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left text-[15px] transition-all ${
                            selected
                              ? "border-[#4E2126] bg-[#4E2126] text-[#f4efe6]"
                              : "border-[#f4efe6]/15 text-[#f4efe6]/85 hover:border-[#4E2126]"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              selected ? "border-[#f4efe6] bg-[#f4efe6]" : "border-[#f4efe6]/40"
                            }`}
                          >
                            {selected && (
                              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#4E2126" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {val}
                        </button>
                      );
                    })}
                  </div>
                )}

                {cur.kind === "text" && (
                  <input
                    type="text"
                    value={text[step]}
                    onChange={(e) =>
                      setText((tt) => {
                        const n = [...tt];
                        n[step] = e.target.value;
                        return n;
                      })
                    }
                    placeholder={cur.placeholder[lang]}
                    className="w-full border-b border-[#f4efe6]/25 bg-transparent pb-3 text-[16px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/30 focus:border-[#f4efe6]"
                  />
                )}

                {cur.kind === "contact" && (
                  <div className="grid gap-6">
                    <div>
                      <label className="mb-2 block text-[13px] tracking-wide text-[#f4efe6]/50">
                        {ui.name}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={ui.namePh}
                        className="w-full border-b border-[#f4efe6]/25 bg-transparent pb-3 text-[16px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/30 focus:border-[#f4efe6]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] tracking-wide text-[#f4efe6]/50">
                        {ui.phone}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={ui.phonePh}
                        className="w-full border-b border-[#f4efe6]/25 bg-transparent pb-3 text-[16px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/30 focus:border-[#f4efe6]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] tracking-wide text-[#f4efe6]/50">
                        {ui.comment}
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={ui.commentPh}
                        rows={3}
                        className="w-full resize-none border-b border-[#f4efe6]/25 bg-transparent pb-3 text-[16px] text-[#f4efe6] outline-none transition-colors placeholder:text-[#f4efe6]/30 focus:border-[#f4efe6]"
                      />
                    </div>
                    <p className="text-[12px] leading-relaxed text-[#f4efe6]/40">
                      {ui.consent}
                    </p>
                  </div>
                )}
              </div>

              {/* Навигация */}
              <div className="mt-10 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-2 text-[14px] text-[#f4efe6]/50 transition-colors hover:text-[#f4efe6]"
                  >
                    <span aria-hidden>←</span> {ui.back}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#4E2126] py-3 pl-6 pr-2.5 text-[13px] font-medium uppercase tracking-wide text-[#f4efe6] transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                >
                  {step === TOTAL - 1 ? ui.submit : ui.next}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4E2126" strokeWidth="2.2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="booking-step flex min-h-[320px] flex-col items-center justify-center py-6 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#4E2126]">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#4E2126" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-serif text-[28px] text-[#f4efe6] lg:text-[32px]">
                {ui.successTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-[#f4efe6]/60">
                {ui.successSub}
              </p>
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers(Array(TOTAL).fill(null));
                  setText(Array(TOTAL).fill(""));
                  setName("");
                  setPhone("");
                  setComment("");
                  setDone(false);
                }}
                className="mt-8 text-[14px] text-[#f4efe6]/50 transition-colors hover:text-[#f4efe6]"
              >
                {ui.again}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
