"use client";
// БЛОК ВАКАНСИЙ (страница «Команда») — карточки с фоновым фото: затемнение,
// текст поверх, лёгкий зум фото на наведении. Клик ведёт к форме «стать частью
// команды» ниже. Тексты ролей — плейсхолдеры до присланного списка. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Vacancy = { role: Loc; desc: Loc; schedule: Loc; img: string };

// TODO: заменить на реальный список вакансий, когда пришлёт владелец.
const VACANCIES: Vacancy[] = [
  {
    role: { ru: "Парикмахер-колорист", en: "Hair colourist" },
    desc: { ru: "Сложное окрашивание, стрижки, уход.", en: "Complex colour, cuts, care." },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
    img: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    role: { ru: "Мастер маникюра и педикюра", en: "Manicure & pedicure master" },
    desc: { ru: "Гигиена, покрытие, дизайн.", en: "Hygiene, coating, design." },
    schedule: { ru: "график гибкий", en: "flexible schedule" },
    img: "/assets/tild3638-373_-2___1__3.jpg",
  },
  {
    role: { ru: "Бровист / лашмейкер", en: "Brow & lash artist" },
    desc: { ru: "Брови, ресницы, окрашивание.", en: "Brows, lashes, tinting." },
    schedule: { ru: "частичная / полная", en: "part / full time" },
    img: "/assets/tild3236-393__.jpg",
  },
  {
    role: { ru: "Администратор салона", en: "Salon administrator" },
    desc: { ru: "Встреча гостей, запись, атмосфера.", en: "Greeting guests, booking, atmosphere." },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
    img: "/assets/tild6230-643__.jpg",
  },
];

export default function Vacancies() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="vacancies" className="scroll-mt-24 bg-[#f7f3ed] py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div className="mb-14 max-w-2xl lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "vacancies" : "вакансии"}
          </span>
          <h2 className="mt-5 font-display text-[28px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[42px]">
            {en ? "Grow with ÁLIS" : "Расти вместе с ÁLIS"}
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-[#2a2320]/70 lg:text-[15px]">
            {en
              ? "We're building a team that loves its craft. If any of these sound like you — tell us about yourself in the form below."
              : "Мы собираем команду, которая любит своё дело. Если что-то из этого про вас — расскажите о себе в форме ниже."}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {VACANCIES.map((v) => (
            <a
              key={v.role.ru}
              href="#join"
              className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-[24px] sm:aspect-[16/11] lg:aspect-[16/10]"
            >
              {/* Фон-фото с зумом */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.img}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              {/* Затемнение */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/80" />

              {/* Тег графика — сверху справа */}
              <span className="absolute right-5 top-5 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                {v.schedule[lang]}
              </span>

              {/* Текст поверх фото — снизу */}
              <div className="relative z-10 w-full p-7 lg:p-8">
                <h3 className="font-display text-[22px] leading-tight text-white lg:text-[27px]">{v.role[lang]}</h3>
                <p className="mt-2 max-w-[22rem] text-[13px] leading-relaxed text-white/75 lg:text-[14px]">{v.desc[lang]}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display text-[13px] uppercase tracking-[0.14em] text-white">
                  {en ? "apply" : "откликнуться"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
