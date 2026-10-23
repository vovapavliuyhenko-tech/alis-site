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
    schedule: { ru: "график 2/2", en: "2-on/2-off schedule" },
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
    role: { ru: "Мастер ногтевого сервиса", en: "Nail technician" },
    desc: { ru: "Маникюр, педикюр, покрытие, дизайн", en: "Manicure, pedicure, coating, design" },
    schedule: { ru: "график 2/2", en: "2-on/2-off schedule" },
    img: "/assets/tild3638-373_-2___1__3.jpg",
  },
];

export default function Vacancies() {
  const { lang } = useLang();

  return (
    <section id="vacancies" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">
          {lang === "en" ? "Join the beauty salon team in Novorossiysk" : "Стать частью команды салона красоты в Новороссийске"}
        </h2>
        {/* Оглавление-журнал: закруглённые строки-карточки, при наведении — полупрозрачно-бордовые */}
        <div className="flex flex-col gap-3">
          {VACANCIES.map((v, i) => (
            <a
              key={v.role.ru}
              href="#join"
              className="group relative grid grid-cols-[1fr_auto] items-center gap-5 rounded-[20px] border border-[#17191a]/12 px-5 py-4 bg-white sm:px-6 sm:py-6 transition-[border-color,box-shadow] duration-500 hover:border-[#17191a]/20 hover:shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)] lg:gap-8 lg:px-8 lg:py-8"
            >

              {/* Название + описание */}
              <div className="min-w-0">
                <h3 className="font-display !text-[13px] font-normal uppercase leading-[1.15] tracking-[0.01em] text-[#17191a] transition-all duration-300 group-hover:translate-x-2 sm:!text-[19px] lg:!text-[24px]">
                  {v.role[lang]}
                </h3>
                <p className="mt-2 hidden text-[12.5px] text-[#2a2320]/55 sm:block transition-colors duration-300 lg:text-[13.5px]">{v.desc[lang]}</p>
              </div>

              {/* График + стрелка в кружке */}
              <span className="flex items-center gap-4 lg:gap-6">
                <span className="hidden whitespace-nowrap rounded-full bg-[#17191a]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-300 group-hover:bg-[#17191a] group-hover:text-white sm:inline">
                  {v.schedule[lang]}
                </span>
                <span className="flex h-9 w-9 shrink-0 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#17191a]/30 text-[#17191a] transition-all duration-300 group-hover:border-[#17191a] group-hover:bg-[#17191a] group-hover:text-white lg:h-12 lg:w-12">
                  <span className="text-[16px] leading-none transition-transform duration-300 group-hover:-rotate-45 lg:text-[18px]">→</span>
                </span>
              </span>

              {/* Всплывающее фото роли по центру, в пустоте (только на десктопе) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.img}
                alt={v.role[lang]}
                draggable={false}
                loading="lazy"
                decoding="async"
                aria-hidden
                className={`pointer-events-none absolute left-[62%] top-1/2 z-20 hidden aspect-[3/4] w-[92px] -translate-x-1/2 -translate-y-1/2 scale-90 rounded-[14px] object-cover opacity-0 shadow-[0_20px_40px_rgba(23,25,26,0.25)] transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-100 group-hover:opacity-100 lg:block lg:left-1/2 lg:w-[232px] lg:rounded-[20px] lg:duration-300 lg:shadow-[0_28px_60px_rgba(23,25,26,0.28)] ${["rotate-[-7deg]", "rotate-[6deg]", "rotate-[-4deg]", "rotate-[7deg]"][i % 4]}`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
