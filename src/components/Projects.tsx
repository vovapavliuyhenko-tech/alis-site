// PROJECTS resayme: серия полноэкранных слайдов проектов.
// «(projects)» — реальный SVG, счётчик (N). Фото — реальные ассеты проектов.
const SLIDES = [
  {
    title: "Айдентика для украшений ручной работы — Bergammo",
    bg: ["/assets/tild6530-383_-2___1_.jpg", "/assets/tild3638-373_-2___1__3.jpg"],
    thumb: "/assets/tild3535-313_bergamo.png",
  },
  {
    title: "Айдентика для креативного контент-агентства — Avenue",
    bg: ["/assets/tild6536-613_-2___1__4.jpg", "/assets/tild6664-386_2851782e-4c78-4475-a.png"],
    thumb: "/assets/tild3134-353___2024-12-08__161353.png",
  },
  {
    title: "Айдентика для врача робот-хирурга — онкоуролога",
    bg: ["/assets/tild3561-646_-2___1__5.jpg", "/assets/tild6436-383_fermata__1.jpg"],
    thumb: "/assets/tild3439-633___2025-03-31__213150.png",
  },
];

export default function Projects() {
  return (
    <>
      {SLIDES.map((s, i) => (
        <section
          key={s.title}
          className="relative min-h-svh w-full overflow-hidden bg-black"
        >
          {/* Фон: два фото проекта */}
          <div className="absolute inset-0 grid grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.bg[0]} alt="" className="h-full w-full object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.bg[1]} alt="" className="h-full w-full object-cover" />
          </div>

          {/* Белая карточка проекта */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex w-[86%] max-w-[440px] flex-col items-center bg-white px-8 py-10 text-center text-[#1a1512]">
              <p className="max-w-[280px] text-[13px] leading-snug text-[#4a453f]">
                {s.title}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.thumb}
                alt=""
                className="mt-7 aspect-[4/3] w-full object-cover"
              />
              <p className="mt-6 text-[14px] lowercase tracking-wide text-[#6b6560]">
                behance / dprofile
              </p>
            </div>
          </div>

          {/* Лейбл «(projects)» снизу-слева */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/tild3264-623_project.svg"
            alt="(projects)"
            className="absolute bottom-8 left-6 h-6 w-auto opacity-90"
          />
          {/* Счётчик снизу-справа */}
          <span className="absolute bottom-8 right-6 font-thunder text-2xl text-white/90">
            ({i + 1})
          </span>
        </section>
      ))}
    </>
  );
}
