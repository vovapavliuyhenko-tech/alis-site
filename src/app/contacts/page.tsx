import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/pages/PageHero";
import ContactsSection from "@/components/pages/ContactsSection";

export default function ContactsPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <PageHero
          eyebrow={{ ru: "Контакты", en: "Contacts" }}
          title={{ ru: "Как нас найти", en: "How to reach us" }}
          subtitle={{
            ru: "Звоните, пишите или приходите в гости — поможем с любым вопросом.",
            en: "Call, message or drop by — we'll help with anything.",
          }}
        />
        <ContactsSection />
      </div>
      <Footer />
    </main>
  );
}
