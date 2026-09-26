"use client";
// БЛОК «ДЛЯ КОГО» (страница «Сотрудничество»): два раздела — «Частным лицам» (#private)
// и «Агентствам и бизнесу» (#business), на них ведут пункты меню. Прежние
// формулировки убраны по фидбеку; TODO: тексты — из коммерческого предложения
// (пришлёт заказчица). Ч/б. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const AUDIENCES: { id: string; title: Loc }[] = [
  { id: "private", title: { ru: "Частным лицам", en: "For individuals" } },
  { id: "business", title: { ru: "Агентствам и бизнесу", en: "For agencies & business" } },
];

export default function CooperationFormats() {
  const { lang } = useLang();

  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[92%] max-w-[1400px] grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {AUDIENCES.map((a) => (
          <article
            key={a.id}
            id={a.id}
            className="r-reveal flex min-h-[260px] scroll-mt-28 flex-col justify-between gap-10 rounded-[30px] border border-[#17191a]/15 bg-white p-8 lg:min-h-[340px] lg:p-12"
          >
            <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
              {a.title[lang]}
            </h2>
            <a
              href="#request"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#17191a] px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#17191a] transition-colors duration-300 hover:bg-[#17191a] hover:text-white"
            >
              {lang === "en" ? "Leave a partnership request" : "Оставить заявку на сотрудничество"}
              <span aria-hidden>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
