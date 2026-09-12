"use client";
// ФИЛОСОФИЯ САЛОНА — full-screen обложка с ЗАФИКСИРОВАННЫМ фоном (bg-fixed):
// при скролле фото стоит на месте, контент проходит поверх. По центру —
// надстрочник, заголовок, короткое кредо и кнопка — в стиле сайта. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHOTO = "/assets/tild3236-393__.jpg";

export default function Philosophy() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {/* Зафиксированный фон — не двигается при скролле */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PHOTO})` }}
      />
      {/* Затемнение для читаемости */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />

      {/* Контент — раскладка и ритм как в Hero */}
      <div className="relative z-10 mx-auto flex w-[90%] max-w-2xl flex-col items-center text-center text-white">
        <p className="r-reveal text-[10px] lowercase tracking-[0.05em] text-white/75">
          {en ? "the ÁLIS philosophy" : "философия ÁLIS"}
        </p>

        <h2 className="r-reveal mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-white lg:text-[28px]">
          {en ? "Beauty without the fuss" : "Красота без суеты"}
        </h2>

        <p className="r-reveal mt-5 max-w-md text-[12.5px] leading-relaxed text-white/80 sm:text-[13.5px]">
          {en
            ? "Your whole look — in one pair of hands. No rush, no running around, no compromises."
            : "Весь ваш образ — в одних руках. Без спешки, без беготни, без компромиссов."}
        </p>

        <a
          href="#services"
          className="r-reveal mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-[#6E7248] px-12 py-4 text-[12px] font-medium uppercase tracking-[0.08em] text-[#F4F1EA] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:backdrop-blur-md sm:text-[13px]"
        >
          {en ? "view services" : "смотреть услуги"}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
