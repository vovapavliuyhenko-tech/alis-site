"use client";
// Регистрация service worker — кэширование ради быстрой повторной загрузки и
// работы сайта без интернета. Регистрируем после полной загрузки страницы,
// чтобы не мешать первому рендеру.
import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
