"use client";
// ОНЛАЙН-КОНСЬЕРЖ — плавающий чат-помощник. Встречает гостя, отвечает на частые
// вопросы (услуги, цены, адрес/часы, выезд, контакты) готовыми ответами и ведёт
// к записи в YClients. Без бэкенда: сценарий на быстрых ответах. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHONE_SALON = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";

type Loc = { ru: string; en: string };
type Action = { label: Loc; href: string };
type Msg = { from: "bot" | "user"; text: string; actions?: Action[] };
type Topic = { chip: Loc; answer: Loc; actions?: Action[] };

const TOPICS: Topic[] = [
  {
    chip: { ru: "Услуги", en: "Services" },
    answer: {
      ru: "Делаем маникюр, педикюр, коррекцию бровей, макияж, окрашивание, укладки и стрижки. А ещё — выездной премиум-сервис для мероприятий.",
      en: "Manicure, pedicure, brow shaping, makeup, hair colouring, styling and haircuts. Plus a premium on-location service for events.",
    },
    actions: [{ label: { ru: "Записаться онлайн →", en: "Book online →" }, href: YCLIENTS }],
  },
  {
    chip: { ru: "Цены", en: "Prices" },
    answer: {
      ru: "Актуальные цены на все услуги видно прямо в онлайн-записи — там же удобно выбрать мастера и время. А на первое посещение действует скидка −10%.",
      en: "Up-to-date prices for every service are right in the online booking — pick a master and time there too. And your first visit is −10%.",
    },
    actions: [{ label: { ru: "Смотреть цены и записаться →", en: "See prices & book →" }, href: YCLIENTS }],
  },
  {
    chip: { ru: "Адрес и часы", en: "Address & hours" },
    answer: {
      ru: "Мы в Новороссийске, ул. Пархоменко, 53. Работаем без выходных с 9:00 до 21:00.",
      en: "We're in Novorossiysk, Parkhomenko St., 53. Open daily 9:00–21:00.",
    },
    actions: [{ label: { ru: "Открыть на карте →", en: "Open on map →" }, href: MAP_URL }],
  },
  {
    chip: { ru: "Выездной сервис", en: "On-location" },
    answer: {
      ru: "Выезжаем на мероприятия премиум-форматом: команда мастеров, тайминг и образ под ключ. Расскажите о событии — подберём формат.",
      en: "We serve events in a premium format: a team of masters, timing and a turnkey look. Tell us about the event — we'll tailor it.",
    },
    actions: [{ label: { ru: "Позвонить в сервис", en: "Call the service" }, href: `tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}` }],
  },
  {
    chip: { ru: "Записаться", en: "Book" },
    answer: {
      ru: "Записаться удобнее всего онлайн — выбираете услугу, мастера и время за пару минут.",
      en: "The easiest way to book is online — choose a service, master and time in a couple of minutes.",
    },
    actions: [{ label: { ru: "Перейти к записи →", en: "Go to booking →" }, href: YCLIENTS }],
  },
  {
    chip: { ru: "Контакты", en: "Contacts" },
    answer: {
      ru: `Салон: ${PHONE_SALON}. Выездной сервис: ${PHONE_SERVICE}. Пишите и звоните — поможем с любым вопросом.`,
      en: `Salon: ${PHONE_SALON}. On-location service: ${PHONE_SERVICE}. Call or message us — we'll help with anything.`,
    },
    actions: [{ label: { ru: "Позвонить в салон", en: "Call the salon" }, href: `tel:${PHONE_SALON.replace(/[^\d+]/g, "")}` }],
  },
];

export default function ConciergeChat() {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const greeting: Msg = {
    from: "bot",
    text: en
      ? "Hi! I'm the ÁLIS concierge. What can I help you with?"
      : "Здравствуйте! Я консьерж ÁLIS. Чем могу помочь?",
  };
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, open]);

  // Сброс приветствия при смене языка
  useEffect(() => {
    setMsgs([greeting]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const ask = (topic: Topic) => {
    setMsgs((m) => [
      ...m,
      { from: "user", text: topic.chip[lang] },
      { from: "bot", text: topic.answer[lang], actions: topic.actions },
    ]);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Панель чата */}
      {open && (
        <div className="pointer-events-auto flex h-[70vh] max-h-[520px] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-[22px] border border-[#17191a]/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
          {/* Шапка */}
          <div className="flex items-center gap-3 bg-[#3B0D1A] px-5 py-4 text-[#f4efe6]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4efe6]/15 font-display text-[15px] font-semibold tracking-[0.08em]">Á</span>
            <div className="flex-1">
              <p className="text-[14px] font-medium leading-tight">{en ? "ÁLIS concierge" : "Консьерж ÁLIS"}</p>
              <p className="text-[11px] text-[#f4efe6]/60">{en ? "Online · replies instantly" : "Онлайн · отвечает сразу"}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={en ? "Close" : "Закрыть"} className="text-[#f4efe6]/70 transition-colors hover:text-[#f4efe6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* Сообщения */}
          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-[#faf7f2] px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${m.from === "user" ? "bg-[#3B0D1A] text-[#f4efe6]" : "border border-[#17191a]/8 bg-white text-[#2a2320]"}`}>
                  <p>{m.text}</p>
                  {m.actions?.map((a) => (
                    <a
                      key={a.href}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#4A4B33] px-3.5 py-1.5 text-[12px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
                    >
                      {a.label[lang]}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Быстрые ответы */}
          <div className="flex flex-wrap gap-2 border-t border-[#17191a]/8 bg-white px-4 py-3">
            {TOPICS.map((tp) => (
              <button
                key={tp.chip.ru}
                onClick={() => ask(tp)}
                className="rounded-full border border-[#3B0D1A]/25 px-3 py-1.5 text-[12px] text-[#3B0D1A] transition-colors hover:bg-[#3B0D1A] hover:text-[#f4efe6]"
              >
                {tp.chip[lang]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Плавающая кнопка */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={en ? "Open chat" : "Открыть чат"}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3B0D1A] text-[#f4efe6] shadow-[0_10px_30px_rgba(59,13,26,0.4)] transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </button>
    </div>
  );
}
