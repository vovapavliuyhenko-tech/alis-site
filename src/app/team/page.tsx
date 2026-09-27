import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import SalonCompare from "@/components/pages/SalonCompare";
import Vacancies from "@/components/pages/Vacancies";
import JoinForm from "@/components/pages/JoinForm";

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к вакансиям (без логотипа и эффектов) */}
      <TeamIntro title={{ ru: "Вакансии", en: "Vacancies" }} />

      {/* Порядок для кандидата: почему у нас → вакансии → анкета.
          space-y — дополнительный воздух между блоками поверх общего section-y. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — Мини-сравнение с поворотом карточек перед вакансиями */}
        <SalonCompare />

        {/* 3 — Вакансии (id="vacancies" — внутри секции) */}
        <Vacancies />

        {/* 4 — Анкета «стать частью команды» (финальный шаг; id="join" — внутри секции) */}
        <JoinForm />
      </div>

      <Footer />
    </main>
  );
}
