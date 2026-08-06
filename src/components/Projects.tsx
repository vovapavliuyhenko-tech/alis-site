// ГАЛЕРЕЯ РАБОТ ALIS: 6 образов. Панели ЗАЛИПАЮТ (sticky) и наслаиваются при
// скролле. В карточке — фото работы + подпись образа + SVG-счётчик.
// Фото — заглушки (заменить на реальные работы салона).
const SLIDES = [
  { title: "Свадебный образ", num: "/assets/tild3930-303_1.svg", bg: "/assets/tild6530-383_-2___1_.jpg", thumb: "/assets/tild6230-643__.jpg" },
  { title: "Вечерний макияж", num: "/assets/tild3639-373_2.svg", bg: "/assets/tild3638-373_-2___1__3.jpg", thumb: "/assets/tild3236-393__.jpg" },
  { title: "Дневной образ", num: "/assets/tild6538-633_3.svg", bg: "/assets/tild6536-613_-2___1__4.jpg", thumb: "/assets/tild3535-313_bergamo.png" },
  { title: "Съёмочный образ", num: "/assets/tild6538-653_4.svg", bg: "/assets/tild3561-646_-2___1__5.jpg", thumb: "/assets/tild6536-613_-2___1__4.jpg" },
  { title: "Образ на выпускной", num: "/assets/tild3632-303_5.svg", bg: "/assets/tild6436-383_fermata__1.jpg", thumb: "/assets/tild6561-356_fermata__2.jpg" },
  { title: "Образ для мероприятия", num: "/assets/tild6637-663_6.svg", bg: "/assets/tild6561-356_fermata__2.jpg", thumb: "/assets/tild3561-646_-2___1__5.jpg" },
];

export default function Projects() {
  return (
    <div id="gallery" className="relative">
      {SLIDES.map((s, i) => (
        <section
          key={s.title}
          className="sticky top-0 h-svh w-full overflow-hidden bg-black"
        >
          {/* Полноэкранный фон */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />

          {/* Карточка: фото работы + подпись образа поверх */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="relative aspect-[3/4] w-[84%] max-w-[380px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.thumb} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <span className="text-center font-serif text-[26px] leading-tight text-white drop-shadow lg:text-[30px]">
                  {s.title}
                </span>
              </div>
              <p className="absolute inset-x-0 bottom-6 text-center text-[13px] lowercase tracking-wide text-white/85">
                instagram / telegram
              </p>
            </div>
          </div>

          {/* «(галерея)» снизу-слева */}
          <span className="absolute bottom-8 left-6 font-thunder text-[22px] lowercase tracking-wide text-white/90">
            (галерея)
          </span>
          {/* Счётчик снизу-справа */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.num} alt={`(${i + 1})`} className="absolute bottom-8 right-6 h-6 w-auto opacity-90" />
        </section>
      ))}
    </div>
  );
}
