// Плавающая «капсула»-шапка ALIS: лого слева, меню по центру (с выпадашкой
// «услуги»), CTA-кнопка «Записаться» справа. Тёмное матовое стекло.
import type { ReactNode } from "react";

// Пункт меню: при наведении текст переворачивается по X и становится бордовым
function FlipText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block [perspective:400px]">
      <span className="block transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover/nav:[transform:rotateX(180deg)]">
        <span className="block [backface-visibility:hidden]">{children}</span>
        <span className="absolute inset-0 block text-[#4E2126] [backface-visibility:hidden] [transform:rotateX(180deg)]">
          {children}
        </span>
      </span>
    </span>
  );
}
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
      <div className="pointer-events-auto flex w-full max-w-[1160px] items-center justify-between gap-4 rounded-full border border-[#17191a]/10 bg-[#f4efe6]/70 py-2.5 pl-6 pr-2.5 shadow-[0_8px_30px_rgba(23,25,26,0.12)] backdrop-blur-md">
        {/* Логотип */}
        <a href="#" className="font-serif text-[20px] leading-none tracking-[0.16em] text-[#17191a]">
          ÁLIS
        </a>

        {/* Навигация по центру */}
        <nav className="hidden items-center gap-7 text-[14px] tracking-wide text-[#17191a]/75 lg:flex">
          {NAV.map((item) =>
            item.sub ? (
              <div key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="group/nav flex items-center gap-1 py-2"
                >
                  <FlipText>{item.label}</FlipText>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 opacity-70">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                {/* Выпадающее меню */}
                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-[#17191a]/10 bg-[#f4efe6]/95 p-2 shadow-[0_12px_40px_rgba(23,25,26,0.18)] backdrop-blur-md">
                    {item.sub.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="block rounded-xl px-4 py-2.5 text-[13.5px] text-[#17191a]/75 transition-colors hover:bg-[#17191a]/[0.06] hover:text-[#17191a]"
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
                className="group/nav py-2"
              >
                <FlipText>{item.label}</FlipText>
              </a>
            )
          )}
        </nav>

        {/* CTA */}
        <a
          href="#booking"
          className="flex items-center gap-2.5 rounded-full bg-[#4E2126] py-2 pl-5 pr-2 text-[13px] font-medium text-[#f4efe6] transition-opacity hover:opacity-90"
        >
          Записаться
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4E2126" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </header>
  );
}
