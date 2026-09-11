import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactsCTA from "@/components/pages/ContactsCTA";
import Faq from "@/components/Faq";

type Loc = { ru: string; en: string };

// FAQ про запись и визит.
const CONTACT_FAQ: { q: Loc; a: Loc }[] = [
  {
    q: { ru: "«Как записаться?»", en: "“How do I book?”" },
    a: {
      ru: "Онлайн за пару минут, по телефону или в WhatsApp — как удобно. На первое посещение действует скидка −10%.",
      en: "Online in a couple of minutes, by phone or on WhatsApp — whatever suits you. Your first visit gets −10%.",
    },
  },
  {
    q: { ru: "«Где вы находитесь?»", en: "“Where are you located?”" },
    a: {
      ru: "Новороссийск, ул. Пархоменко, 53 — в центре города. Маршрут построится по кнопке в блоке выше.",
      en: "Novorossiysk, Parkhomenko St., 53 — in the city centre. Use the button above to get directions.",
    },
  },
  {
    q: { ru: "«Работаете без выходных?»", en: "“Are you open every day?”" },
    a: {
      ru: "Да, работаем ежедневно с 9:00 до 21:00 — можно выбрать удобное окно даже в выходной.",
      en: "Yes, we're open daily from 9:00 to 21:00 — you can pick a convenient slot even on weekends.",
    },
  },
  {
    q: { ru: "«Можно перенести или отменить запись?»", en: "“Can I reschedule or cancel?”" },
    a: {
      ru: "Конечно. Предупредите заранее — подберём другое удобное время без лишних вопросов.",
      en: "Of course. Let us know in advance and we'll find another convenient time, no fuss.",
    },
  },
  {
    q: { ru: "«Как можно оплатить?»", en: "“How can I pay?”" },
    a: {
      ru: "Принимаем оплату картой и наличными. Стоимость называем до начала, после осмотра — без сюрпризов в чеке.",
      en: "We accept card and cash. We name the price before we start, after examining you — no surprises on the bill.",
    },
  },
  {
    q: { ru: "«Есть ли парковка рядом?»", en: "“Is there parking nearby?”" },
    a: {
      ru: "Да, есть парковка вдоль улицы и рядом с салоном — оставить машину поблизости не проблема.",
      en: "Yes, there's parking along the street and next to the salon — leaving your car nearby is easy.",
    },
  },
];

export default function ContactsPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pt-16 lg:pt-16">
        <ContactsCTA />
        <Faq
          items={CONTACT_FAQ}
          sectionId="contacts-faq"
          photo="/assets/tild6530-383_-2___1_.jpg"
          eyebrow={{ ru: "вопросы", en: "FAQ" }}
          titleTop={{ ru: "Перед визитом —", en: "Before you visit —" }}
          titleBottom={{ ru: "коротко о главном", en: "the essentials" }}
        />
      </div>
      <Footer />
    </main>
  );
}
