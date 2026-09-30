"use client";
// Шаблон юридической страницы: шапка, статья с типографикой, подвал.
// Русскоязычный контент (юридически значимая редакция — на русском).
import Link from "next/link";
import Header from "@/components/Header";
import { useLang } from "@/lib/i18n";
import Footer from "@/components/Footer";

export default function LegalLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <main className="bg-white">
      <Header />
      <div className="h-16 bg-white" />
      <article className="mx-auto w-[90%] max-w-[860px] py-14 lg:py-20">
        <Link href="/" className="text-[13px] text-[#17191a] transition-opacity hover:opacity-70">
          {en ? "← Home" : "← На главную"}
        </Link>
        <h1 className="mt-6 font-serif text-[30px] leading-[1.12] text-[#17191a] lg:text-[44px]">
          {title}
        </h1>
        <p className="mt-3 text-[13px] text-[#17191a]/45">{en ? `Version of ${updated}` : `Редакция от ${updated}`}</p>
        {/* Юридически значимая редакция — только русская */}
        {en && (
          <p className="mt-4 rounded-[12px] bg-[#f6f4f1] px-4 py-3 text-[13px] leading-relaxed text-[#17191a]/80 shadow-[inset_3px_0_0_#46131E]">
            This document is available in Russian only. The Russian version is the legally binding one.
          </p>
        )}
        {intro && (
          <p className="mt-6 text-[15px] leading-relaxed text-[#17191a]/70 lg:text-[16px]">{intro}</p>
        )}
        <div className="legal-prose mt-10">{children}</div>
      </article>
      <Footer />
    </main>
  );
}
