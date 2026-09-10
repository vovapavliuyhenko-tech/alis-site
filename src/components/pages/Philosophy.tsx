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
            ? "Your whole look in one pair of hands — or we bring the salon to you."
            : "Весь ваш образ в одних руках — или привезём салон к вам."}
        </p>

        <a
          href="/concierge"
          className="r-reveal mt-8 inline-flex items-center justify-center gap-2 rounded-2xl border border-[#f4efe6] bg-[#f4efe6] px-14 py-4 font-display text-[13px] uppercase tracking-[0.14em] text-[#3B0D1A] transition-colors duration-300 hover:bg-transparent hover:text-[#f4efe6] sm:text-[14px]"
        >
          {en ? "beauty concierge" : "бьюти-консьерж"}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
