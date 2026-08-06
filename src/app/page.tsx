import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ForDesigners from "@/components/ForDesigners";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <ScrollReveal />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Services />
      <ForDesigners />
      <Footer />
    </main>
  );
}
