// FOOTER resayme: тёмный, крупный логотип + навигация через «/».
export default function Footer() {
  const nav = ["курс", "обо мне", "портфолио", "прайс", "дизайнерам", "контакты"];
  const social = ["behance", "dprofile", "inst*", "telegram"];
  return (
    <footer className="bg-[#121212] pt-20 pb-10">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild6137-646_logo_white_resayme.svg"
          alt="resayme"
          className="r-reveal h-10 w-auto lg:h-14"
        />

        <div className="mt-12 grid gap-10 border-t border-[#2e3133] pt-10 md:grid-cols-2">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
            {nav.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/30">/</span>}
                <a href="#" className="text-white/70 transition-colors hover:text-white">
                  {item}
                </a>
              </span>
            ))}
          </nav>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] md:justify-end">
            {social.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/30">/</span>}
                <a href="#" className="text-white/70 transition-colors hover:text-white">
                  {item}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-[13px] text-white/40">
          © {new Date().getFullYear()} resayme · Диана Семенова
        </p>
      </div>
    </footer>
  );
}
