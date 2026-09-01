// Логотип ÁLIS BEAUTY: овальный вензель-монограмма (SVG) + надпись Marcellus.
// Цвет наследуется через currentColor — задаётся классом текста родителя.

// Вензель в вертикальном овале: «Á» с каллиграфическим росчерком.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" fill="none" className={className} aria-hidden>
      {/* Овальная рамка */}
      <ellipse cx="100" cy="130" rx="66" ry="118" stroke="currentColor" strokeWidth="2" />
      {/* Буква A */}
      <path
        d="M100 74 L58 196 M100 74 L142 196 M74 158 H126"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Акут над A */}
      <path d="M104 52 L120 40" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      {/* Каллиграфический росчерк, обвивающий монограмму */}
      <path
        d="M70 120 C104 96 150 120 128 156 C112 182 78 176 92 150 C102 132 128 138 126 158"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M132 92 C158 108 156 150 120 168"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Полный логотип: вензель над надписью (для футера/героя).
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <LogoMark className="h-[92px] w-auto" />
      <span className="font-logo mt-4 text-[30px] uppercase leading-none tracking-[0.28em]">
        ÁLIS&nbsp;BEAUTY
      </span>
    </div>
  );
}
