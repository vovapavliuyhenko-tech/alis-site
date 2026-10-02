import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { WhyUs, WorksGrid, HomeReviews, OutcallService, BonusOffer, FinalChoice } from "@/components/home/HomeSections";

// ГЛАВНАЯ — структура по правкам заказчицы:
// 1 первый экран → 2 почему выбирают → 3 галерея работ → 5 отзывы → 6 выездной сервис →
// 7 комплимент 500 бонусов → 8 финальный экран → 9 светлый подвал.
// Блок «Шаги» удалён (компонент ConciergeStages остаётся для страницы консьерж-сервиса).
// Плитки услуг (ServiceBento) в новой структуре заказчицы не значатся — сняты с главной;
// вернуть: import ServiceBento from "@/components/pages/ServiceBento" и <ServiceBento /> после галереи.

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <Hero />
      <div className="relative z-10 bg-white page-end">
        {/* Метка конца первого блока — после неё у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />
        <WhyUs />
        <WorksGrid />
        <HomeReviews />
        <OutcallService />
        <BonusOffer />
        <FinalChoice />
      </div>
      {/* Эксперимент заказчицы: светлый подвал. Вернуть чёрный — убрать проп light */}
      <Footer light />
    </main>
  );
}
