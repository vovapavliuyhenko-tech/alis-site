"use client";
// ФИЛОСОФИЯ САЛОНА — full-screen обложка с ЗАФИКСИРОВАННЫМ фоном (bg-fixed):
// при скролле фото стоит на месте, контент проходит поверх. По центру —
// надстрочник, заголовок, короткое кредо и кнопка — в стиле сайта. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHOTO = "/assets/tild3236-393__.jpg";
const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function Philosophy() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {/* Зафиксированный фон — не двигается при скролле */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${PHOTO})` }}
      />
      {/* Затемнение для читаемости */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />

      {/* Контент — раскладка и ритм как в Hero */}
      <div className="relative z-10 mx-auto flex w-[90%] max-w-2xl flex-col items-center text-center text-white">
        <p className="r-reveal text-[11px] font-medium uppercase tracking-[0.24em] text-white/75 sm:text-[12px]">
          {en ? "the ÁLIS philosophy" : "философия ÁLIS"}
        </p>

        <h2 className="r-reveal mt-4 font-display text-[22px] font-normal uppercase leading-[1.1] tracking-[0.02em] sm:text-[30px] lg:text-[38px]">
          {en ? "Beauty without the fuss" : "Красота без суеты"}
        </h2>

        <p className="r-reveal mt-5 max-w-md text-[12.5px] leading-relaxed text-white/80 sm:text-[13.5px]">
          {en
            ? "Your whole look — hair, nails, brows, makeup and care — in one pair of hands, in a single visit. No running across town, no trends for their own sake."
            : "Весь ваш образ — волосы, ногти, брови, макияж и уход — в одних руках за один визит. Без разъездов по городу и трендов ради трендов."}
        </p>

        {/* Бьюти-консьерж — краткая инфа + переход */}
        <p className="r-reveal mt-4 max-w-md text-[12.5px] leading-relaxed text-white/65 sm:text-[13px]">
          {en
            ? "No time to come in? The ÁLIS beauty concierge brings the salon to you — at home, at a hotel or on set."
            : "Некогда приехать? Бьюти-консьерж ÁLIS привезёт салон к вам — домой, в отель или на съёмку."}
        </p>

        <div className="r-reveal mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-[#f4efe6] bg-[#f4efe6] px-12 py-4 font-display text-[13px] uppercase tracking-[0.14em] text-[#3B0D1A] transition-colors duration-300 hover:bg-transparent hover:text-[#f4efe6] sm:w-auto sm:text-[14px]"
          >
            {en ? "book now" : "записаться"}
          </a>
          <a
            href="/concierge"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#f4efe6]/70 px-12 py-4 font-display text-[13px] uppercase tracking-[0.14em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#f4efe6] hover:text-[#3B0D1A] sm:w-auto sm:text-[14px]"
          >
            {en ? "beauty concierge" : "бьюти-консьерж"}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
