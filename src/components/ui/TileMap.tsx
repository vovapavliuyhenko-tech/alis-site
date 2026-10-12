"use client";
// КАРТА В СТИЛЕ 2ГИС — подложка из тайлов 2ГИС (обычные картинки, без виджета и рекламы),
// поверх — своя метка ÁLIS BEAUTY. Карта статичная (не тянется мышью), клик открывает 2ГИС.
// Точка салона стоит по горизонтали в --cx (по центру на телефоне, левее на компьютере —
// чтобы её не закрывала карточка контактов), по вертикали — по центру.
const Z = 17;
const T = 256;

function toTile(lat: number, lon: number) {
  const n = 2 ** Z;
  const x = ((lon + 180) / 360) * n;
  const r = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
  return { x, y };
}

export default function TileMap({ lat, lon, href, label, className = "" }: { lat: number; lon: number; href: string; label: string; className?: string }) {
  const { x, y } = toTile(lat, lon);
  const COLS = 13, ROWS = 7;
  const tx0 = Math.floor(x) - Math.floor(COLS / 2);
  const ty0 = Math.floor(y) - Math.floor(ROWS / 2);
  const px = (x - tx0) * T; // точка салона внутри сетки тайлов
  const py = (y - ty0) * T;
  const tiles: { k: string; src: string; l: number; t: number }[] = [];
  for (let j = 0; j < ROWS; j++)
    for (let i = 0; i < COLS; i++) {
      const tx = tx0 + i, ty = ty0 + j;
      tiles.push({ k: `${tx}-${ty}`, src: `https://tile${(i + j) % 4}.maps.2gis.com/tiles?x=${tx}&y=${ty}&z=${Z}&v=1`, l: i * T, t: j * T });
    }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`group absolute inset-0 block overflow-hidden bg-[#f4f1e8] ${className}`}>
      <div className="absolute" style={{ left: `calc(var(--cx, 50%) - ${px}px)`, top: `calc(50% - ${py}px)`, width: COLS * T, height: ROWS * T }}>
        {tiles.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={t.k} src={t.src} alt="" draggable={false} loading="lazy" decoding="async" width={T} height={T} className="absolute select-none" style={{ left: t.l, top: t.t }} />
        ))}
      </div>
      {/* Метка салона: пульсирующее кольцо + чёрная точка + подпись */}
      <span className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "var(--cx, 50%)", top: "50%" }}>
        <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#17191a]/20" />
        <span className="relative block h-4 w-4 rounded-full border-[3px] border-white bg-[#17191a] shadow-[0_4px_12px_rgba(0,0,0,0.35)]" />
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#17191a] px-3 py-1 text-[10.5px] uppercase tracking-[0.14em] text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)]">
          ÁLIS BEAUTY
        </span>
      </span>
      <span className="pointer-events-none absolute bottom-2 left-3 rounded bg-white/80 px-1.5 py-0.5 text-[9px] text-[#17191a]/60">© 2ГИС</span>
    </a>
  );
}
