import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockLabel from "@/components/ui/BlockLabel";
import ScrollReveal from "@/components/ScrollReveal";
import { ShopCategories } from "@/components/shop/ShopBlocks";
import { ShopPromos } from "@/components/shop/ShopIntro";
import TeamIntro from "@/components/pages/TeamIntro";
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
      {/* Обложка — как на остальных страницах: одно фото, заголовок и кнопка «Смотреть каталог»
          (прежний узкий баннер — ShopBanner в ShopIntro.tsx) */}
      <TeamIntro
        title={{
          ru: "Средства, которыми работают специалисты ÁLIS BEAUTY, а также мерч и аксессуары", // «а» не висит в конце строки
          en: "The products ÁLIS BEAUTY specialists work with, plus merch and accessories",
        }}
        photo="/assets/alis/salon_cup_flatlay.jpg"
        button={{ label: { ru: "Смотреть каталог", en: "View catalogue" }, href: "/shop/catalog" }}
      />
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <BlockLabel ru="Категории" en="Categories" />
        <ShopCategories />
        {/* Две фото-плашки: подбор ухода за 30 секунд (опросник) и переход к конструктору бокса */}
        <ShopPromos />
        {/* Коллекция — карточки товаров, как было */}
        <ShopTrend />
        {/* <HairCta /> — плашка «Подобрать уход за 30 секунд» убрана по просьбе */}
        <BoxBuilder />
      </div>
      <Footer />
    </main>
  );
}
