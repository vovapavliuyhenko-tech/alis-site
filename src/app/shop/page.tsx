// СТРАНИЦА МАГАЗИНА /shop — точная копия главной O'CARE (ocare.tilda.ws) без блока
// «Вы и O'CARE»: герой, бестселлеры-слайдер, блог. Бежевый фон, зелёные акценты,
// шрифты Geologica + Cormorant Garamond. Своя светлая шапка и подвал в стиле O'CARE.
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopHero from "@/components/shop/ShopHero";
import Bestsellers from "@/components/shop/Bestsellers";
import ShopBlog from "@/components/shop/ShopBlog";
import ShopFooter from "@/components/shop/ShopFooter";

export default function ShopPage() {
  return (
    <main className="bg-[#F3F2EE]">
      <SmoothScroll />
      <ScrollReveal />
      <ShopHeader />
      <ShopHero />
      <Bestsellers />
      <ShopBlog />
      <ShopFooter />
    </main>
  );
}
