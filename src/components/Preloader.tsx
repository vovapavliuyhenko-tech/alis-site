"use client";
// ПРЕЛОАДЕР как на stretchfitdasha.ru/otekoff: кремовый фон, сверху название
// салона, по центру крупный счётчик % (0→100), снизу «ещё немного…».
// После 100% плавно исчезает, открывая сайт.
import { useEffect, useState } from "react";

export default function Preloader() {
  const [p, setP] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cur = 0;
    const id = window.setInterval(() => {
      cur = Math.min(100, cur + Math.random() * 2.4 + 1);
      setP(Math.round(cur));
      if (cur >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setGone(true), 550);
      }
    }, 30);
    return () => window.clearInterval(id);
  }, []);

  // Блокируем скролл, пока прелоадер виден
  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col bg-[#f4efe6] text-[#17191a] transition-opacity duration-[800ms] ease-out ${
        gone ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Название салона сверху */}
      <div className="pt-14 text-center lg:pt-20">
        <p className="font-serif text-[26px] italic tracking-tight lg:text-[32px]">
          ÁLIS <span className="opacity-60">(beauty)</span>
        </p>
      </div>

      {/* Счётчик по центру */}
      <div className="flex flex-1 items-center justify-center">
        <p className="font-serif text-[64px] italic leading-none tabular-nums text-[#4E2126] lg:text-[88px]">
          {p} %
        </p>
      </div>

      {/* Подпись снизу */}
      <div className="pb-14 text-center lg:pb-20">
        <p className="text-[13px] font-medium lowercase tracking-wide">
          ещё немного…
        </p>
      </div>
    </div>
  );
}
