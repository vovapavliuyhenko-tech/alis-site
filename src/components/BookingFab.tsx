"use client";
// Плавающая круглая кнопка «Онлайн запись» → YClients. Появляется только после
// прокрутки первого экрана, мягко пульсирует и излучает расходящиеся кольца.
// Видна на всех страницах, КРОМЕ страницы бьюти-консьержа (там чат-помощник).
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function BookingFab() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [shown, setShown] = useState(false);

  // Показываем после первого блока (≈ первый экран)
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (pathname === "/concierge") return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="relative flex h-[84px] w-[84px] items-center justify-center">
        {/* Расходящиеся кольца-волны */}
        <span className="fab-ring" />
        <span className="fab-ring fab-ring--2" />

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "en" ? "Book online" : "Онлайн запись"}
          className="fab-pulse relative flex h-full w-full items-center justify-center rounded-full bg-[#3B0D1A] text-center text-[#f4efe6] shadow-[0_12px_34px_rgba(59,13,26,0.35)] transition-transform duration-300 hover:scale-105"
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
