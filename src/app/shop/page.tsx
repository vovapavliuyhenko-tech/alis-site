// СТРАНИЦА МАГАЗИНА /shop — витрина косметики и ухода, которые можно приобрести
// в студии. Структура по мотивам главной O'CARE (без блока «Вы и O'CARE»),
// оформление — в стиле ALIS. Шапка и подвал переиспользованы с сайта.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import ShopHero from "@/components/shop/ShopHero";
import ProductTypes from "@/components/shop/ProductTypes";
import ShopMission from "@/components/shop/ShopMission";
import CareLines from "@/components/shop/CareLines";
import Bestsellers from "@/components/shop/Bestsellers";
import ShopBlog from "@/components/shop/ShopBlog";

export default function ShopPage() {
  return (
    <main>
      <SmoothScroll />
      <ScrollReveal />
      <Header />
      <ShopHero />
      <ProductTypes />
      <ShopMission />
      <CareLines />
      <Bestsellers />
      <ShopBlog />
      <Footer />
    </main>
  );
}
