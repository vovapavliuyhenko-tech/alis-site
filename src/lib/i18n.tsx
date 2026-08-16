"use client";
// Переключение языка RU/EN. Контекст хранит текущий язык (с сохранением в
// localStorage) и отдаёт хелперы. Каждая секция держит свои двуязычные строки
// и выбирает нужные через useLang().lang — так проще поддерживать перевод.
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ru" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  // Восстанавливаем выбор языка на клиенте
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("alis-lang")) as Lang | null;
    if (saved === "ru" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("alis-lang", l);
    } catch {}
  };

  const toggle = () => setLang(lang === "ru" ? "en" : "ru");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Фолбэк вне провайдера — русский, без переключения
    return { lang: "ru" as Lang, setLang: () => {}, toggle: () => {} };
  }
  return ctx;
}

// Утилита выбора строки по языку: pick(lang, ru, en)
export function pick<T>(lang: Lang, ru: T, en: T): T {
  return lang === "en" ? en : ru;
}

// Маленький тумблер RU/EN — используется в шапке
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-[#17191a]/15 p-0.5 text-[12px] ${className}`}
    >
      {(["ru", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
            lang === l
              ? "bg-[#3B0D1A] text-[#f4efe6]"
              : "text-[#17191a]/55 hover:text-[#17191a]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
