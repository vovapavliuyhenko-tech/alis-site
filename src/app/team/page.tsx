import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
// import SalonCompare from "@/components/pages/SalonCompare"; // мини-сравнение убрано по брифу
import { TeamPeople, JoinInternational, JoinSalon, JoinSteps } from "@/components/pages/TeamJoin";
import Vacancies from "@/components/pages/Vacancies";
import JoinForm from "@/components/pages/JoinForm";

export const metadata: Metadata = {
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к вакансиям (без логотипа и эффектов) */}
      <TeamIntro title={{ ru: "Вакансии", en: "Vacancies" }} button={{ label: { ru: "Смотреть вакансии", en: "View vacancies" }, href: "#international" }} button2={{ label: { ru: "Оставить заявку", en: "Apply" }, href: "#join" }} />

      {/* Порядок по брифу: команда → международная команда → салон (кого ищем, как присоединиться) → анкета.
          space-y — дополнительный воздух между блоками поверх общего section-y. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — Команда: основатель, директор консьерж-направления, управляющая салона */}
        <TeamPeople />

        {/* 3 — Международная beauty-команда (#international) */}
        <JoinInternational />

        {/* 4 — Команда салона в Новороссийске (#salon) → «Кого ищем» (#vacancies) → как присоединиться */}
        <JoinSalon />
        <Vacancies />
        <JoinSteps />

        {/* 5 — Анкета (#join) */}
        <JoinForm />
      </div>

      <Footer />
    </main>
  );
}
