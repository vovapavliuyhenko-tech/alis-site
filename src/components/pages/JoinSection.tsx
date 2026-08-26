"use client";
// Универсальная секция «присоединяйтесь» (вакансии / стать мастером): заголовок,
// текст, буллеты и CTA-контакты (Instagram / телефон). Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const PHONE_SALON = "+7 988 888 77 58";
const IG = "https://www.instagram.com/alisbeauty.ru";

export default function JoinSection({
  eyebrow,
  title,
  subtitle,
  bullets,
  dark = false,
}: {
  eyebrow: Loc;
  title: Loc;
  subtitle: Loc;
  bullets: Loc[];
  dark?: boolean;
}) {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, enn: string) => (en ? enn : ru);

  return (
    <section className={`scroll-mt-24 py-16 lg:py-24 ${dark ? "bg-white" : "bg-white"}`}>
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <div className={`overflow-hidden rounded-[28px] px-7 py-12 sm:px-10 lg:px-14 lg:py-16 ${dark ? "bg-[#3B0D1A] text-[#f4efe6]" : "border border-[#17191a]/10 bg-[#faf7f2] text-[#2a2320]"}`}>
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] ${dark ? "bg-[#4A4B33]/25 text-[#f4efe6]" : "bg-[#4A4B33]/12 text-[#4A4B33]"}`}>
            {eyebrow[lang]}
          </span>
          <h2 className={`mt-5 max-w-2xl font-display text-[28px] uppercase tracking-[0.06em] leading-[1.12] lg:text-[42px] ${dark ? "" : "text-[#3B0D1A]"}`}>
            {title[lang]}
          </h2>
          <p className={`mt-4 max-w-2xl text-[14px] leading-relaxed lg:text-[15px] ${dark ? "text-[#f4efe6]/75" : "text-[#2a2320]/75"}`}>
            {subtitle[lang]}
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b.ru} className={`flex items-start gap-3 text-[14px] leading-snug ${dark ? "text-[#f4efe6]/90" : "text-[#2a2320]/85"}`}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4A4B33]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f4efe6" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {b[lang]}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={IG}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-transform duration-300 hover:scale-[1.02] ${dark ? "bg-[#f4efe6] text-[#3B0D1A]" : "bg-[#3B0D1A] text-[#f4efe6]"}`}
            >
              {t("Написать в Instagram", "Message on Instagram")}
            </a>
            <a href={`tel:${PHONE_SALON.replace(/[^\d+]/g, "")}`} className={`text-[13px] ${dark ? "text-[#f4efe6]/70" : "text-[#2a2320]/60"}`}>
              {t("или позвонить", "or call")} {PHONE_SALON}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
