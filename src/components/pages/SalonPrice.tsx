"use client";
// ПРАЙС САЛОНА — актуальные цены ведём в онлайн-запись YClients (там же выбор
// мастера и времени) + акция на первое посещение. Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function SalonPrice() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <div className="overflow-hidden rounded-[28px] bg-[#3B0D1A] px-7 py-12 text-[#f4efe6] sm:px-10 lg:px-14 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em]">
            {en ? "Prices" : "Прайс"}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-[28px] uppercase tracking-[0.06em] leading-[1.12] lg:text-[42px]">
            {en ? "All prices are in the online booking" : "Актуальные цены — в онлайн-записи"}
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#f4efe6]/75 lg:text-[15px]">
            {en
              ? "Choose a service, master and time — and see the exact price right away. Your first visit is −10%."
              : "Выберите услугу, мастера и время — и сразу увидите точную стоимость. На первое посещение действует скидка −10%."}
          </p>
          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4efe6] px-8 py-4 text-[14px] font-medium uppercase tracking-[0.1em] text-[#3B0D1A] transition-transform duration-300 hover:scale-[1.02]"
          >
            {en ? "See prices & book" : "Смотреть цены и записаться"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
