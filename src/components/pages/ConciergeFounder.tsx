"use client";
// ОСНОВАТЕЛЬ И ФОРМАТЫ (страница «Консьерж-сервис», #partners): слева фото основателя, справа на белом фоне текст и три формата
//    сотрудничества строками (без плашек и кнопок). Тексты — заказчицы.
import { useLang } from "@/lib/i18n";

// TODO: портрет основателя пришлёт заказчица — пока фото работы команды
const FOUNDER_PHOTO = "/assets/alis/img_2751.jpg";

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

        {/* Текст и форматы — прямо на белом фоне, без плашек и кнопок; форматы — строками с тонкими линиями */}
        <div className="r-reveal flex flex-col justify-between gap-8 py-2 text-center md:py-6 md:pl-6 md:text-left lg:pl-14">
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
            <ul className="mt-3 border-t border-[#17191a]/10">
              {FORMATS.map((f, i) => (
                <li key={f} className="flex items-baseline justify-between gap-4 border-b border-[#17191a]/10 py-3.5 text-left sm:py-4">
                  <span className="font-display text-[14px] tracking-[0.02em] text-[#17191a] sm:text-[18px]">{f}</span>
                  <span className="text-[11px] text-[#17191a]/35 sm:text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
