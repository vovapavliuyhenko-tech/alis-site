"use client";
// СТРАНИЦА «СОТРУДНИЧЕСТВО» — выбор аудитории и заявка под неё.
// Сначала гость выбирает, кто он: «Частным лицам» (#private) или «Агентствам и бизнесу»
// (#business). Пока выбора нет — дальше ничего не показываем (только подсказка).
// После выбора под карточками плавно открывается форма заявки со своими полями и
// заголовком для выбранной категории, затем — лента партнёров. Пункты меню с
// #private / #business сразу выбирают нужную карточку.
// TODO: тексты — из коммерческого предложения; фото — пришлёт заказчица. Ч/б. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import RequestForm, { type RequestField } from "@/components/pages/RequestForm";
import Brands from "@/components/Brands";

type Loc = { ru: string; en: string };
type Kind = "private" | "business";

const AUDIENCES: { id: Kind; title: Loc; img: string }[] = [
  { id: "private", title: { ru: "Частным лицам", en: "For individuals" }, img: "/assets/alis/img_2746.jpg" },
  { id: "business", title: { ru: "Агентствам и бизнесу", en: "For agencies & business" }, img: "/assets/alis/e12b89f7-f193-44ac-9015-777b094a0bcd.jpg" },
];

// Форма под каждую категорию
const FORMS: Record<Kind, { title: Loc; text: Loc; bullets: Loc[]; fields: RequestField[] }> = {
  private: {
    title: { ru: "Заявка для частных лиц", en: "Request for individuals" },
    bullets: [
      { ru: "Макияж, причёска и образ «под ключ»", en: "Makeup, hair and a turnkey look" },
      { ru: "Приезжаем к вам — точно ко времени", en: "We come to you — right on time" },
    ],
    text: {
      ru: "Возьмём образ на себя — вы просто наслаждаетесь событием.",
      en: "We take care of the look — you simply enjoy the moment.",
    },
    fields: [
      { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
      { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
      { key: "event", label: { ru: "Повод и дата", en: "Occasion & date" }, required: false, textarea: true },
    ],
  },
  business: {
    title: { ru: "Заявка для агентств и бизнеса", en: "Request for agencies & business" },
    bullets: [
      { ru: "Стилисты на любое количество гостей", en: "Stylists for any number of guests" },
      { ru: "Выезд в любую локацию со всем оборудованием", en: "On location anywhere, fully equipped" },
    ],
    text: {
      ru: "Подготовим гостей и команду — без накладок.",
      en: "We'll get your guests and crew ready — with no hiccups.",
    },
    fields: [
      { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
      { key: "company", label: { ru: "Компания / агентство", en: "Company / agency" }, required: true },
      { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
      { key: "message", label: { ru: "Коротко о задаче", en: "About the task" }, required: false, textarea: true },
    ],
  },
};

export default function CooperationFormats() {
  const { lang } = useLang();
  const en = lang === "en";
  const [kind, setKind] = useState<Kind | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Переход из меню (#private / #business) — сразу выбираем категорию
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "private" || h === "business") setKind(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Пока категория не выбрана — прячем подвал: страница заканчивается на выборе,
  // и пролистать дальше нельзя. После выбора подвал возвращается.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("coop-locked", !kind);
    return () => root.classList.remove("coop-locked");
  }, [kind]);

  const choose = (k: Kind) => {
    setKind(k);
    // Прокручиваем к открывшейся форме, когда она успеет появиться
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  return (
    <>
      <section className="bg-white section-y">
        <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:gap-x-4">
          {AUDIENCES.map((a) => {
            const on = kind === a.id;
            const dim = kind !== null && !on;
            return (
              <button
                key={a.id}
                id={a.id}
                type="button"
                onClick={() => choose(a.id)}
                aria-pressed={on}
                className={`r-reveal group block scroll-mt-28 text-left transition-opacity duration-500 ${dim ? "opacity-50 hover:opacity-100" : ""}`}
              >
                <div className={`relative overflow-hidden rounded-[12px] bg-[#f2f1ee] ring-offset-4 transition-shadow duration-300 ${on ? "ring-1 ring-[#46131E]" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.img}
                    alt={a.title[lang]}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:blur-[6px]"
                  />
                  {/* При наведении по центру фото — «Выбрать →» (на размытом фоне) */}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-3 rounded-full border border-white/60 bg-white/15 px-7 py-3 text-[14px] text-white backdrop-blur-md lg:text-[15px]">
                      {on ? (en ? "Selected ✓" : "Выбрано ✓") : (en ? "Choose" : "Выбрать")}
                      {!on && <span aria-hidden className="inline-block animate-[alis-nudge_1.2s_ease-in-out_infinite]">→</span>}
                    </span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 px-1 pt-4 text-[#242424]">
                  <h2 className="!text-[15px] lg:!text-[16px]">{a.title[lang]}</h2>
                  <span className={`shrink-0 text-[13px] transition-colors duration-300 ${on ? "text-[#46131E]" : "text-[#17191a]/55 group-hover:text-[#17191a]"}`}>
                    {on ? (en ? "Selected ✓" : "Выбрано ✓") : (en ? "Choose" : "Выбрать")}{" "}
                    {!on && <span aria-hidden className={`inline-block ${kind ? "transition-transform duration-300 group-hover:translate-x-1" : "animate-[alis-nudge_1.2s_ease-in-out_infinite] text-[#46131E]"}`}>→</span>}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Пока ничего не выбрано — «приманка»: верхушка настоящей формы заявки в аккуратной
            рамке (обрезана ровно, без белого хвоста), слегка размыта и покачивается.
            По центру — замок с анимацией (дужка приподнимается, замок покачивается). */}
        {!kind && (
          <div className="relative mx-auto mt-14 h-[150px] w-[96%] max-w-[1760px] overflow-hidden rounded-[12px] lg:mt-16 lg:h-[170px]">
            <div aria-hidden className="pointer-events-none select-none [&_section]:!pt-0 [&_section>div]:!w-full">
              <div className="animate-[alis-float_3.6s_ease-in-out_infinite] blur-[2.5px]">
                <RequestForm
                  id="request-preview"
                  title={FORMS.private.title}
                  text={FORMS.private.text}
                  fields={FORMS.private.fields}
                  submit={{ ru: "Оставить заявку", en: "Leave a request" }}
                  success={{ ru: "", en: "" }}
                />
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/35 px-4 text-center">
              <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-[#46131E] text-white shadow-[0_12px_30px_-10px_rgba(70,19,30,0.55)] animate-[alis-lock_2.6s_ease-in-out_infinite]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" className="animate-[alis-shackle_2.6s_ease-in-out_infinite]" />
                  <rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <p className="text-[13px] text-[#17191a] lg:text-[14px]">
                {en ? "Choose who you are above — the request form will open" : "Выберите вариант выше — откроется форма заявки"}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Форма под выбранную категорию + лента партнёров — только после выбора */}
      {kind && (
        <div className="animate-[alis-open_.7s_cubic-bezier(.2,.7,.2,1)]">
          {/* Сначала лента партнёров, под ней — форма заявки */}
          <Brands />
          <div ref={formRef} className="scroll-mt-24">
          <RequestForm
            key={kind}
            id="request"
            kind={kind === "private" ? "coop_private" : "coop_business"}
            title={FORMS[kind].title}
            text={FORMS[kind].text}
            bullets={FORMS[kind].bullets}
            fields={FORMS[kind].fields}
            submit={{ ru: "Оставить заявку", en: "Leave a request" }}
            success={{ ru: "Мы получили вашу заявку и скоро свяжемся с вами.", en: "We've received your request and will get back to you soon." }}
          />
          </div>
        </div>
      )}
      <style>{`@keyframes alis-open { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
@keyframes alis-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
@keyframes alis-nudge { 0%,100% { transform: translateX(0) } 50% { transform: translateX(6px) } }
@keyframes alis-nudge-up { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes alis-lock { 0%,60%,100% { transform: rotate(0) } 66% { transform: rotate(-10deg) } 72% { transform: rotate(8deg) } 78% { transform: rotate(-5deg) } 84% { transform: rotate(3deg) } }
@keyframes alis-shackle { 0%,20%,100% { transform: translateY(0) } 35%,50% { transform: translateY(-2.5px) } }`}</style>
    </>
  );
}
