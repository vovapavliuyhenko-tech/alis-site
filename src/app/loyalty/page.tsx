import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LoyaltyProgram from "@/components/pages/LoyaltyProgram";

export const metadata: Metadata = {
  title: "Программа лояльности — ÁLIS BEAUTY",
  description: "Программа лояльности салона красоты ÁLIS BEAUTY: 500 бонусных рублей на первый визит и бонусы постоянным гостям.",
};

export default function LoyaltyPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pb-6 pt-20 lg:pb-12 lg:pt-24">
        <LoyaltyProgram />
      </div>
      <Footer />
    </main>
  );
}
