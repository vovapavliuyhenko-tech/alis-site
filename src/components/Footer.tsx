// FOOTER ALIS: тёмный, крупный логотип + навигация через «/».
export default function Footer() {
  const nav = ["главная", "обо мне", "услуги", "прайс", "консьерж", "контакты"];
  const social = ["instagram", "telegram", "whatsapp"];
  return (
    <footer id="footer" className="scroll-mt-24 bg-[#ece4d6] pt-20 pb-10">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <div className="r-reveal font-serif text-[44px] leading-none tracking-[0.12em] text-[#17191a] lg:text-[60px]">
          ÁLIS
        </div>

        <div className="mt-12 grid gap-10 border-t border-[#17191a]/10 pt-10 md:grid-cols-2">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
            {nav.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#17191a]/25">/</span>}
                <a href="#" className="text-[#17191a]/70 transition-colors hover:text-[#4E2126]">
                  {item}
                </a>
              </span>
            ))}
          </nav>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] md:justify-end">
            {social.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#17191a]/25">/</span>}
                <a href="#" className="text-[#17191a]/70 transition-colors hover:text-[#4E2126]">
                  {item}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-[13px] text-[#17191a]/45">
          © {new Date().getFullYear()} ALIS · сеть студий эстетики и beauty-concierge
        </p>
      </div>
    </footer>
  );
}
