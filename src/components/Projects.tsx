// PROJECTS resayme: полноэкранное фото + белая карточка проекта.
// «(projects)» — реальный SVG, снизу счётчик. Ассеты — реальные фото проектов.
export default function Projects() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-black">
      {/* Фон: два фото проекта */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/tild6530-383_-2___1_.jpg" alt="" className="h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/tild3638-373_-2___1__3.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Белая карточка проекта */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex w-[86%] max-w-[440px] flex-col items-center bg-white px-8 py-10 text-center text-[#1a1512]">
          <p className="max-w-[260px] text-[13px] leading-snug text-[#4a453f]">
            Айдентика для украшений ручной работы — Bergammo
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/tild3535-313_bergamo.png"
            alt="Bergammo"
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
        (1)
      </span>
    </section>
  );
}
