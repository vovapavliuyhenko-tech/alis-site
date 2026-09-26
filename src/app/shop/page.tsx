import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import MerchMarquee from "@/components/shop/MerchMarquee";

// Страница «Магазин» — мерч ÁLIS BEAUTY (перенесён со страницы салона по фидбеку).
// Первого экрана-фото нет, поэтому шапка сразу со светлой подложкой.
export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pb-6 pt-20 lg:pb-12 lg:pt-24">
        <MerchMarquee />
      </div>
      <Footer />
    </main>
  );
}
