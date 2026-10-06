"use client";
// ПРОВЕРКА ДАТЫ + ОСНОВАТЕЛЬ И ФОРМАТЫ (страница «Консьерж-сервис»).
// 1) Короткая светлая полоса: «Ваша дата может быть уже занята» → анкета (#calc).
// 2) #partners: слева фото основателя, справа текст, три формата сотрудничества и кнопка
//    к менеджеру (форма заявки #booking). Тексты — заказчицы.
import { useLang } from "@/lib/i18n";

// TODO: портрет основателя пришлёт заказчица — пока фото работы команды
const FOUNDER_PHOTO = "/assets/alis/img_2751.jpg";

export function ConciergeDateCheck() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="date" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto flex w-[96%] max-w-[1760px] flex-col items-center rounded-[28px] bg-[#f6f4f1] px-5 py-10 text-center sm:py-14 lg:py-20">
        <h2 className="text-[#17191a]">{en ? "Your date may already be taken" : "Ваша дата может быть уже занята"}</h2>
        <p className="mt-2 !text-[12.5px] text-[#17191a]/65 sm:mt-3 sm:!text-[15px]">{en ? "We'll check within 15 minutes?" : "Проверим за 15 минут?"}</p>
        <a
          href="#calc"
          className="mt-6 inline-flex w-full max-w-[340px] items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:mt-8 sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]"
        >
          {en ? "Fill in the form" : "Заполнить анкету"}
        </a>
      </div>
    </section>
  );
}

export default function ConciergeFounder() {
  const { lang } = useLang();
  const en = lang === "en";
  const FORMATS = en
    ? ["One-off event", "Ongoing partnership", "Series contract"]
    : ["Разовое событие", "Постоянное партнёрство", "Серийный контракт"];

  return (
    <section id="partners" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] items-stretch gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        {/* Фото основателя */}
        <div className="r-reveal relative min-h-[360px] overflow-hidden rounded-[28px] sm:min-h-[460px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FOUNDER_PHOTO} alt={en ? "Daiana Tarzyan, founder of ÁLIS BEAUTY" : "Дайана Тарзян, основатель ÁLIS BEAUTY"} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
            <p className="font-display text-[18px] uppercase tracking-[0.04em] sm:text-[22px]">{en ? "Daiana Tarzyan" : "Дайана Тарзян"}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">{en ? "founder of ÁLIS BEAUTY" : "основатель бренда ÁLIS BEAUTY"}</p>
          </div>
        </div>

        {/* Текст, форматы, кнопка */}
        <div className="r-reveal flex flex-col justify-between gap-8 rounded-[28px] bg-[#f6f4f1] p-6 text-center sm:p-10 md:text-left lg:p-14">
          <div>
            <h2 className="text-[#17191a]">{en ? "A team chosen for your event" : "Команда под ваше событие"}</h2>
            <p className="mx-auto mt-3 max-w-[60ch] !text-[12.5px] leading-[1.6] text-[#17191a]/70 sm:!text-[15px] md:mx-0">
              {en
                ? "Daiana Tarzyan, founder of ÁLIS BEAUTY, personally and meticulously selects the team for every event. All artists are trained to the brand's service standards and work with professional equipment and materials."
                : "Дайана Тарзян, основатель бренда ÁLIS BEAUTY, лично и скрупулёзно подбирает команду под каждое событие. Все специалисты проходят обучение по стандартам сервиса бренда и работают на профессиональном оборудовании и материалах."}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">{en ? "Formats" : "Формат"}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {FORMATS.map((f, i) => (
                <li key={f} className="flex items-center justify-center gap-2.5 rounded-[12px] border border-[#17191a]/12 bg-white px-4 py-3 text-[12px] text-[#17191a] sm:justify-start sm:text-[14px]">
                  <span className="text-[10px] text-[#17191a]/40">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#booking"
              className="mt-5 flex w-full items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a] bg-[#17191a] px-2 py-3 text-[clamp(9.5px,2.7vw,11px)] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]"
            >
              {en ? "Discuss your option with a manager" : "Обсудить ваш вариант с менеджером"}
            </a>
            <p className="mt-3 !text-[10.5px] text-[#17191a]/50 sm:!text-[12.5px]">
              {en ? "We'll send the presentation and terms within 24 hours." : "Пришлём презентацию и условия в течение 24 часов."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
