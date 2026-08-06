// PROJECTS resayme: 6 проектов. Панели ЗАЛИПАЮТ (sticky) и наслаиваются при скролле —
// как на оригинале. В карточке — реальный SVG-логотип названия и SVG-счётчик.
const SLIDES = [
  { name: "/assets/tild3035-356_-2-08.svg", num: "/assets/tild3930-303_1.svg", bg: "/assets/tild6530-383_-2___1_.jpg", thumb: "/assets/tild3535-313_bergamo.png", alt: "Bergammo" },
  { name: "/assets/tild6536-383_-2-07.svg", num: "/assets/tild3639-373_2.svg", bg: "/assets/tild3638-373_-2___1__3.jpg", thumb: "/assets/tild3134-353___2024-12-08__161353.png", alt: "Avenue" },
  { name: "/assets/tild3435-326_-2-09.svg", num: "/assets/tild6538-633_3.svg", bg: "/assets/tild6536-613_-2___1__4.jpg", thumb: "/assets/tild3439-633___2025-03-31__213150.png", alt: "ANNAZUR" },
  { name: "/assets/tild6561-393_-2-11.svg", num: "/assets/tild6538-653_4.svg", bg: "/assets/tild3561-646_-2___1__5.jpg", thumb: "/assets/tild6664-386_2851782e-4c78-4475-a.png", alt: "онкоуролог" },
  { name: "/assets/tild6661-393_-2-10.svg", num: "/assets/tild3632-303_5.svg", bg: "/assets/tild6436-383_fermata__1.jpg", thumb: "/assets/tild6561-356_fermata__2.jpg", alt: "ROUNDY" },
  { name: "/assets/tild6139-663_fermata_logo.svg", num: "/assets/tild6637-663_6.svg", bg: "/assets/tild6561-356_fermata__2.jpg", thumb: "/assets/tild6436-383_fermata__1.jpg", alt: "Архитектурное бюро" },
];

export default function Projects() {
  return (
    <div className="relative">
      {SLIDES.map((s, i) => (
        <section
          key={s.alt}
          className="sticky top-0 h-svh w-full overflow-hidden bg-black"
        >
          {/* Полноэкранный фон проекта */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />

          {/* Карточка проекта: фото работы + белый логотип поверх */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="relative aspect-[3/4] w-[84%] max-w-[380px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.thumb} alt={s.alt} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              {/* Логотип названия (белый SVG) по центру */}
              <div className="absolute inset-0 flex items-center justify-center px-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.name} alt={s.alt} className="w-[62%] max-w-[210px] object-contain" />
              </div>
              <p className="absolute inset-x-0 bottom-6 text-center text-[13px] lowercase tracking-wide text-white/85">
                behance / dprofile
              </p>
            </div>
          </div>

          {/* «(projects)» снизу-слева */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/tild3264-623_project.svg" alt="(projects)" className="absolute bottom-8 left-6 h-6 w-auto opacity-90" />
          {/* Счётчик снизу-справа */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.num} alt={`(${i + 1})`} className="absolute bottom-8 right-6 h-6 w-auto opacity-90" />
        </section>
      ))}
    </div>
  );
}
