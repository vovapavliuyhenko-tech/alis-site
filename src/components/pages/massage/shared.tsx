"use client";
// Общие детали клона massage-romanova.ru: ссылка записи, надстрочник+заголовок,
// кнопка «Записаться». Единый стиль по эталону.
import { useLang } from "@/lib/i18n";

export const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

type Loc = { ru: string; en: string };

// Надстрочник (курсивный, приглушённый) + серифный uppercase-заголовок.
export function SectionHead({
  eyebrow,
  title,
  center = true,
  dark = false,
  className = "",
}: {
  eyebrow?: Loc;
  title: Loc;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const { lang } = useLang();
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className={`text-[11px] italic tracking-[0.02em] ${dark ? "text-[#C2C0B6]" : "text-[#70695A]"}`}>
          {eyebrow[lang]}
        </p>
      )}
      <h2
        className={`mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.22] tracking-[0.015em] sm:text-[26px] lg:text-[30px] ${
          dark ? "text-[#EDE9E2]" : "text-[#70695A]"
        }`}
      >
        {title[lang]}
      </h2>
    </div>
  );
}

// Широкая кнопка записи (тёмная заливка) — как в эталоне.
export function BookButton({ label, className = "" }: { label?: Loc; className?: string }) {
  const { lang } = useLang();
  const text = label ? label[lang] : lang === "en" ? "Book now" : "Записаться";
  return (
    <a
      href={YCLIENTS}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-[#3d382f] px-10 py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-[#F4F1EA] transition-colors duration-300 hover:bg-[#2c2822] ${className}`}
    >
      {text}
    </a>
  );
}
