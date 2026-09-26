import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
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
      {/* Обложка с заголовком страницы (фото временное — пришлёт заказчица) */}
      <TeamIntro title={{ ru: "Подарочный сертификат", en: "Gift certificate" }} photo="/assets/alis/img_1855.jpg" />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white pb-6 lg:pb-12">
        <Certificates />
      </div>
      <Footer />
    </main>
  );
}
