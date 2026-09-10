"use client";
// ФИЛОСОФИЯ САЛОНА — full-screen обложка с ЗАФИКСИРОВАННЫМ фоном (bg-fixed):
// при скролле фото стоит на месте, контент проходит поверх. По центру —
// надстрочник, крупный заголовок, короткое кредо и кнопка с обводкой. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHOTO = "/assets/tild3236-393__.jpg";

export default function Philosophy() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Зафиксированный фон — не двигается при скролле */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${PHOTO})` }}
      />
      {/* Затемнение для читаемости */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />

      {/* Контент */}
      <div className="relative z-10 mx-auto w-[90%] max-w-[720px] text-center text-white">
        <span className="r-reveal inline-block text-[11px] uppercase tracking-[0.34em] text-white/75">
          {en ? "the ÁLIS philosophy" : "философия ÁLIS"}
        </span>

        <h2 className="r-reveal mt-5 font-display text-[34px] font-normal uppercase leading-[1.05] tracking-[0.06em] sm:text-[46px] lg:text-[58px]">
          {en ? "Beauty without the fuss" : "Красота без суеты"}
        </h2>

        <p className="r-reveal mx-auto mt-6 max-w-[560px] text-[13.5px] font-light leading-relaxed text-white/85 lg:text-[15px]">
          {en
            ? "Your whole look — hair, nails, brows, makeup and care — in one pair of hands, in a single visit. No running across town, no trends for their own sake. You leave still yourself, only rested and sure of it."
            : "Весь ваш образ — волосы, ногти, брови, макияж и уход — в одних руках за один визит. Без разъездов по городу и трендов ради трендов. Вы выходите собой, только отдохнувшей и уверенной."}
        </p>

        <a
          href="/salon#uslugi"
          className="r-reveal mt-9 inline-flex items-center justify-center border border-white/80 px-9 py-3.5 text-[12px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-white hover:text-[#17191a]"
        >
          {en ? "Explore services" : "К услугам"}
        </a>
      </div>
    </section>
  );
}
