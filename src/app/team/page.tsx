import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamHero from "@/components/pages/TeamHero";
import SalonCompare from "@/components/pages/SalonCompare";
import Vacancies from "@/components/pages/Vacancies";
import JoinForm from "@/components/pages/JoinForm";

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Герой-сплит (PALOMA), закреплён — следующий блок наезжает поверх */}
      <TeamHero />

      <div className="relative z-10 bg-white">
        {/* 2 — Мини-сравнение с поворотом карточек перед вакансиями */}
        <SalonCompare />

        {/* 3 — Вакансии */}
        <div id="vacancies" className="scroll-mt-24"><Vacancies /></div>

        {/* 3 — Форма «стать частью команды» */}
        <JoinForm />
      </div>

      <Footer />
    </main>
  );
}
