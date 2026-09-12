import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CooperationForm from "@/components/pages/CooperationForm";
import Faq from "@/components/Faq";

type Loc = { ru: string; en: string };

// FAQ про сотрудничество и партнёрство с ÁLIS.
const COOP_FAQ: { q: Loc; a: Loc }[] = [
  {
    q: { ru: "«С кем вы сотрудничаете?»", en: "“Who do you partner with?”" },
    a: {
      ru: "С брендами косметики, площадками и отелями, event-агентствами и организаторами, а также с блогерами и амбассадорами. Формат подбираем под вашу задачу.",
      en: "Cosmetic brands, venues and hotels, event agencies and organisers, plus bloggers and ambassadors. We shape the format around your goal.",
    },
  },
  {
    q: { ru: "«Как быстро вы отвечаете на заявку?»", en: "“How fast do you reply to a request?”" },
    a: {
      ru: "Обычно связываемся в течение дня. Расскажите о задаче в форме — предложим формат, сроки и условия.",
      en: "Usually within a day. Tell us about your goal in the form — we'll propose a format, timing and terms.",
    },
  },
  {
    q: { ru: "«Выезжаете на мероприятия и съёмки?»", en: "“Do you come to events and shoots?”" },
    a: {
      ru: "Да. Команда мастеров работает на площадке: причёски, макияж, ногти и уход в день события — под ваш тайминг и формат.",
      en: "Yes. A team of masters works on site: hair, makeup, nails and care on the day — matched to your timing and format.",
    },
  },
  {
    q: { ru: "«Работаете с брендами по бартеру?»", en: "“Do you work with brands on barter?”" },
    a: {
      ru: "Рассматриваем разные форматы: тесты продукции, совместный контент, спецпредложения для гостей. Обсуждаем честный обмен под конкретный проект.",
      en: "We consider different formats: product tests, joint content, special offers for guests. We agree a fair exchange for each project.",
    },
  },
  {
    q: { ru: "«В каком городе вы работаете?»", en: "“Which city do you work in?”" },
    a: {
      ru: "База — Новороссийск, салон на ул. Пархоменко, 53. Выездной формат обсуждаем отдельно под мероприятие.",
      en: "We're based in Novorossiysk, salon at Parkhomenko St., 53. On-site formats are discussed per event.",
    },
  },
];

// Страница «Сотрудничество» — три блока:
// 1) кино-сплит-герой, 2) форма заявки на партнёрство, 3) частые вопросы.
export default function CooperationPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      <div className="relative z-10 bg-white pt-20 lg:pt-24">
        {/* 1 — Форма заявки на партнёрство */}
        <CooperationForm />

        {/* 2 — Частые вопросы про сотрудничество */}
        <Faq
          items={COOP_FAQ}
          sectionId="coop-faq"
          photo="/assets/tild3236-393__.jpg"
          eyebrow={{ ru: "вопросы", en: "FAQ" }}
          titleTop={{ ru: "Сотрудничество —", en: "Cooperation —" }}
          titleBottom={{ ru: "что спрашивают", en: "what people ask" }}
        />
      </div>

      <Footer />
    </main>
  );
}
