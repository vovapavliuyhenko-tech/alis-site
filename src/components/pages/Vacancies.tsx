"use client";
// БЛОК ВАКАНСИЙ (страница «Команда») — премиальная сетка ролей. Тексты ролей —
// плейсхолдеры до присланного списка (легко заменить в VACANCIES).
// Клик по карточке ведёт к форме «стать частью команды» ниже. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Vacancy = { role: Loc; desc: Loc; schedule: Loc };

// TODO: заменить на реальный список вакансий, когда пришлёт владелец.
const VACANCIES: Vacancy[] = [
  {
    role: { ru: "Парикмахер-колорист", en: "Hair colourist" },
    desc: { ru: "Сложное окрашивание, стрижки, уход. Ценим аккуратность и работу на результат.", en: "Complex colour, cuts, care. We value precision and result-driven work." },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
  },
  {
    role: { ru: "Мастер маникюра и педикюра", en: "Manicure & pedicure master" },
    desc: { ru: "Гигиена, покрытие, дизайн. Работаем на проверенных материалах.", en: "Hygiene, coating, design. We work with trusted materials." },
    schedule: { ru: "график гибкий", en: "flexible schedule" },
  },
  {
    role: { ru: "Бровист / лашмейкер", en: "Brow & lash artist" },
    desc: { ru: "Брови, ресницы, окрашивание. Важна чистота линий и деликатность.", en: "Brows, lashes, tinting. Clean lines and a gentle touch matter." },
    schedule: { ru: "частичная / полная", en: "part / full time" },
  },
  {
    role: { ru: "Администратор салона", en: "Salon administrator" },
    desc: { ru: "Встреча гостей, запись, атмосфера. Тепло и внимание к деталям.", en: "Greeting guests, booking, atmosphere. Warmth and attention to detail." },
    schedule: { ru: "график 2/2", en: "2/2 schedule" },
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
          {VACANCIES.map((v, i) => (
            <a
              key={v.role.ru}
              href="#join"
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#3B0D1A]/15 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B0D1A]/40 hover:shadow-[0_26px_60px_rgba(59,13,26,0.16)]"
            >
              <span className="pointer-events-none absolute -right-4 -top-6 font-display text-[80px] leading-none text-[#3B0D1A]/[0.06] transition-colors duration-300 group-hover:text-[#3B0D1A]/[0.1]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-[20px] leading-tight text-[#3B0D1A] lg:text-[24px]">{v.role[lang]}</h3>
                  <span className="whitespace-nowrap rounded-full bg-[#4A4B33]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#4A4B33]">
                    {v.schedule[lang]}
                  </span>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-[#2a2320]/70 lg:text-[15px]">{v.desc[lang]}</p>
              </div>
              <span className="relative mt-8 inline-flex items-center gap-2 font-display text-[13px] uppercase tracking-[0.14em] text-[#3B0D1A]">
                {en ? "apply" : "откликнуться"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
