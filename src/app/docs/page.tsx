// Страница «Документы» (по примеру bemont.ru/docs): перечень юридических документов
// и реквизиты ИП. Ссылка — в подвале рядом с правовыми документами.
import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import Requisites from "@/components/legal/Requisites";
import { COMPANY, LEGAL_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/docs" },
  title: "Документы — ÁLIS BEAUTY",
  description: "Юридические документы и реквизиты ÁLIS BEAUTY: политика конфиденциальности, публичная оферта, политика cookie.",
};

const DOCS = [
  { title: "Политика конфиденциальности", note: "Как мы обрабатываем и защищаем персональные данные", href: "/policy" },
  { title: "Публичная оферта", note: "Условия оказания услуг и продажи продукции", href: "/offer" },
  { title: "Политика использования файлов cookie", note: "Какие cookie использует сайт и как ими управлять", href: "/cookies" },
];

export default function DocsPage() {
  return (
    <LegalLayout
      title="Документы"
      updated={LEGAL_UPDATED}
      intro={`Юридическая информация и реквизиты ${COMPANY.brand} (${COMPANY.shortName}).`}
    >
      <div className="flex flex-col gap-3">
        {DOCS.map((d) => (
          <a
            key={d.href}
            href={d.href}
            className="doc-card group flex items-center justify-between gap-6 rounded-[12px] border border-[#17191a]/12 px-6 py-5 transition-colors hover:border-[#17191a] hover:bg-[#17191a]"
          >
            <span>
              <span className="block text-[16px] font-medium text-[#17191a] transition-colors group-hover:text-white">{d.title}</span>
              <span className="mt-1 block text-[13px] text-[#17191a]/55 transition-colors group-hover:text-white/70">{d.note}</span>
            </span>
            <span aria-hidden className="text-[18px] text-[#17191a] transition-colors group-hover:text-white">→</span>
          </a>
        ))}
      </div>

      <h2>Реквизиты</h2>
      <Requisites />
    </LegalLayout>
  );
}
