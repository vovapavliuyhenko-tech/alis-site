"use client";
// Шапка внутренней страницы — editorial: эйброу-бейдж, крупный заголовок
// капителью, подзаголовок, тонкая золотая линия и приглушённое фоновое слово.
// Верхний отступ учитывает фиксированную «капсулу»-шапку. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ghost,
}: {
  eyebrow: Loc;
  title: Loc;
  subtitle?: Loc;
  ghost?: string; // крупное приглушённое слово на фоне (латиница)
}) {
  const { lang } = useLang();
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-12 lg:pt-40 lg:pb-16">
      {ghost && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 top-16 select-none font-display font-semibold leading-none tracking-[0.04em] text-[#3B0D1A]/[0.04] lg:top-20"
          style={{ fontSize: "clamp(6rem, 20vw, 16rem)" }}
        >
          {ghost}
        </span>
      )}
      <div className="relative mx-auto w-[92%] max-w-[1180px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {eyebrow[lang]}
        </span>
        <h1 className="mt-6 font-display text-[36px] uppercase tracking-[0.05em] leading-[1.05] text-[#3B0D1A] lg:text-[64px]">
          {title[lang]}
        </h1>
        <span className="mt-6 block h-px w-16 bg-[#e7c9a0]" />
        {subtitle && (
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#17191a]/60 lg:text-[17px]">
            {subtitle[lang]}
          </p>
        )}
      </div>
    </section>
  );
}
