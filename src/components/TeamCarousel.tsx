"use client";
// РУКОВОДСТВО ÁLIS — контактный блок «к кому обратиться»: директор, управляющий,
// менеджер. Мастеров показываем не здесь, а в онлайн-записи. Карточки с ролью,
// коротким описанием зоны ответственности и кнопкой «Связаться». Имена и фото —
// плейсхолдеры, замените на реальные. Двуязычно (RU/EN).
import { useLang } from "@/lib/i18n";

const PHONE_SALON = "+7 988 888 77 58";
const TEL = `tel:${PHONE_SALON.replace(/[^\d+]/g, "")}`;

type Loc = { ru: string; en: string };
type Lead = { role: Loc; initial: string; about: Loc; name?: Loc };

const LEADS: Lead[] = [
  {
    role: { ru: "Директор", en: "Director" },
    initial: "Д",
    about: { ru: "Стратегия, стандарты качества и развитие ÁLIS.", en: "Strategy, quality standards and the growth of ÁLIS." },
  },
  {
    role: { ru: "Управляющий", en: "Operations manager" },
    initial: "У",
    about: { ru: "Работа салона и комфорт гостей от входа до выхода.", en: "Salon operations and guest comfort from door to door." },
  },
  {
    role: { ru: "Менеджер", en: "Client manager" },
    initial: "М",
    about: { ru: "Запись, ваши вопросы и организация визита.", en: "Bookings, your questions and visit arrangements." },
  },
];

export default function TeamCarousel() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="team" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        {/* Заголовок */}
        <div className="mb-10 max-w-2xl lg:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "Team" : "Команда"}
          </span>
          <h2 className="mt-5 font-display text-[28px] uppercase tracking-[0.06em] leading-[1.12] text-[#2a2320] lg:text-[44px]">
            {en ? "Who to reach out to" : "К кому обратиться"}{" "}
            <span className="text-[#4A4B33]">{en ? "at ÁLIS" : "в ÁLIS"}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#17191a]/60 lg:text-[16px]">
            {en
              ? "Any question — from booking to a special request — we'll help. Masters are shown right in the online booking."
              : "Любой вопрос — от записи до особого пожелания — поможем решить. Мастеров видно прямо в онлайн-записи."}
          </p>
        </div>

        {/* Карточки руководства */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {LEADS.map((l) => (
            <div
              key={l.role.ru}
              className="flex flex-col rounded-[20px] border border-[#17191a]/8 bg-white p-6 shadow-[0_10px_40px_rgba(23,25,26,0.06)] lg:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#3B0D1A] font-display text-[22px] font-semibold text-[#f4efe6]">
                  {l.initial}
                </span>
                <div>
                  <p className="font-display text-[18px] uppercase tracking-[0.04em] text-[#2a2320]">{l.role[lang]}</p>
                  {l.name && <p className="mt-0.5 text-[13px] text-[#17191a]/55">{l.name[lang]}</p>}
                </div>
              </div>
              <p className="mt-5 flex-1 text-[14px] leading-relaxed text-[#2a2320]/75">{l.about[lang]}</p>
              <a
                href={TEL}
                className="group/btn mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#3B0D1A] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-[#3B0D1A] transition-colors duration-300 hover:bg-[#3B0D1A] hover:text-[#f4efe6]"
              >
                {en ? "Get in touch" : "Связаться"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
