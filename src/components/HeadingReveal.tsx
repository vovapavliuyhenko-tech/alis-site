"use client";
// ПОЯВЛЕНИЕ ЗАГОЛОВКОВ ПО ВСЕМУ САЙТУ — как у заголовка на обложке: когда заголовок блока
// въезжает в кадр, его буквы проявляются по одной из лёгкого размытия. Так же — подписи
// «[ … ]». Подзаголовок (абзац сразу под заголовком) плавно всплывает из размытия целиком.
// Буквы — временные span: после анимации исходный текст возвращается на место (React
// продолжает управлять своими узлами, смена языка не ломается). Обложки (h1) не трогаем —
// у них своя анимация. При «уменьшить движение» выключено.
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const LETTERS = "main h2:not(.sr-only), main .block-label";
const SUBS = "main h2:not(.sr-only) + p";

function splitLetters(el: HTMLElement) {
  // Только простые заголовки из одного текста (сложную разметку не трогаем — анимируем целиком)
  const nodes = Array.from(el.childNodes);
  if (!nodes.length || nodes.some((n) => n.nodeType !== Node.TEXT_NODE)) return false;
  const text = el.textContent || "";
  const box = document.createElement("span");
  box.setAttribute("aria-hidden", "true");
  let n = 0;
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    if (/^\s+$/.test(part)) { box.appendChild(document.createTextNode(" ")); return; }
    const word = document.createElement("span");
    word.style.display = "inline-block";
    word.style.whiteSpace = "nowrap";
    for (const ch of part) {
      const s = document.createElement("span");
      s.className = "hero-letter inline-block";
      s.style.animationDelay = `${n++ * 0.03}s`;
      s.textContent = ch;
      word.appendChild(s);
    }
    box.appendChild(word);
  });
  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = text;
  nodes.forEach((nd) => nd.parentNode?.removeChild(nd));
  el.append(sr, box);
  // Вернуть исходные узлы после анимации
  setTimeout(() => {
    if (!el.contains(box)) return;
    sr.remove();
    box.remove();
    nodes.forEach((nd) => el.appendChild(nd));
  }, 900 + n * 30 + 200);
  return true;
}

function wholeFade(el: HTMLElement, cls = "hero-up-blur") {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 1400);
}

export default function HeadingReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | null = null;
    const t = setTimeout(() => {
      const done = new WeakSet<Element>();
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || done.has(e.target)) continue;
          done.add(e.target);
          io?.unobserve(e.target);
          const el = e.target as HTMLElement;
          if (el.matches(SUBS)) wholeFade(el);
          else if (!splitLetters(el)) wholeFade(el);
        }
      }, { threshold: 0.4 });
      document.querySelectorAll<HTMLElement>(`${LETTERS}, ${SUBS}`).forEach((el) => {
        // Пропускаем то, что уже в кадре при загрузке, — чтобы не мигало
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) return;
        io!.observe(el);
      });
    }, 400);
    return () => { clearTimeout(t); io?.disconnect(); };
  }, [pathname]);
  return null;
}
