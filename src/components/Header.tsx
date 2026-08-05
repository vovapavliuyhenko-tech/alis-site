// Шапка resayme: логотип слева, навигация справа двумя строками через «/».
export default function Header() {
  const nav = ["курс", "обо мне", "портфолио", "прайс", "дизайнерам", "контакты"];
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-[94%] max-w-[1280px] items-start justify-between pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild6137-646_logo_white_resayme.svg"
          alt="resayme"
          className="pointer-events-auto h-6 w-auto"
        />
        <nav className="pointer-events-auto hidden max-w-[360px] flex-wrap justify-end gap-x-2 gap-y-1 text-right font-thunder text-[18px] leading-tight text-white lg:flex">
          {nav.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/40">/</span>}
              <a href="#" className="transition-colors hover:text-white/70">
                {item}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
