"use client";
// ПРЕЛОАДЕР как у PALOMA: белый экран, по центру только логотип. Затем экран
// уходит вверх «шторкой», открывая сайт.
import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/Logo";

export default function Preloader() {
  const [lift, setLift] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setLift(true), 1300); // держим логотип
    const t2 = window.setTimeout(() => setGone(true), 2200); // после «шторки» убираем
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // Блокируем скролл, пока прелоадер виден
  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        lift ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className={`flex flex-col items-center transition-opacity duration-700 ${lift ? "opacity-0" : "opacity-100"}`}>
        <LogoLockup variant="wine" />
      </div>
    </div>
  );
}
