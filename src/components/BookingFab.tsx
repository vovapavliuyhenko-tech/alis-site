"use client";
// Плавающая круглая кнопка «Онлайн запись» → YClients. На первом блоке любой
// страницы скрыта, появляется после прокрутки; пульсирует и излучает кольца. Над
// тёмным футером инвертирует цвет (кремовая с тёмным текстом). Скрыта на /concierge.
// Над ней — круглая кнопка «Связаться» (позвонить / написать нам): не все любят YCLIENTS.
// Пока открыта плашка cookie (html.cookie-open), кнопка поднимается над ней — см. globals.css.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
// Для тех, кто не хочет записываться через YCLIENTS: звонок или сообщение в салон
const PHONE_RAW = "79888887758";

export default function BookingFab() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [shown, setShown] = useState(false);
  const [onFooter, setOnFooter] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const update = () => {
      // Скрываем кнопку на первом блоке любой страницы: первый <section> в <main>
      // или блок с data-hide-fab (пиннинг-герой) — что встречается раньше.
      // Кнопка появляется, когда первый блок почти ушёл из кадра.
      const firstBlock = document.querySelector("main section, [data-hide-fab]");
      const overFirst = firstBlock
        ? firstBlock.getBoundingClientRect().bottom > window.innerHeight * 0.6
        : window.scrollY < window.innerHeight * 0.7;
      const footer = document.getElementById("footer");
      const fh = footer ? footer.offsetHeight : 0;
      const docH = document.documentElement.scrollHeight;
      const revealed = window.scrollY + window.innerHeight - (docH - fh);
      setOnFooter(revealed > 90);
      // В самом низу страницы прячем кнопку — иначе она закрывает ссылки нижней строки подвала
      const atEnd = window.scrollY + window.innerHeight >= docH - 140;
      setShown(!overFirst && !atEnd);
      if (overFirst || atEnd) setMenu(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // На консьерж-сервисе свой помощник, в рабочих панелях кнопка записи не нужна
  if (pathname === "/concierge" || pathname.startsWith("/crm") || pathname.startsWith("/admin")) return null;

  const ringColor = onFooter ? "#f4efe6" : "#46131E";

  return (
    <div
      className={`booking-fab fixed bottom-5 right-5 z-40 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* «Связаться»: позвонить или написать — над кнопкой записи */}
      <div className="relative mb-3 flex justify-center">
        {menu && (
          <div className="absolute bottom-[calc(100%+10px)] right-0 w-[230px] overflow-hidden rounded-[12px] border border-[#17191a]/10 bg-white/95 text-[#17191a] shadow-[0_16px_50px_rgba(23,25,26,0.2)] backdrop-blur-md">
            <a href={`tel:+${PHONE_RAW}`} className="flex flex-col px-4 py-3 transition-colors hover:bg-[#46131E]/[0.06]">
              <span className="text-[13px] font-medium">{lang === "en" ? "Call the salon" : "Позвонить в салон"}</span>
              <span className="text-[12px] text-[#17191a]/60">+7 988 888 77 58</span>
            </a>
            <a href={`https://wa.me/${PHONE_RAW}`} target="_blank" rel="noopener noreferrer" className="flex flex-col border-t border-[#17191a]/10 px-4 py-3 transition-colors hover:bg-[#46131E]/[0.06]">
              <span className="text-[13px] font-medium">{lang === "en" ? "Message us" : "Написать нам"}</span>
              <span className="text-[12px] text-[#17191a]/60">{lang === "en" ? "in a messenger" : "в мессенджере"}</span>
            </a>
          </div>
        )}
        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-expanded={menu}
          aria-label={lang === "en" ? "Contact us" : "Связаться с нами"}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.22)] ring-1 transition-all duration-300 hover:scale-105 ${
            onFooter ? "bg-[#f4efe6] text-[#17191a] ring-[#f4efe6]" : "bg-white text-[#46131E] ring-[#46131E]/25"
          }`}
        >
          {menu ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      <div className="relative flex h-[84px] w-[84px] items-center justify-center">
        {/* Расходящиеся кольца-волны */}
        <span className="fab-ring" style={{ borderColor: ringColor }} />
        <span className="fab-ring fab-ring--2" style={{ borderColor: ringColor }} />

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "en" ? "Book online" : "Онлайн запись"}
          className={`fab-pulse relative flex h-full w-full items-center justify-center rounded-full text-center shadow-[0_12px_34px_rgba(0,0,0,0.28)] ring-1 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-[#2b2620] hover:ring-white/50 hover:backdrop-blur-md ${
            onFooter ? "bg-[#f4efe6] text-[#17191a] ring-[#f4efe6]" : "bg-[#46131E] text-[#f4efe6] ring-[#46131E]"
          }`}
        >
          <span className="px-2 text-[11px] font-medium uppercase leading-[1.25] tracking-[0.12em]">
            {lang === "en" ? (
              <>Book<br />online</>
            ) : (
              <>Онлайн<br />запись</>
            )}
          </span>
        </a>
      </div>
    </div>
  );
}
