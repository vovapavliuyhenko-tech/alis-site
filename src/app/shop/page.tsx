import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockLabel from "@/components/ui/BlockLabel";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import { ShopCategories } from "@/components/shop/ShopBlocks";
import { ShopTrend } from "@/components/shop/ShopShowcase";
import BoxBuilder from "@/components/shop/BoxBuilder";

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
      <TeamIntro title={{ ru: "Средства, которыми работают специалисты ÁLIS BEAUTY, а также мерч и аксессуары", en: "The products ÁLIS BEAUTY specialists work with, plus merch and accessories" }} photo="/assets/tild6530-383_-2___1_.jpg" button={{ label: { ru: "Смотреть каталог", en: "View the catalogue" }, href: "/shop/catalog" }} />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        {/* По брифу: категории → подбор ухода → мерч (строка + товары) → бокс → сертификаты */}
        <BlockLabel ru="Категории" en="Categories" />
        <ShopCategories />
        {/* Подбор ухода, строка про мерч и конструктор сертификата — скрыты
            по просьбе заказчицы (HairQuiz, MerchLine, CertBuilder в ShopBlocks) */}
        {/* Новинки — товары из каталога (подпись над блоком убрана) */}
        <ShopTrend />
        {/* Подарочный бокс — «веер» из трёх фото, как карточки команды на «Вакансиях» */}
        {/* Конфигуратор подарочного бокса: размер → цвет → наполнение → заявка менеджеру */}
        <BoxBuilder />
      </div>
      <Footer />
    </main>
  );
}
