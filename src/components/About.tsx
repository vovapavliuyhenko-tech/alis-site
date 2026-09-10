"use client";
// ОБО МНЕ / «ПОЧЕМУ ВЫБИРАЮТ ÁLIS» — преимущества карточками в единых рамках
// (как контакт-карточки): иконка-чип, заголовок, описание; портрет основателя
// отдельной карточкой. Наведение — лёгкий подъём и подсветка обводки. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Utp = { title: Loc; desc: Loc };

const UTP: Utp[] = [
  {
    title: { ru: "Команда профессионалов", en: "A team of professionals" },
    desc: { ru: "Опытные мастера и фирменная атмосфера — заботимся о вас от первого «здравствуйте» до последнего штриха.", en: "Experienced masters and a signature atmosphere — we care for you from the first hello to the final touch." },
  },
  {
    title: { ru: "Внимание к деталям", en: "Attention to detail" },
    desc: { ru: "Слышим все пожелания и учитываем мелочи, которые обычно упускают. Результат — именно такой, как вы хотели.", en: "We hear every wish and catch the small things others miss — the result is exactly what you pictured." },
  },
  {
    title: { ru: "Проверенные материалы", en: "Trusted materials" },
    desc: { ru: "Работаем на качественной косметике, проверенной временем. Никаких экспериментов на вас.", en: "We work only with quality, time-proven cosmetics. No experiments on you." },
  },
  {
    title: { ru: "Сервис в 4–6 рук", en: "Service in 4–6 hands" },
    desc: { ru: "Несколько мастеров одновременно экономят ваше время — полный образ готов быстрее, без спешки.", en: "Several masters at once save your time — your full look is ready faster, without rush." },
  },
  {
    title: { ru: "Сервис «под ключ»", en: "A turnkey service" },
    desc: { ru: "Вам не нужно ни о чём думать — мы уже подумали за вас. Решаем любые задачи на гибких условиях.", en: "You don't have to think about a thing — we've thought of it for you, on flexible terms." },
  },
];

// Минималистичная иконка-видоискатель (уголки)
function ViewfinderIcon() {
  return (
    <svg viewBox="0 0 44 44" className="h-6 w-6 text-[#4A4B33]" fill="none">
      <path d="M3 14V3h11" stroke="currentColor" strokeWidth="2" />
      <path d="M30 3h11v11" stroke="currentColor" strokeWidth="2" />
      <path d="M41 30v11H30" stroke="currentColor" strokeWidth="2" />
      <path d="M14 41H3V30" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="22" r="3.5" fill="currentColor" />
    </svg>
  );
}

export default function About() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="about" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        {/* Заголовок секции */}
        <div className="mb-14 max-w-2xl lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "About us" : "О нас"}
          </span>
          <h2 className="mt-5 font-display text-[24px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-[#3B0D1A] lg:text-[36px]">
            {en ? "Why they choose" : "Почему выбирают"} <span className="text-[#4A4B33]">ÁLIS</span>
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Портрет основателя — отдельной карточкой */}
          <article className="flex flex-col overflow-hidden rounded-[20px] border border-[#3B0D1A]/12 bg-white lg:row-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/tild3236-393__.jpg" alt="Дайана Тарзян" className="aspect-[4/5] w-full object-cover" draggable={false} />
            <div className="p-6 lg:p-7">
              <p className="font-display text-[18px] tracking-[0.02em] text-[#3B0D1A]">{en ? "Daiana Tarzyan" : "Дайана Тарзян"}</p>
              <p className="mt-2 text-[12px] uppercase leading-relaxed tracking-[0.1em] text-[#17191a]/50">
                {en ? "founder of ÁLIS aesthetics studios and ÁLIS BEAUTY CONCIERGE" : "основатель сети студий эстетики ÁLIS и ÁLIS BEAUTY CONCIERGE"}
              </p>
            </div>
          </article>

          {/* Преимущества — карточки в единых рамках */}
          {UTP.map((u) => (
            <article
              key={u.title.ru}
              className="group flex flex-col rounded-[20px] border border-[#3B0D1A]/12 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B0D1A]/30 hover:shadow-[0_18px_44px_rgba(59,13,26,0.10)] lg:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4A4B33]/10">
                <ViewfinderIcon />
              </span>
              <h3 className="mt-5 font-display text-[17px] uppercase leading-tight tracking-[0.03em] text-[#3B0D1A] lg:text-[19px]">
                {u.title[lang]}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#17191a]/55 lg:text-[13.5px]">{u.desc[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
