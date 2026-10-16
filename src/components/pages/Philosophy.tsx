"use client";
// БЛОК «КОНСЬЕРЖ» на главной — full-screen обложка с ЗАФИКСИРОВАННЫМ фоном (bg-fixed):
// при скролле фото стоит на месте, контент проходит поверх. По центру —
// крупный заголовок и кнопка перехода на страницу бьюти-консьержа. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHOTO = "/assets/alis/img_6009.jpg";

export default function Philosophy() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {/* Зафиксированный фон — фото стоит на месте, контент проходит поверх при скролле */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${PHOTO})` }}
      />
      {/* Затемнение для читаемости */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />

      <div className="relative z-10 mx-auto flex w-[90%] max-w-[1100px] flex-col items-center text-center text-white">
        <h2 className="r-reveal font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.05em] text-white sm:text-[26px] lg:text-[clamp(26px,2.1vw,36px)]">
          {en ? "A beauty salon" : "Салон красоты там,"}
          <br />
          {en ? "wherever suits you" : "где вам удобно"}
        </h2>

        <a
          href="/concierge"
          className="r-reveal mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/[0.18] px-10 py-4 text-[13px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#17191a] lg:mt-8"
        >
          {en ? "All about the ÁLIS BEAUTY concierge service" : "Всё о консьерж-сервисе от ÁLIS BEAUTY"}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
