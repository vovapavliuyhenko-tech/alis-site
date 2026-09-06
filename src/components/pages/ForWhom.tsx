"use client";
// «Для кого ÁLIS» — премиальная сетка аудиторий: индекс, заголовок и короткая
// реплика-боль от лица клиента. Мягкий hover: бордовая обводка + подъём. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Aud = { title: Loc; line: Loc };

const AUDS: Aud[] = [
  {
    title: { ru: "Невестам и героиням события", en: "Brides & guests of honour" },
    line: { ru: "Хочу быть безупречной в день, который не переснять.", en: "I want to look flawless on a day you can't reshoot." },
  },
  {
    title: { ru: "Занятым женщинам", en: "Busy women" },
    line: { ru: "Нет времени на три салона — хочу всё за один визит.", en: "No time for three salons — I want it all in one visit." },
  },
  {
    title: { ru: "Мамам", en: "Mothers" },
    line: { ru: "Хочу час на себя без спешки, пока всё под ключ.", en: "I want an hour for myself, everything handled." },
  },
  {
    title: { ru: "Перед съёмкой и выходом", en: "Before a shoot or event" },
    line: { ru: "Нужен стойкий образ, что держится до последнего кадра.", en: "I need a look that lasts to the very last frame." },
  },
  {
    title: { ru: "Тем, кто ходит регулярно", en: "Regular guests" },
    line: { ru: "Хочу «своего» мастера и повторяемый результат.", en: "I want my own master and a repeatable result." },
  },
  {
    title: { ru: "Кто устал от разъездов", en: "Tired of running around" },
    line: { ru: "Волосы, ногти, брови и макияж — в одном кресле.", en: "Hair, nails, brows and makeup — in one chair." },
  },
];

export default function ForWhom() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="for-whom" className="scroll-mt-24 bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        {/* Заголовок */}
        <div className="mb-14 max-w-2xl lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "For whom" : "Для кого"}
          </span>
          <h2 className="mt-5 font-display text-[30px] font-normal uppercase tracking-[0.05em] leading-[1.12] text-[#3B0D1A] lg:text-[44px]">
            {en ? "Who ÁLIS is for" : "Для кого"}{" "}
            <span className="text-[#4A4B33]">ÁLIS</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#17191a]/55 lg:text-[16px]">
            {en
              ? "If you recognise yourself here — you'll feel at home with us."
              : "Если узнали себя — вам у нас будет хорошо."}
          </p>
        </div>

        {/* Сетка аудиторий */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {AUDS.map((a, i) => (
            <div
              key={a.title.ru}
              className="group flex flex-col rounded-[22px] border border-[#17191a]/12 bg-[#faf7f2] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B0D1A] lg:p-8"
            >
              <span className="font-display text-[15px] tabular-nums text-[#4A4B33]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-[19px] uppercase leading-tight tracking-[0.03em] text-[#3B0D1A] lg:text-[21px]">
                {a.title[lang]}
              </h3>
              <span className="mt-4 mb-5 block h-px w-10 bg-[#e7c9a0] transition-all duration-300 group-hover:w-16" />
              <p className="font-serif text-[15px] italic leading-snug text-[#2a2320]/70 lg:text-[16px]">
                «{a.line[lang]}»
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
