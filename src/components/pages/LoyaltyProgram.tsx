"use client";
// СТРАНИЦА «ПРОГРАММА ЛОЯЛЬНОСТИ» (по примеру bemont.ru/loyalty_program).
// Слева — тёмная карточка с приветственным бонусом и кнопкой «Оформить визит»,
// справа — привилегии. Тексты — только уже согласованные на сайте.
// TODO: подробные условия программы пришлёт заказчица. Ч/б. Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

type Loc = { ru: string; en: string };

const PERKS: { title: Loc; note: Loc }[] = [
  {
    title: { ru: "500 бонусных рублей на первый визит", en: "500 bonus rubles on your first visit" },
    note: { ru: "Приветственный бонус для новых гостей салона.", en: "A welcome bonus for new salon guests." },
  },
  {
    title: { ru: "Бонусы постоянным гостям", en: "Bonuses for regular guests" },
    note: { ru: "Копятся с каждым визитом.", en: "They add up with every visit." },
  },
  {
    title: { ru: "Особые условия для своих", en: "Special terms for our own" },
    note: { ru: "Для постоянных гостей — раньше всех и на лучших условиях.", en: "For regular guests — first in line, on the best terms." },
  },
];

export default function LoyaltyProgram() {
  const { lang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  return (
    <section id="loyalty" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1400px]">
        <div className="mb-12 text-center lg:mb-16">
          <h1 className="font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
            {t("Программа лояльности", "Loyalty programme")}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Приветственный бонус */}
          <div className="flex min-h-[340px] flex-col justify-between rounded-[30px] bg-[#17191a] p-8 text-[#f4efe6] lg:min-h-[480px] lg:p-12">
            <div>
              <p className="font-display text-[64px] leading-none tracking-[0.01em] lg:text-[88px]">500 ₽</p>
              <p className="mt-3 text-[15px] text-[#f4efe6]/80 lg:text-[17px]">
                {t("бонусных рублей на первый визит", "bonus rubles on your first visit")}
              </p>
            </div>
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex w-full items-center justify-center rounded-2xl border border-[#f4efe6] bg-[#f4efe6] py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#17191a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#f4efe6] sm:text-[14px]"
            >
              {t("Оформить визит", "Arrange a visit")}
            </a>
          </div>

          {/* Привилегии */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {PERKS.map((p, i) => (
              <article key={p.title.ru} className="flex flex-1 items-start gap-5 rounded-[30px] border border-[#17191a]/15 bg-white p-7 lg:p-9">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17191a]/[0.06] font-display text-[15px] text-[#17191a]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-[16px] uppercase leading-[1.25] tracking-[0.02em] text-[#17191a] lg:text-[18px]">
                    {p.title[lang]}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#17191a]/65">{p.note[lang]}</p>
                </div>
              </article>
            ))}
            <p className="px-2 pt-2 text-[13px] text-[#17191a]/50">
              {t("Подробные условия программы уточняйте у администратора салона.", "Ask the salon administrator for the full programme terms.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
