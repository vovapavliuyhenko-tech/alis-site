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

      {/* 1 — Герой-сплит (PALOMA): фото слева, ЗАКРЕПЛЁН — второй блок наезжает поверх */}
      <TeamHero
        pinned
        logo
        photo="/assets/tild3236-393__.jpg"
        eyebrow={{ ru: "философия", en: "philosophy" }}
        title={{ ru: "Мастера, которым доверяют образ", en: "Masters you trust with your look" }}
        sub={{
          ru: "Колористы, нейл-мастера, бровисты и визажисты, которые работают в 4–6 рук и собирают полный образ за один визит.",
          en: "Colourists, nail artists, brow and makeup masters who work in 4–6 hands and build a complete look in a single visit.",
        }}
        cta={{ label: { ru: "наши мастера", en: "our masters" }, href: "#vacancies" }}
      />

      {/* 2 — Такой же герой, фото справа (зеркально), тоже наезжает поверх */}
      <TeamHero
        reverse
        photo="/assets/tild6536-613_-2___1__4.jpg"
        eyebrow={{ ru: "почему к нам", en: "why join us" }}
        title={{ ru: "Хотите в команду ÁLIS?", en: "Want to join the ÁLIS team?" }}
        sub={{
          ru: "Мы растём и ищем мастеров, которые любят своё дело. Поток клиентов, гибкий график и команда, на которую можно опереться.",
          en: "We're growing and looking for masters who love their craft. A steady flow of clients, a flexible schedule and a team you can rely on.",
        }}
        cta={{ label: { ru: "оставить заявку", en: "apply now" }, href: "#join" }}
      />

      <div className="relative z-10 bg-white">
        {/* 2 — Мини-сравнение с поворотом карточек перед вакансиями */}
        <SalonCompare />

        {/* 3 — Вакансии */}
        <div id="vacancies" className="scroll-mt-24"><Vacancies /></div>

        {/* 4 — Форма «стать частью команды» */}
        <div id="join" className="scroll-mt-24"><JoinForm /></div>
      </div>

      <Footer />
    </main>
  );
}
