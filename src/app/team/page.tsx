import Header from "@/components/Header";
import TeamCarousel from "@/components/TeamCarousel";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamPinnedHero from "@/components/pages/TeamPinnedHero";
import SalonCompare from "@/components/pages/SalonCompare";
import Vacancies from "@/components/pages/Vacancies";
import JoinForm from "@/components/pages/JoinForm";

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Закреплённый герой: фон стоит, текст сменяется при скролле */}
      <TeamPinnedHero />

      <div className="relative z-10 bg-white">
        {/* Мастера */}
        <TeamCarousel />

        {/* 2 — Мини-сравнение с поворотом карточек перед вакансиями */}
        <SalonCompare />

        {/* 2 — Вакансии */}
        <Vacancies />

        {/* 3 — Форма «стать частью команды» */}
        <JoinForm />
      </div>

      <Footer />
    </main>
  );
}
