"use client";
// БЛОК 9 «Частые вопросы» — аккордеон. Вопросы — по эталону; ответы —
// плейсхолдеры (на эталоне свёрнуты), заменить на реальные.
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { SectionHead } from "./massage/shared";

const QA: { q: string; a: string }[] = [
  { q: "Подходит ли массаж молодым мамам?", a: "Да. После консультации подберу мягкую технику с учётом вашего самочувствия и периода восстановления. При кесаревом сечении и некоторых состояниях нужна рекомендация врача." },
  { q: "Есть ли противопоказания?", a: "Да — острые воспаления, повышенная температура, обострение хронических заболеваний, некоторые состояния сосудов и кожи. Перед сеансом я уточняю ваше состояние; при сомнениях порекомендую сначала обратиться к врачу." },
  { q: "Сколько сеансов потребуется, чтобы ощутить результат?", a: "Лёгкость чувствуется уже после первого сеанса. Для устойчивого эффекта при хроническом напряжении обычно рекомендую курс из 5–10 процедур." },
  { q: "Какие рекомендации после массажа?", a: "Пить больше воды, избегать интенсивных нагрузок и переохлаждения в первые часы, дать телу отдых. Подробные рекомендации дам индивидуально после сеанса." },
  { q: "Есть ли у вас абонементы?", a: "Да, доступны абонементы на курс сеансов на выгодных условиях. Детали подскажу в переписке или перед началом сеанса." },
  { q: "Можно ли приобрести подарочный сертификат?", a: "Конечно. Можно оформить сертификат на любую услугу или сумму — прекрасный подарок близким. Напишите мне, и я всё оформлю." },
];

export default function MassageFaq() {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-[#F9F8F6] pb-20 lg:pb-28">
      <div className="mx-auto w-[92%] max-w-[860px]">
        <SectionHead title={{ ru: "Частые вопросы", en: "Frequently asked" }} />

        <div className="mt-12 divide-y divide-[#C2C0B6]/45 border-y border-[#C2C0B6]/45">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-medium text-[#444]">{item.q}</span>
                  <span className={`shrink-0 text-[18px] leading-none text-[#70695A] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[12.5px] leading-[1.6] text-[#444]/80">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {en && <p className="mt-4 text-center text-[11px] text-[#444]/50">Answers are placeholders — replace with the studio&apos;s real ones.</p>}
      </div>
    </section>
  );
}
