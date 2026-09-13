"use client";
// ОНЛАЙН-КОНСЬЕРЖ — плавающий чат-помощник (по мотивам giveasy/Jivo): шапка с
// аватаром администратора и статусом «онлайн», приветствие, форма быстрой заявки
// (имя + телефон), быстрые ответы на частые вопросы и поле для сообщения. Без
// бэкенда: сценарий на заглушках. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const PHONE_SALON = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const ADMIN_PHOTO = "/assets/tild6536-613_-2___1__4.jpg"; // плейсхолдер — фото администратора

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
      ru: "Актуальные цены видно прямо в онлайн-записи — там же удобно выбрать мастера и время. А на первое посещение действует скидка −10%.",
      en: "Up-to-date prices are right in the online booking — pick a master and time there too. And your first visit is −10%.",
    },
    actions: [{ label: { ru: "Смотреть цены и записаться →", en: "See prices & book →" }, href: YCLIENTS }],
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
    chip: { ru: "Адрес и часы", en: "Address & hours" },
    answer: {
      ru: "Мы в Новороссийске, ул. Пархоменко, 53. Работаем без выходных с 9:00 до 21:00.",
      en: "We're in Novorossiysk, Parkhomenko St., 53. Open daily 9:00–21:00.",
    },
    actions: [{ label: { ru: "Открыть на карте →", en: "Open on map →" }, href: MAP_URL }],
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
  const greeting = (): Msg => ({
    from: "bot",
    text: en
      ? "Hello! I'm Diana, your ÁLIS concierge. Leave your name and phone — I'll get back to you fast, or ask me anything below."
      : "Здравствуйте! Я Дайана, консьерж ÁLIS. Оставьте имя и телефон — отвечу быстро. Или спросите меня о чём угодно ниже.",
  });
  const [msgs, setMsgs] = useState<Msg[]>([greeting()]);

  // Быстрая заявка
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formErr, setFormErr] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Поле сообщения
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, open, formSent]);

  useEffect(() => {
    setMsgs([greeting()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const ask = (topic: Topic) => {
    setMsgs((m) => [
      ...m,
      { from: "user", text: topic.chip[lang] },
      { from: "bot", text: topic.answer[lang], actions: topic.actions },
    ]);
  };

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [
      ...m,
      { from: "user", text },
      {
        from: "bot",
        text: t(
          "Спасибо за сообщение! Оставьте телефон в форме выше — перезвоню, или запишитесь онлайн.",
          "Thanks for your message! Leave your phone above and I'll call back, or book online.",
        ),
        actions: [{ label: { ru: "Записаться онлайн →", en: "Book online →" }, href: YCLIENTS }],
      },
    ]);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 11) {
      setFormErr(true);
      return;
    }
    setFormErr(false);
    setFormSent(true);
    setMsgs((m) => [
      ...m,
      { from: "user", text: `${name}, ${phone}` },
      {
        from: "bot",
        text: t(
          `Спасибо, ${name}! Приняла заявку — свяжусь с вами в ближайшее время. А пока можно записаться онлайн.`,
          `Thank you, ${name}! Got your request — I'll be in touch shortly. Meanwhile you can book online.`,
        ),
        actions: [{ label: { ru: "Записаться онлайн →", en: "Book online →" }, href: YCLIENTS }],
      },
    ]);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="pointer-events-auto flex h-[76vh] max-h-[600px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-[24px] border border-[#17191a]/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          {/* Шапка с аватаром администратора */}
          <div className="flex items-center gap-3 bg-[#6E7248] px-5 py-4 text-[#f4efe6]">
            <span className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ADMIN_PHOTO} alt="" className="h-11 w-11 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#6E7248] bg-[#4ade80]" />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-medium leading-tight">{t("Дайана", "Diana")}</p>
              <p className="text-[11px] text-[#f4efe6]/65">{t("Консьерж ÁLIS · онлайн", "ÁLIS concierge · online")}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t("Свернуть", "Close")} className="text-[#f4efe6]/70 transition-colors hover:text-[#f4efe6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* Сообщения */}
          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-[#faf7f2] px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${m.from === "user" ? "bg-[#6E7248] text-[#f4efe6]" : "border border-[#17191a]/8 bg-white text-[#2a2320]"}`}>
                  <p>{m.text}</p>
                  {m.actions?.map((a) => (
                    <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#6E7248] px-3.5 py-1.5 text-[12px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]">
                      {a.label[lang]}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Форма быстрой заявки */}
            {!formSent && (
              <form onSubmit={submitLead} className="rounded-2xl border border-[#6E7248]/20 bg-white p-4 shadow-sm">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#6E7248]">{t("Быстрая заявка", "Quick request")}</p>
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (formErr) setFormErr(false); }}
                  placeholder={t("Ваше имя", "Your name")}
                  className={`mt-3 w-full rounded-xl border bg-[#faf7f2] px-4 py-2.5 text-[14px] text-[#2a2320] outline-none transition-colors placeholder:text-[#2a2320]/40 focus:border-[#6E7248] ${formErr && !name.trim() ? "border-[#e7a0a0]" : "border-transparent"}`}
                />
                <input
                  inputMode="tel"
                  value={phone}
                  onFocus={() => { if (!phone) setPhone("+7 "); }}
                  onChange={(e) => { setPhone(formatPhone(e.target.value)); if (formErr) setFormErr(false); }}
                  placeholder="+7 (___) ___-__-__"
                  className={`mt-2 w-full rounded-xl border bg-[#faf7f2] px-4 py-2.5 text-[14px] text-[#2a2320] outline-none transition-colors placeholder:text-[#2a2320]/40 focus:border-[#6E7248] ${formErr && phone.replace(/\D/g, "").length < 11 ? "border-[#e7a0a0]" : "border-transparent"}`}
                />
                <button type="submit" className="mt-3 w-full rounded-xl bg-[#6E7248] py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] text-[#f4efe6] transition-colors hover:bg-[#5b5e3a]">
                  {t("Отправить", "Send")}
                </button>
              </form>
            )}
          </div>

          {/* Быстрые ответы */}
          <div className="flex flex-wrap gap-2 border-t border-[#17191a]/8 bg-white px-4 pt-3">
            {TOPICS.map((tp) => (
              <button key={tp.chip.ru} onClick={() => ask(tp)} className="rounded-full border border-[#6E7248]/25 px-3 py-1.5 text-[12px] text-[#6E7248] transition-colors hover:bg-[#6E7248] hover:text-[#f4efe6]">
                {tp.chip[lang]}
              </button>
            ))}
          </div>

          {/* Поле сообщения */}
          <div className="flex items-center gap-2 border-t border-[#17191a]/8 bg-white px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMsg(); }}
              placeholder={t("Введите сообщение", "Type a message")}
              className="flex-1 rounded-full bg-[#faf7f2] px-4 py-2.5 text-[14px] text-[#2a2320] outline-none placeholder:text-[#2a2320]/40"
            />
            <button onClick={sendMsg} aria-label={t("Отправить", "Send")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6E7248] text-[#f4efe6] transition-transform hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Плавающая кнопка */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("Открыть чат", "Open chat")}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#6E7248] text-[#f4efe6] shadow-[0_10px_30px_rgba(59,13,26,0.4)] transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#4ade80]" />
          </>
        )}
      </button>
    </div>
  );
}
