"use client";
// Календарь в стиле сайта (вместо системного input type="date"): месяц со стрелками,
// дни недели с понедельника, прошедшие дни неактивны, сегодня — бордовое кольцо,
// выбранный день — бордовая заливка. onPick получает дату в формате ГГГГ-ММ-ДД.
import { useState } from "react";

const WD = { ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] };

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function MiniCalendar({
  value,
  onPick,
  lang = "ru",
}: {
  value?: string;
  onPick: (isoDate: string) => void;
  lang?: "ru" | "en";
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(() => {
    const d = value ? new Date(value + "T12:00:00") : today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = view.getFullYear();
  const month = view.getMonth();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // сдвиг под понедельник
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1)),
  ];
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const title = view.toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU", { month: "long", year: "numeric" });

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full text-[#17191a] transition-colors hover:bg-[#46131E]/[0.08] hover:text-[#46131E] disabled:pointer-events-none disabled:opacity-25";

  return (
    <div className="rounded-[12px] border border-[#17191a]/10 bg-white p-3 shadow-[inset_0_3px_0_#46131E]">
      <div className="mb-2 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setView(new Date(year, month - 1, 1))}
          disabled={isCurrentMonth}
          aria-label={lang === "en" ? "Previous month" : "Предыдущий месяц"}
          className={arrow}
        >
          ‹
        </button>
        <span className="text-[14px] font-medium capitalize text-[#17191a]">{title}</span>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          aria-label={lang === "en" ? "Next month" : "Следующий месяц"}
          className={arrow}
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-center">
        {WD[lang].map((w, i) => (
          <span key={w} className={`pb-1.5 text-[11px] uppercase tracking-[0.08em] ${i > 4 ? "text-[#46131E]/70" : "text-[#17191a]/45"}`}>
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const past = d < today;
          const key = iso(d);
          const selected = key === value;
          const isToday = d.getTime() === today.getTime();
          return (
            <button
              key={key}
              type="button"
              disabled={past}
              onClick={() => onPick(key)}
              aria-pressed={selected}
              aria-label={d.toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU", { day: "numeric", month: "long" })}
              className={`mx-auto my-0.5 flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition-colors ${
                selected
                  ? "bg-[#17191a] text-white"
                  : past
                    ? "cursor-default text-[#17191a]/20"
                    : `text-[#17191a] hover:bg-[#46131E]/[0.08] hover:text-[#46131E] ${isToday ? "ring-1 ring-[#46131E]" : ""}`
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
