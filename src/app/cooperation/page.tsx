import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamHero from "@/components/pages/TeamHero";
import CooperationFormats from "@/components/pages/CooperationFormats";
import CooperationForm from "@/components/pages/CooperationForm";

// Страница «Сотрудничество» — три блока:
// 1) кино-сплит-герой, 2) форматы (сетка карточек), 3) форма заявки на партнёрство.
export default function CooperationPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Кино-сплит-герой */}
      <TeamHero
        photo="/assets/tild6530-383_-2___1_.jpg"
        eyebrow={{ ru: "сотрудничество", en: "cooperation" }}
        title={{ ru: "Давайте создавать красоту вместе", en: "Let's create beauty together" }}
        sub={{
          ru: "Открыты к партнёрству с брендами, площадками, организаторами мероприятий и мастерами. Обсудим формат под вашу задачу.",
          en: "Open to partnerships with brands, venues, event organisers and masters. Let's find a format for your goal.",
        }}
        cta={{ label: { ru: "оставить заявку", en: "send a request" }, href: "#request" }}
      />

      <div className="relative z-10 bg-white">
        {/* 2 — Форматы сотрудничества */}
        <CooperationFormats />

        {/* 3 — Форма заявки на партнёрство */}
        <CooperationForm />
      </div>

      <Footer />
    </main>
  );
}
