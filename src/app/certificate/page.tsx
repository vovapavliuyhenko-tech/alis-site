import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Certificates from "@/components/Certificates";

export const metadata: Metadata = {
  title: "Подарочный сертификат — ÁLIS BEAUTY",
  description: "Подарочный сертификат ÁLIS BEAUTY номиналом 3 000 – 15 000 ₽ на процедуры и продукцию салона красоты в Новороссийске.",
};

// Страница «Подарочный сертификат» (по примеру bemont.ru/certificate).
// TODO: фото сертификатов пришлёт заказчица.
export default function CertificatePage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pb-6 pt-20 lg:pb-12 lg:pt-24">
        <Certificates />
      </div>
      <Footer />
    </main>
  );
}
