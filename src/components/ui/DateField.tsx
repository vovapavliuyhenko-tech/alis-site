"use client";
// ПОЛЕ ДАТЫ С КАЛЕНДАРЁМ В СТИЛЕ САЙТА — вместо системного календаря браузера.
// Белая скруглённая плашка, месяц со стрелками, неделя с понедельника, прошедшие дни
// неактивны, выбранный день — чёрный круг, сегодня — тонкое кольцо.
// value / onChange — строка «ГГГГ-ММ-ДД» (как у <input type="date">).
import { useEffect, useRef, useState } from "react";

const MONTHS = {
  ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
const DAYS = { ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] };

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function DateField({
  value,
  onChange,
  lang,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  lang: "ru" | "en";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sel = value ? new Date(value + "T00:00:00") : null;
  const [view, setView] = useState(() => {
    const d = sel || today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const box = useRef<HTMLDivElement>(null);

  // Закрыть по клику мимо и по Esc
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", off);
    window.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); window.removeEventListener("keydown", esc); };
  }, [open]);

  // Сетка месяца: пустые клетки до первого дня (неделя с понедельника)
  const first = (view.getDay() + 6) % 7;
  const total = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: total }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const shift = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={lang === "en" ? "Event date" : "Дата события"}
        className="flex h-[46px] w-full items-center justify-between rounded-[14px] bg-white px-4 text-left text-[13px] sm:h-[48px] sm:rounded-[16px] sm:px-5 sm:text-[15px]"
      >
        <span className={sel ? "text-[#17191a]" : "text-[#17191a]/35"}>
          {sel ? `${pad(sel.getDate())}.${pad(sel.getMonth() + 1)}.${sel.getFullYear()}` : lang === "en" ? "Event date" : "Дата события"}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="text-[#17191a]/45">
          <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
          <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-40 w-[300px] animate-[alis-cal-in_.25s_ease] rounded-[18px] bg-white p-4 text-[#17191a] shadow-[0_24px_60px_-20px_rgba(23,25,26,0.45)] ring-1 ring-[#17191a]/8 sm:w-[320px] sm:p-5">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label={lang === "en" ? "Previous month" : "Предыдущий месяц"} className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#17191a]/5 disabled:opacity-25 disabled:hover:bg-transparent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="font-display text-[13px] uppercase tracking-[0.12em]">{MONTHS[lang][view.getMonth()]} {view.getFullYear()}</span>
            <button type="button" onClick={() => shift(1)} aria-label={lang === "en" ? "Next month" : "Следующий месяц"} className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#17191a]/5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-[10px] uppercase tracking-[0.1em] text-[#17191a]/40">
            {DAYS[lang].map((d) => <span key={d} className="py-1">{d}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
            {cells.map((d, i) => {
              if (!d) return <span key={`e${i}`} />;
              const past = d < today;
              const isSel = !!sel && iso(d) === iso(sel);
              const isToday = iso(d) === iso(today);
              return (
                <button
                  key={iso(d)}
                  type="button"
                  disabled={past}
                  onClick={() => { onChange(iso(d)); setOpen(false); }}
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition-colors ${
                    isSel ? "bg-[#17191a] text-white" : past ? "text-[#17191a]/20" : `hover:bg-[#17191a]/6 ${isToday ? "ring-1 ring-[#17191a]/30" : ""}`
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between border-t border-[#17191a]/8 pt-3 text-[10.5px] uppercase tracking-[0.14em]">
            <button type="button" onClick={() => { onChange(""); setOpen(false); }} className="text-[#17191a]/50 hover:text-[#17191a]">{lang === "en" ? "Clear" : "Очистить"}</button>
            <button type="button" onClick={() => { onChange(iso(today)); setView(new Date(today.getFullYear(), today.getMonth(), 1)); setOpen(false); }} className="text-[#17191a] hover:opacity-70">{lang === "en" ? "Today" : "Сегодня"}</button>
          </div>
        </div>
      )}
      <style>{`@keyframes alis-cal-in { from { opacity: 0; transform: translateY(-6px) scale(.98) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}
