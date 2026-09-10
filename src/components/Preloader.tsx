"use client";
// ПРЕЛОАДЕР как у PALOMA: белый экран, по центру логотип, затем уходит вверх
// «шторкой». Показывается при ПЕРВОЙ загрузке и при переходе на ЛЮБУЮ страницу
// сайта (реагирует на смену маршрута через usePathname).
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoLockup } from "@/components/Logo";

export default function Preloader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"in" | "lift" | "gone">("in");

  // При каждой смене маршрута — заново проигрываем прелоадер.
  useEffect(() => {
    setPhase("in");
    const t1 = window.setTimeout(() => setPhase("lift"), 900); // держим логотип
    const t2 = window.setTimeout(() => setPhase("gone"), 1750); // после «шторки» убираем
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  // Блокируем скролл, пока прелоадер виден
  useEffect(() => {
    document.body.style.overflow = phase === "gone" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "lift" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className={`flex flex-col items-center transition-opacity duration-700 ${phase === "lift" ? "opacity-0" : "opacity-100"}`}>
        <LogoLockup variant="wine" />
      </div>
    </div>
  );
}
