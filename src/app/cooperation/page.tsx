import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/pages/PageHero";
import InfoBlock from "@/components/pages/InfoBlock";

const PHONE_SALON = "+7 988 888 77 58";
const EMAIL = "alisbeautyclub@gmail.com";

export default function CooperationPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <PageHero
          eyebrow={{ ru: "Сотрудничество", en: "Cooperation" }}
          title={{ ru: "Давайте сотрудничать", en: "Let's work together" }}
          subtitle={{
            ru: "Открыты к партнёрству с брендами, площадками, организаторами мероприятий и мастерами. Обсудим формат под вашу задачу.",
            en: "Open to partnerships with brands, venues, event organisers and masters. Let's find a format for your goal.",
          }}
        />

        <InfoBlock
          eyebrow={{ ru: "Форматы", en: "Formats" }}
          title={{ ru: "Чем можем быть полезны", en: "How we can help" }}
          bullets={[
            { ru: "Бьюти-сопровождение мероприятий и съёмок", en: "Beauty support for events and shoots" },
            { ru: "Партнёрство с площадками и агентствами", en: "Partnerships with venues and agencies" },
            { ru: "Коллаборации с брендами косметики", en: "Collaborations with cosmetic brands" },
            { ru: "Работа с блогерами и амбассадорами", en: "Working with bloggers and ambassadors" },
          ]}
        />

        <InfoBlock
          dark
          eyebrow={{ ru: "Связаться", en: "Get in touch" }}
          title={{ ru: "Обсудим ваше предложение", en: "Let's discuss your idea" }}
          text={{
            ru: "Напишите на почту или позвоните — расскажите о задаче, и мы подберём формат сотрудничества.",
            en: "Email or call us — tell us about your goal and we'll shape a format for cooperation.",
          }}
          ctaLabel={{ ru: "Написать на почту", en: "Email us" }}
          ctaHref={`mailto:${EMAIL}`}
          external={false}
        />
      </div>
      <Footer />
    </main>
  );
}
