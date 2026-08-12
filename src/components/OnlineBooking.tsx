"use client";
// ОНЛАЙН-ЗАПИСЬ — реальный виджет YClients, встроенный через iframe. Клиент
// выбирает услугу, мастера и время прямо на сайте. Двуязычный заголовок.
import { useLang } from "@/lib/i18n";

const YCLIENTS_URL =
  "https://n1054895.yclients.com/company/976464/personal/menu?o=";

export default function OnlineBooking() {
  const { lang } = useLang();
  return (
    <section id="online" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1080px]">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {lang === "en" ? "online booking" : "онлайн-запись"}
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#17191a] lg:text-[48px]">
            {lang === "en" ? "Book your visit online" : "Запишитесь онлайн"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#17191a]/55">
            {lang === "en"
              ? "Choose a service, an artist and a time that suits you — the schedule is live."
              : "Выберите услугу, мастера и удобное время — расписание актуальное в реальном времени."}
          </p>
        </div>

        {/* Виджет YClients */}
        <div className="overflow-hidden rounded-[26px] border border-[#17191a]/10 bg-white shadow-[0_10px_40px_rgba(23,25,26,0.08)]">
          <iframe
            src={YCLIENTS_URL}
            title={lang === "en" ? "Online booking — ALIS" : "Онлайн-запись — ALIS"}
            loading="lazy"
            allow="payment"
            className="h-[78vh] min-h-[640px] w-full lg:min-h-[860px]"
          />
        </div>

        {/* Запасная ссылка — если iframe не загрузился */}
        <p className="mt-5 text-center text-[13px] text-[#17191a]/50">
          {lang === "en" ? "Booking not loading? " : "Не открывается форма? "}
          <a
            href={YCLIENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4E2126] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {lang === "en" ? "Open in a new tab" : "Открыть в новой вкладке"}
          </a>
        </p>
      </div>
    </section>
  );
}
