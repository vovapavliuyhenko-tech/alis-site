"use client";
// Тизер консьерж-сервиса на главной — ведёт на страницу /concierge.
import { useLang } from "@/lib/i18n";

const T = {
  ru: {
    eyebrow: "beauty concierge",
    title: "Персональный бьюти-консьерж\nдля вашего образа под ключ",
    sub: "Подбираем мастеров, планируем образ и тайминг, организуем выезд по России и за рубежом и сопровождаем вас на каждом этапе.",
    cta: "Узнать о консьерже",
    cta2: "Оформить выезд",
  },
  en: {
    eyebrow: "beauty concierge",
    title: "A personal beauty concierge\nfor your look, turnkey",
    sub: "We select artists, plan the look and timing, arrange travel across Russia and abroad, and support you at every step.",
    cta: "About the concierge",
    cta2: "Arrange travel",
  },
};

export default function ConciergeTeaser() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section id="concierge" className="scroll-mt-24 bg-[#17191a] px-4 py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-[#4E2126]/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild3561-646_-2___1__5.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(23,25,26,0.94) 0%, rgba(23,25,26,0.75) 60%, rgba(78,33,38,0.55) 100%)",
          }}
        />
        <div className="relative px-8 py-14 lg:px-16 lg:py-20">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {t.eyebrow}
          </span>
          <h2 className="mt-6 max-w-2xl whitespace-pre-line font-serif text-[30px] leading-[1.1] text-[#f4efe6] lg:text-[48px]">
            {t.title}
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#f4efe6]/70">
            {t.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/concierge"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#4E2126] px-7 py-3.5 text-[14px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
            >
              {t.cta} <span aria-hidden>→</span>
            </a>
            <a
              href="/vyezd"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#f4efe6]/25 px-7 py-3.5 text-[14px] font-medium text-[#f4efe6] transition-colors hover:border-[#f4efe6]/60"
            >
              {t.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
