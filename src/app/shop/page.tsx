import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import MerchMarquee from "@/components/shop/MerchMarquee";

// Страница «Магазин» — мерч ÁLIS BEAUTY (перенесён со страницы салона по фидбеку).
export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* Обложка с заголовком страницы (фото временное — пришлёт заказчица) */}
      <TeamIntro title={{ ru: "Магазин", en: "Shop" }} photo="/assets/tild6530-383_-2___1_.jpg" />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white pb-6 lg:pb-12">
        <MerchMarquee />
      </div>
      <Footer />
    </main>
  );
}
