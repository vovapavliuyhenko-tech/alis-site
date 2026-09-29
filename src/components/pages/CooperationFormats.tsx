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
const FORMS: Record<Kind, { title: Loc; text: Loc; fields: RequestField[] }> = {
  private: {
    title: { ru: "Заявка для частных лиц", en: "Request for individuals" },
    text: {
      ru: "Боитесь, что в важный день что-то пойдёт не так? Мы возьмём образ на себя: макияж, причёска и тайминг под контролем — а вы просто наслаждаетесь событием.",
      en: "Worried something might go wrong on your big day? We take the look off your hands: makeup, hair and timing under control — you simply enjoy the moment.",
    },
    fields: [
      { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
      { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
      { key: "event", label: { ru: "Повод и дата", en: "Occasion & date" }, required: false, textarea: true },
    ],
  },
  business: {
    title: { ru: "Заявка для агентств и бизнеса", en: "Request for agencies & business" },
    text: {
      ru: "Нужно подготовить много гостей или команду к съёмке — и без накладок? Выедем командой стилистов в любую локацию и возьмём все заботы об образах на себя.",
      en: "Need to get lots of guests or a whole crew camera-ready — with no hiccups? We send a team of stylists to any location and take care of every look.",
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
                <div className={`overflow-hidden rounded-[12px] bg-[#f2f1ee] ring-offset-4 transition-shadow duration-300 ${on ? "ring-1 ring-[#46131E]" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.img}
                    alt=""
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:blur-[6px]"
                  />
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

        {/* Пока ничего не выбрано — «приманка»: настоящая форма заявки, размытая и мягко
            покачивающаяся, растворяется книзу (маска, без серых полос). Поверх — светлая
            «пилюля» с подсказкой и стрелкой вверх к карточкам. */}
        {!kind && (
          <div className="relative mt-14 lg:mt-16">
            <div
              aria-hidden
              className="pointer-events-none h-[260px] select-none overflow-hidden lg:h-[300px] [&_section]:!pt-0"
              style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 25%, transparent 95%)", maskImage: "linear-gradient(to bottom, #000 25%, transparent 95%)" }}
            >
              <div className="animate-[alis-float_3.6s_ease-in-out_infinite] blur-[7px]">
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
            <div className="absolute inset-x-0 top-[38%] flex justify-center px-4">
              <p className="flex items-center gap-3 rounded-full border border-[#17191a]/10 bg-white/85 px-6 py-3.5 text-[13px] text-[#17191a] shadow-[0_18px_40px_-18px_rgba(23,25,26,0.35)] backdrop-blur-md lg:text-[14px]">
                <span aria-hidden className="animate-[alis-nudge-up_1.4s_ease-in-out_infinite] text-[16px] text-[#46131E]">↑</span>
                {en ? "Choose who you are above — the request form will open" : "Выберите вариант выше — откроется форма заявки"}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Форма под выбранную категорию + лента партнёров — только после выбора */}
      {kind && (
        <div ref={formRef} className="scroll-mt-24 animate-[alis-open_.7s_cubic-bezier(.2,.7,.2,1)]">
          <RequestForm
            key={kind}
            id="request"
            title={FORMS[kind].title}
            text={FORMS[kind].text}
            fields={FORMS[kind].fields}
            submit={{ ru: "Оставить заявку", en: "Leave a request" }}
            success={{ ru: "Мы получили вашу заявку и скоро свяжемся с вами.", en: "We've received your request and will get back to you soon." }}
          />
          <Brands />
        </div>
      )}
      <style>{`@keyframes alis-open { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
@keyframes alis-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
@keyframes alis-nudge { 0%,100% { transform: translateX(0) } 50% { transform: translateX(6px) } }
@keyframes alis-nudge-up { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }`}</style>
    </>
  );
}
