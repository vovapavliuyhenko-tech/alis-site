"use client";
// БЛОК «О СЕРВИСЕ» (страница «Консьерж-сервис», якорь #about). Тексты — со старого
// сайта alisbeauty.ru (по просьбе заказчицы). Журнальная раскладка: слева главная мысль
// крупно, справа текст и метки-поводы; ниже пять преимуществ. Ч/б. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

// Вступление разбито на части для журнальной подачи (текст тот же, со старого сайта)
const LEAD: Loc = {
  ru: "Единственный в своём роде консьерж-сервис, организованный на базе салона красоты",
  en: "A one-of-a-kind concierge service built on the basis of a beauty salon",
};
const BODY: Loc[] = [
  {
    ru: "Мы будем рядом и поможем создать незабываемый образ для вашего события.",
    en: "We'll be by your side and help create an unforgettable look for your occasion.",
  },
  {
    ru: "Наша опытная команда визажистов, стилистов и координаторов создала надёжный сервис полного образа для любых мероприятий — от подбора макияжа до подбора цвета и фактуры туфель для целостности образа.",
    en: "Our experienced team of makeup artists, stylists and coordinators has built a reliable full-look service for any event — from choosing the makeup to matching the colour and texture of your shoes.",
  },
];
const OCCASIONS: Loc[] = [
  { ru: "Свадебная церемония", en: "Wedding ceremony" },
  { ru: "День рождения", en: "Birthday" },
  { ru: "Семейный праздник", en: "Family celebration" },
  { ru: "Значимая дата", en: "Special date" },
];
const POINTS: { title: Loc; desc: Loc }[] = [
  {
    title: { ru: "Мастерство и опыт", en: "Skill & experience" },
    desc: {
      ru: "Благодаря экспертности в индустрии красоты мы с лёгкостью закрываем потребности наших клиентов.",
      en: "Thanks to our expertise in the beauty industry, we easily meet our clients' needs.",
    },
  },
  {
    title: { ru: "Большая команда", en: "A large team" },
    desc: {
      ru: "Можем подготовить большое количество гостей на вашем мероприятии и выехать командой стилистов в любую локацию.",
      en: "We can get a large number of guests ready at your event and send a team of stylists to any location.",
    },
  },
  {
    title: { ru: "Полный образ «под ключ»", en: "Turnkey full look" },
    desc: {
      ru: "Разнообразный штат специалистов берёт на себя все заботы по подбору макияжа, укладки, одежды и прочего в день вашего мероприятия.",
      en: "A diverse team of specialists takes care of makeup, hair, outfit and everything else on the day of your event.",
    },
  },
  {
    title: { ru: "Коммерческие предложения", en: "Commercial packages" },
    desc: {
      ru: "Комфортные пакеты услуг для мероприятий разной величины, бизнес- и творческих интеграций.",
      en: "Convenient service packages for events of any size, business and creative collaborations.",
    },
  },
  {
    title: { ru: "Качественное оборудование", en: "Quality equipment" },
    desc: {
      ru: "Команда выезжает на место с полным набором необходимого оборудования: от профессионального света до отпаривателя одежды.",
      en: "The team arrives fully equipped: from professional lighting to a garment steamer.",
    },
  },
];

export default function ConciergeBenefits() {
  const { lang } = useLang();

  return (
    <section id="about" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1400px]">
        {/* Вступление: слева заголовок и главная мысль крупно, справа текст и поводы */}
        <div className="r-reveal mb-14 grid gap-10 border-t border-[#17191a]/15 pt-10 lg:mb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:pt-14">
          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#17191a]/55">
              {lang === "en" ? "About ÁLIS BEAUTY CONCIERGE" : "О сервисе ÁLIS BEAUTY CONCIERGE"}
            </h2>
            <p className="mt-6 font-serif-display text-[26px] font-normal leading-[1.2] tracking-[0.01em] text-[#17191a] lg:text-[clamp(30px,2.5vw,40px)]">
              {LEAD[lang]}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            {BODY.map((p) => (
              <p key={p.ru} className="mb-4 text-[14px] leading-[1.7] text-[#17191a]/65 last:mb-0 lg:text-[15px]">
                {p[lang]}
              </p>
            ))}
            <ul className="mt-7 flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <li key={o.ru} className="rounded-full border border-[#17191a]/20 px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[#17191a]">
                  {o[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Пять преимуществ: номер, заголовок, описание */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {POINTS.map((pt, i) => (
            <article
              key={pt.title.ru}
              className="r-reveal flex flex-col rounded-[24px] border border-[#17191a]/15 bg-white p-6 lg:p-7"
            >
              <span className="font-serif-display text-[13px] tracking-[0.1em] text-[#17191a]/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif-display text-[15px] font-medium uppercase leading-[1.25] tracking-[0.02em] text-[#17191a] lg:text-[16px]">
                {pt.title[lang]}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-[#17191a]/65">{pt.desc[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
