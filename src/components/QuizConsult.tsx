"use client";
// КВИЗ «БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ» — выездной бьюти-консьерж по РФ и за границей.
// По мотивам квиза traffic-masters: слева карточка-персона (основатель ALIS) с
// репликой, справа прогресс-бар, счётчик шагов, вопрос с вариантами (клик —
// следующий шаг), финальный шаг — контакты. Палитра сайта: Burgundy + Olive + крем.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Question = { q: Loc; options: Loc[] };

const QUESTIONS: Question[] = [
  {
    q: { ru: "Какое у вас событие?", en: "What's your occasion?" },
    options: [
      { ru: "Свадьба", en: "Wedding" },
      { ru: "Съёмка / фотосессия", en: "Shoot / photoshoot" },
      { ru: "Торжество или выпускной", en: "Celebration or prom" },
      { ru: "Другое", en: "Something else" },
    ],
  },
  {
    q: { ru: "Куда нужен выезд?", en: "Where do you need us?" },
    options: [
      { ru: "По моему городу", en: "Within my city" },
      { ru: "По России", en: "Across Russia" },
      { ru: "За границу", en: "Abroad" },
      { ru: "Ещё не решили", en: "Not decided yet" },
    ],
  },
  {
    q: { ru: "Сколько человек в образе?", en: "How many people need a look?" },
    options: [
      { ru: "Только я", en: "Just me" },
      { ru: "2–3 человека", en: "2–3 people" },
      { ru: "Небольшая группа (4–8)", en: "Small group (4–8)" },
      { ru: "Большая группа", en: "Large group" },
    ],
  },
  {
    q: { ru: "Что нужно сделать?", en: "What do you need?" },
    options: [
      { ru: "Макияж", en: "Makeup" },
      { ru: "Причёску и укладку", en: "Hair styling" },
      { ru: "Макияж + причёска", en: "Makeup + hair" },
      { ru: "Полный образ под ключ", en: "Full look, turnkey" },
    ],
  },
  {
    q: { ru: "Когда мероприятие?", en: "When is the event?" },
    options: [
      { ru: "В этом месяце", en: "This month" },
      { ru: "Через 1–3 месяца", en: "In 1–3 months" },
      { ru: "Через полгода и больше", en: "In 6+ months" },
      { ru: "Дата ещё не назначена", en: "Date not set yet" },
    ],
  },
];

export default function QuizConsult() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, enn: string) => (en ? enn : ru);

  const total = QUESTIONS.length + 1; // + шаг контактов
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const isContact = step === QUESTIONS.length;
  const progress = Math.round(((step + (sent ? 1 : 0)) / total) * 100);

  const pick = (label: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = label;
      return next;
    });
  };

  const answered = !isContact && answers[step] != null;
  const next = () => {
    if (!answered) return;
    setStep((s) => Math.min(s + 1, QUESTIONS.length));
  };

  const nameOk = name.trim().length > 1;
  const phoneOk = phone.replace(/\D/g, "").length >= 6;
  const canSend = nameOk && phoneOk && agree;

  const submit = () => {
    setTouched(true);
    if (!canSend) return;
    // TODO: реальная отправка заявки (Telegram / e-mail / CRM) + answers
    setSent(true);
  };

  return (
    <section id="concierge" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        {/* Заголовок */}
        <div className="mb-10 max-w-2xl lg:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {t("бесплатная консультация", "free consultation")}
          </span>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.1] text-[#2a2320] lg:text-[46px]">
            {t("Подберём выезд", "We'll tailor your outcall")}{" "}
            <span className="text-[#3B0D1A]">{t("за 1 минуту", "in 1 minute")}</span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-[#17191a]/55 lg:text-[15px]">
            {t(
              "Ответьте на 5 вопросов — соберём формат под ваше событие и пришлём расчёт с командой и таймингом.",
              "Answer 5 questions — we'll shape the format for your event and send a plan with the team and timing."
            )}
          </p>
        </div>

        {/* Карточка квиза */}
        <div className="grid overflow-hidden rounded-[28px] border border-[#17191a]/10 bg-white shadow-[0_18px_60px_rgba(23,25,26,0.08)] md:grid-cols-[300px_1fr]">
          {/* Левая часть — персона */}
          <div className="flex flex-col gap-5 border-b border-[#17191a]/8 bg-[#faf7f2] p-7 md:border-b-0 md:border-r lg:p-9">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/tild6230-643__.jpg"
                alt="Дайана Тарзян"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[#3B0D1A]/15"
              />
              <div>
                <p className="font-serif text-[18px] text-[#2a2320]">{t("Дайана Тарзян", "Daiana Tarzyan")}</p>
                <p className="text-[12px] text-[#17191a]/55">{t("основатель ALIS", "founder of ALIS")}</p>
              </div>
            </div>
            <div className="relative rounded-2xl border border-[#3B0D1A]/12 bg-[#3B0D1A]/[0.04] p-4 text-[13px] leading-relaxed text-[#2a2320]/80">
              <span aria-hidden className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-[#3B0D1A]/12 bg-[#3B0D1A]/[0.04] md:-left-2 md:top-8 md:border-l md:border-t-0 md:border-b" />
              {t(
                "Лично подберу формат выезда и пришлю расчёт под ваше событие — с командой, таймингом и логистикой.",
                "I'll personally shape your outcall and send a plan for your event — team, timing and logistics."
              )}
            </div>
          </div>

          {/* Правая часть — квиз / контакты */}
          <div className="p-7 lg:p-10">
            {sent ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#3B0D1A]/40">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#3B0D1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="font-serif text-[26px] text-[#2a2320]">{t("Заявка принята!", "Request received!")}</h3>
                <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#17191a]/60">
                  {t("Дайана лично разберёт ответы и пришлёт расчёт под ваш выезд в ближайшее время.", "Daiana will personally review your answers and send a tailored plan shortly.")}
                </p>
              </div>
            ) : (
              <>
                {/* Верх: бейдж шага + счётчик */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#3B0D1A] px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#f4efe6]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.9 4.6L18.5 9l-3.6 3 1 4.9L12 14.8 8.1 16.9l1-4.9L5.5 9l4.6-1.4z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {isContact
                      ? t("остался только контакт", "just your contact left")
                      : `${t("шаг", "step")} ${step + 1} ${t("из", "of")} ${total}`}
                  </span>
                  <span className="text-[13px] font-medium tabular-nums text-[#17191a]/40">{step + 1} / {total}</span>
                </div>

                {/* Прогресс-бар */}
                <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-[#17191a]/8">
                  <div className="h-full rounded-full bg-[#3B0D1A] transition-[width] duration-500 ease-out" style={{ width: `${Math.round(((step + 1) / total) * 100)}%` }} />
                </div>

                {isContact ? (
                  <div className="booking-step">
                    <h3 className="font-serif text-[24px] leading-tight text-[#2a2320] lg:text-[30px]">
                      {t("Куда прислать расчёт?", "Where should we send your plan?")}
                    </h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("Ваше имя", "Your name")}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#3B0D1A] ${touched && !nameOk ? "border-[#b3261e]" : "border-[#17191a]/15"}`}
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        inputMode="tel"
                        placeholder={t("Ваш номер телефона", "Your phone number")}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#3B0D1A] ${touched && !phoneOk ? "border-[#b3261e]" : "border-[#17191a]/15"}`}
                      />
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={2}
                      placeholder={t("Комментарий (необязательно): город, дата, детали", "Comment (optional): city, date, details")}
                      className="mt-4 w-full resize-none rounded-xl border border-[#17191a]/15 bg-white px-4 py-3 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#3B0D1A]"
                    />
                    <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[13px] text-[#17191a]/70">
                      <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#3B0D1A]" />
                      <span>
                        {t("Согласен с ", "I agree to the ")}
                        <a href="/privacy" className="text-[#3B0D1A] underline underline-offset-2">{t("политикой конфиденциальности", "privacy policy")}</a>
                      </span>
                    </label>
                    {touched && !canSend && (
                      <p className="mt-2 text-[12px] text-[#b3261e]">
                        {!nameOk ? t("Укажите имя", "Enter your name") : !phoneOk ? t("Укажите телефон", "Enter your phone") : t("Необходимо согласие", "Consent is required")}
                      </p>
                    )}
                    <div className="mt-7 flex items-center justify-between gap-4">
                      <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-[14px] text-[#17191a]/50 transition-colors hover:text-[#2a2320]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {t("Назад", "Back")}
                      </button>
                      <button
                        onClick={submit}
                        className="group/btn inline-flex items-center gap-3 rounded-full bg-[#3B0D1A] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-[#f4efe6] transition-all duration-300 hover:scale-[1.02]"
                      >
                        {t("Получить расчёт", "Get my plan")}
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]/15 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={step} className="booking-step">
                    <h3 className="font-serif text-[24px] leading-tight text-[#2a2320] lg:text-[30px]">
                      {QUESTIONS[step].q[lang]}
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {QUESTIONS[step].options.map((opt) => {
                        const active = answers[step] === opt[lang];
                        return (
                          <button
                            key={opt.ru}
                            onClick={() => pick(opt[lang])}
                            className={`group flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left text-[14px] transition-all duration-200 lg:text-[15px] ${
                              active
                                ? "border-[#3B0D1A] bg-[#3B0D1A]/[0.05] text-[#2a2320]"
                                : "border-[#17191a]/12 bg-white text-[#2a2320] hover:border-[#3B0D1A]/60"
                            }`}
                          >
                            {/* Радио-кружок слева */}
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${active ? "border-[#3B0D1A] bg-[#3B0D1A] text-[#f4efe6]" : "border-[#17191a]/25 text-transparent group-hover:border-[#3B0D1A]/50"}`}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            {opt[lang]}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4">
                      {step > 0 ? (
                        <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-[14px] text-[#17191a]/50 transition-colors hover:text-[#2a2320]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {t("Назад", "Back")}
                        </button>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={next}
                        disabled={!answered}
                        className="group/btn inline-flex items-center gap-3 rounded-full bg-[#3B0D1A] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-[#f4efe6] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                      >
                        {t("Следующий вопрос", "Next question")}
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]/15 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
