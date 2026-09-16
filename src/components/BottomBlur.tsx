"use client";
// Матовая размытая полоса у нижнего края экрана (как на timkovo-park): контент за
// ней плавно уходит в «туман». Включается, только когда пролистали первый блок.
import { useEffect, useState } from "react";

export default function BottomBlur() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const s = document.getElementById("hero-end");
      if (!s) {
        setShow(window.scrollY > window.innerHeight * 0.6);
        return;
      }
      setShow(s.getBoundingClientRect().top <= window.innerHeight * 0.6);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 h-20 transition-opacity duration-500 lg:h-28 ${show ? "opacity-100" : "opacity-0"}`}
      style={{
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        maskImage: "linear-gradient(to top, #000 28%, transparent)",
        WebkitMaskImage: "linear-gradient(to top, #000 28%, transparent)",
        background: "linear-gradient(to top, rgba(249,248,246,0.55), rgba(249,248,246,0))",
      }}
    />
  );
}
