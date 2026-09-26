import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import CooperationFormats from "@/components/pages/CooperationFormats";
import CooperationForm from "@/components/pages/CooperationForm";
import Brands from "@/components/Brands";

// Страница «Сотрудничество»: обложка → «Частным лицам» / «Агентствам и бизнесу»
// (пункты меню) → лента партнёров → заявка на сотрудничество.
export default function CooperationPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к заявке (без логотипа и эффектов) */}
      <TeamIntro
        cta={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#request" }}
        photo="/assets/alis/img_6011.jpg"
      />

      {/* space-y — дополнительный воздух между блоками поверх общего section-y */}
      <div className="relative z-10 space-y-6 bg-white pb-6 lg:space-y-12 lg:pb-12">
        {/* Маркер конца героя — после него у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />

        {/* 2 — Для кого: #private и #business */}
        <CooperationFormats />

        {/* 3 — Бегущая лента партнёров (без заголовка — убран по фидбеку) */}
        <Brands />

        {/* 4 — Заявка на сотрудничество (#request) */}
        <CooperationForm />
      </div>

      <Footer />
    </main>
  );
}
