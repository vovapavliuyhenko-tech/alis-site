import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MassageProblems from "@/components/pages/MassageProblems";
import MassageTechniques from "@/components/pages/MassageTechniques";
import MassageAbout from "@/components/pages/MassageAbout";
import MassageCTA from "@/components/pages/MassageCTA";
import MassageApproach from "@/components/pages/MassageApproach";
import MassagePricing from "@/components/pages/MassagePricing";
import MassageReviews from "@/components/pages/MassageReviews";
import MassageFaq from "@/components/pages/MassageFaq";
import MassageContacts from "@/components/pages/MassageContacts";
import MassageFooter from "@/components/pages/MassageFooter";
import PhotoMarquee from "@/components/pages/PhotoMarquee";
import Philosophy from "@/components/pages/Philosophy";
import ServiceBento from "@/components/pages/ServiceBento";
import Brands from "@/components/Brands";
import Faq from "@/components/Faq";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";

// Клон massage-romanova.ru — все блоки эталона + прежние блоки ÁLIS,
// переоформленные под стиль референса.
export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <ScrollReveal />
      <Header />
      <Hero />
      <div className="relative z-10 bg-[#F9F8F6]">
        {/* Метка конца первого блока — после неё у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />
        {/* === Блоки эталона massage-romanova.ru === */}
        <MassageProblems />
        <MassageTechniques />
        <MassageAbout />
        <MassageCTA />
        <MassageApproach />
        <MassagePricing />
        <MassageReviews />
        <MassageFaq />
        {/* === Прежние блоки ÁLIS в стиле референса === */}
        <PhotoMarquee />
        <Philosophy />
        <ServiceBento />
        <Brands />
        <Faq />
        <MassageContacts />
      </div>
      <MassageFooter />
    </main>
  );
}
