"use client";
// ЭФФЕКТ КНОПОК ПО ВСЕМУ САЙТУ: при наведении надпись (со стрелкой/иконкой) уезжает вверх,
// а снизу на её место выезжает такая же. Работает для всех кнопок с классом btn-fill / btn-roll.
// Как устроено: исходное содержимое кнопки остаётся на месте (React им управляет, для
// доступности и смены языка), но становится невидимым; поверх кладётся слой с двумя
// копиями — верхняя уезжает, нижняя въезжает. Копии обновляются, если текст кнопки меняется.
// Стили — в globals.css (.roll-on, .roll-ov, .roll-a, .roll-b).
import { useEffect } from "react";

const SEL = "a.btn-fill, button.btn-fill, a.btn-roll, button.btn-roll";

function cloneContent(btn: HTMLElement) {
  const frag = document.createDocumentFragment();
  btn.childNodes.forEach((n) => {
    if (n instanceof HTMLElement && n.classList.contains("roll-ov")) return;
    const c = n.cloneNode(true);
    if (c instanceof Element) {
      c.removeAttribute("id");
      c.querySelectorAll("[id]").forEach((e) => e.removeAttribute("id"));
    }
    frag.appendChild(c);
  });
  return frag;
}

function build(btn: HTMLElement) {
  let ov = btn.querySelector<HTMLElement>(":scope > .roll-ov");
  if (!ov) {
    ov = document.createElement("span");
    ov.className = "roll-ov";
    ov.setAttribute("aria-hidden", "true");
    btn.appendChild(ov);
  }
  const d = getComputedStyle(btn).display;
  const flex = d.includes("flex");
  const a = document.createElement("span");
  const b = document.createElement("span");
  a.className = "roll-a";
  b.className = "roll-b";
  for (const el of [a, b]) {
    el.style.display = flex ? "flex" : "block";
    el.appendChild(cloneContent(btn));
  }
  ov.replaceChildren(a, b);
  btn.classList.add("roll-on");
}

export default function ButtonRoll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakMap<HTMLElement, MutationObserver>();
    const all: MutationObserver[] = [];

    const enhance = (btn: HTMLElement) => {
      if (seen.has(btn) || btn.classList.contains("no-roll")) return;
      build(btn);
      // Текст кнопки поменялся (язык, «Отправляем…») — пересобрать копии
      let raf = 0;
      const mo = new MutationObserver((list) => {
        if (list.every((m) => (m.target as Node).parentElement?.closest(".roll-ov") || (m.target as Element).classList?.contains("roll-ov"))) return;
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; build(btn); });
      });
      mo.observe(btn, { childList: true, subtree: true, characterData: true });
      seen.set(btn, mo);
      all.push(mo);
    };

    const scan = () => document.querySelectorAll<HTMLElement>(SEL).forEach(enhance);
    scan();
    // Новые кнопки (шаги анкет, переходы по страницам)
    let raf = 0;
    const root = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; scan(); });
    });
    root.observe(document.body, { childList: true, subtree: true });
    return () => {
      root.disconnect();
      all.forEach((m) => m.disconnect());
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
