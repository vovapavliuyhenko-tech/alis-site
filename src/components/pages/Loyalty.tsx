"use client";
// ЛОЯЛЬНОСТЬ — программа для гостей. Пока на сайте базовые условия (акция на
// первое посещение), остальное дополним, когда пришлёте программу. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Perk = { title: Loc; desc: Loc };

const PERKS: Perk[] = [
  {
    title: { ru: "−10% на первое посещение", en: "−10% on your first visit" },
    desc: { ru: "Скидка на услуги при первом визите — попробуйте сервис ÁLIS выгоднее.", en: "A discount on services on your first visit — try ÁLIS on better terms." },
  },
  {
    title: { ru: "Забота о постоянных гостьях", en: "Care for regular guests" },
    desc: { ru: "Приятные бонусы и внимание к деталям для тех, кто с нами постоянно.", en: "Nice perks and attention to detail for those who stay with us." },
  },
  {
    title: { ru: "Подарочные сертификаты", en: "Gift certificates" },
    desc: { ru: "Дарите красоту ÁLIS близким — сертификат на любую услугу или сумму.", en: "Give the gift of ÁLIS beauty — a certificate for any service or amount." },
  },
];

export default function Loyalty() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {en ? "Loyalty" : "Лояльность"}
        </span>
        <h2 className="mt-5 max-w-2xl font-display text-[28px] uppercase tracking-[0.06em] leading-[1.12] text-[#3B0D1A] lg:text-[42px]">
          {en ? "We value those who value themselves" : "Ценим тех, кто ценит себя"}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {PERKS.map((p) => (
            <div key={p.title.ru} className="rounded-[20px] border border-[#17191a]/8 bg-white p-6 shadow-[0_10px_40px_rgba(23,25,26,0.06)] lg:p-7">
              <h3 className="font-display text-[18px] uppercase tracking-[0.04em] text-[#2a2320]">{p.title[lang]}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#2a2320]/75">{p.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
