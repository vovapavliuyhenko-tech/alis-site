// УСЛУГИ/ПРАЙС в формате «прайс-таблицы»: слева тег + крупный serif-заголовок,
// ниже строки [номер] · название · описание · цена + деталь в скобках.
// Стиль наш: тёмный фон, serif-заголовки, реальные цены салона.
type Row = {
  n: string;
  title: string;
  desc: string;
  price: string;
  meta?: string;
};

const ROWS: Row[] = [
  {
    n: "01",
    title: "Полный образ",
    desc: "Макияж и укладка под ваш повод — от дневного выхода до вечернего события. Собираем цельный, ухоженный образ.",
    price: "от 8 000 ₽",
    meta: "с топ-стилистами — от 10 000 ₽",
  },
  {
    n: "02",
    title: "Свадебный образ",
    desc: "Ваш день под ключ: пробный образ заранее, репетиция деталей и финальный свадебный look в день торжества.",
    price: "от 10 000 ₽",
    meta: "пробный — 8 500 ₽ · топ-стилисты — 15 000 ₽",
  },
  {
    n: "03",
    title: "Макияж и укладка",
    desc: "Отдельные услуги, когда нужно быстро и точно — только макияж или только укладка под настроение.",
    price: "от 2 500 ₽",
    meta: "макияж — 5 000 ₽",
  },
  {
    n: "04",
    title: "Образ с подбором look",
    desc: "Полный образ плюс подбор одного лука от стилиста под конкретное мероприятие — от макияжа до одежды.",
    price: "от 15 000 ₽",
    meta: "свадебный с подбором — от 17 000 ₽",
  },
  {
    n: "05",
    title: "Выезд мастеров",
    desc: "Команда от двух мастеров приезжает к вам. Новороссийск — 8 000 ₽; Геленджик / Анапа / Абрау-Дюрсо — от 10 000 ₽; Сочи / Адлер, Краснодар / Ростов — от 25 000 ₽; Москва и Санкт-Петербург — по запросу.",
    price: "от 8 000 ₽",
    meta: "другое число мастеров — по договорённости",
  },
  {
    n: "06",
    title: "Сопровождение на мероприятии",
    desc: "Стилист и визажист рядом весь день или вечер: правки образа, помощь с деталями, быстрые перемены между выходами.",
    price: "от 2 000 ₽/час",
    meta: "стилист + визажист — 4 000 ₽/час",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Шапка: слева тег, справа крупный serif-заголовок */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
          <span className="r-reveal self-start text-[13px] lowercase tracking-wide text-white/45">
            [ услуги + цены ]
          </span>
          <h2 className="r-reveal font-serif text-[34px] leading-[1.05] text-white lg:text-right lg:text-[54px]">
            Собираем образ под повод,
            <br />
            формат и настроение
          </h2>
        </div>

        {/* Строки прайса */}
        <div className="border-t border-white/12">
          {ROWS.map((r) => (
            <div
              key={r.n}
              className="r-reveal grid grid-cols-1 items-start gap-3 border-b border-white/12 py-8 lg:grid-cols-[64px_1fr_240px] lg:items-center lg:gap-10 lg:py-10"
            >
              {/* Номер */}
              <span className="text-[13px] tracking-wide text-white/40">
                [ {r.n} ]
              </span>

              {/* Название */}
              <h3 className="font-serif text-[26px] leading-tight text-white lg:text-[30px]">
                {r.title}
              </h3>

              {/* Цена + деталь */}
              <div className="lg:min-w-[190px] lg:text-right">
                <p className="font-serif text-[24px] leading-none text-white lg:text-[28px]">
                  {r.price}
                </p>
                {r.meta && (
                  <p className="mt-3 text-[12px] tracking-wide text-white/40">
                    [ {r.meta} ]
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
