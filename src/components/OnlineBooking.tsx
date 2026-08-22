"use client";
// ОНЛАЙН-ЗАПИСЬ — реальный виджет YClients через iframe. Встроен «заподлицо»:
// без рамки-карточки, по ширине самого контента виджета и центрирован, чтобы
// выглядел как родная часть страницы, а не «сайт в сайте». Двуязычный заголовок.
// Примечание: содержимое виджета — чужой домен, его шрифты/цвета меняются только
// в админке YClients (Онлайн-запись → оформление), не со стороны нашего сайта.
import { useEffect } from "react";
import { useLang } from "@/lib/i18n";

const YCLIENTS_URL =
  "https://n1054895.yclients.com/company/976464/personal/menu?o=";

export default function OnlineBooking() {
  const { lang } = useLang();

  // YClients при смене шага просит родителя проскроллить к началу виджета —
  // ловим это и мягко подводим страницу к блоку записи.
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("yclients")) return;
      let type = "";
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        type = d?.type || d?.action || "";
      } catch {
        /* строковые сообщения без JSON — игнорируем */
      }
      if (type === "sr") {
        const el = document.getElementById("online");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 90;
          if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <section id="online" className="scroll-mt-24 bg-cream py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1080px]">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-wine px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-cream">
            {lang === "en" ? "online booking" : "онлайн-запись"}
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-ink lg:text-[48px]">
            {lang === "en" ? "Book your visit online" : "Запишитесь онлайн"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink/55">
            {lang === "en"
              ? "Choose a service, an artist and a time that suits you — the schedule is live."
              : "Выберите услугу, мастера и удобное время — расписание актуальное в реальном времени."}
          </p>
        </div>

        {/* Виджет YClients — заподлицо, по ширине контента, без рамки-карточки */}
        <iframe
          src={YCLIENTS_URL}
          title={lang === "en" ? "Online booking — ALIS" : "Онлайн-запись — ALIS"}
          loading="lazy"
          allow="payment"
          className="mx-auto block h-[82vh] min-h-[760px] w-full max-w-[760px] lg:min-h-[960px]"
        />

        {/* Запасная ссылка — если iframe не загрузился */}
        <p className="mt-6 text-center text-[13px] text-ink/50">
          {lang === "en" ? "Booking not loading? " : "Не открывается форма? "}
          <a
            href={YCLIENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-wine underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {lang === "en" ? "Open in a new tab" : "Открыть в новой вкладке"}
          </a>
        </p>
      </div>
    </section>
  );
}
