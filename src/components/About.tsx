// ABOUT resayme: тёмная секция. Заголовок «(about me)» — реальный SVG.
// Слева абзацы, справа большой портрет, у правого края вертикальные соц-ссылки.
export default function About() {
  return (
    <section className="relative bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Заголовок-SVG */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild3939-383_about.svg"
          alt="(about me)"
          className="mb-16 h-8 w-auto lg:h-9"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Левая колонка — текст */}
          <div className="order-2 max-w-xl space-y-7 text-[13px] leading-relaxed text-white/85 lg:order-1 lg:text-[14px]">
            <p>
              5 лет разрабатываю дизайн брендам со всего мира, мои работы —
              отражение моих знаний и видения, имеют награды на дизайн-площадках
              Behance/Dprofile (28 наград). За моей спиной множество обучений,
              высшее образование дизайнера, десятки реализованных проектов, а
              еще я обучаю с нуля
            </p>
            <p>
              Я ценю аутентичность людей и брендов, верю в уникальность и
              непохожесть каждого из них, моя задача отразить это визуально,
              сделать так, чтобы внешнее соответствовало внутреннему.
            </p>
            <p>
              Я за подлинность, непохожесть, идеи и смыслы, которые можно
              отразить в дизайне, который будет о вас и раскроет именно вашу
              историю
            </p>
            <p>
              Услуги, на которых я специализируюсь: разработка логотипов,
              айдентики, визуала социальных сетей. Я расскажу вашу историю и
              историю вашего бренда людям, чтобы навсегда остаться в их сердце.
            </p>
          </div>

          {/* Правая колонка — портрет */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end lg:pr-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/tild3236-393__.jpg"
              alt="Диана Семенова"
              className="aspect-[3/4] w-full max-w-[420px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Вертикальные соц-ссылки у правого края */}
      <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex items-center gap-4 text-[13px] tracking-wide text-white/60 [writing-mode:vertical-rl] rotate-180">
          <a href="#" className="transition-colors hover:text-white">behance</a>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">dprofile</a>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">inst*</a>
        </div>
      </div>
    </section>
  );
}
