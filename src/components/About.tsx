// ABOUT resayme-раскладка: «(about me)» SVG, слева текст, справа портрет,
// у правого края вертикальные соц-ссылки. Текст — от основателя салона.
export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Заголовок-SVG */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild3939-383_about.svg"
          alt="(about me)"
          className="r-reveal mb-16 h-8 w-auto lg:h-9"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Левая колонка — текст */}
          <div className="r-reveal order-2 max-w-xl space-y-7 text-[13px] leading-relaxed text-white/85 lg:order-1 lg:text-[14px]">
            <p>
              Создавая салоны красоты и наш уникальный concierge-сервис, мне
              хотелось объединить людей, горящих своим делом и творчеством, с
              чистой душой и открытым сердцем, которые смогут увидеть и соединить
              вашу внутреннюю красоту с внешней.
            </p>
            <p>
              А также, обеспечить качественный сервис и позаботиться о каждой
              детали так, чтобы у наших гостей были исключительно приятные
              ощущения и спокойная атмосфера, в которой можно настроиться на
              любовь.
            </p>
            <div className="pt-2">
              <p className="text-[15px] text-white">Дайана Тарзян</p>
              <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-white/50">
                основатель сети студий эстетики
                <br />
                ALIS и ALIS BEAUTY CONCIERGE
              </p>
            </div>
          </div>

          {/* Правая колонка — портрет */}
          <div className="r-reveal order-1 flex justify-center lg:order-2 lg:justify-end lg:pr-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/tild3236-393__.jpg"
              alt="Дайана Тарзян"
              className="aspect-[3/4] w-full max-w-[420px] rounded-[22px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Вертикальные соц-ссылки у правого края */}
      <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex items-center gap-4 text-[13px] tracking-wide text-white/60 [writing-mode:vertical-rl] rotate-180">
          <a href="#" className="transition-colors hover:text-white">instagram</a>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">telegram</a>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">whatsapp</a>
        </div>
      </div>
    </section>
  );
}
