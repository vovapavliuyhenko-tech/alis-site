"use client";
// БЛОК «ДЛЯ КОГО» (страница «Сотрудничество»): два раздела — «Частным лицам» (#private)
// и «Агентствам и бизнесу» (#business), на них ведут пункты меню. Две фото-панели:
// при наведении панель плавно и немного расширяется, фото чуть приближается, снизу выезжает кнопка заявки.
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
      <div className="mx-auto flex w-[92%] max-w-[1400px] flex-col gap-3 sm:gap-4 lg:h-[min(500px,58vh)] lg:flex-row">
        {AUDIENCES.map((a, i) => (
          <a
            key={a.id}
            id={a.id}
            href="#request"
            className="r-reveal group relative isolate flex h-[360px] scroll-mt-28 flex-col justify-end overflow-hidden rounded-[30px] text-white transition-[flex-grow] duration-[1200ms] ease-[cubic-bezier(.45,0,.2,1)] lg:h-auto lg:min-w-0 lg:flex-[1_1_0%] lg:hover:flex-[1.3_1_0%]"
          >
            {/* Фото: медленное приближение при наведении */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.img}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(.25,.1,.25,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-85" />

            {/* Номер и стрелка сверху */}
            <div className="absolute inset-x-7 top-7 flex items-start justify-between lg:inset-x-10 lg:top-10">
              <span className="font-serif-display text-[14px] tracking-[0.14em] text-white/75">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-md transition-all duration-700 ease-in-out group-hover:border-white group-hover:bg-white group-hover:text-[#17191a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* Заголовок + кнопка, выезжающая снизу на наведении */}
            <div className="p-7 lg:p-10">
              <h2 className="font-serif-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.02em] lg:text-[clamp(26px,2.2vw,36px)]">
                {a.title[lang]}
              </h2>
              <div className="grid transition-all duration-[900ms] ease-[cubic-bezier(.45,0,.2,1)] lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                <div className="overflow-hidden">
                  <span className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#17191a] lg:py-4">
                    {lang === "en" ? "Leave a partnership request" : "Оставить заявку на сотрудничество"}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
