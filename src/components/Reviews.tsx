// ОТЗЫВЫ — вращающееся 3D-кольцо: карточки стоят на изгибе (грани цилиндра),
// вся лента крутится сама по кругу. Пауза при наведении. Палитра ink/cream/бордо.
type Review = { name: string; role: string; text: string; photo: string };

const REVIEWS: Review[] = [
  {
    name: "Анна",
    role: "невеста",
    text: "Свадебный образ превзошёл все ожидания — держался весь день, а на фото я не могла себя узнать, настолько красиво.",
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: "Мария",
    role: "фотосессия",
    text: "Делали образ для съёмки. Макияж идеально лёг в кадр, а команда прочувствовала мой стиль с первого слова.",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: "Екатерина",
    role: "выпускной",
    text: "Готовили дочку на выпускной. Нежно, стойко и точно по референсу — она была самой красивой на вечере.",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: "Ольга",
    role: "мероприятие",
    text: "Выезд мастеров на площадку прошёл как часы. Всё вовремя, деликатно и с заботой о каждой детали образа.",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    name: "Дарья",
    role: "постоянная гостья",
    text: "Хожу в ALIS больше года. Каждый раз выхожу с ощущением, что стала собой — только лучше. Это дорогого стоит.",
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: "Вероника",
    role: "вечерний образ",
    text: "Пришла уставшей после работы — ушла королевой. Лёгкая рука мастера и атмосфера, в которой отдыхаешь душой.",
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: "Светлана",
    role: "свадьба",
    text: "Готовили меня и подружек невесты — все в восторге. Единый стиль, идеальный тайминг и ноль суеты в важный день.",
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: "Ирина",
    role: "макияж",
    text: "Обожаю их макияж: лёгкий, стойкий, «мой, но лучше». Ни разу не подвели, даже в жару на выезде.",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: "Наталья",
    role: "юбилей",
    text: "Собирали образ на юбилей. Чувствовала себя звездой вечера — комплименты весь праздник не заканчивались.",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: "Полина",
    role: "фотопроект",
    text: "Снимали большой проект, образов было много. Каждый продуман до мелочей и точно попал в концепцию съёмки.",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    name: "Алина",
    role: "свадьба за городом",
    text: "Свадьба была за городом, переживала за логистику. Команда приехала заранее, всё прошло спокойно и красиво.",
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: "Юлия",
    role: "деловой образ",
    text: "Собирали образ на конференцию. Строго, стильно и уверенно — ровно то, что нужно для сцены и камер.",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: "Кристина",
    role: "девичник",
    text: "Собрали всю компанию перед девичником. Быстро, весело и красиво — на фото каждая получилась идеально.",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: "Евгения",
    role: "годовщина",
    text: "Хотела нежный образ на годовщину. Услышали с полуслова и сделали именно то, о чём я мечтала.",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

export default function Reviews() {
  const n = REVIEWS.length;
  const step = 360 / n; // угол между гранями
  const radius = 580; // радиус кольца (карточки разъезжаются к краям экрана)

  return (
    <section id="reviews" className="overflow-hidden bg-[#ece4d6] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1180px]">
        {/* Заголовок */}
        <div className="mb-14 text-center">
          <span className="text-[13px] lowercase tracking-wide text-[#17191a]/45">
            (отзывы)
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#17191a] lg:text-[48px]">
            Что говорят наши гостьи
          </h2>
        </div>

        {/* Вращающееся 3D-кольцо */}
        <div className="carousel3d relative mx-auto h-[360px] [perspective:4000px] lg:h-[340px]">
          <div className="ring3d absolute inset-0">
            {REVIEWS.map((r, i) => (
              <article
                key={r.name}
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
                className="absolute left-1/2 top-1/2 -ml-[130px] -mt-[128px] flex h-[256px] w-[260px] flex-col justify-between rounded-[18px] bg-[#f4efe6] p-6 text-[#17191a] shadow-2xl [backface-visibility:hidden]"
              >
                <span className="font-serif text-[38px] leading-[0.5] text-[#4E2126]">
                  &ldquo;
                </span>

                <p className="font-serif text-[13px] leading-[1.55] text-[#17191a]">
                  {r.text}
                </p>

                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[12.5px] font-medium text-[#17191a]">{r.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#4E2126]">
                      {r.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[12px] lowercase tracking-wide text-[#17191a]/40">
          наведите, чтобы остановить
        </p>
      </div>
    </section>
  );
}
