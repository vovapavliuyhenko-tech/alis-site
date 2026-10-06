"use client";
// «КОГО ИЩЕМ» (страница «Вакансии», #vacancies) — по мотивам блока «[ Услуги ]» uni-s.group,
// в стиле нашего сайта. Компьютер: блок «прилипает» к экрану, и пока страница прокручивается вниз,
// карточки вакансий едут влево; слева — заголовок, счётчик и фото роли, которое плавно меняется
// под активную карточку. Телефон/планшет: обычная лента, листается свайпом вбок.
// Карточка: роль, описание, график-чип и кнопка к анкете. Тексты ролей — до присланного списка.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Vacancy = { role: Loc; desc: Loc; tags: Loc[]; img: string };

// TODO: актуальный список вакансий пришлёт заказчица
const VACANCIES: Vacancy[] = [
  {
    role: { ru: "Администратор", en: "Administrator" },
    desc: { ru: "Встреча гостей, запись, атмосфера салона.", en: "Greeting guests, booking, the salon's atmosphere." },
    tags: [{ ru: "график 2/2", en: "2-on/2-off" }, { ru: "салон", en: "salon" }],
    img: "/assets/tild6230-643__.jpg",
  },
  {
    role: { ru: "Визажист", en: "Makeup artist" },
    desc: { ru: "Дневной, вечерний и свадебный макияж — в салоне и на выездах.", en: "Day, evening and bridal makeup — in the salon and on location." },
    tags: [{ ru: "частичная / полная", en: "part / full time" }, { ru: "салон и выезды", en: "salon & on location" }],
    img: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    role: { ru: "Бровист", en: "Brow artist" },
    desc: { ru: "Брови и ресницы: коррекция, окрашивание, укладка.", en: "Brows and lashes: shaping, tinting, styling." },
    tags: [{ ru: "гибкий график", en: "flexible" }, { ru: "салон", en: "salon" }],
    img: "/assets/alis/img_2672.jpg",
  },
  {
    role: { ru: "Мастер ногтевого сервиса", en: "Nail technician" },
    desc: { ru: "Маникюр, педикюр, покрытие и дизайн.", en: "Manicure, pedicure, coating and design." },
    tags: [{ ru: "график 2/2", en: "2-on/2-off" }, { ru: "салон", en: "salon" }],
    img: "/assets/tild3638-373_-2___1__3.jpg",
  },
];

export default function VacanciesScroll() {
  const { lang } = useLang();
  const en = lang === "en";
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);

  // Компьютер: вертикальная прокрутка → сдвиг ленты влево (rAF)
  useEffect(() => {
    const w = wrap.current, tr = track.current;
    if (!w || !tr) return;
    const mq = matchMedia("(min-width: 1024px)");
    let raf = 0;
    const upd = () => {
      raf = 0;
      if (!mq.matches) { tr.style.transform = ""; return; }
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const max = tr.scrollWidth - tr.parentElement!.clientWidth;
      tr.style.transform = `translate3d(${-p * max}px,0,0)`;
      setProg(p);
      setActive(Math.min(VACANCIES.length - 1, Math.round(p * (VACANCIES.length - 1))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    mq.addEventListener("change", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); mq.removeEventListener("change", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="vacancies" className="scroll-mt-24 bg-white section-y">
      {/* Высота обёртки = длина «прокрутки вбок» (только компьютер) */}
      <div ref={wrap} className="lg:h-[300vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
          <div className="mx-auto grid w-[96%] max-w-[1760px] gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
            {/* Слева: заголовок, счётчик, фото активной роли */}
            <div className="flex flex-col text-center lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">[ {en ? "Vacancies" : "Вакансии"} ]</p>
              <h2 className="mt-3 text-[#17191a]">{en ? "Who we're looking for" : "Кого ищем"}</h2>
              {/* Счётчик и полоса прогресса */}
              <div className="mt-6 hidden items-center gap-4 lg:flex">
                <span className="font-display text-[13px] tabular-nums text-[#17191a]">{String(active + 1).padStart(2, "0")}</span>
                <span className="relative h-px flex-1 bg-[#17191a]/12">
                  <span className="absolute inset-y-0 left-0 bg-[#17191a]" style={{ width: `${Math.max(4, prog * 100)}%` }} />
                </span>
                <span className="font-display text-[13px] tabular-nums text-[#17191a]/40">{String(VACANCIES.length).padStart(2, "0")}</span>
              </div>
              <div className="relative mt-6 hidden aspect-[4/3] overflow-hidden rounded-[28px] bg-[#f6f4f1] lg:block">
                {VACANCIES.map((v, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={v.img}
                    src={v.img}
                    alt={i === active ? v.role[lang] : ""}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
                    style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.08)" }}
                  />
                ))}
              </div>
            </div>

            {/* Справа: лента карточек */}
            <div className="-mx-[2%] overflow-x-auto px-[2%] [scrollbar-width:none] lg:mx-0 lg:overflow-hidden lg:px-0">
              <div ref={track} className="flex snap-x snap-mandatory gap-2 will-change-transform sm:gap-3 lg:gap-4">
                {VACANCIES.map((v, i) => (
                  <article
                    key={v.role.ru}
                    className={`flex w-[80%] shrink-0 snap-start flex-col justify-between rounded-[28px] p-6 transition-colors duration-500 sm:w-[48%] sm:p-8 lg:min-h-[min(560px,70vh)] lg:w-[min(440px,62%)] lg:p-10 ${
                      i === active ? "bg-[#17191a] text-white" : "bg-[#f6f4f1] text-[#17191a]"
                    }`}
                  >
                    <div>
                      <span className={`font-display text-[13px] tabular-nums transition-colors duration-500 ${i === active ? "text-white/45" : "text-[#17191a]/35"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-4 font-display text-[22px] leading-[1.15] tracking-[0.01em] sm:text-[28px] lg:text-[34px]">{v.role[lang]}</h3>
                      <p className={`mt-4 !text-[12.5px] leading-[1.6] transition-colors duration-500 sm:!text-[15px] ${i === active ? "text-white/70" : "text-[#17191a]/65"}`}>{v.desc[lang]}</p>
                    </div>
                    <div className="mt-8">
                      <div className="flex flex-wrap gap-2">
                        {v.tags.map((t) => (
                          <span key={t.ru} className={`rounded-full border px-3.5 py-1.5 text-[11px] transition-colors duration-500 sm:text-[12.5px] ${i === active ? "border-white/20 text-white/85" : "border-[#17191a]/15 text-[#17191a]/75"}`}>{t[lang]}</span>
                        ))}
                      </div>
                      <a
                        href="#join"
                        className={`group mt-5 flex items-center justify-between border-t pt-4 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-500 sm:text-[12px] ${i === active ? "border-white/15 text-white" : "border-[#17191a]/12 text-[#17191a]"}`}
                      >
                        {en ? "Fill in the form" : "Заполнить анкету"}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
