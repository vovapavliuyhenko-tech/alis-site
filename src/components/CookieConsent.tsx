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
      <div className="mx-auto flex max-w-[1000px] flex-col gap-4 rounded-2xl border border-ink/10 bg-white/95 px-5 py-5 shadow-[0_16px_50px_rgba(60,40,24,0.18)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:px-7">
        <p className="flex-1 text-[13px] leading-relaxed text-ink/75 lg:text-[14px]">
          {en ? (
            <>
              We use cookies to make the site work properly and to improve it. By continuing to use
              the site, you agree to our{" "}
              <a href="/cookies" className="text-wine underline underline-offset-2 hover:opacity-70">
                Cookie Policy
              </a>{" "}
              and{" "}
              <a href="/policy" className="text-wine underline underline-offset-2 hover:opacity-70">
                Privacy Policy
              </a>
              .
            </>
          ) : (
            <>
              Мы используем файлы cookie, чтобы сайт работал корректно и становился удобнее. Продолжая
              пользоваться сайтом, вы соглашаетесь с{" "}
              <a href="/cookies" className="text-wine underline underline-offset-2 hover:opacity-70">
                Политикой cookie
              </a>{" "}
              и{" "}
              <a href="/policy" className="text-wine underline underline-offset-2 hover:opacity-70">
                Политикой конфиденциальности
              </a>
              .
            </>
          )}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => decide("declined")}
            className="rounded-full border border-ink/20 px-5 py-2.5 text-[13px] text-ink/70 transition-colors hover:border-ink/40 hover:text-ink"
          >
            {en ? "Decline" : "Отклонить"}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-wine px-6 py-2.5 text-[13px] font-medium text-cream transition-transform hover:scale-[1.03]"
          >
            {en ? "Accept" : "Принять"}
          </button>
        </div>
      </div>
    </div>
  );
}
