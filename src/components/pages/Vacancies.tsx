"use client";
// БЛОК ВАКАНСИЙ (страница «Команда») — editorial «оглавление журнала» по мотивам
// топовых Tilda-портфолио: крупные строки-вакансии с номерами; при наведении на
// строку сбоку плавно всплывает фото роли. Клик ведёт к форме ниже. Тексты ролей
// — плейсхолдеры до присланного списка. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Vacancy = { role: Loc; desc: Loc; schedule: Loc; img: string };

const VACANCIES: Vacancy[] = [
  {
    role: { ru: "Администратор", en: "Administrator" },
    desc: { ru: "Встреча гостей, запись, атмосфера", en: "Greeting guests, booking, atmosphere" },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
    img: "/assets/tild6230-643__.jpg",
  },
  {
    role: { ru: "Визажист", en: "Makeup artist" },
    desc: { ru: "Дневной, вечерний, свадебный макияж", en: "Day, evening and bridal makeup" },
    schedule: { ru: "частичная / полная", en: "part / full time" },
    img: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    role: { ru: "Бровист", en: "Brow artist" },
    desc: { ru: "Брови, ресницы, окрашивание", en: "Brows, lashes, tinting" },
    schedule: { ru: "график гибкий", en: "flexible schedule" },
    img: "/assets/tild3236-393__.jpg",
  },
  {
    role: { ru: "Мастер ногтевого сервиса", en: "Nail service master" },
    desc: { ru: "Маникюр, педикюр, покрытие, дизайн", en: "Manicure, pedicure, coating, design" },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
    img: "/assets/tild3638-373_-2___1__3.jpg",
  },
];

export default function Vacancies() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="vacancies" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div className="mb-12 text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#6E7248]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#6E7248]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6E7248]" />
            {en ? "vacancies" : "вакансии"}
          </span>
          <h2 className="mt-5 font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.03em] text-[#6E7248] lg:text-[28px]">
            {en ? "Grow with ÁLIS" : "Расти вместе с ÁLIS"}
          </h2>
        </div>

        {/* Оглавление-журнал: закруглённые строки-карточки, при наведении — полупрозрачно-бордовые */}
        <div className="flex flex-col gap-3">
          {VACANCIES.map((v, i) => (
            <a
              key={v.role.ru}
              href="#join"
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-[20px] border border-[#6E7248]/12 px-6 py-6 transition-colors duration-300 hover:border-transparent hover:bg-[#6E7248] lg:gap-8 lg:px-8 lg:py-8"
            >
              {/* Номер */}
              <span className="font-display text-[13px] tabular-nums text-[#6E7248] transition-colors duration-300 group-hover:text-[#f4efe6]/70 lg:text-[15px]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Название + описание */}
              <div className="min-w-0">
                <h3 className="font-display text-[16px] font-normal uppercase leading-[1.15] tracking-[0.01em] text-[#6E7248] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#f4efe6] sm:text-[19px] lg:text-[24px]">
                  {v.role[lang]}
                </h3>
                <p className="mt-2 text-[12.5px] text-[#2a2320]/55 transition-colors duration-300 group-hover:text-[#f4efe6]/70 lg:text-[13.5px]">{v.desc[lang]}</p>
              </div>

              {/* График + стрелка в кружке */}
              <span className="flex items-center gap-4 lg:gap-6">
                <span className="hidden whitespace-nowrap rounded-full bg-[#6E7248]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#6E7248] transition-colors duration-300 group-hover:bg-[#f4efe6]/15 group-hover:text-[#f4efe6] sm:inline">
                  {v.schedule[lang]}
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#6E7248]/30 text-[#6E7248] transition-all duration-300 group-hover:border-[#f4efe6] group-hover:bg-[#f4efe6] group-hover:text-[#6E7248] lg:h-12 lg:w-12">
                  <span className="text-[16px] leading-none transition-transform duration-300 group-hover:-rotate-45 lg:text-[18px]">→</span>
                </span>
              </span>

              {/* Всплывающее фото роли по центру, в пустоте (только на десктопе) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.img}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                aria-hidden
                className={`pointer-events-none absolute left-[60%] top-1/2 z-20 hidden aspect-[3/4] w-[205px] -translate-x-1/2 -translate-y-1/2 scale-95 rounded-[22px] object-cover opacity-0 shadow-[0_28px_60px_rgba(59,13,26,0.28)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 lg:block lg:w-[232px] ${["rotate-[-7deg]", "rotate-[6deg]", "rotate-[-4deg]", "rotate-[7deg]"][i % 4]}`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
