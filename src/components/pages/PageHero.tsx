"use client";
// Шапка внутренней страницы: эйброу-бейдж, крупный заголовок капителью, подзаголовок.
// Верхний отступ учитывает фиксированную «капсулу»-шапку. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: Loc;
  title: Loc;
  subtitle?: Loc;
}) {
  const { lang } = useLang();
  return (
    <section className="bg-white pt-32 pb-10 lg:pt-40 lg:pb-14">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {eyebrow[lang]}
        </span>
        <h1 className="mt-5 font-display text-[34px] uppercase tracking-[0.06em] leading-[1.08] text-[#3B0D1A] lg:text-[56px]">
          {title[lang]}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#17191a]/60 lg:text-[16px]">
            {subtitle[lang]}
          </p>
        )}
      </div>
    </section>
  );
}
