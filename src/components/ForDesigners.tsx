// БЛОК «ДИЗАЙНЕРАМ» resayme: промо курса It's base.
// Заголовок «for designers» + бейдж «new» — реальные SVG. Факты курса — с сайта.
const FACTS = [
  { k: "Для кого", v: "Начинающие и опытные дизайнеры" },
  { k: "Из чего состоит", v: "12 модулей с лекциями и заданиями" },
  { k: "Длительность", v: "3 месяца" },
  { k: "Обратная связь", v: "От автора курса и кураторов" },
  { k: "Результат", v: "Оформленный на все площадки кейс" },
];

export default function ForDesigners() {
  return (
    <section className="bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Заголовок + бейдж new */}
        <div className="mb-14 flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/tild3236-323_for_designers.svg"
            alt="for designers"
            className="h-8 w-auto lg:h-10"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/tild6665-633_new.svg"
            alt="new"
            className="h-5 w-auto lg:h-6"
          />
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Левая колонка — оффер */}
          <div>
            <h2 className="max-w-xl text-[26px] font-medium leading-tight text-white lg:text-[34px]">
              Курс по графическому дизайну с 0 и для опытных —{" "}
              <span className="font-thunder italic">It&apos;s base</span>
            </h2>
            <p className="mt-7 max-w-md text-[14px] leading-relaxed text-white/70">
              Я автор курса It&apos;s base — обучение профессии дизайнера с нуля.
              Весь мой опыт, собранный в мощную программу, чтобы получить реальную
              опору на свои знания и стать востребованным специалистом.
            </p>
            <a
              href="#"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[14px] font-medium text-[#17191a] transition-opacity hover:opacity-85"
            >
              Узнать подробнее
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Правая колонка — факты */}
          <dl className="divide-y divide-[#2e3133] border-t border-[#2e3133]">
            {FACTS.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 py-5">
                <dt className="text-[13px] uppercase tracking-wide text-white/45">
                  {f.k}
                </dt>
                <dd className="max-w-[60%] text-right text-[15px] text-white">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
