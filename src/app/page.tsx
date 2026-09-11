import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MassageProblems from "@/components/pages/MassageProblems";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";

// Клон massage-romanova.ru — собирается поблочно. Готово: герой, блок «Что вас
// беспокоит сегодня?». Далее: техники, обо мне, CTA, подход, прайс, отзывы, контакты.
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
        <MassageProblems />
      </div>
      <Footer />
    </main>
  );
}
