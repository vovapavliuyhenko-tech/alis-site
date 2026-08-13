"use client";
// Отдельная страница «Работы» — галерея-плитки (FlipGallery) с шапкой, вводным
// заголовком и подвалом. Вынесена с главной как самостоятельная страница.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FlipGallery from "@/components/FlipGallery";
import { useLang } from "@/lib/i18n";

export default function WorksPage() {
  const { lang } = useLang();
  return (
    <main className="bg-white">
      <Header />

      {/* Вводный заголовок страницы */}
      <section className="px-6 pt-40 pb-4 text-center lg:pt-44">
        <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
          {lang === "en" ? "works" : "работы"}
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-[36px] leading-[1.05] text-[#17191a] lg:text-[60px]">
          {lang === "en" ? "Our works" : "Наши работы"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#17191a]/55">
          {lang === "en"
            ? "Looks we've created — hover any tile to see a second work."
            : "Образы, которые мы создали — наведите на плитку, чтобы увидеть вторую работу."}
        </p>
      </section>

      <FlipGallery />
      <Footer />
    </main>
  );
}
