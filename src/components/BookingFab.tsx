"use client";
// Плавающая круглая кнопка «Онлайн запись» → YClients. На первом блоке любой
// страницы скрыта, появляется после прокрутки; пульсирует и излучает кольца. Над
// тёмным футером инвертирует цвет (кремовая с тёмным текстом). Скрыта на /concierge.
// Пока открыта плашка cookie (html.cookie-open), кнопка поднимается над ней — см. globals.css.
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
      // Не закрываем текст: если в зоне кнопки (правый нижний угол) оказался блок
      // с data-fab-avoid (например, заголовок и кнопка фото-баннера) — прячемся
      const zoneTop = window.innerHeight - 130;
      const zoneLeft = window.innerWidth - 130;
      const covers = Array.from(document.querySelectorAll("[data-fab-avoid]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > zoneTop && r.top < window.innerHeight && r.right > zoneLeft;
      });
      setShown(!overFirst && !atEnd && !covers);
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

  const ringColor = onFooter ? "#f4efe6" : "#17191a";
  // На главной (правки заказчицы) — никаких мигающих/светящихся кнопок: без колец и пульса
  const calm = pathname === "/";

  return (
    <div
      className={`booking-fab fixed bottom-5 right-5 z-40 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="relative flex h-[68px] w-[68px] items-center justify-center sm:h-[84px] sm:w-[84px]">
        {/* Расходящиеся кольца-волны */}
        {!calm && <span className="fab-ring" style={{ borderColor: ringColor }} />}
        {!calm && <span className="fab-ring fab-ring--2" style={{ borderColor: ringColor }} />}

        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "en" ? "Book online" : "Онлайн запись"}
          className={`${calm ? "" : "fab-pulse "}relative flex h-full w-full items-center justify-center rounded-full text-center shadow-[0_12px_34px_rgba(0,0,0,0.28)] ring-1 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-[#2b2620] hover:ring-white/50 hover:backdrop-blur-md ${
            onFooter && !calm ? "bg-[#f4efe6] text-[#17191a] ring-[#f4efe6]" : "bg-[#17191a] text-[#f4efe6] ring-[#17191a]"
          }`}
        >
          <span className="px-2 text-[9.5px] font-medium uppercase leading-[1.25] tracking-[0.1em] sm:text-[11px] sm:tracking-[0.12em]">
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
