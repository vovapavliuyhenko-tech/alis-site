// ЭКРАН ЗАГРУЗКИ — по референсу sverhtochno-new.tilda.ws: на белом фоне по центру
// бордовый вензель, затем из него вправо аккуратно «выползает» мелкая чёрная надпись
// ÁLIS BEAUTY, после чего экран плавно растворяется.
// Только CSS (без JS): виден сразу при первой отрисовке, до загрузки скриптов, и не
// мешает, если JS выключен. При переходах внутри сайта не показывается (layout не
// перерисовывается). При «уменьшении движения» — не показываем вовсе.
export default function Preloader() {
  return (
    <div aria-hidden className="alis-preloader">
      <div className="alis-preloader-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo-emblem-wine.png" alt="" width={734} height={1108} fetchPriority="high" className="alis-preloader-emblem" />
        <span className="alis-preloader-word">
          <span>ÁLIS BEAUTY</span>
        </span>
      </div>
    </div>
  );
}
