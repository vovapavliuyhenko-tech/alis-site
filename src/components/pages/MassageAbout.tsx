"use client";
// БЛОК 4 «За каждым моим движением — знания анатомии…» — обо мне и подходе.
// Крупный заголовок, портрет и текстовые абзацы, кнопка «Образование и сертификаты».
import { useLang } from "@/lib/i18n";
import { SectionHead, YCLIENTS } from "./massage/shared";

const PHOTO = "/assets/tild3638-373_-2___1__3.jpg"; // плейсхолдер — портрет специалиста

export default function MassageAbout() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  return (
    <section className="bg-[#F9F8F6] py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          title={{
            ru: "За каждым моим движением — знания анатомии и опыт, накопленный за тысячи часов практики",
            en: "Behind every movement — knowledge of anatomy and thousands of hours of practice",
          }}
          className="mx-auto max-w-[900px]"
        />

        <div className="mt-14 grid items-stretch gap-10 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Портрет */}
          <div className="overflow-hidden rounded-[24px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="" aria-hidden className="h-full min-h-[360px] w-full object-cover" />
          </div>

          {/* Текст */}
          <div className="flex flex-col justify-center">
            <p className="text-[13.5px] leading-[1.7] text-[#444]">
              {t(
                "Во время сеанса я работаю с мышечными и фасциальными блоками. Фасция — это соединительная ткань, которая связывает мышцы, кости и органы. Под воздействием стресса, травм или физических нагрузок она может уплотняться, создавая «зажимы».",
                "During a session I work with muscle and fascial blocks. Fascia is the connective tissue that links muscles, bones and organs. Under stress, injury or physical load it can thicken, creating knots.",
              )}
            </p>
            <p className="mt-5 text-[13.5px] leading-[1.7] text-[#444]">
              {t(
                "Массаж размягчает эти блоки, снижается хроническое напряжение в теле и улучшается кровообращение. Нормализуется работа нервной системы и снижаются болевые ощущения.",
                "Massage softens these blocks, chronic tension eases and circulation improves. The nervous system settles and pain is reduced.",
              )}
            </p>
            <p className="mt-5 text-[13.5px] leading-[1.7] text-[#444]/80">
              {t(
                "Профессиональное образование в области массажа и психологии стало прочной основой моей работы. А пять лет практики ещё больше показали, как неразрывно связаны тело и эмоции.",
                "A professional education in massage and psychology is the foundation of my work. And five years of practice have shown how inseparably body and emotions are linked.",
              )}
            </p>
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-[#70695A]/45 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#70695A] transition-colors duration-300 hover:bg-[#70695A] hover:text-[#F4F1EA]"
            >
              {t("Образование и сертификаты", "Education & certificates")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
