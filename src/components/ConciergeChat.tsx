"use client";
// ОНЛАЙН-КОНСЬЕРЖ (страница «Консьерж-сервис») — минималистичный помощник по лучшим
// практикам виджетов поддержки (стартовый экран с действиями, как у Intercom; пошаговый
// сценарий с кнопками-ответами и итоговой карточкой, как в чатах банков):
//  • Главный экран: приветствие + крупные кнопки действий (заявка, стоимость, звонок,
//    мессенджер, запись в салон).
//  • Заявка — по одному вопросу за раз: повод → дата → сколько человек → имя → телефон →
//    карточка-проверка → отправка. Прогресс-полоса сверху, «печатает…» перед ответом.
// Светлый, ч/б с бордовыми акцентами. Без бэкенда: отправка — заглушка. Двуязычно.
import { useEffect, useRef, useState } from "react";
import MiniCalendar from "@/components/ui/MiniCalendar";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHONE_SERVICE = "+7 988 888 77 28";
const PHONE_RAW = PHONE_SERVICE.replace(/[^\d]/g, "");
const ADMIN_PHOTO = "/assets/tild6536-613_-2___1__4.jpg"; // плейсхолдер — фото администратора

type Loc = { ru: string; en: string };
type Msg = { from: "bot" | "user"; text: string };
type Step = "occasion" | "date" | "guests" | "name" | "phone" | "review" | "done";

const OCCASIONS: Loc[] = [
  { ru: "Свадьба", en: "Wedding" },
  { ru: "Съёмка", en: "Photo shoot" },
  { ru: "Мероприятие", en: "Event" },
  { ru: "Другое", en: "Other" },
];
const GUESTS: Loc[] = [
  { ru: "Только я", en: "Just me" },
  { ru: "2–3 человека", en: "2–3 people" },
  { ru: "4 и больше", en: "4 or more" },
];
const ORDER: Step[] = ["occasion", "date", "guests", "name", "phone", "review"];

function formatPhone(v: string): string {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export default function ConciergeChat() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<"home" | "flow">("home");

  // Лаунчер появляется со второго блока (после маркера #hero-end)
  const [passedHero, setPassedHero] = useState(false);
  useEffect(() => {
    const check = () => {
      const s = document.getElementById("hero-end");
      setPassedHero(!s || s.getBoundingClientRect().top <= window.innerHeight * 0.5);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  // Пошаговая заявка
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("occasion");
  const [typing, setTyping] = useState(false);
  const [data, setData] = useState({ occasion: "", date: "", guests: "", name: "", phone: "" });
  const [input, setInput] = useState("");
  const [err, setErr] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const QUESTIONS: Record<Step, Loc> = {
    occasion: { ru: "Какой у вас повод?", en: "What's the occasion?" },
    date: { ru: "Когда событие? Укажите дату.", en: "When is the event? Pick a date." },
    guests: { ru: "Сколько человек нужно подготовить?", en: "How many people should we get ready?" },
    name: { ru: "Как к вам обращаться?", en: "What's your name?" },
    phone: { ru: "Оставьте телефон — перезвоним и назовём стоимость.", en: "Leave your phone — we'll call back with the price." },
    review: { ru: "Проверьте, всё верно?", en: "Please check that everything is correct." },
    done: { ru: "", en: "" },
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, step, screen]);

  // Бот «печатает», затем задаёт вопрос
  const botSay = (text: string, next?: Step) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text }]);
      if (next) setStep(next);
    }, 650);
  };

  const startFlow = () => {
    setScreen("flow");
    setMsgs([]);
    setData({ occasion: "", date: "", guests: "", name: "", phone: "" });
    setStep("occasion");
    botSay(QUESTIONS.occasion[lang]);
  };

  const answer = (field: keyof typeof data, value: string, shown?: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setMsgs((m) => [...m, { from: "user", text: shown ?? value }]);
    setInput("");
    setErr(false);
    const next = ORDER[ORDER.indexOf(step) + 1];
    botSay(QUESTIONS[next][lang], next);
  };

  const submitText = () => {
    const v = input.trim();
    if (step === "name") {
      if (!v) { setErr(true); return; }
      answer("name", v);
    } else if (step === "phone") {
      if (v.replace(/\D/g, "").length < 11) { setErr(true); return; }
      answer("phone", v);
    }
  };

  const confirm = () => {
    void sendLead({
      kind: "chat",
      name: data.name,
      phone: data.phone,
      details: { Повод: data.occasion, Дата: data.date, Человек: data.guests, Источник: "Онлайн-консьерж" },
    });
    setMsgs((m) => [...m, { from: "user", text: t("Всё верно, отправить", "All correct, send") }]);
    botSay(
      t(
        `Спасибо, ${data.name}! Заявка принята — свяжемся с вами в ближайшее время и назовём стоимость.`,
        `Thank you, ${data.name}! Request received — we'll be in touch shortly with the price.`,
      ),
      "done",
    );
  };

  const progress = Math.min(1, ORDER.indexOf(step === "done" ? "review" : step) / (ORDER.length - 1));

  const ACTIONS = [
    { icon: "✦", title: t("Оставить заявку на выезд", "Request an on-location visit"), sub: t("5 коротких вопросов", "5 short questions"), onClick: startFlow },
    { icon: "☏", title: t("Позвонить в консьерж-сервис", "Call the concierge service"), sub: PHONE_SERVICE, href: `tel:+${PHONE_RAW}` },
    { icon: "✉", title: t("Написать нам", "Message us"), sub: t("в мессенджере", "in a messenger"), href: `https://wa.me/${PHONE_RAW}` },
    { icon: "◷", title: t("Записаться в салон", "Book at the salon"), sub: t("онлайн-запись", "online booking"), href: YCLIENTS },
  ];

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="pointer-events-auto flex h-[min(620px,80vh)] w-[calc(100vw-2rem)] max-w-[390px] animate-[alis-chat-in_.35s_cubic-bezier(.2,.7,.2,1)] flex-col overflow-hidden rounded-[16px] border border-[#17191a]/10 bg-white shadow-[0_30px_80px_-20px_rgba(23,25,26,0.35)]">
          {/* Шапка */}
          <div className="flex items-center gap-3 px-5 pb-4 pt-5">
            {screen === "flow" && (
              <button onClick={() => setScreen("home")} aria-label={t("Назад", "Back")} className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full text-[#17191a]/60 transition-colors hover:bg-[#17191a]/5 hover:text-[#17191a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
            <span className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ADMIN_PHOTO} alt={lang === "en" ? "ÁLIS BEAUTY concierge" : "Консьерж ÁLIS BEAUTY"} className="h-10 w-10 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#4ade80]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] leading-tight text-[#17191a]">{t("Дайана", "Diana")}</p>
              <p className="text-[11px] text-[#17191a]/45">{t("Консьерж ÁLIS BEAUTY · онлайн", "ÁLIS BEAUTY concierge · online")}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t("Свернуть", "Minimise")} className="flex h-8 w-8 items-center justify-center rounded-full text-[#17191a]/50 transition-colors hover:bg-[#17191a]/5 hover:text-[#17191a]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* Прогресс заявки */}
          {screen === "flow" && (
            <div className="mx-5 h-[3px] overflow-hidden rounded-full bg-[#17191a]/8">
              <div className="h-full rounded-full bg-[#46131E] transition-[width] duration-500" style={{ width: `${Math.max(8, progress * 100)}%` }} />
            </div>
          )}

          {/* Тело */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-4">
            {screen === "home" ? (
              <div>
                <p className="text-[22px] font-light leading-[1.25] text-[#17191a]">{t("Здравствуйте!", "Hello!")}<br />{t("Чем вам помочь?", "How can we help?")}</p>
                <div className="mt-6 space-y-2">
                  {ACTIONS.map((a) => {
                    const inner = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46131E]/[0.07] text-[15px] text-[#46131E]">{a.icon}</span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block text-[14px] text-[#17191a]">{a.title}</span>
                          <span className="block text-[12px] text-[#17191a]/45">{a.sub}</span>
                        </span>
                        <span aria-hidden className="text-[#17191a]/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#46131E]">→</span>
                      </>
                    );
                    const cls = "group flex w-full items-center gap-3 rounded-[12px] border border-[#17191a]/10 px-4 py-3 transition-colors hover:border-[#46131E]/40 hover:bg-[#46131E]/[0.03]";
                    return a.onClick ? (
                      <button key={a.title} type="button" onClick={a.onClick} className={cls}>{inner}</button>
                    ) : (
                      <a key={a.title} href={a.href} target={a.href!.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{inner}</a>
                    );
                  })}
                </div>
                <p className="mt-5 text-[12px] leading-[1.5] text-[#17191a]/45">{t("Без перерывов и выходных, 9:00–21:00", "No breaks, open daily, 9:00–21:00")}</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex animate-[alis-msg_.3s_ease-out] ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-[13.5px] leading-[1.45] ${m.from === "user" ? "rounded-br-[4px] bg-[#46131E] text-white" : "rounded-bl-[4px] bg-[#f4f3f1] text-[#17191a]"}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-[14px] rounded-bl-[4px] bg-[#f4f3f1] px-3.5 py-3">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-[alis-dot_1s_ease-in-out_infinite] rounded-full bg-[#17191a]/40" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Карточка-проверка */}
                {!typing && step === "review" && (
                  <div className="animate-[alis-msg_.3s_ease-out] rounded-[12px] border border-[#17191a]/10 p-4 text-[13px]">
                    {[
                      [t("Повод", "Occasion"), data.occasion],
                      [t("Дата", "Date"), data.date],
                      [t("Человек", "People"), data.guests],
                      [t("Имя", "Name"), data.name],
                      [t("Телефон", "Phone"), data.phone],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-[#17191a]/6 py-1.5 last:border-0">
                        <span className="text-[#17191a]/45">{k}</span>
                        <span className="text-right text-[#17191a]">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {!typing && step === "done" && (
                  <div className="flex flex-col items-center gap-3 pt-4 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#46131E] text-[18px] text-white">✓</span>
                    <a href={YCLIENTS} target="_blank" rel="noopener noreferrer" className="border-b border-[#17191a]/30 pb-0.5 text-[13px] text-[#17191a] hover:border-[#46131E] hover:text-[#46131E]">
                      {t("А пока — записаться в салон онлайн", "Meanwhile — book at the salon online")}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Низ: кнопки-ответы или поле ввода — в зависимости от шага */}
          {screen === "flow" && !typing && step !== "done" && (
            <div className="border-t border-[#17191a]/8 px-4 py-3">
              {step === "occasion" && (
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => (
                    <button key={o.ru} onClick={() => answer("occasion", o[lang])} className="rounded-full border border-[#17191a]/15 px-3.5 py-2 text-[13px] text-[#17191a] transition-colors hover:border-[#46131E] hover:bg-[#46131E] hover:text-white">{o[lang]}</button>
                  ))}
                </div>
              )}
              {step === "date" && (
                // Календарь в стиле сайта: клик по дню сразу отправляет ответ
                <MiniCalendar
                  lang={lang}
                  value={input}
                  onPick={(d) => answer("date", new Date(d + "T12:00:00").toLocaleDateString(en ? "en-GB" : "ru-RU", { day: "numeric", month: "long", year: "numeric" }))}
                />
              )}
              {step === "date" && (
                <button onClick={() => answer("date", t("Пока не знаю", "Not sure yet"))} className="mt-2 text-[12px] text-[#17191a]/50 hover:text-[#46131E]">{t("Дата пока не известна", "Date not known yet")}</button>
              )}
              {step === "guests" && (
                <div className="flex flex-wrap gap-2">
                  {GUESTS.map((g) => (
                    <button key={g.ru} onClick={() => answer("guests", g[lang])} className="rounded-full border border-[#17191a]/15 px-3.5 py-2 text-[13px] text-[#17191a] transition-colors hover:border-[#46131E] hover:bg-[#46131E] hover:text-white">{g[lang]}</button>
                  ))}
                </div>
              )}
              {(step === "name" || step === "phone") && (
                <form onSubmit={(e) => { e.preventDefault(); submitText(); }} className="flex gap-2">
                  <input
                    autoFocus
                    value={input}
                    inputMode={step === "phone" ? "tel" : undefined}
                    autoComplete={step === "phone" ? "tel" : "given-name"}
                    placeholder={step === "phone" ? "+7 (___) ___-__-__" : t("Ваше имя", "Your name")}
                    onFocus={() => { if (step === "phone" && !input) setInput("+7 "); }}
                    onChange={(e) => { setInput(step === "phone" ? formatPhone(e.target.value) : e.target.value); setErr(false); }}
                    className={`flex-1 rounded-full border bg-[#f4f3f1] px-4 py-2.5 text-[14px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 ${err ? "border-[#c0392b]" : "border-transparent"}`}
                  />
                  <button type="submit" aria-label={t("Далее", "Next")} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#46131E] text-white">→</button>
                </form>
              )}
              {step === "review" && (
                <div className="space-y-2">
                  <button onClick={confirm} className="alis-pulse-wine flex w-full items-center justify-center rounded-[12px] border border-[#46131E] bg-[#46131E] py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#46131E]">
                    {t("Отправить заявку", "Send request")}
                  </button>
                  <button onClick={startFlow} className="w-full text-center text-[12px] text-[#17191a]/50 hover:text-[#46131E]">{t("Заполнить заново", "Start over")}</button>
                  <p className="text-center text-[10.5px] text-[#17191a]/40">{t("Отправляя, вы соглашаетесь с обработкой персональных данных", "By sending, you agree to the processing of personal data")}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Лаунчер */}
      {open ? (
        <button onClick={() => setOpen(false)} aria-label={t("Закрыть чат", "Close chat")} className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#46131E] text-white shadow-[0_12px_30px_rgba(70,19,30,0.4)] transition-transform hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      ) : passedHero ? (
        <button onClick={() => { setOpen(true); setScreen("home"); }} aria-label={t("Открыть чат", "Open chat")} className="pointer-events-auto group flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-[13px] text-[#17191a] shadow-[0_14px_40px_-10px_rgba(23,25,26,0.35)] ring-1 ring-[#17191a]/8 transition-transform hover:-translate-y-0.5">
          <span className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ADMIN_PHOTO} alt={lang === "en" ? "ÁLIS BEAUTY concierge" : "Консьерж ÁLIS BEAUTY"} className="h-10 w-10 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#4ade80]" />
          </span>
          <span className="text-left leading-tight">
            <span className="block">{t("Консьерж онлайн", "Concierge online")}</span>
            <span className="block text-[11px] text-[#17191a]/45">{t("Ответим на вопросы", "We'll answer your questions")}</span>
          </span>
        </button>
      ) : null}

      <style>{`
        @keyframes alis-chat-in { from { opacity: 0; transform: translateY(12px) scale(.98) } to { opacity: 1; transform: none } }
        @keyframes alis-msg { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        @keyframes alis-dot { 0%, 80%, 100% { opacity: .3; transform: translateY(0) } 40% { opacity: 1; transform: translateY(-3px) } }
      `}</style>
    </div>
  );
}
