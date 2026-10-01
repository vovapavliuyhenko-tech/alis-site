import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import LoyaltyProgram from "@/components/pages/LoyaltyProgram";

export const metadata: Metadata = {
  alternates: { canonical: "/loyalty" },
  title: "Программа лояльности — ÁLIS BEAUTY",
  description: "Программа лояльности салона красоты ÁLIS BEAUTY: 500 бонусных рублей на первый визит и бонусы постоянным гостям.",
};

export default function LoyaltyPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* Обложка с заголовком страницы (фото временное — пришлёт заказчица) */}
      <TeamIntro title={{ ru: "Программа лояльности", en: "Loyalty programme" }} kicker={{ ru: "500 бонусных рублей на первый визит", en: "500 bonus roubles on your first visit" }} photo="/assets/alis/img_2749.jpg" />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <LoyaltyProgram />
      </div>
      <Footer />
    </main>
  );
}
