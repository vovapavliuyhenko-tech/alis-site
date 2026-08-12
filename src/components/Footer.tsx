"use client";
// FOOTER ALIS: тёмный, крупный логотип + навигация через «/». Двуязычно.
import { useLang } from "@/lib/i18n";

const NAV = [
  { ru: "главная", en: "home", href: "/" },
  { ru: "обо мне", en: "about", href: "/#about" },
  { ru: "услуги", en: "services", href: "/#services" },
  { ru: "контакты", en: "contacts", href: "/#footer" },
];

const SOCIAL = ["instagram", "telegram", "whatsapp"];

export default function Footer() {
  const { lang } = useLang();
  const tagline =
    lang === "en"
      ? "network of aesthetics studios & beauty concierge"
      : "сеть студий эстетики и beauty-concierge";

  return (
    <footer id="footer" className="scroll-mt-24 bg-white pt-20 pb-10">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <div className="r-reveal font-serif text-[44px] leading-none tracking-[0.12em] text-[#17191a] lg:text-[60px]">
          ÁLIS
        </div>

        <div className="mt-12 grid gap-10 border-t border-[#4E2126]/60 pt-10 md:grid-cols-2">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
            {NAV.map((item, i) => (
              <span key={item.href} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#4E2126]">/</span>}
                <a href={item.href} className="text-[#17191a]/70 transition-colors hover:text-[#17191a]">
                  {item[lang]}
                </a>
              </span>
            ))}
          </nav>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] md:justify-end">
            {SOCIAL.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#4E2126]">/</span>}
                <a href="#" className="text-[#17191a]/70 transition-colors hover:text-[#17191a]">
                  {item}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-[13px] text-[#17191a]/45">
          © {new Date().getFullYear()} ALIS · {tagline}
        </p>
      </div>
    </footer>
  );
}
