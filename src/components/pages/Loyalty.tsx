"use client";
// ЛОЯЛЬНОСТЬ — editorial-список привилегий с крупными золотыми номерами на креме.
// Базовые условия сейчас; программу дополним, когда пришлёте. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Perk = { title: Loc; desc: Loc };

const PERKS: Perk[] = [
  {
    title: { ru: "−10% на первое посещение", en: "−10% on your first visit" },
    desc: { ru: "Скидка на услуги при первом визите — попробуйте сервис ÁLIS выгоднее.", en: "A discount on your first visit — try ÁLIS on better terms." },
  },
  {
    title: { ru: "Забота о постоянных гостьях", en: "Care for regular guests" },
    desc: { ru: "Приятные бонусы и внимание к деталям для тех, кто с нами постоянно.", en: "Nice perks and attention to detail for those who stay with us." },
  },
  {
    title: { ru: "Подарочные сертификаты", en: "Gift certificates" },
    desc: { ru: "Дарите красоту ÁLIS близким — сертификат на любую услугу или сумму.", en: "Give the gift of ÁLIS — a certificate for any service or amount." },
  },
];

export default function Loyalty() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="scroll-mt-24 bg-white py-24 lg:py-28">
      <div className="mx-auto grid w-[92%] max-w-[1200px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "Loyalty" : "Лояльность"}
          </span>
          <h2 className="mt-5 font-display text-[30px] font-normal uppercase tracking-[0.05em] leading-[1.12] text-[#3B0D1A] lg:text-[44px]">
            {en ? "We value those who value themselves" : "Ценим тех, кто ценит себя"}
          </h2>
          <span className="mt-6 block h-px w-16 bg-[#e7c9a0]" />
        </div>
        <div>
          {PERKS.map((p, i) => (
            <div key={p.title.ru} className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-[#3B0D1A]/12 py-6 first:border-t-0 first:pt-0 lg:gap-8 lg:py-7">
              <span className="font-display text-[34px] leading-none text-[#e7c9a0] lg:text-[52px]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[18px] uppercase tracking-[0.04em] text-[#2a2320] lg:text-[22px]">{p.title[lang]}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#2a2320]/65 lg:text-[15px]">{p.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
