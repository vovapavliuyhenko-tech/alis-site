import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactsBlock from "@/components/pages/ContactsBlock";

// Страница контактов — один блок в стиле главной.
export default function ContactsPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-[#F9F8F6]">
        <ContactsBlock />
      </div>
      <Footer />
    </main>
  );
}
