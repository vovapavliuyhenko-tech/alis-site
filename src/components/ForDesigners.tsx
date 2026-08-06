// БЛОК «ALIS BEAUTY CONCIERGE»: консьерж-сервис салона.
const FACTS = [
  { k: "Формат", v: "Выезд мастеров и сопровождение" },
  { k: "География", v: "Новороссийск, Сочи, Краснодар и др." },
  { k: "Услуги", v: "Образы, макияж, укладка, свадебные образы" },
  { k: "На мероприятии", v: "Стилист и визажист рядом весь день" },
  { k: "Забота", v: "Продумываем каждую деталь образа" },
];

export default function ForDesigners() {
  return (
    <section id="concierge" className="scroll-mt-24 bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Заголовок */}
        <h2 className="r-reveal mb-14 text-[34px] font-light lowercase leading-none tracking-tight text-white lg:text-[44px]">
          <span className="text-white/45">(</span>beauty concierge<span className="text-white/45">)</span>
        </h2>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Левая колонка — оффер */}
          <div>
            <h3 className="r-reveal max-w-xl text-[26px] font-medium leading-tight text-white lg:text-[34px]">
              ALIS Beauty Concierge — забота о каждой детали вашего образа
            </h3>
            <p className="r-reveal mt-7 max-w-md text-[14px] leading-relaxed text-white/70">
              Наш уникальный concierge-сервис: мастера ALIS приедут к вам, соберут
              образ и будут рядом на съёмке, свадьбе или мероприятии — чтобы у вас
              остались исключительно приятные ощущения и спокойная атмосфера.
            </p>
            <a
              href="#"
              className="r-reveal mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[14px] font-medium text-[#17191a] transition-opacity hover:opacity-85"
            >
              Записаться
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Правая колонка — факты */}
          <dl className="divide-y divide-[#2e3133] border-t border-[#2e3133]">
            {FACTS.map((f) => (
              <div key={f.k} className="r-reveal flex items-baseline justify-between gap-6 py-5">
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
