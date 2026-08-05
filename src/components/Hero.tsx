// HERO resayme: одно фото зеркалом слева/справа, по центру белая карточка
// (тэглайн / логотип resayme / подзаголовок), снизу градиентное затемнение.
export default function Hero() {
  const photo = "/assets/tild6230-643__.jpg";
  return (
    <section className="relative h-svh min-h-[640px] w-full overflow-hidden bg-[#cfcbc6]">
      {/* Фон: фото зеркалом */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full object-cover object-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full -scale-x-100 object-cover object-top" />
      </div>

      {/* Затемнение низа (реальный градиент resayme) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/tild6433-623_Gradient.svg)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Центральная белая карточка */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex aspect-[337/443] max-h-[74svh] w-[86%] max-w-[338px] flex-col items-center justify-between bg-white px-7 py-9 text-center text-[#17191a]">
          <p className="mx-auto max-w-[16rem] text-[13px] leading-snug">
            Бренд-дизайнер и автор курса
            <br />
            It&apos;s base — Диана Семенова
          </p>

          <div className="flex flex-1 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/tild6230-623_Resayme_logo.svg"
              alt="resayme"
              className="w-[62%] max-w-[220px]"
            />
          </div>

          <p className="mx-auto max-w-[18rem] text-[13px] leading-snug text-[#4a4a4a]">
            для тех, кто хочет рассказать свою историю и историю бренда людям,
            чтобы навсегда остаться в их сердце
          </p>
        </div>
      </div>
    </section>
  );
}
