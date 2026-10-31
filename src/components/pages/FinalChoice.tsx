"use client";
// ФИНАЛЬНЫЙ ЭКРАН главной (перед подвалом) — тексты заказчицы, вариант A «тихий финал»:
// белый фон, заголовок, 3 кнопки в ряд (главная — чёрная, остальные — с тонкой рамкой),
// под ними телефоны одной строкой. Слово «WhatsApp» не используем.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const OUTCALL = "/concierge#calc";

export default function FinalChoice() {
  const { lang } = useLang();
  const en = lang === "en";
  const dark =
    "flex items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] whitespace-nowrap px-3 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.12em] sm:px-3 sm:py-4 sm:text-[10.5px] sm:tracking-[0.08em] lg:px-6 lg:text-[12px] lg:tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a]";
  const line =
    "flex items-center justify-center rounded-[12px] border border-[#17191a] bg-white whitespace-nowrap px-3 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.12em] sm:px-3 sm:py-4 sm:text-[10.5px] sm:tracking-[0.08em] lg:px-6 lg:text-[12px] lg:tracking-[0.16em] text-[#17191a] transition-colors duration-300 hover:bg-[#17191a] hover:text-white";
  const BTNS = [
    { label: en ? "Book a salon visit" : "Оформить визит в салон", href: YCLIENTS, cls: dark },
    { label: en ? "Order an outcall" : "Заказать выезд", href: OUTCALL, cls: line },
    { label: en ? "Message or call" : "Написать или позвонить", href: "/contacts", cls: line },
  ];

  return (
    <section id="final" className="bg-white section-y">
      <div className="r-reveal mx-auto w-[92%] max-w-[1100px] text-center">
        <h2 className="text-[#17191a]">{en ? "Choose where it suits you to be beautiful" : "Выберите, где вам удобнее быть красивой"}</h2>
        <div className="mx-auto mt-8 grid max-w-[920px] grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:mt-10">
          {BTNS.map((b) => (
            <a key={b.label} href={b.href} {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={b.cls}>
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
