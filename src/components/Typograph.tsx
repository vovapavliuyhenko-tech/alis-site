"use client";
// ТИПОГРАФ: убирает «висячие» короткие слова (предлоги/союзы/частицы) в конце
// строки — заменяет пробел после них на неразрывный. Проходит по текстовым узлам
// после рендера и при смене языка. Меняет только пробелы (не структуру), а текст
// узлов не пересоздаётся при hover — поэтому не конфликтует с React.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

// Связываем с последующим словом: все 1–2-буквенные слова + частые 3-буквенные
// предлоги/союзы/частицы (RU и короткие EN).
const SHORT =
  /(^|[\s(«„"—-])([A-Za-zА-Яа-яЁё]{1,2}|для|как|что|это|или|под|над|без|про|при|уже|же|бы|ли|the|and|for|are|you)[ ]/g;

function fixOrphans(s: string): string {
  if (s.indexOf(" ") === -1) return s;
  let prev: string;
  let out = s;
  do {
    prev = out;
    out = out.replace(SHORT, "$1$2 ");
  } while (out !== prev);
  return out;
}

const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE", "NOSCRIPT"]);

export default function Typograph() {
  const { lang } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      const root = document.querySelector("main") || document.body;
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const p = node.parentElement;
          if (!p || SKIP.has(p.tagName) || p.isContentEditable) return NodeFilter.FILTER_REJECT;
          return node.nodeValue && node.nodeValue.trim().length > 1
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      });
      const nodes: Text[] = [];
      let n = walker.nextNode();
      while (n) {
        nodes.push(n as Text);
        n = walker.nextNode();
      }
      nodes.forEach((t) => {
        const fixed = fixOrphans(t.nodeValue || "");
        if (fixed !== t.nodeValue) t.nodeValue = fixed;
      });
    };
    // после текущего кадра, чтобы контент успел отрендериться
    // два прохода: сразу после кадра и чуть позже (на случай отложенного контента)
    const raf = requestAnimationFrame(run);
    const timer = setTimeout(run, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [lang, pathname]);

  return null;
}
