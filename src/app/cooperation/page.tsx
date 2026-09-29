import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import CooperationFormats from "@/components/pages/CooperationFormats";

// Страница «Сотрудничество»: обложка → «Частным лицам» / «Агентствам и бизнесу»
// (пункты меню) → после выбора: заявка под категорию → лента партнёров.
export default function CooperationPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к заявке (без логотипа и эффектов) */}
      <TeamIntro
        title={{ ru: "Сотрудничество", en: "Cooperation" }}
        kicker={{ ru: "Для частных лиц, агентств и бизнеса", en: "For individuals, agencies and business" }}
        photo="/assets/alis/img_6011.jpg"
      />

      {/* space-y — дополнительный воздух между блоками поверх общего section-y */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — Выбор «Частным лицам» / «Агентствам и бизнесу» → форма под выбор → партнёры */}
        <CooperationFormats />
      </div>

      <Footer />
    </main>
  );
}
