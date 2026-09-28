"use client";
// ВТОРОЙ БЛОК СТРАНИЦЫ «САЛОН КРАСОТЫ» — «о нас» и преимущества салона.
// Тексты — со старого сайта alisbeauty.ru (слова основательницы) и уже согласованные
// факты (часы работы, приветственный бонус). Слева — цитата основательницы, она
// «прилипает» при прокрутке; справа — преимущества: при появлении у каждого
// прорисовывается тонкая линия сверху, номер и текст проявляются со сдвигом. Ч/б.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const QUOTE: Loc = {
  ru: "Мне хотелось объединить людей, горящих своим делом и творчеством, с чистой душой и открытым сердцем, которые смогут увидеть и соединить вашу внутреннюю красоту с внешней.",
  en: "I wanted to bring together people who burn with their craft and creativity, with pure souls and open hearts, who can see your inner beauty and connect it with the outer.",
};
const AUTHOR: Loc = { ru: "Дайана Тарзян, основательница ÁLIS BEAUTY", en: "Dayana Tarzyan, founder of ÁLIS BEAUTY" };

const POINTS: { title: Loc; text: Loc }[] = [
  {
    title: { ru: "Команда с открытым сердцем", en: "A team with open hearts" },
    text: { ru: "Люди, горящие своим делом и творчеством, с чистой душой и открытым сердцем.", en: "People who burn with their craft and creativity, with pure souls and open hearts." },
  },
  {
    title: { ru: "Внутренняя красота — во внешней", en: "Inner beauty, on the outside" },
    text: { ru: "Наша команда поможет отразить вашу внутреннюю красоту во внешнем облике.", en: "Our team will help reflect your inner beauty in your outer look." },
  },
  {
    title: { ru: "Забота о каждой детали", en: "Care for every detail" },
    text: { ru: "Качественный сервис и внимание к каждой детали — чтобы у гостей были исключительно приятные ощущения.", en: "Quality service and attention to every detail, so our guests feel nothing but good." },
  },
  {
    title: { ru: "Спокойная атмосфера", en: "A calm atmosphere" },
    text: { ru: "Атмосфера, в которой можно настроиться на любовь.", en: "An atmosphere where you can tune in to love." },
  },
  {
    title: { ru: "Без перерывов и выходных", en: "No breaks, open daily" },
    text: { ru: "Ждём вас каждый день с 9:00 до 21:00.", en: "We're open every day from 9:00 to 21:00." },
  },
  {
    title: { ru: "500 бонусных рублей на первый визит", en: "500 bonus rubles on your first visit" },
    text: { ru: "Приветственный бонус для новых гостей салона.", en: "A welcome bonus for new salon guests." },
  },
];

export default function SalonAbout() {
  const { lang } = useLang();

  return (
    <section id="about" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        {/* Цитата основательницы — «прилипает» при прокрутке */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <blockquote className="r-reveal text-[22px] font-light leading-[1.35] text-[#17191a] lg:text-[clamp(24px,2.1vw,34px)]">
            <span aria-hidden className="mr-1 text-[#46131E]">«</span>
            {QUOTE[lang]}
            <span aria-hidden className="ml-1 text-[#46131E]">»</span>
          </blockquote>
          <p className="r-reveal mt-6 text-[13px] text-[#17191a]/50">{AUTHOR[lang]}</p>
        </div>

        {/* Преимущества */}
        <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <li key={p.title.ru} className="r-reveal about-point relative pb-10 pt-7 lg:pb-14">
              {/* Линия, прорисовывающаяся при появлении */}
              <span aria-hidden className="about-line absolute left-0 top-0 h-px w-full origin-left bg-[#17191a]/15" />
              <span className="text-[12px] tabular-nums text-[#46131E]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-[#17191a]">{p.title[lang]}</h3>
              <p className="text-[#17191a]/55">{p.text[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
