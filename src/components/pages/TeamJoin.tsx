"use client";
// СТРАНИЦА «ВАКАНСИИ» — блоки по брифу заказчицы:
//  TeamPeople       — «Команда ALIS BEAUTY — люди, которым доверяют свою красоту»: 3 карточки
//                     (основатель, директор консьерж-направления, управляющая салона);
//  JoinInternational — #international: работа на событиях в разных городах и странах;
//  JoinSalon        — #salon: команда салона в Новороссийске, «Кого ищем» (список ниже — Vacancies);
//  JoinSteps        — «Как присоединиться?» 4 шага и кнопка к анкете #join.
// TODO: фото и тексты карточек команды, имена директора и управляющей — пришлёт заказчица.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const MANAGER_WA = "https://wa.me/79888887728"; // «Получить подробные условия» — менеджер консьерж-сервиса

const PEOPLE: { role: Loc; name?: Loc; photo?: string }[] = [
  { role: { ru: "Основатель ÁLIS BEAUTY", en: "Founder of ÁLIS BEAUTY" }, name: { ru: "Дайана Тарзян", en: "Daiana Tarzyan" } },
  { role: { ru: "Директор консьерж-направления", en: "Head of the concierge service" } },
  { role: { ru: "Управляющая салона", en: "Salon manager" } },
];

export function TeamPeople() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="people" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mx-auto mb-8 max-w-[30ch] text-center text-[#17191a] lg:mb-10">
          {en ? "The ÁLIS BEAUTY team — people trusted with beauty" : "Команда ÁLIS BEAUTY — люди, которым доверяют свою красоту"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:gap-4">
          {PEOPLE.map((p, i) => (
            <article key={p.role.ru} className="r-reveal group" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#f6f4f1]">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photo} alt={p.name?.[lang] || p.role[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                ) : (
                  // Пока нет фото — аккуратная заглушка с монограммой бренда
                  <div className="absolute inset-0 flex items-center justify-center font-serif-display text-[40px] tracking-[0.1em] text-[#17191a]/10">ÁB</div>
                )}
              </div>
              <div className="mt-4 text-center sm:text-left">
                {p.name && <p className="font-display text-[16px] uppercase tracking-[0.04em] text-[#17191a] sm:text-[18px]">{p.name[lang]}</p>}
                <p className="mt-1 text-[10.5px] uppercase tracking-[0.16em] text-[#17191a]/50 sm:text-[11px]">{p.role[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Общая раскладка «текст + фото» для двух направлений
function Split({ id, photo, reverse, children }: { id: string; photo: string; reverse?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] items-stretch gap-4 md:grid-cols-2 lg:gap-6">
        <div className={`r-reveal relative min-h-[320px] overflow-hidden rounded-[28px] sm:min-h-[460px] ${reverse ? "md:order-1" : "md:order-2"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className={`r-reveal flex flex-col justify-center py-2 text-center md:py-6 md:text-left ${reverse ? "md:order-2 md:pl-6 lg:pl-14" : "md:order-1 md:pr-6 lg:pr-14"}`}>
          {children}
        </div>
      </div>
    </section>
  );
}

export function JoinInternational() {
  const { lang } = useLang();
  const en = lang === "en";
  const PERKS = en
    ? ["Orders in Russia, the CIS and Europe", "Training", "50% of the order value", "A kit with consumables and a uniform"]
    : ["Заказы в России, СНГ и Европе", "Обучение", "50% от стоимости заказа", "Кейс с расходными материалами и форма"];
  return (
    <Split id="international" photo="/assets/tild6530-383_-2___1_.jpg">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">{en ? "International beauty team" : "Международная beauty-команда"}</p>
      <h2 className="mt-3 text-[#17191a]">{en ? "Work at events in different cities and countries — under the ÁLIS BEAUTY brand" : "Работайте на событиях в разных городах и странах — под брендом ÁLIS BEAUTY"}</h2>
      <p className="mx-auto mt-3 max-w-[52ch] !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:!text-[15px] md:mx-0">
        {en ? "We find the big orders, you create the looks. No hunting for clients and no spending on materials." : "Мы находим крупные заказы, вы создаёте образы. Без поиска клиентов и вложений в материалы."}
      </p>
      <ul className="mx-auto mt-6 w-full max-w-[460px] border-t border-[#17191a]/10 text-left md:mx-0">
        {PERKS.map((p) => (
          <li key={p} className="flex items-center gap-3 border-b border-[#17191a]/10 py-3 text-[13px] text-[#17191a] sm:text-[15px]">
            <span aria-hidden className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#17191a] text-[10px] text-white">✓</span>
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-6 grid w-full max-w-[460px] gap-2 self-center sm:grid-cols-2 md:self-start">
        <a href="#join" className="flex items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a] bg-[#17191a] px-3 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5">
          {en ? "Fill in the form" : "Заполнить анкету"}
        </a>
        <a href={MANAGER_WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a]/25 px-3 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[#17191a] transition-colors duration-300 hover:border-[#17191a] sm:py-3.5">
          {en ? "Get full terms" : "Получить подробные условия"}
        </a>
      </div>
    </Split>
  );
}

export function JoinSalon() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <Split id="salon" photo="/assets/alis/img_6009.jpg" reverse>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">{en ? "Salon in Novorossiysk" : "Салон в Новороссийске"}</p>
      <h2 className="mt-3 text-[#17191a]">{en ? "Join the team of our beauty salon in Novorossiysk" : "Стать частью команды салона красоты в Новороссийске"}</h2>
      <p className="mx-auto mt-3 max-w-[52ch] !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:!text-[15px] md:mx-0">
        {en ? "Who we're looking for — see the list below. Pick your role and fill in the form." : "Кого ищем — список ниже. Выберите свою роль и заполните анкету."}
      </p>
    </Split>
  );
}

export function JoinSteps() {
  const { lang } = useLang();
  const en = lang === "en";
  const STEPS: Loc[] = [
    { ru: "Заполните анкету и прикрепите 10 работ", en: "Fill in the form and attach 10 works" },
    { ru: "Пройдите собеседование", en: "Have an interview" },
    { ru: "Сделайте пробную работу по стандартам ÁLIS BEAUTY", en: "Do a trial work to ÁLIS BEAUTY standards" },
    { ru: "Получите работу", en: "Get the job" },
  ];
  return (
    <section id="steps" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{en ? "How to join?" : "Как присоединиться?"}</h2>
        <ol className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((s, i) => (
            <li
              key={s.ru}
              className={`r-reveal flex min-h-[120px] flex-col justify-between rounded-[20px] p-5 sm:min-h-[180px] sm:p-7 ${i === STEPS.length - 1 ? "bg-[#17191a] text-white" : "border border-[#17191a]/12 bg-white text-[#17191a]"}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className={`font-display text-[20px] lg:text-[28px] ${i === STEPS.length - 1 ? "text-white/40" : "text-[#17191a]/30"}`}>{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 font-display text-[14px] leading-[1.35] tracking-[0.01em] sm:text-[17px]">{s[lang]}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex justify-center">
          <a href="#join" className="flex w-full max-w-[340px] items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]">
            {en ? "Apply" : "Подать заявку"}
          </a>
        </div>
      </div>
    </section>
  );
}
