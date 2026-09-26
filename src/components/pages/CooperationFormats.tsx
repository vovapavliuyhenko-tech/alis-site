"use client";
// БЛОК «ДЛЯ КОГО» (страница «Сотрудничество»): два раздела — «Частным лицам» (#private)
// и «Агентствам и бизнесу» (#business), на них ведут пункты меню. Оформлен как
// «оглавление» вакансий: крупные строки с номером и стрелкой; при наведении строка
// заливается чёрным, название сдвигается, в пустоте всплывает фото под наклоном.
// TODO: тексты — из коммерческого предложения; фото — пришлёт заказчица. Ч/б. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const AUDIENCES: { id: string; title: Loc; img: string }[] = [
  { id: "private", title: { ru: "Частным лицам", en: "For individuals" }, img: "/assets/alis/img_2746.jpg" },
  { id: "business", title: { ru: "Агентствам и бизнесу", en: "For agencies & business" }, img: "/assets/alis/e12b89f7-f193-44ac-9015-777b094a0bcd.jpg" },
];

export default function CooperationFormats() {
  const { lang } = useLang();

  return (
    <section className="bg-white section-y">
      <div className="mx-auto flex w-[92%] max-w-[1400px] flex-col gap-3">
        {AUDIENCES.map((a, i) => (
          <a
            key={a.id}
            id={a.id}
            href="#request"
            className="r-reveal group relative grid scroll-mt-28 grid-cols-[auto_1fr_auto] items-center gap-5 rounded-[20px] border border-[#17191a]/12 px-6 py-8 transition-colors duration-300 hover:border-transparent hover:bg-[#17191a] lg:gap-8 lg:px-10 lg:py-12"
          >
            {/* Номер */}
            <span className="font-display text-[13px] tabular-nums text-[#17191a] transition-colors duration-300 group-hover:text-[#f4efe6]/70 lg:text-[15px]">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Название */}
            <h2 className="min-w-0 font-display text-[18px] font-normal uppercase leading-[1.15] tracking-[0.01em] text-[#17191a] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#f4efe6] sm:text-[22px] lg:text-[32px]">
              {a.title[lang]}
            </h2>

            {/* Подпись заявки + стрелка в кружке */}
            <span className="flex items-center gap-4 lg:gap-6">
              <span className="hidden whitespace-nowrap text-[12px] uppercase tracking-[0.14em] text-[#17191a]/60 transition-colors duration-300 group-hover:text-[#f4efe6] md:inline">
                {lang === "en" ? "Leave a request" : "Оставить заявку"}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#17191a]/30 text-[#17191a] transition-all duration-300 group-hover:border-[#f4efe6] group-hover:bg-[#f4efe6] group-hover:text-[#17191a] lg:h-14 lg:w-14">
                <span className="text-[16px] leading-none transition-transform duration-300 group-hover:-rotate-45 lg:text-[20px]">→</span>
              </span>
            </span>

            {/* Всплывающее фото в пустоте (только на десктопе) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.img}
              alt=""
              aria-hidden
              draggable={false}
              loading="lazy"
              className={`pointer-events-none absolute left-[62%] top-1/2 z-20 hidden aspect-[3/4] w-[220px] -translate-x-1/2 -translate-y-1/2 scale-95 rounded-[22px] object-cover opacity-0 shadow-[0_28px_60px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 lg:block lg:w-[250px] ${i % 2 ? "rotate-[6deg]" : "rotate-[-6deg]"}`}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
