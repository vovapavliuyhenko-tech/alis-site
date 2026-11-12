"use client";
// НОМЕРА + КП на двух языках — внизу страницы консьержа (по голосовому заказчицы:
// «номера добавить», «КП на двух языках тоже добавь»). Белые плашки как на странице контактов.
import { useLang } from "@/lib/i18n";

const PHONES = [
  { ru: "Консьерж-сервис", en: "Concierge service", value: "+7 988 888 77 28" },
  { ru: "Управляющий", en: "Manager", value: "+7 996 409 28 74" },
  { ru: "Международный", en: "International", value: "+374 43 24 21 78" },
];

const DOCS = [
  { ru: "Коммерческое предложение · RU", en: "Commercial proposal · RU", href: "/docs/alis-beauty-kp.pdf" },
  { ru: "Коммерческое предложение · EN", en: "Commercial proposal · EN", href: "/docs/alis-beauty-proposal-en.pdf" },
];

export default function ConciergeContacts() {
  const { lang } = useLang();
  return (
    <section id="contacts" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto w-[96%] max-w-[1760px] pb-10 text-center lg:pb-14">
        <h2 className="font-serif-display !text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:!text-[28px]">
          {lang === "en" ? "Contacts" : "Контакты"}
        </h2>
      </div>
      <div className="mx-auto grid w-[96%] max-w-[1760px] gap-3 sm:grid-cols-3 sm:gap-4">
        {PHONES.map((p) => (
          <a
            key={p.value}
            href={`tel:+${p.value.replace(/[^\d]/g, "")}`}
            className="group flex flex-col gap-2 rounded-[18px] border border-[#17191a]/10 bg-white px-6 py-5 transition-colors duration-500 hover:border-[#17191a] sm:px-7 sm:py-6"
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/50 sm:text-[11px]">{lang === "en" ? p.en : p.ru}</span>
            <span className="font-display text-[19px] text-[#17191a] sm:text-[21px] lg:text-[24px]">{p.value}</span>
          </a>
        ))}
      </div>
      <div className="mx-auto mt-3 grid w-[96%] max-w-[1760px] gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
        {DOCS.map((d) => (
          <a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-[14px] border border-[#17191a]/12 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-500 hover:border-[#17191a] hover:bg-[#17191a] hover:text-white sm:px-7 sm:py-5 sm:text-[12px]"
          >
            <span>{lang === "en" ? d.en : d.ru}</span>
            <span aria-hidden className="text-[15px] transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
          </a>
        ))}
      </div>
    </section>
  );
}
