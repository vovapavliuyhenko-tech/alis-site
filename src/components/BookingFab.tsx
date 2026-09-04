"use client";
// Плавающая круглая кнопка «Онлайн запись» → YClients. Появляется после первого
// экрана, пульсирует и излучает кольца. Над бордовым футером инвертирует цвет
// (кремовая с бордовым текстом), чтобы не сливаться. Скрыта на /concierge.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function BookingFab() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [shown, setShown] = useState(false);
  const [onFooter, setOnFooter] = useState(false);

  useEffect(() => {
    const update = () => {
      setShown(window.scrollY > window.innerHeight * 0.7);
      // насколько «раскрыт» фиксированный футер снизу — если больше высоты кнопки,
      // значит кнопка уже над бордовым футером → инвертируем цвет
      const footer = document.getElementById("footer");
      const fh = footer ? footer.offsetHeight : 0;
      const docH = document.documentElement.scrollHeight;
      const revealed = window.scrollY + window.innerHeight - (docH - fh);
      setOnFooter(revealed > 90);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (pathname === "/concierge") return null;

  const ringColor = onFooter ? "#f4efe6" : "#3B0D1A";

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="relative flex h-[84px] w-[84px] items-center justify-center">
        {/* Расходящиеся кольца-волны */}
        <span className="fab-ring" style={{ borderColor: ringColor }} />
        <span className="fab-ring fab-ring--2" style={{ borderColor: ringColor }} />

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "en" ? "Book online" : "Онлайн запись"}
          className={`fab-pulse relative flex h-full w-full items-center justify-center rounded-full text-center shadow-[0_12px_34px_rgba(0,0,0,0.28)] ring-1 transition-colors duration-300 hover:scale-105 ${
            onFooter
              ? "bg-[#f4efe6] text-[#3B0D1A] ring-[#f4efe6]"
              : "bg-[#3B0D1A] text-[#f4efe6] ring-[#3B0D1A]"
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
