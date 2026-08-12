"use client";
// ГАЛЕРЕЯ РАБОТ ALIS в стиле fruktovaphoto: масонри-раскладка из плиток разного
// размера. Каждая плитка ПЕРЕВОРАЧИВАЕТСЯ при наведении и показывает вторую работу
// (двусторонняя карточка). Под плиткой — техническая строка: [номер] /категория подпись.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Tile = {
  n: string;
  label: Loc; // /категория
  caption: Loc; // подпись справа
  front: string;
  back: string;
  ratio: "portrait" | "landscape";
  // размещение в 4-колоночной сетке (md+)
  place: string;
};

const TILES: Tile[] = [
  {
    n: "01",
    label: { ru: "/невеста", en: "/bride" },
    caption: { ru: "свадебный образ", en: "bridal look" },
    front: "/assets/tild6230-643__.jpg",
    back: "/assets/tild3236-393__.jpg",
    ratio: "portrait",
    place: "md:col-start-1 md:row-start-1",
  },
  {
    n: "02",
    label: { ru: "/вечер", en: "/evening" },
    caption: { ru: "вечерний макияж", en: "evening makeup" },
    front: "/assets/tild3236-393__.jpg",
    back: "/assets/tild6530-383_-2___1_.jpg",
    ratio: "portrait",
    place: "md:col-start-2 md:row-start-1",
  },
  {
    n: "03",
    label: { ru: "/день", en: "/day" },
    caption: { ru: "дневной образ", en: "daytime look" },
    front: "/assets/tild3535-313_bergamo.png",
    back: "/assets/tild6536-613_-2___1__4.jpg",
    ratio: "portrait",
    place: "md:col-start-3 md:row-start-1",
  },
  {
    n: "04",
    label: { ru: "/съёмка", en: "/editorial" },
    caption: { ru: "образ для фото", en: "shoot look" },
    front: "/assets/tild6536-613_-2___1__4.jpg",
    back: "/assets/tild3561-646_-2___1__5.jpg",
    ratio: "portrait",
    place: "md:col-start-4 md:row-start-1",
  },
  {
    n: "05",
    label: { ru: "/выпускной", en: "/prom" },
    caption: { ru: "образ на выпускной", en: "prom look" },
    front: "/assets/tild6436-383_fermata__1.jpg",
    back: "/assets/tild6561-356_fermata__2.jpg",
    ratio: "landscape",
    place: "md:col-start-2 md:row-start-2",
  },
  {
    n: "06",
    label: { ru: "/событие", en: "/event" },
    caption: { ru: "образ для события", en: "event look" },
    front: "/assets/tild3638-373_-2___1__3.jpg",
    back: "/assets/tild6530-383_-2___1_.jpg",
    ratio: "landscape",
    place: "md:col-start-1 md:row-start-3",
  },
  {
    n: "07",
    label: { ru: "/стиль", en: "/style" },
    caption: { ru: "макияж и укладка", en: "makeup & hair" },
    front: "/assets/tild6561-356_fermata__2.jpg",
    back: "/assets/tild3134-353___2024-12-08__161353.png",
    ratio: "portrait",
    place: "md:col-start-3 md:row-start-3",
  },
  {
    n: "08",
    label: { ru: "/выезд", en: "/on-site" },
    caption: { ru: "выездной образ", en: "on-location look" },
    front: "/assets/tild3439-633___2025-03-31__213150.png",
    back: "/assets/tild6664-386_2851782e-4c78-4475-a.png",
    ratio: "portrait",
    place: "md:col-start-4 md:row-start-3",
  },
];

function FlipTile({ t }: { t: Tile }) {
  const { lang } = useLang();
  const aspect = t.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";
  return (
    <figure className={`${t.place} md:self-start`}>
      {/* Двусторонняя плитка: переворот по наведению */}
      <div className={`group ${aspect} w-full [perspective:1600px]`}>
        <div className="relative h-full w-full transition-transform duration-[2200ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateY(180deg)]">
          {/* Лицо */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.front}
              alt={t.caption[lang]}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Оборот — вторая работа */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.back}
              alt={t.caption[lang]}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Техническая строка под плиткой */}
      <figcaption className="mt-3 grid grid-cols-3 items-center font-mono text-[10.5px] lowercase tracking-wide text-[#f4efe6]/45">
        <span className="tabular-nums">{t.n}</span>
        <span className="text-center text-[#f4efe6]/60">{t.label[lang]}</span>
        <span className="text-right">{t.caption[lang]}</span>
      </figcaption>
    </figure>
  );
}

export default function FlipGallery() {
  const { lang } = useLang();
  return (
    <section id="works" className="scroll-mt-24 bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[96%] max-w-[1620px]">
        <div className="grid grid-cols-2 items-start gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-9 md:gap-y-16">
          {TILES.map((t) => (
            <FlipTile key={t.n} t={t} />
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[11px] lowercase tracking-wide text-[#f4efe6]/35">
          {lang === "en" ? "hover to flip · both sides are real work" : "наведите, чтобы перевернуть · с обеих сторон — наши работы"}
        </p>
      </div>
    </section>
  );
}
