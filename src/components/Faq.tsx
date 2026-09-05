"use client";
// ВОПРОСЫ — как на sevara-sr: слева зафиксированный заголовок + фото; справа
// карточки-ответы на боли клиентов, которые при скролле НАЕЗЖАЮТ друг на друга
// (sticky-stacking). Листается только правая колонка. В стиле ÁLIS. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc };

const PHOTO = "/assets/tild3236-393__.jpg";

const ITEMS: Item[] = [
  {
    q: { ru: "«А вдруг мне не понравится результат?»", en: "“What if I don't like the result?”" },
    a: {
      ru: "Скажите сразу, не выходя из кресла — поправим на месте. Если ошибка техническая, исправляем в течение 7 дней за наш счёт. Вы не платите дважды за одну работу.",
      en: "Tell us right away, before you leave the chair — we fix it on the spot. If it's a technical fault, we correct it within 7 days at our expense. You don't pay twice for one job.",
    },
  },
  {
    q: { ru: "«У меня совсем нет времени — реально всё за один визит?»", en: "“I'm short on time — can it all be done in one visit?”" },
    a: {
      ru: "Да. Волосы, ногти, брови и макияж делаем одновременно, в 4–6 рук — полный образ за пару часов, без разъездов по трём мастерам и без потерянной субботы.",
      en: "Yes. Hair, nails, brows and makeup at once, in 4–6 hands — a complete look in a couple of hours, with no running between three masters.",
    },
  },
  {
    q: { ru: "«Боюсь испортить волосы после домашней краски»", en: "“I'm afraid of ruining my hair after home colour.”" },
    a: {
      ru: "Сначала тест пряди и разбор истории волос. Если осветлять нельзя — скажем прямо и дадим план по шагам, а не оставим вас с последствиями.",
      en: "First a strand test and a look at your hair's history. If bleaching isn't safe, we say so straight and give a step-by-step plan.",
    },
  },
  {
    q: { ru: "«Не хочу сюрпризов в чеке»", en: "“I don't want surprises on the bill.”" },
    a: {
      ru: "Стоимость называем до начала, после осмотра. Нужен дополнительный шаг — остановимся и спросим. Точные цены видно в онлайн-записи, а на первое посещение — −10%.",
      en: "We name the price before we start, after examining you. If an extra step is needed, we stop and ask. Exact prices are in the online booking, and your first visit is −10%.",
    },
  },
  {
    q: { ru: "«Боюсь аллергии на ресницы и краску для бровей»", en: "“I'm afraid of an allergy to lashes and brow tint.”" },
    a: {
      ru: "Перед первой процедурой предлагаем тест за 48 часов. Аллергия на клей и красители часто накопительная — лучше подстраховаться, чем жить с последствиями.",
      en: "Before the first procedure we offer a 48-hour patch test. Allergy to glue and dyes is often cumulative — better safe than sorry.",
    },
  },
  {
    q: { ru: "«Не знаю, что мне подойдёт»", en: "“I don't know what suits me.”" },
    a: {
      ru: "Разберём ваше фото и пожелания до начала работы и честно скажем, что подойдёт именно вам, а что — нет. Решаем вместе, без импровизаций на ходу.",
      en: "We review your reference and wishes before we start and honestly tell you what suits you. We decide together, no improvising on the go.",
    },
  },
  {
    q: { ru: "«Хочу образ на свадьбу — переживаю за стойкость»", en: "“I want a wedding look — I worry it won't last.”" },
    a: {
      ru: "Делаем пробный образ заранее и фиксируем его фото. В день события повторяем точно — образ держится до последнего кадра, даже на жаре и у моря.",
      en: "We do a trial look in advance and capture it in photos. On the day we repeat it exactly — it holds to the last frame, even in heat and by the sea.",
    },
  },
];

export default function Faq() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="faq" className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid w-[92%] max-w-[1400px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Левая колонка — зафиксирована */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "FAQ" : "Вопросы"}
          </span>
          <h2 className="mt-5 font-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] sm:text-[32px] lg:text-[40px]">
            {en ? "You ask —" : "Вы спрашиваете —"}
            <br />
            <span className="text-[#4A4B33]">{en ? "we solve" : "я решаю"}</span>
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" className="mt-8 aspect-[3/4] w-full max-w-[260px] rounded-[22px] object-cover lg:mt-10" draggable={false} />
        </div>

        {/* Правая колонка — карточки идут вплотную и НАЕЗЖАЮТ друг на друга при скролле */}
        <div className="flex flex-col">
          {ITEMS.map((it, i) => (
            <div key={it.q.ru} className="sticky pb-4" style={{ top: `${100 + i * 14}px` }}>
              <article className="rounded-[20px] border border-[#17191a]/8 bg-[#faf7f2] p-6 shadow-[0_14px_40px_rgba(23,25,26,0.1)] lg:p-7">
                <p className="font-serif text-[16px] italic leading-snug text-[#3B0D1A] lg:text-[19px]">{it.q[lang]}</p>
                <span className="mt-4 mb-4 block h-px w-10 bg-[#e7c9a0]" />
                <p className="text-[12.5px] font-light leading-relaxed text-[#2a2320]/70 lg:text-[13.5px]">{it.a[lang]}</p>
              </article>
            </div>
          ))}
          {/* хвост, чтобы последняя карточка успела «прилипнуть» */}
          <div aria-hidden className="h-[20vh]" />
        </div>
      </div>
    </section>
  );
}
