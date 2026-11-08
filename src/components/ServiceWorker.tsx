"use client";
// Регистрация service worker — кэширование ради быстрой повторной загрузки и
// работы сайта без интернета. Регистрируем после полной загрузки страницы,
// чтобы не мешать первому рендеру.
import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    // updateViaCache: "none" — браузер всегда проверяет свежую версию sw.js, обновления доходят сразу
    const register = () => navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then((r) => r.update()).catch(() => {});
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
