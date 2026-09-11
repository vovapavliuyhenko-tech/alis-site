"use client";
// БЛОК 6 «Мой подход…» — тёмная секция, 4 пункта с иконками, светлый текст.
import { useLang } from "@/lib/i18n";
import { SectionHead } from "./massage/shared";

type Loc = { ru: string; en: string };
const ITEMS: { title: Loc; desc: Loc }[] = [
  {
    title: { ru: "Внимательно выслушиваю, прежде чем начать массаж", en: "I listen carefully before starting" },
    desc: {
      ru: "Каждый сеанс начинается с разговора. Узнаю, что вас беспокоит, оцениваю самочувствие, отвечаю на вопросы и помогаю выбрать технику, которая подойдёт именно вам.",
      en: "Each session starts with a talk. I learn what troubles you, assess how you feel and help choose the technique that suits you.",
    },
  },
  {
    title: { ru: "Уделяю особое внимание подготовке тканей", en: "I pay special attention to preparing the tissues" },
    desc: {
      ru: "В начале процедуры я хорошо разогреваю ткани, что делает мышцы более мягкими и эластичными. Благодаря этому даже глубокая проработка проходит безболезненно и комфортно.",
      en: "At the start I warm the tissues well, making muscles softer and more elastic — so even deep work stays painless and comfortable.",
    },
  },
  {
    title: { ru: "С пониманием отношусь к вашему настроению", en: "I respect your mood" },
    desc: {
      ru: "Если захочется поговорить — с удовольствием поддержу беседу. Если вам необходима тишина — мы просто помолчим. Время сеанса посвящено исключительно вашему отдыху.",
      en: "If you feel like talking, I'll gladly chat. If you need silence, we'll simply stay quiet. The session is devoted entirely to your rest.",
    },
  },
  {
    title: { ru: "Наблюдаю за реакцией тела во время сеанса", en: "I watch how your body responds" },
    desc: {
      ru: "Для меня важно не только проработать мышцы, но и следить за тем, чтобы вы чувствовали себя безопасно. Поэтому я всегда ориентируюсь на ваши ощущения.",
      en: "It matters to me not only to work the muscles but to keep you feeling safe. So I always follow your sensations.",
    },
  },
];

export default function MassageApproach() {
  const { lang } = useLang();
  return (
    <section className="bg-[#2b2620] py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <SectionHead
          dark
          title={{
            ru: "Мой подход основан на чуткости и индивидуальной работе с каждым человеком",
            en: "My approach is built on sensitivity and individual work with each person",
          }}
          className="mx-auto max-w-[840px]"
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <div key={it.title.ru}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C2C0B6]/40 font-serif-display text-[13px] text-[#C2C0B6]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[14px] font-semibold leading-[1.3] text-[#EDE9E2]">{it.title[lang]}</h3>
              <p className="mt-3 text-[12.5px] leading-[1.6] text-[#C2C0B6]">{it.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
