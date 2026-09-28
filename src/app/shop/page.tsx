import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PhotoStatement from "@/components/pages/PhotoStatement";
import TeamIntro from "@/components/pages/TeamIntro";
import { ProductCarousel, ProductChoice } from "@/components/shop/ShopBlocks";

// Страница «Магазин» — мерч ÁLIS BEAUTY. Структура и размеры блоков — по референсу
// revatiwear.ru (блок категорий пока не нужен). Фото — временные, пришлёт заказчица.
export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* 1 — Обложка с заголовком страницы, как на остальных страницах (фото временное) */}
      <TeamIntro title={{ ru: "Магазин", en: "Shop" }} photo="/assets/tild6530-383_-2___1_.jpg" />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white">
        {/* 2 — Лента товаров (без заголовка) */}
        <ProductCarousel linkHref="#choice" />
        {/* 4 — Выбор покупателей: две большие карточки и ряд из четырёх */}
        <ProductChoice id="choice" title={{ ru: "Выбор покупателей", en: "Customers' choice" }} />
        {/* 5 — Фото-высказывание с размытым фоном */}
        <PhotoStatement
          photo="/assets/tild6536-613_-2___1__4.jpg"
          text={{ ru: "Отражаем внутреннюю красоту во внешней", en: "Reflecting inner beauty on the outside" }}
          link={{ label: { ru: "Больше о нас", en: "More about us" }, href: "/salon" }}
        />
      </div>
      <Footer />
    </main>
  );
}