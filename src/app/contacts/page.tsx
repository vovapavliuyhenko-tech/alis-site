import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactsCTA from "@/components/pages/ContactsCTA";

export default function ContactsPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pt-28 lg:pt-32">
        <ContactsCTA />
      </div>
      <Footer />
    </main>
  );
}
