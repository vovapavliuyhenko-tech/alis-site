"use client";
// Шаблон юридической страницы: шапка, статья с типографикой, подвал.
// Русскоязычный контент (юридически значимая редакция — на русском).
import Header from "@/components/Header";
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
  return (
    <main className="bg-white">
      <Header />
      <div className="h-16 bg-white" />
      <article className="mx-auto w-[90%] max-w-[860px] py-14 lg:py-20">
        <a href="/" className="text-[13px] text-[#4E2126] transition-opacity hover:opacity-70">
          ← На главную
        </a>
        <h1 className="mt-6 font-serif text-[30px] leading-[1.12] text-[#4E2126] lg:text-[44px]">
          {title}
        </h1>
        <p className="mt-3 text-[13px] text-[#17191a]/45">Редакция от {updated}</p>
        {intro && (
          <p className="mt-6 text-[15px] leading-relaxed text-[#17191a]/70 lg:text-[16px]">{intro}</p>
        )}
        <div className="legal-prose mt-10">{children}</div>
      </article>
      <Footer />
    </main>
  );
}
