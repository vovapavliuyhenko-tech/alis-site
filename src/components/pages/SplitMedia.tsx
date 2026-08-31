"use client";
// SPLIT-МЕДИА — editorial-блок: крупное фото с одной стороны и текст/буллеты/CTA
// с другой (можно зеркалить). Фото с угловой меткой-тегом. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function SplitMedia({
  eyebrow,
  title,
  text,
  bullets,
  ctaLabel,
  ctaHref,
  external = true,
  image,
  tag,
  mirror = false,
}: {
  eyebrow: Loc;
  title: Loc;
  text?: Loc;
  bullets?: Loc[];
  ctaLabel?: Loc;
  ctaHref?: string;
  external?: boolean;
  image: string;
  tag?: Loc;
  mirror?: boolean;
}) {
  const { lang } = useLang();
  return (
    <section className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className={`mx-auto grid w-[92%] max-w-[1180px] items-center gap-8 lg:grid-cols-2 lg:gap-14 ${mirror ? "" : ""}`}>
        {/* Медиа */}
        <div className={`relative ${mirror ? "lg:order-2" : "lg:order-1"}`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] lg:aspect-[5/6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title[lang]} className="h-full w-full object-cover" />
            {tag && (
              <span className="absolute bottom-4 left-4 rounded-full bg-[#f4efe6]/90 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#3B0D1A] backdrop-blur-sm">
                {tag[lang]}
              </span>
            )}
          </div>
        </div>

        {/* Текст */}
        <div className={mirror ? "lg:order-1" : "lg:order-2"}>
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#4A4B33]">{eyebrow[lang]}</span>
          <h2 className="mt-4 font-display text-[28px] uppercase tracking-[0.05em] leading-[1.1] text-[#3B0D1A] lg:text-[42px]">
            {title[lang]}
          </h2>
          {text && <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#2a2320]/70 lg:text-[16px]">{text[lang]}</p>}
          {bullets && (
            <ul className="mt-6 space-y-3.5">
              {bullets.map((b) => (
                <li key={b.ru} className="flex items-start gap-3 text-[14px] leading-snug text-[#2a2320]/85 lg:text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4A4B33]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f4efe6" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {b[lang]}
                </li>
              ))}
            </ul>
          )}
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group/btn mt-8 inline-flex items-center gap-3 rounded-full bg-[#3B0D1A] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-[#f4efe6] transition-transform duration-300 hover:scale-[1.02]"
            >
              {ctaLabel[lang]}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
