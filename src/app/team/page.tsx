import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamHero from "@/components/pages/TeamHero";
import SalonCompare from "@/components/pages/SalonCompare";
import Vacancies from "@/components/pages/Vacancies";
import JoinForm from "@/components/pages/JoinForm";
import Faq from "@/components/Faq";

type Loc = { ru: string; en: string };

// FAQ про работу в команде ÁLIS.
const TEAM_FAQ: { q: Loc; a: Loc }[] = [
  {
    q: { ru: "«Какой график и загрузка?»", en: "“What are the hours and workload?”" },
    a: {
      ru: "Гибкий график и стабильный поток гостей — смены подбираем под вас. Полная или частичная занятость, без простоев в кресле.",
      en: "A flexible schedule and a steady flow of guests — we fit shifts around you. Full or part time, with no idle chair.",
    },
  },
  {
    q: { ru: "«Как считается процент и оплата?»", en: "“How is the commission and pay calculated?”" },
    a: {
      ru: "Честный процент и прозрачная оплата: условия проговариваем на входе и фиксируем. Никаких скрытых вычетов — вы всегда знаете, за что получаете.",
      en: "Fair commission and transparent pay: terms are agreed up front and fixed. No hidden deductions — you always know what you earn.",
    },
  },
  {
    q: { ru: "«На чьих материалах работать?»", en: "“Whose materials do I work with?”" },
    a: {
      ru: "Только проверенная профессиональная косметика и расходники — салон закупает всё сам. Вкладываться в материалы из своего кармана не нужно.",
      en: "Only trusted professional cosmetics and supplies — the salon buys everything. You don't pay for materials out of pocket.",
    },
  },
  {
    q: { ru: "«Есть обучение и рост?»", en: "“Is there training and growth?”" },
    a: {
      ru: "Да. Разборы, наставничество и повышение квалификации внутри команды — помогаем расти и в мастерстве, и в доходе.",
      en: "Yes. Reviews, mentorship and upskilling within the team — we help you grow in craft and in income.",
    },
  },
  {
    q: { ru: "«Нужна своя база клиентов?»", en: "“Do I need my own client base?”" },
    a: {
      ru: "Нет. Поток гостей и записи обеспечивает салон и онлайн-запись. Приходите с руками и желанием — клиентов дадим.",
      en: "No. The salon and online booking bring the guests. Come with your skills and drive — we provide the clients.",
    },
  },
  {
    q: { ru: "«Как проходит отбор?»", en: "“How does the selection work?”" },
    a: {
      ru: "Знакомимся, смотрим работы и делаем тестовый день в реальных условиях. Честно с обеих сторон — важно, чтобы совпали и мы, и вы.",
      en: "We meet, look at your work and do a trial day in real conditions. Honest both ways — it matters that we're a fit for each other.",
    },
  },
];

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
        eyebrow={{ ru: "работа в ÁLIS", en: "work at ÁLIS" }}
        title={{ ru: "Устали сидеть в пустом кресле?", en: "Tired of sitting in an empty chair?" }}
        sub={{
          ru: "Поток гостей приводит салон и онлайн-запись. Вы работаете руками — клиентов ищем мы. Стабильно, без простоев.",
          en: "The salon and online booking bring the guests. You do the craft — we find the clients. Steady, no idle time.",
        }}
        cta={{ label: { ru: "смотреть вакансии", en: "see vacancies" }, href: "#vacancies" }}
      />

      {/* 2 — Такой же герой, фото справа (зеркально), тоже наезжает поверх */}
      <TeamHero
        reverse
        logoTop
        roundedTop
        photo="/assets/tild6536-613_-2___1__4.jpg"
        eyebrow={{ ru: "почему к нам", en: "why join us" }}
        title={{ ru: "Растите в мастерстве и в доходе", en: "Grow in craft and in income" }}
        sub={{
          ru: "Честный процент, материалы за счёт салона, гибкий график. Наставничество и разборы — и поток, чтобы применять новое каждый день.",
          en: "Fair commission, materials on the salon, a flexible schedule. Mentorship and reviews — plus the flow to use new skills every day.",
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

        {/* 5 — FAQ про работу в команде */}
        <Faq
          items={TEAM_FAQ}
          sectionId="team-faq"
          photo="/assets/tild6536-613_-2___1__4.jpg"
          eyebrow={{ ru: "вопросы", en: "FAQ" }}
          titleTop={{ ru: "Работа в ÁLIS —", en: "Working at ÁLIS —" }}
          titleBottom={{ ru: "что спрашивают", en: "what people ask" }}
        />
      </div>

      <Footer />
    </main>
  );
}
