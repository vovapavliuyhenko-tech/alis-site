"use client";
// DARK-STATEMENT — полноэкранная бордовая «заявляющая» секция с крупной
// типографикой (акцентное слово — золотом/оливой), одной кнопкой и свечением.
// Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function DarkStatement({
  eyebrow,
  titleA,
  titleAccent,
  titleB,
  text,
  ctaLabel,
  ctaHref,
  external = true,
  accent = "gold",
}: {
  eyebrow: Loc;
  titleA: Loc;
  titleAccent: Loc;
  titleB?: Loc;
  text?: Loc;
  ctaLabel?: Loc;
  ctaHref?: string;
  external?: boolean;
  accent?: "gold" | "olive";
}) {
  const { lang } = useLang();
  const accentColor = accent === "gold" ? "text-[#e7c9a0]" : "text-[#9ea05f]";
  return (
    <section className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <div className="relative overflow-hidden rounded-[32px] bg-[#3B0D1A] px-7 py-16 text-[#f4efe6] sm:px-10 lg:px-16 lg:py-24">
          <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#e7c9a0]/10 blur-[90px]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#4A4B33]/25 blur-[90px]" />
          <div className="relative max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#e7c9a0]">{eyebrow[lang]}</span>
            <h2 className="mt-5 font-display text-[30px] uppercase leading-[1.08] tracking-[0.04em] lg:text-[54px]">
              {titleA[lang]} <span className={accentColor}>{titleAccent[lang]}</span>
              {titleB ? <> {titleB[lang]}</> : null}
            </h2>
            {text && <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-[#f4efe6]/75 lg:text-[16px]">{text[lang]}</p>}
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group/btn mt-9 inline-flex items-center gap-3 rounded-full bg-[#f4efe6] px-8 py-4 text-[14px] font-medium uppercase tracking-[0.1em] text-[#3B0D1A] transition-transform duration-300 hover:scale-[1.02]"
              >
                {ctaLabel[lang]}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
