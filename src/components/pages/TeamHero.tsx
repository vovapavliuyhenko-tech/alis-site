"use client";
// ГЕРОЙ СТРАНИЦЫ КОМАНДЫ — сплит по мотивам PALOMA: слева фото, справа кремовая
// панель (лого-надстрочник, крупный заголовок, подзаголовок, кнопка). Блок
// ЗАКРЕПЛЁН (sticky) — следующий блок наезжает поверх него при скролле. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHOTO = "/assets/tild3236-393__.jpg";

export default function TeamHero() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section
      data-hide-fab
      className="sticky top-0 z-0 grid h-svh min-h-[600px] grid-cols-1 overflow-hidden lg:grid-cols-2"
    >
      {/* Левая половина — фото */}
      <div className="relative hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHOTO} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Правая половина — кремовая панель с текстом */}
      <div className="relative flex flex-col items-center justify-center bg-[#f4efe6] px-8 py-24 text-center lg:px-16">
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#4A4B33]">
          {en ? "the ÁLIS team" : "команда ÁLIS"}
        </span>

        <h1 className="mt-6 max-w-[15ch] font-display text-[26px] font-normal uppercase leading-[1.12] tracking-[0.02em] text-[#3B0D1A] sm:text-[32px] lg:text-[40px]">
          {en ? "Masters you trust with your look" : "Мастера, которым доверяют образ"}
        </h1>

        <p className="mt-6 max-w-md text-[13px] leading-relaxed text-[#2a2320]/70 sm:text-[14px]">
          {en
            ? "Colourists, nail artists, brow and makeup masters who work in 4–6 hands and build a complete look in a single visit."
            : "Колористы, нейл-мастера, бровисты и визажисты, которые работают в 4–6 рук и собирают полный образ за один визит."}
        </p>

        <a
          href="#vacancies"
          className="mt-10 inline-flex items-center justify-center rounded-2xl border border-[#3B0D1A] bg-[#3B0D1A] px-12 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A] sm:text-[14px]"
        >
          {en ? "our masters" : "наши мастера"}
        </a>
      </div>
    </section>
  );
}
