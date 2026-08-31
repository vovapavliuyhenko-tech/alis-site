"use client";
// STEPS/NUMBERED — editorial-список с крупными серифными номерами 01–0N и
// тонкими разделителями. Для процессов, программ, форматов. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Step = { title: Loc; desc: Loc };

export default function StepsList({
  eyebrow,
  title,
  steps,
  tone = "light",
}: {
  eyebrow: Loc;
  title: Loc;
  steps: Step[];
  tone?: "light" | "cream";
}) {
  const { lang } = useLang();
  const bg = tone === "cream" ? "bg-[#faf7f2]" : "bg-white";
  return (
    <section className={`scroll-mt-24 ${bg} py-16 lg:py-24`}>
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#4A4B33]">{eyebrow[lang]}</span>
          <h2 className="mt-4 font-display text-[28px] uppercase tracking-[0.05em] leading-[1.1] text-[#3B0D1A] lg:text-[44px]">
            {title[lang]}
          </h2>
        </div>
        <div className="mt-10 lg:mt-14">
          {steps.map((s, i) => (
            <div
              key={s.title.ru}
              className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-[#17191a]/12 py-7 lg:grid-cols-[120px_1fr] lg:gap-10 lg:py-9"
            >
              <span className="font-display text-[38px] leading-none text-[#4A4B33] lg:text-[64px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-[19px] uppercase tracking-[0.04em] text-[#2a2320] lg:text-[24px]">{s.title[lang]}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[#2a2320]/65 lg:text-[15px]">{s.desc[lang]}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-[#17191a]/12" />
        </div>
      </div>
    </section>
  );
}
