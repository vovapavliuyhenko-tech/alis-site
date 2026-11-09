import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockLabel from "@/components/ui/BlockLabel";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
// import SalonCompare from "@/components/pages/SalonCompare"; // сравнение скрыто по просьбе заказчицы
import { TeamPeople } from "@/components/pages/TeamJoin";
import VacanciesBoard from "@/components/pages/VacanciesBoard";

export const metadata: Metadata = {
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к вакансиям (без логотипа и эффектов) */}
      <TeamIntro title={{ ru: "Команда ÁLIS BEAUTY — люди, которым доверяют свою красоту", en: "The ÁLIS BEAUTY team — people trusted with beauty" }} button={{ label: { ru: "Смотреть вакансии", en: "View vacancies" }, href: "#vacancies" }} button2={{ label: { ru: "Оставить заявку", en: "Apply" }, href: "#join" }} />

      {/* Порядок по брифу: команда → международная команда → салон (кого ищем, как присоединиться) → анкета.
          space-y — дополнительный воздух между блоками поверх общего section-y. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — Команда: основатель, директор консьерж-направления, управляющая салона */}
        <BlockLabel ru="Команда" en="Team" />
        <TeamPeople />

        {/* 3 — Вакансии по документу заказчицы: салон / консьерж-сервис (вкладки), позиции и анкета кандидата.
            Пункты меню /team#salon и /team#international открывают нужную вкладку. */}
        <VacanciesBoard />
      </div>

      <Footer />
    </main>
  );
}
