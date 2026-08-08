"use client";
// Кастомный курсор — «гелевая капля» точь-в-точь как на paloma.website:
// контейнер с SVG-фильтром goo (feGaussianBlur + feColorMatrix), внутри 20
// кругов по 26px с убывающим масштабом, тянущихся цепочкой за мышью — фильтр
// сливает их в жидкий хвост. mix-blend-mode: difference — видна на любом фоне.
// Только для мыши/трекпада.
import { useEffect, useRef } from "react";

const N = 12; // число кругов в хвосте (меньше — короче и без лишних капель)
const FOLLOW = 0.45; // коэффициент догона (выше — быстрее и плотнее хвост)
const HOVER_SEL =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const host = hostRef.current;
    if (!host) return;
    const spans = Array.from(host.children) as HTMLElement[];

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const pts = Array.from({ length: N }, () => ({ x: mx, y: my }));
    let shown = false;
    let raf = 0;

    let lastMove = performance.now();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMove = performance.now();
      if (!shown) {
        shown = true;
        host.classList.add("is-visible");
      }
      const t = e.target as Element | null;
      host.classList.toggle("is-hovering", !!(t && t.closest && t.closest(HOVER_SEL)));
    };

    const tick = () => {
      const now = performance.now();
      // В покое голова тихо «переплывает» по мягкой траектории (жидкость шевелится)
      let hx = mx;
      let hy = my;
      const idle = Math.min((now - lastMove - 140) / 400, 1); // 0→1 нарастание покоя
      if (idle > 0) {
        const t = now / 1000;
        const a = 5 * idle; // амплитуда, px
        hx += Math.sin(t * 1.5) * a + Math.sin(t * 0.8) * a * 0.5;
        hy += Math.cos(t * 1.2) * a + Math.cos(t * 0.6) * a * 0.5;
      }
      // Цепочка: голова тянется к цели, каждый следующий круг — к предыдущему
      pts[0].x += (hx - pts[0].x) * FOLLOW;
      pts[0].y += (hy - pts[0].y) * FOLLOW;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * FOLLOW;
        pts[i].y += (pts[i - 1].y - pts[i].y) * FOLLOW;
      }
      const hf = host.classList.contains("is-hovering") ? 1.5 : 1;
      for (let i = 0; i < N; i++) {
        const s = (1 - i * 0.05) * hf;
        spans[i].style.transform = `translate(${(pts[i].x - 13).toFixed(2)}px, ${(pts[i].y - 13).toFixed(2)}px) scale(${s.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const hide = () => host.classList.remove("is-visible");
    const show = () => shown && host.classList.add("is-visible");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <>
      {/* SVG-фильтр «goo» — сливает круги в жидкую каплю */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="palomaGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div ref={hostRef} className="ink-cursor" aria-hidden>
        {Array.from({ length: N }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </>
  );
}
