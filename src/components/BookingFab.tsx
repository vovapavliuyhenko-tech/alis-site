"use client";
// Плавающая круглая кнопка «Онлайн запись» → YClients. Видна на всех страницах,
// КРОМЕ страницы бьюти-консьержа (там вместо неё чат-помощник ConciergeChat).
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function BookingFab() {
  const pathname = usePathname();
  const { lang } = useLang();
  if (pathname === "/concierge") return null;

  return (
    <a
      href={YCLIENTS}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === "en" ? "Book online" : "Онлайн запись"}
      className="group fixed bottom-5 right-5 z-40 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#3B0D1A] text-center text-[#f4efe6] shadow-[0_12px_34px_rgba(59,13,26,0.35)] transition-transform duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <span className="px-2 text-[11px] font-medium uppercase leading-[1.25] tracking-[0.12em]">
        {lang === "en" ? (
          <>Book<br />online</>
        ) : (
          <>Онлайн<br />запись</>
        )}
      </span>
    </a>
  );
}
