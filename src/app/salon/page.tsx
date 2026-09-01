import Header from "@/components/Header";
import Certificates from "@/components/Certificates";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Loyalty from "@/components/pages/Loyalty";
import SalonHero from "@/components/pages/SalonHero";
import SalonMenu from "@/components/pages/SalonMenu";

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <SalonHero />
        <div id="uslugi" className="scroll-mt-24"><span id="price" /><SalonMenu /></div>
        <div id="loyalty" className="scroll-mt-24"><Loyalty /></div>
        <Certificates />
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
