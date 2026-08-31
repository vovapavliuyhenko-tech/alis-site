import Header from "@/components/Header";
import TeamCarousel from "@/components/TeamCarousel";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/pages/PageHero";
import SplitMedia from "@/components/pages/SplitMedia";
import DarkStatement from "@/components/pages/DarkStatement";

const IG = "https://www.instagram.com/alisbeauty.ru";

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <PageHero
          eyebrow={{ ru: "Команда", en: "Team" }}
          title={{ ru: "Команда ÁLIS", en: "The ÁLIS team" }}
          ghost="TEAM"
          subtitle={{
            ru: "Опытные мастера и заботливая команда. К кому обратиться — ниже, а мастеров видно прямо в онлайн-записи.",
            en: "Experienced masters and a caring team. Who to reach out to is below, and the masters are shown right in the online booking.",
          }}
        />

        <TeamCarousel />

        <div id="vacancies" className="scroll-mt-24">
          <SplitMedia
            eyebrow={{ ru: "Вакансии", en: "Vacancies" }}
            title={{ ru: "Присоединяйтесь к команде", en: "Join our team" }}
            text={{
              ru: "Мы растём и ищем мастеров, которые любят своё дело и работают на результат. Условия обсуждаем индивидуально.",
              en: "We're growing and looking for masters who love their craft and work for results. Terms are individual.",
            }}
            bullets={[
              { ru: "Тёплая команда и фирменная атмосфера", en: "A warm team and signature atmosphere" },
              { ru: "Проверенные материалы и оборудование", en: "Trusted materials and equipment" },
              { ru: "Поток гостей и удобный график", en: "A steady flow of guests, a convenient schedule" },
              { ru: "Обучение и повышение квалификации", en: "Training and professional development" },
            ]}
            image="/assets/tild3236-393__.jpg"
            tag={{ ru: "мы нанимаем", en: "we're hiring" }}
            ctaLabel={{ ru: "Написать в Instagram", en: "Message on Instagram" }}
            ctaHref={IG}
          />
        </div>

        <div id="become" className="scroll-mt-24">
          <DarkStatement
            eyebrow={{ ru: "Бьюти-консьерж", en: "Concierge" }}
            titleA={{ ru: "Стать мастером", en: "Become a" }}
            titleAccent={{ ru: "бьюти-консьержа", en: "concierge master" }}
            text={{
              ru: "Выездной премиум-сервис — для мастеров, готовых работать на мероприятиях в формате «под ключ». Расскажите о себе — обсудим сотрудничество.",
              en: "Our premium on-location service — for masters ready to work at events in a turnkey format. Tell us about yourself.",
            }}
            ctaLabel={{ ru: "Написать в Instagram", en: "Message on Instagram" }}
            ctaHref={IG}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
