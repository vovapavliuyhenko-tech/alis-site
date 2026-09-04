// Логотип ÁLIS BEAUTY — настоящие файлы (вензель + надпись), обрезанные и
// перекрашенные под фон: wine — для светлого фона, cream — для тёмного.

type Variant = "wine" | "cream";

// Вензель-монограмма в овале
export function LogoEmblem({ variant = "wine", className = "" }: { variant?: Variant; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/assets/logo-emblem-${variant}.png`} alt="ÁLIS BEAUTY" className={className} draggable={false} />;
}

// Надпись ÁLIS BEAUTY
export function LogoWord({ variant = "wine", className = "" }: { variant?: Variant; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/assets/logo-word-${variant}.png`} alt="ÁLIS BEAUTY" className={className} draggable={false} />;
}

// Полный логотип: вензель над надписью
export function LogoLockup({ variant = "wine", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <LogoEmblem variant={variant} className="h-[92px] w-auto" />
      <LogoWord variant={variant} className="mt-5 h-[26px] w-auto" />
    </div>
  );
}
