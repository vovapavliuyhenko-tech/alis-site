"use client";
// БЛОК 11 — подвал: юридические данные самозанятого, навигация, ссылки.
import { useLang } from "@/lib/i18n";
import { YCLIENTS } from "./massage/shared";

export default function MassageFooter() {
  const { lang } = useLang();
  const en = lang === "en";
  const nav = [
    { label: en ? "Services" : "Услуги", href: "#uslugi" },
    { label: en ? "Reviews" : "Отзывы", href: "#reviews" },
    { label: en ? "Contacts" : "Контакты", href: "#contacts" },
  ];
  const legal = [
    { label: en ? "Public offer" : "Публичная оферта", href: "/offer" },
    { label: en ? "Cookie policy" : "Политика Cookie", href: "/cookies" },
    { label: en ? "Personal data policy" : "Политика обработки ПДн", href: "/policy" },
  ];

  return (
    <footer className="bg-[#211a1c] py-14 text-[#C2C0B6]">
      <div className="mx-auto grid w-[92%] max-w-[1160px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif-display text-[18px] uppercase tracking-[0.14em] text-[#EDE9E2]">
            {en ? "Massage Studio" : "Студия массажа"}
          </p>
          <p className="mt-1 text-[12px] text-[#C2C0B6]/80">
            {en ? "by Evgenia Romanova" : "Евгении Романовой"}
          </p>
          <p className="mt-5 text-[11px] leading-[1.6] text-[#C2C0B6]/60">
            {en ? "Self-employed (NPD)" : "Самозанятая (НПД)"}
            <br />
            {en ? "Evgenia N. Romanova" : "Романова Евгения Николаевна"}
            <br />
            {en ? "TIN 402815065572" : "ИНН 402815065572"}
          </p>
        </div>

        <nav className="flex flex-col gap-2.5 text-[12px]">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-[#EDE9E2]">{n.label}</a>
          ))}
          <a href={YCLIENTS} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#EDE9E2]">
            {en ? "Book" : "Записаться"}
          </a>
        </nav>

        <nav className="flex flex-col gap-2.5 text-[12px]">
          {legal.map((n) => (
            <a key={n.href} href={n.href} className="text-[#C2C0B6]/70 transition-colors hover:text-[#EDE9E2]">{n.label}</a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-12 w-[92%] max-w-[1160px] border-t border-[#C2C0B6]/15 pt-6 text-[11px] text-[#C2C0B6]/50">
        © {new Date().getFullYear()} {en ? "Massage Studio by Evgenia Romanova" : "Студия массажа Евгении Романовой"}
      </div>
    </footer>
  );
}
