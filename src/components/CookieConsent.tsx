"use client";
// Баннер согласия на использование файлов cookie. Показывается один раз,
// выбор сохраняется в localStorage. Двуязычно (RU/EN). Ссылка на Cookie-политику.
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const KEY = "alis-cookie-consent";

export default function CookieConsent() {
  const { lang } = useLang();
  const en = lang === "en";
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage недоступен — баннер не показываем */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* игнорируем */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex max-w-[400px] flex-col gap-2.5 rounded-2xl border border-[#17191a]/10 bg-white/95 px-4 py-3 shadow-[0_16px_50px_rgba(23,25,26,0.18)] backdrop-blur-md">
        <p className="text-[11.5px] leading-snug text-[#17191a]/70">
          {en ? (
            <>
              We use cookies to improve the site. See our{" "}
              <a href="/cookies" className="text-[#46131E] underline underline-offset-2 hover:opacity-70">
                Cookie
              </a>{" "}
              &amp;{" "}
              <a href="/policy" className="text-[#46131E] underline underline-offset-2 hover:opacity-70">
                Privacy Policy
              </a>
              .
            </>
          ) : (
            <>
              Используем cookie, чтобы сайт работал удобнее.{" "}
              <a href="/cookies" className="text-[#46131E] underline underline-offset-2 hover:opacity-70">
                Политика cookie
              </a>{" "}
              и{" "}
              <a href="/policy" className="text-[#46131E] underline underline-offset-2 hover:opacity-70">
                конфиденциальности
              </a>
              .
            </>
          )}
        </p>
        <div className="flex shrink-0 items-center justify-end gap-2.5">
          <button
            onClick={() => decide("declined")}
            className="rounded-full border border-[#17191a]/20 px-4 py-2 text-[12px] text-[#17191a]/70 transition-colors hover:border-[#17191a]/40 hover:text-[#17191a]"
          >
            {en ? "Decline" : "Отклонить"}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-[#46131E] px-5 py-2 text-[12px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
          >
            {en ? "Accept" : "Принять"}
          </button>
        </div>
      </div>
    </div>
  );
}
