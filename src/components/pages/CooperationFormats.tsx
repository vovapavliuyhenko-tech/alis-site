"use client";
// БЛОК «ДЛЯ КОГО» (страница «Сотрудничество»): два раздела — «Частным лицам» (#private)
// и «Агентствам и бизнесу» (#business), на них ведут пункты меню. Спокойная
// журнальная подача: две равные карточки — фото сверху, под ним номер, название
// и растянутая кнопка заявки. Без сдвигов и расширений: на наведении только лёгкое
// приближение фото и заливка кнопки.
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
      <div className="mx-auto grid w-[92%] max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
        {AUDIENCES.map((a, i) => (
          <a key={a.id} id={a.id} href="#request" className="r-reveal group flex scroll-mt-28 flex-col">
            {/* Фото */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#17191a]/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Номер + название */}
            <div className="mt-6 flex items-baseline gap-5 lg:mt-7">
              <span className="font-serif-display text-[14px] tracking-[0.12em] text-[#17191a]/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
                {a.title[lang]}
              </h2>
            </div>

            {/* Кнопка во всю ширину карточки */}
            <span className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#17191a] py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-300 group-hover:bg-[#17191a] group-hover:text-white lg:mt-7 lg:py-4">
              {lang === "en" ? "Leave a partnership request" : "Оставить заявку на сотрудничество"}
              <span aria-hidden>→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
