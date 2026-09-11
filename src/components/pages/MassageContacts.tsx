"use client";
// БЛОК 10 «Если у вас остались вопросы, напишите мне» — контакты и мессенджеры.
import { useLang } from "@/lib/i18n";
import { SectionHead } from "./massage/shared";

const PHONE = "+7 (910) 709 88 00";
const PHONE_RAW = "79107098800";
const CHANNELS = [
  { label: "WhatsApp", href: `https://wa.me/${PHONE_RAW}` },
  { label: "Telegram", href: "https://t.me/" },
  { label: "Max", href: `tel:+${PHONE_RAW}` },
];

export default function MassageContacts() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="contacts" className="scroll-mt-24 bg-[#2b2620] py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[900px] text-center">
        <SectionHead
          dark
          eyebrow={{ ru: "напишите мне", en: "message me" }}
          title={{ ru: "Если у вас остались вопросы, напишите мне", en: "If you still have questions, message me" }}
        />
        <p className="mx-auto mt-4 max-w-[520px] text-[12.5px] leading-[1.6] text-[#C2C0B6]">
          {en
            ? "I'll gladly answer them and help you choose a massage for your state."
            : "Я с удовольствием отвечу на них и помогу подобрать массаж под ваше состояние."}
        </p>

        {/* Мессенджеры */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#C2C0B6]/40 px-8 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-[#EDE9E2] transition-colors duration-300 hover:bg-[#EDE9E2] hover:text-[#2b2620]"
            >
              {c.label}
            </a>
          ))}
        </div>

        <a href={`tel:+${PHONE_RAW}`} className="mt-8 inline-block font-serif-display text-[24px] tracking-[0.02em] text-[#EDE9E2] lg:text-[30px]">
          {PHONE}
        </a>

        <p className="mt-6 text-[12.5px] text-[#C2C0B6]">
          {en ? "Address: " : "Адрес: "}
          {en ? "Moscow, Arkhitektora Vlasova St., 71, bldg. 2" : "Москва, ул. Архитектора Власова, 71, корп. 2"}
        </p>
        <p className="mx-auto mt-8 max-w-[520px] text-[10.5px] leading-[1.5] text-[#C2C0B6]/60">
          {en
            ? "Massage services are non-medical and do not replace a doctor's consultation."
            : "Услуги массажа являются немедицинскими и не заменяют консультацию врача."}
        </p>
      </div>
    </section>
  );
}
