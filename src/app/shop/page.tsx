import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import { ShopTrend } from "@/components/shop/ShopShowcase";
import { ShopCategories, HairQuiz, MerchLine, GiftBox, CertBuilder } from "@/components/shop/ShopBlocks";

// Страница «Магазин» — мерч ÁLIS BEAUTY. Структура и анимации — по главной
// aurorebrand.com, оформление — в стиле нашего сайта. Фото — временные.
export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* 1 — Обложка с заголовком страницы, как на остальных страницах (фото временное) */}
      <TeamIntro title={{ ru: "Средства, которыми работают специалисты ÁLIS, и beauty с нашим характером", en: "The products ÁLIS specialists work with — and beauty with our character" }} subtitle={{ ru: "Уход для волос, инструменты, мерч, подарочные боксы и сертификаты.", en: "Hair care, tools, merch, gift boxes and certificates." }} photo="/assets/tild6530-383_-2___1_.jpg" button={{ label: { ru: "Смотреть каталог", en: "View the catalogue" }, href: "/shop/catalog" }} />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        {/* По брифу: категории → подбор ухода → мерч (строка + товары) → бокс → сертификаты */}
        <ShopCategories />
        <HairQuiz />
        <MerchLine />
        <ShopTrend />
        <GiftBox />
        <CertBuilder />
      </div>
      <Footer />
    </main>
  );
}
