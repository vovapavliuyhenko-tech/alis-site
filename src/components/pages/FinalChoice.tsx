"use client";
// ФИНАЛЬНЫЙ ЭКРАН главной (перед подвалом) — тексты заказчицы, вариант A «тихий финал»:
// белый фон, заголовок, 3 кнопки в ряд (главная — чёрная, остальные — с тонкой рамкой),
// под ними телефоны одной строкой. Слово «WhatsApp» не используем.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const OUTCALL = "/concierge#booking";
const PHONE_SALON = "+7 988 888 77 58";
const PHONE_CONCIERGE = "+7 988 888 77 28";
// Место под номер для международных клиентов — пока не задан (null = не показываем)
const PHONE_INTL: string | null = null;

export default function FinalChoice() {
  const { lang } = useLang();
  const en = lang === "en";
  const dark =
    "flex items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] px-3 py-3 text-center text-[10.5px] font-medium uppercase tracking-[0.08em] sm:px-6 sm:py-4 sm:text-[12px] sm:tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a]";
  const line =
    "flex items-center justify-center rounded-[12px] border border-[#17191a] bg-white px-3 py-3 text-center text-[10.5px] font-medium uppercase tracking-[0.08em] sm:px-6 sm:py-4 sm:text-[12px] sm:tracking-[0.16em] text-[#17191a] transition-colors duration-300 hover:bg-[#17191a] hover:text-white";
  const BTNS = [
    { label: en ? "Book a salon visit" : "Оформить визит в салон", href: YCLIENTS, cls: dark },
    { label: en ? "Order an outcall" : "Заказать выезд", href: OUTCALL, cls: line },
    { label: en ? "Message or call" : "Написать или позвонить", href: "/contacts", cls: line + " col-span-2 sm:col-span-1" },
  ];
  const PHONES = [
    { label: en ? "Salon" : "Салон", phone: PHONE_SALON },
    { label: en ? "Concierge" : "Консьерж", phone: PHONE_CONCIERGE },
    ...(PHONE_INTL ? [{ label: en ? "International" : "Международные клиенты", phone: PHONE_INTL }] : []),
  ];

  return (
    <section id="final" className="bg-white section-y">
      <div className="r-reveal mx-auto w-[92%] max-w-[1100px] text-center">
        <h2 className="text-[#17191a]">{en ? "Choose where it suits you to be beautiful" : "Выберите, где вам удобнее быть красивой"}</h2>
        <div className="mx-auto mt-8 grid max-w-[920px] grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:mt-10">
          {BTNS.map((b) => (
            <a key={b.label} href={b.href} {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={b.cls}>
              {b.label}
            </a>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[#17191a]">
          {PHONES.map((p) => (
            <a key={p.phone} href={`tel:${p.phone.replace(/[^\d+]/g, "")}`} className="transition-opacity hover:opacity-60">
              <span className="text-[#17191a]/55">{p.label}: </span>
              {p.phone}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
