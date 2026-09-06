"use client";
// БЛОК ВАКАНСИЙ (страница «Команда») — editorial «оглавление журнала» по мотивам
// топовых Tilda-портфолио: крупные строки-вакансии с номерами; при наведении на
// строку сбоку плавно всплывает фото роли. Клик ведёт к форме ниже. Тексты ролей
// — плейсхолдеры до присланного списка. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Vacancy = { role: Loc; desc: Loc; schedule: Loc; img: string };

// TODO: заменить на реальный список вакансий, когда пришлёт владелец.
const VACANCIES: Vacancy[] = [
  {
    role: { ru: "Парикмахер-колорист", en: "Hair colourist" },
    desc: { ru: "Сложное окрашивание, стрижки, уход", en: "Complex colour, cuts, care" },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
    img: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    role: { ru: "Мастер маникюра и педикюра", en: "Manicure & pedicure master" },
    desc: { ru: "Гигиена, покрытие, дизайн", en: "Hygiene, coating, design" },
    schedule: { ru: "график гибкий", en: "flexible schedule" },
    img: "/assets/tild3638-373_-2___1__3.jpg",
  },
  {
    role: { ru: "Бровист / лашмейкер", en: "Brow & lash artist" },
    desc: { ru: "Брови, ресницы, окрашивание", en: "Brows, lashes, tinting" },
    schedule: { ru: "частичная / полная", en: "part / full time" },
    img: "/assets/tild3236-393__.jpg",
  },
  {
    role: { ru: "Администратор салона", en: "Salon administrator" },
    desc: { ru: "Встреча гостей, запись, атмосфера", en: "Greeting guests, booking, atmosphere" },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
    img: "/assets/tild6230-643__.jpg",
  },
];

export default function Vacancies() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="vacancies" className="scroll-mt-24 bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "vacancies" : "вакансии"}
          </span>
          <h2 className="mt-5 font-display text-[28px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[42px]">
            {en ? "Grow with ÁLIS" : "Расти вместе с ÁLIS"}
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-[#2a2320]/70 lg:text-[15px]">
            {en
              ? "We're building a team that loves its craft. Hover a role — and tell us about yourself in the form below."
              : "Мы собираем команду, которая любит своё дело. Наведитесь на роль — и расскажите о себе в форме ниже."}
          </p>
        </div>

        {/* Оглавление-журнал: крупные строки, фото всплывает при наведении */}
        <div className="border-b border-[#3B0D1A]/15">
          {VACANCIES.map((v, i) => (
            <a
              key={v.role.ru}
              href="#join"
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-[#3B0D1A]/15 py-7 lg:gap-8 lg:py-9"
            >
              {/* Номер */}
              <span className="font-display text-[13px] tabular-nums text-[#4A4B33] lg:text-[15px]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Название + описание */}
              <div className="min-w-0">
                <h3 className="font-display text-[19px] font-normal uppercase leading-[1.1] tracking-[0.01em] text-[#3B0D1A] transition-transform duration-300 group-hover:translate-x-2 sm:text-[24px] lg:text-[32px]">
                  {v.role[lang]}
                </h3>
                <p className="mt-2 text-[12.5px] text-[#2a2320]/55 lg:text-[13.5px]">{v.desc[lang]}</p>
              </div>

              {/* График + стрелка */}
              <span className="flex items-center gap-4 lg:gap-6">
                <span className="hidden whitespace-nowrap rounded-full bg-[#4A4B33]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#4A4B33] sm:inline">
                  {v.schedule[lang]}
                </span>
                <span className="font-display text-[22px] text-[#3B0D1A] transition-transform duration-300 group-hover:translate-x-1.5 lg:text-[28px]">
                  →
                </span>
              </span>

              {/* Всплывающее фото роли (только на десктопе) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.img}
                alt=""
                draggable={false}
                aria-hidden
                className="pointer-events-none absolute right-[10%] top-1/2 z-20 hidden aspect-[3/4] w-[210px] -translate-y-1/2 rotate-[-3deg] scale-95 rounded-[20px] object-cover opacity-0 shadow-[0_28px_60px_rgba(59,13,26,0.28)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 lg:block"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
