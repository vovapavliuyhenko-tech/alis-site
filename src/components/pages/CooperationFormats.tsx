"use client";
// БЛОК «ДЛЯ КОГО» (страница «Сотрудничество»): «Частным лицам» (#private) и
// «Агентствам и бизнесу» (#business) — на них ведут пункты меню. Минимализм в духе
// карточек магазина: чистое фото без надписей и затемнения, под ним одна строка —
// название слева и «Оставить заявку →» справа. На наведении фото чуть приближается.
// TODO: тексты — из коммерческого предложения; фото — пришлёт заказчица. Ч/б. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const AUDIENCES: { id: string; title: Loc; img: string }[] = [
  { id: "private", title: { ru: "Частным лицам", en: "For individuals" }, img: "/assets/alis/img_2746.jpg" },
  { id: "business", title: { ru: "Агентствам и бизнесу", en: "For agencies & business" }, img: "/assets/alis/e12b89f7-f193-44ac-9015-777b094a0bcd.jpg" },
];

export default function CooperationFormats() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:gap-x-4">
        {AUDIENCES.map((a) => (
          <a key={a.id} id={a.id} href="#request" className="r-reveal group block scroll-mt-28">
            <div className="overflow-hidden rounded-[12px] bg-[#f2f1ee]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.img}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4 px-1 pt-4 text-[#242424]">
              <h2 className="!text-[15px] lg:!text-[16px]">{a.title[lang]}</h2>
              <span className="shrink-0 text-[13px] text-[#17191a]/55 transition-colors duration-300 group-hover:text-[#17191a]">
                {en ? "Leave a request" : "Оставить заявку"}{" "}
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
