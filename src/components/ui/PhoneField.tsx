"use client";
// ПОЛЕ ТЕЛЕФОНА С ВЫБОРОМ СТРАНЫ — флаг + стрелка слева, код страны и номер по маске.
// Россия/Казахстан (+7): +7 (000) 000-00-00; остальные страны — цифры группами.
// value — полный номер с кодом («+7 (918) 000-00-00», «+375 29 000 00 00»).
import { useEffect, useRef, useState } from "react";

type Country = { iso: string; code: string; ru: string; en: string };

export const COUNTRIES: Country[] = [
  { iso: "ru", code: "7", ru: "Россия", en: "Russia" },
  { iso: "kz", code: "7", ru: "Казахстан", en: "Kazakhstan" },
  { iso: "by", code: "375", ru: "Беларусь", en: "Belarus" },
  { iso: "am", code: "374", ru: "Армения", en: "Armenia" },
  { iso: "ge", code: "995", ru: "Грузия", en: "Georgia" },
  { iso: "az", code: "994", ru: "Азербайджан", en: "Azerbaijan" },
  { iso: "uz", code: "998", ru: "Узбекистан", en: "Uzbekistan" },
  { iso: "kg", code: "996", ru: "Киргизия", en: "Kyrgyzstan" },
  { iso: "tr", code: "90", ru: "Турция", en: "Turkey" },
  { iso: "ae", code: "971", ru: "ОАЭ", en: "UAE" },
  { iso: "de", code: "49", ru: "Германия", en: "Germany" },
  { iso: "fr", code: "33", ru: "Франция", en: "France" },
  { iso: "it", code: "39", ru: "Италия", en: "Italy" },
  { iso: "es", code: "34", ru: "Испания", en: "Spain" },
  { iso: "gb", code: "44", ru: "Великобритания", en: "United Kingdom" },
  { iso: "us", code: "1", ru: "США", en: "USA" },
];

// Маска номера (без кода страны)
function mask(code: string, digits: string): string {
  if (code === "7") {
    const p = digits.slice(0, 10);
    let out = "";
    if (p.length > 0) out += "(" + p.slice(0, 3);
    if (p.length >= 3) out += ")";
    if (p.length > 3) out += " " + p.slice(3, 6);
    if (p.length > 6) out += "-" + p.slice(6, 8);
    if (p.length > 8) out += "-" + p.slice(8, 10);
    return out;
  }
  return (digits.slice(0, 12).match(/.{1,3}/g) || []).join(" ");
}

// Сколько цифр номера (без кода) нужно, чтобы считать его полным
export function phoneComplete(value: string): boolean {
  const d = value.replace(/\D/g, "");
  return value.startsWith("+7") ? d.length === 11 : d.length >= 8;
}

export default function PhoneField({
  value,
  onChange,
  lang,
  error,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  lang: "ru" | "en";
  error?: boolean;
  className?: string;
}) {
  const [c, setC] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // Номер без кода страны — то, что видно в поле
  const local = value.startsWith(`+${c.code}`) ? value.slice(c.code.length + 1).trim() : "";

  // Закрыть список по клику мимо
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", off);
    return () => document.removeEventListener("mousedown", off);
  }, [open]);

  const setLocal = (raw: string, country = c) => {
    let d = raw.replace(/\D/g, "");
    // Вставили номер с 8/7 в начале для России — убираем лишнюю цифру
    if (country.code === "7" && d.length === 11 && (d[0] === "8" || d[0] === "7")) d = d.slice(1);
    onChange(d ? `+${country.code} ${mask(country.code, d)}` : "");
  };

  return (
    <div ref={box} className={`relative flex h-[48px] items-center rounded-[14px] bg-white sm:h-[54px] sm:rounded-[16px] ${error ? "ring-1 ring-[#c0392b]" : ""} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={lang === "en" ? "Choose country" : "Выбрать страну"}
        aria-expanded={open}
        className="flex h-full shrink-0 items-center gap-1.5 pl-4 pr-2 sm:pl-5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w40/${c.iso}.png`} alt="" width={22} height={15} className="h-[15px] w-[22px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={`text-[#17191a]/45 transition-transform ${open ? "rotate-180" : ""}`}><path d="M1.5 3.5L5 7l3.5-3.5" fill="currentColor" /></svg>
      </button>
      <span className="shrink-0 pr-1.5 text-[13px] text-[#17191a]/70 sm:text-[15px]">+{c.code}</span>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        aria-label={lang === "en" ? "Phone" : "Телефон"}
        placeholder={c.code === "7" ? "(000) 000-00-00" : "000 000 000"}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="h-full min-w-0 flex-1 rounded-r-[16px] bg-transparent pr-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/30 sm:text-[15px] autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:[-webkit-text-fill-color:#17191a]"
      />

      {open && (
        <ul role="listbox" className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-[260px] w-[240px] overflow-y-auto rounded-[14px] border border-[#17191a]/10 bg-white py-1.5 shadow-[0_18px_40px_-16px_rgba(23,25,26,0.3)]">
          {COUNTRIES.map((k) => (
            <li key={k.iso}>
              <button
                type="button"
                role="option"
                aria-selected={k.iso === c.iso}
                onClick={() => { setC(k); setOpen(false); setLocal(local, k); }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] hover:bg-[#17191a]/5 ${k.iso === c.iso ? "bg-[#17191a]/5" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://flagcdn.com/w40/${k.iso}.png`} alt="" width={20} height={14} loading="lazy" className="h-[14px] w-[20px] rounded-[2px] object-cover" />
                <span className="flex-1 text-[#17191a]">{k[lang]}</span>
                <span className="text-[#17191a]/45">+{k.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
