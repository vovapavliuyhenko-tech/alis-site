"use client";
// Плавная прокрутка к якорям (кнопки/меню, ведущие к #блоку на той же странице).
// Делаем через JS (scrollIntoView smooth), а НЕ через CSS scroll-behavior — иначе
// конфликт с кастомным SmoothScroll (window.scrollTo в rAF-цикле → залипание).
import { useEffect } from "react";

export default function SmoothAnchor() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      let el: Element | null = null;
      try { el = document.querySelector(hash); } catch { return; }
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
