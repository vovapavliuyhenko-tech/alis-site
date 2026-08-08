"use client";
// КОНСЬЕРЖ — контент отдельной страницы /concierge. Сильный первый экран,
// направления сервиса и этапы работы. Двуязычно (RU/EN). Тексты — заглушки.
import { useLang } from "@/lib/i18n";

const T = {
  ru: {
    eyebrow: "ALIS beauty concierge",
    title: "Персональный beauty-консьерж\nдля вашего образа — где бы вы ни были",
    sub: "Берём на себя весь бьюти-процесс: подбираем мастеров, планируем образ и тайминг, организуем выезд и сопровождаем вас на каждом этапе — в городе, на природе и за рубежом.",
    cta1: "Оставить заявку",
    cta2: "Оформить выезд",
    dirEyebrow: "направления",
    dirTitle: "Что берём на себя",
    directions: [
      { t: "Подбор мастеров", d: "Собираем команду под задачу: визажисты, стилисты, парикмахеры — проверенные и с нужным опытом." },
      { t: "Планирование образа", d: "Продумываем образ заранее: референсы, пробные примерки, косметика и детали под событие." },
      { t: "Организация выезда", d: "Логистика по России и за рубежом: трансфер, размещение мастеров, тайминг под ваш график." },
      { t: "Сопровождение на событии", d: "Мастер рядом весь день: правки образа, помощь между выходами, забота о каждой мелочи." },
      { t: "Тайм-менеджмент", d: "Держим график события минута в минуту — от подготовки до финального кадра." },
      { t: "Индивидуальный подход", d: "Каждый проект — под ключ и под вас: от камерной съёмки до масштабного торжества." },
    ],
    stepEyebrow: "как мы работаем",
    stepTitle: "Четыре шага до безупречного образа",
    steps: [
      { n: "01", t: "Заявка и бриф", d: "Обсуждаем повод, формат, даты и пожелания. Понимаем задачу целиком." },
      { n: "02", t: "Подбор и смета", d: "Собираем команду, считаем бюджет и присылаем прозрачную смету." },
      { n: "03", t: "Подготовка", d: "Пробные образы, закупка материалов, логистика и финальный тайминг." },
      { n: "04", t: "Событие под ключ", d: "Приезжаем, работаем и сопровождаем вас до последнего момента." },
    ],
    finalTitle: "Готовы обсудить ваш проект?",
    finalSub: "Оставьте заявку — вернёмся с предложением и сметой в течение дня.",
    finalCta: "Обсудить проект",
  },
  en: {
    eyebrow: "ALIS beauty concierge",
    title: "A personal beauty concierge\nfor your look — wherever you are",
    sub: "We take on the entire beauty process: selecting artists, planning the look and timing, arranging travel and supporting you at every step — in the city, outdoors and abroad.",
    cta1: "Send a request",
    cta2: "Arrange travel",
    dirEyebrow: "what we do",
    dirTitle: "What we take care of",
    directions: [
      { t: "Artist selection", d: "We assemble a team for the task: makeup artists, stylists, hair — trusted and experienced." },
      { t: "Look planning", d: "We plan the look in advance: references, trials, cosmetics and details for your event." },
      { t: "Travel arrangement", d: "Logistics across Russia and abroad: transfers, artist accommodation, timing around your schedule." },
      { t: "On-event support", d: "An artist by your side all day: touch-ups, help between appearances, care for every detail." },
      { t: "Time management", d: "We keep the event schedule to the minute — from prep to the final frame." },
      { t: "Bespoke approach", d: "Every project is turnkey and tailored to you: from an intimate shoot to a grand celebration." },
    ],
    stepEyebrow: "how we work",
    stepTitle: "Four steps to a flawless look",
    steps: [
      { n: "01", t: "Request & brief", d: "We discuss the occasion, format, dates and wishes — grasping the task in full." },
      { n: "02", t: "Selection & quote", d: "We assemble the team, estimate the budget and send a transparent quote." },
      { n: "03", t: "Preparation", d: "Trial looks, sourcing materials, logistics and the final timing." },
      { n: "04", t: "Turnkey event", d: "We arrive, work and support you until the very last moment." },
    ],
    finalTitle: "Ready to discuss your project?",
    finalSub: "Send a request — we'll come back with a proposal and a quote within a day.",
    finalCta: "Discuss the project",
  },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
      {children}
    </span>
  );
}

export default function Concierge() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <main className="bg-[#17191a] text-[#f4efe6]">
      {/* Первый экран */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild6536-613_-2___1__4.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(23,25,26,0.92) 0%, rgba(23,25,26,0.7) 55%, rgba(23,25,26,0.4) 100%)",
          }}
        />
        <div className="relative mx-auto w-[92%] max-w-[1200px] pt-28">
          <Pill>{t.eyebrow}</Pill>
          <h1 className="mt-6 max-w-4xl whitespace-pre-line font-serif text-[38px] leading-[1.08] text-[#f4efe6] lg:text-[64px]">
            {t.title}
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[#f4efe6]/70 lg:text-[17px]">
            {t.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/#booking"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#4E2126] px-7 py-3.5 text-[14px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
            >
              {t.cta1} <span aria-hidden>→</span>
            </a>
            <a
              href="/#booking"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#f4efe6]/25 px-7 py-3.5 text-[14px] font-medium text-[#f4efe6] transition-colors hover:border-[#f4efe6]/60"
            >
              {t.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* Направления */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <Pill>{t.dirEyebrow}</Pill>
          <h2 className="mt-5 max-w-2xl font-serif text-[30px] leading-[1.1] text-[#f4efe6] lg:text-[46px]">
            {t.dirTitle}
          </h2>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {t.directions.map((d, i) => (
              <div key={i} className="border-t border-[#4E2126]/50 pt-6">
                <span className="rounded-md bg-[#4E2126] px-2 py-1 text-[11px] font-medium tabular-nums text-[#f4efe6]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-[22px] leading-tight text-[#f4efe6] lg:text-[26px]">
                  {d.t}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#f4efe6]/60">
                  {d.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Этапы */}
      <section className="border-t border-[#f4efe6]/10 py-24 lg:py-32">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <Pill>{t.stepEyebrow}</Pill>
          <h2 className="mt-5 max-w-2xl font-serif text-[30px] leading-[1.1] text-[#f4efe6] lg:text-[46px]">
            {t.stepTitle}
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s) => (
              <div key={s.n} className="rounded-[20px] border border-[#4E2126]/45 bg-[#4E2126]/10 p-7">
                <span className="font-serif text-[40px] leading-none text-[#4E2126]">
                  {s.n}
                </span>
                <h3 className="mt-5 font-serif text-[20px] text-[#f4efe6] lg:text-[23px]">
                  {s.t}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#f4efe6]/60">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto w-[92%] max-w-[880px] rounded-[28px] border border-[#4E2126]/50 bg-[#4E2126]/10 px-8 py-16 text-center lg:px-16">
          <h2 className="mx-auto max-w-xl font-serif text-[30px] leading-[1.1] text-[#f4efe6] lg:text-[44px]">
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#f4efe6]/65">
            {t.finalSub}
          </p>
          <a
            href="/#booking"
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#4E2126] px-8 py-3.5 text-[14px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
          >
            {t.finalCta} <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
