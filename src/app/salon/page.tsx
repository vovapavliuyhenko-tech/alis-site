import Header from "@/components/Header";
import Services from "@/components/Services";
import Certificates from "@/components/Certificates";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SalonPrice from "@/components/pages/SalonPrice";
import Loyalty from "@/components/pages/Loyalty";
import SalonHero from "@/components/pages/SalonHero";

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <SalonHero />
        <div id="uslugi" className="scroll-mt-24"><Services /></div>
        <div id="price" className="scroll-mt-24"><SalonPrice /></div>
        <div id="loyalty" className="scroll-mt-24"><Loyalty /></div>
        <Certificates />
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
