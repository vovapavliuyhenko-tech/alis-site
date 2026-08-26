import Header from "@/components/Header";
import TeamCarousel from "@/components/TeamCarousel";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/pages/PageHero";
import JoinSection from "@/components/pages/JoinSection";

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <PageHero
          eyebrow={{ ru: "Команда", en: "Team" }}
          title={{ ru: "Команда ÁLIS", en: "The ÁLIS team" }}
          subtitle={{
            ru: "Опытные мастера и заботливая команда. К кому обратиться — ниже, а мастеров видно прямо в онлайн-записи.",
            en: "Experienced masters and a caring team. Who to reach out to is below, and the masters are shown right in the online booking.",
          }}
        />

        <TeamCarousel />

        <div id="vacancies" className="scroll-mt-24">
          <JoinSection
            eyebrow={{ ru: "Вакансии", en: "Vacancies" }}
            title={{ ru: "Присоединяйтесь к команде", en: "Join our team" }}
            subtitle={{
              ru: "Мы растём и ищем мастеров, которые любят своё дело и работают на результат. Условия обсуждаем индивидуально.",
              en: "We're growing and looking for masters who love their craft and work for results. Terms are discussed individually.",
            }}
            bullets={[
              { ru: "Тёплая команда и фирменная атмосфера", en: "A warm team and a signature atmosphere" },
              { ru: "Проверенные материалы и оборудование", en: "Trusted materials and equipment" },
              { ru: "Поток гостей и удобный график", en: "A steady flow of guests and a convenient schedule" },
              { ru: "Обучение и повышение квалификации", en: "Training and professional development" },
            ]}
          />
        </div>

        <div id="become" className="scroll-mt-24">
          <JoinSection
            dark
            eyebrow={{ ru: "Бьюти-консьерж", en: "Concierge" }}
            title={{ ru: "Стать мастером бьюти-консьержа", en: "Become a concierge master" }}
            subtitle={{
              ru: "Выездной премиум-сервис — для мастеров, готовых работать на мероприятиях в формате «под ключ». Расскажите о себе — обсудим сотрудничество.",
              en: "Our premium on-location service — for masters ready to work at events in a turnkey format. Tell us about yourself — let's discuss.",
            }}
            bullets={[
              { ru: "Работа на свадьбах, съёмках и событиях", en: "Weddings, shoots and events" },
              { ru: "Команда, логистика и тайминг — на нас", en: "Team, logistics and timing — on us" },
              { ru: "Премиум-клиенты и достойная оплата", en: "Premium clients and fair pay" },
              { ru: "Гибкий график и выезды по РФ и за границу", en: "Flexible schedule, trips across Russia and abroad" },
            ]}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
