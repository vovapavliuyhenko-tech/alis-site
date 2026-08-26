import Header from "@/components/Header";
import Services from "@/components/Services";
import Certificates from "@/components/Certificates";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SalonPrice from "@/components/pages/SalonPrice";
import Loyalty from "@/components/pages/Loyalty";
import PageHero from "@/components/pages/PageHero";

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <PageHero
          eyebrow={{ ru: "Салон", en: "Salon" }}
          title={{ ru: "Салон ÁLIS", en: "ÁLIS salon" }}
          subtitle={{
            ru: "Маникюр, педикюр, брови, макияж, окрашивание и укладки — на проверенных материалах и с заботой о каждой детали.",
            en: "Manicure, pedicure, brows, makeup, colouring and styling — on trusted materials, with care for every detail.",
          }}
        />
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
