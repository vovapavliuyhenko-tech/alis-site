import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import MerchMarquee from "@/components/shop/MerchMarquee";

// Страница «Магазин» — мерч ÁLIS: бегущая лента карточек, корзина и избранное
// доступны из шапки (глобально), оформление заказа — сообщением в WhatsApp.
export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-[#F9F8F6] pt-[60px]">
        <MerchMarquee />
      </div>
      <Footer />
    </main>
  );
}
