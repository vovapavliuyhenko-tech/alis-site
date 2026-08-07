"use client";
// ЗАПИСЬ — квиз-форма (как traffic-masters.ru), СВЕТЛАЯ тема на статичном фоне.
// Фон-фото зафиксировано (background-attachment: fixed) — не двигается при скролле,
// как блок «стоимость» на stretchfitdasha.ru. Карточка — кремовое стекло, тёмный текст.
import { useState } from "react";

type Question = { q: string; note: string; opts: string[] };

const QUESTIONS: Question[] = [
  {
    q: "Какой образ вас интересует?",
    note: "С этого начинаю подбор — под каждый повод свои мастера и материалы.",
    opts: [
      "Полный образ",
      "Свадебный образ",
      "Макияж и укладка",
      "Выезд мастеров",
      "Сопровождение",
      "Другое",
    ],
  },
  {
    q: "На какое событие?",
    note: "Событие задаёт стойкость макияжа и характер образа.",
    opts: [
      "Свадьба",
      "Фотосъёмка",
      "Выпускной",
      "Вечернее мероприятие",
      "Повседневно",
      "Другое",
    ],
  },
  {
    q: "Где вам удобно?",
    note: "Работаем в студии или приедем к вам — как комфортнее.",
    opts: ["В студии", "Выезд к вам", "Ещё не решили"],
  },
  {
    q: "Когда планируете?",
    note: "Подскажите сроки — подберу свободное время мастеров.",
    opts: [
      "На этой неделе",
      "В этом месяце",
      "Через 1–2 месяца",
      "Пока выбираю дату",
    ],
  },
];

const CONTACT_NOTE = "Оставьте контакты — свяжусь, чтобы подтвердить запись.";
const TOTAL = QUESTIONS.length + 1; // 4 вопроса + контакты

export default function Booking() {
  const [step, setStep] = useState(0); // 0..3 — вопросы, 4 — контакты, 5 — успех
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isContact = step === QUESTIONS.length;
  const isSuccess = step === TOTAL;
  const note = isContact ? CONTACT_NOTE : QUESTIONS[step]?.note;

  const pick = (opt: string) => {
    setAnswers((a) => {
      const next = [...a];
      next[step] = opt;
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
      // console.log({ answers, name, phone });
      setStep(TOTAL);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <section
      id="booking"
      className="relative scroll-mt-24 bg-fixed bg-cover bg-center py-24 text-[#2a2622] lg:py-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(244,239,230,0.86), rgba(244,239,230,0.86)), url(/assets/tild6230-643__.jpg)",
      }}
    >
      <div className="relative mx-auto w-[94%] max-w-[1080px]">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <span className="text-[13px] lowercase tracking-wide text-[#2a2622]/50">
            (запись)
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#2a2622] lg:text-[48px]">
            Подберём ваш образ за пару минут
          </h2>
        </div>

        {/* Карточка-квиз — кремовое стекло */}
        <div className="overflow-hidden rounded-[26px] border border-[#2a2622]/10 bg-white/55 shadow-[0_20px_60px_rgba(42,38,34,0.15)] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[300px_1fr]">
            {/* Левая колонка — персона */}
            <div className="flex flex-col gap-6 border-b border-[#2a2622]/10 p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/tild3236-393__.jpg"
                  alt="Дайана Тарзян"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-[16px] font-medium text-[#2a2622]">
                    Дайана Тарзян
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#2a2622]/50">
                    основатель ALIS
                  </p>
                </div>
              </div>

              {/* Реплика */}
              {!isSuccess && (
                <div className="relative rounded-2xl border border-[#2a2622]/10 bg-white/60 p-4 backdrop-blur-md">
                  <span className="absolute -top-1.5 left-8 h-3.5 w-3.5 rotate-45 border-l border-t border-[#2a2622]/10 bg-white/60" />
                  <p key={step} className="booking-step text-[14px] leading-relaxed text-[#2a2622]/75">
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
                    <span className="rounded-full border border-[#2a2622]/15 bg-[#2a2622]/[0.06] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wide text-[#2a2622]/80">
                      Шаг {step + 1} из {TOTAL}
                    </span>
                    <span className="text-[13px] text-[#2a2622]/40">
                      {step + 1} / {TOTAL}
                    </span>
                  </div>
                  <div className="mb-9 h-1.5 w-full overflow-hidden rounded-full bg-[#2a2622]/10">
                    <div
                      className="h-full rounded-full bg-[#2a2622] transition-all duration-500 ease-out"
                      style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                    />
                  </div>

                  {/* Тело шага */}
                  <div key={step} className="booking-step">
                    {!isContact ? (
                      <>
                        <h3 className="mb-7 font-serif text-[26px] leading-tight text-[#2a2622] lg:text-[32px]">
                          {QUESTIONS[step].q}
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {QUESTIONS[step].opts.map((opt) => {
                            const selected = answers[step] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => pick(opt)}
                                className={`flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left text-[15px] transition-all ${
                                  selected
                                    ? "border-[#2a2622] bg-[#2a2622] text-white"
                                    : "border-[#2a2622]/15 bg-white/50 text-[#2a2622]/85 hover:border-[#2a2622]/40 hover:bg-white/70"
                                }`}
                              >
                                <span
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                    selected
                                      ? "border-white bg-white"
                                      : "border-[#2a2622]/40"
                                  }`}
                                >
                                  {selected && (
                                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                                      <path
                                        d="M5 12.5l4.5 4.5L19 7.5"
                                        stroke="#2a2622"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="mb-7 font-serif text-[26px] leading-tight text-[#2a2622] lg:text-[32px]">
                          Как с вами связаться?
                        </h3>
                        <label className="mb-3 block text-[13px] tracking-wide text-[#2a2622]/50">
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Имя"
                          className="mb-7 w-full border-b border-[#2a2622]/25 bg-transparent pb-3 text-[16px] text-[#2a2622] outline-none transition-colors placeholder:text-[#2a2622]/30 focus:border-[#2a2622]"
                        />
                        <label className="mb-3 block text-[13px] tracking-wide text-[#2a2622]/50">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 ___ ___-__-__"
                          className="w-full border-b border-[#2a2622]/25 bg-transparent pb-3 text-[16px] text-[#2a2622] outline-none transition-colors placeholder:text-[#2a2622]/30 focus:border-[#2a2622]"
                        />
                        <p className="mt-7 text-[12px] leading-relaxed text-[#2a2622]/40">
                          Оставляя заявку, вы соглашаетесь на обработку
                          персональных данных.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Навигация */}
                  <div className="mt-10 flex items-center justify-between">
                    {step > 0 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="inline-flex items-center gap-2 text-[14px] text-[#2a2622]/50 transition-colors hover:text-[#2a2622]"
                      >
                        <span aria-hidden>←</span> Назад
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={goNext}
                      disabled={!canNext}
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#2a2622] py-3 pl-6 pr-2.5 text-[13px] font-medium uppercase tracking-wide text-white transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                    >
                      {isContact ? "Записаться" : "Следующий вопрос"}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2a2622" strokeWidth="2.2">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                /* Экран успеха */
                <div className="booking-step flex min-h-[320px] flex-col items-center justify-center py-6 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#2a2622]/30">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        stroke="#2a2622"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-[28px] text-[#2a2622] lg:text-[32px]">
                    Спасибо, заявка принята
                  </h3>
                  <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-[#2a2622]/60">
                    Дайана свяжется с вами в ближайшее время
                    {answers[0] ? `, чтобы подтвердить запись на «${answers[0]}»` : ""}.
                  </p>
                  <button
                    onClick={() => {
                      setStep(0);
                      setAnswers(Array(QUESTIONS.length).fill(null));
                      setName("");
                      setPhone("");
                    }}
                    className="mt-8 text-[14px] text-[#2a2622]/50 transition-colors hover:text-[#2a2622]"
                  >
                    Оставить ещё одну заявку
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
