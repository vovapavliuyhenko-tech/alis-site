// Плавающая «капсула»-шапка ALIS: лого слева, меню по центру (с выпадашкой
// «услуги»), CTA-кнопка «Записаться» справа. Тёмное матовое стекло.
const NAV = [
  { label: "главная", href: "#" },
  { label: "обо мне", href: "#about" },
  {
    label: "услуги",
    href: "#services",
    sub: [
      { label: "Образы и макияж", href: "#services" },
      { label: "Свадебные образы", href: "#services" },
      { label: "Выезд мастеров", href: "#services" },
      { label: "Beauty concierge", href: "#concierge" },
    ],
  },
  { label: "прайс", href: "#services" },
  { label: "галерея", href: "#gallery" },
  { label: "контакты", href: "#footer" },
];

export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-[1160px] items-center justify-between gap-4 rounded-full border border-white/15 bg-black/35 py-2.5 pl-6 pr-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
        {/* Логотип */}
        <a href="#" className="font-serif text-[20px] leading-none tracking-[0.16em] text-white">
          ÁLIS
        </a>

        {/* Навигация по центру */}
        <nav className="hidden items-center gap-7 text-[14px] tracking-wide text-white/80 lg:flex">
          {NAV.map((item) =>
            item.sub ? (
              <div key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="flex items-center gap-1 py-2 transition-colors hover:text-white"
                >
                  {item.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 opacity-70">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                {/* Выпадающее меню */}
                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
                    {item.sub.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="block rounded-xl px-4 py-2.5 text-[13.5px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="py-2 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* CTA */}
        <a
          href="#footer"
          className="flex items-center gap-2.5 rounded-full bg-white py-2 pl-5 pr-2 text-[13px] font-medium text-[#17191a] transition-opacity hover:opacity-90"
        >
          Записаться
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#17191a]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </header>
  );
}
