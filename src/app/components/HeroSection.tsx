import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full px-5 py-5 container mx-auto">
      <div className="flex min-h-[410px] flex-col items-center justify-between gap-8 rounded-2xl border border-[#252830] bg-[#15171D] px-8 py-10 md:flex-row md:px-12">
        <section className="flex flex-1 flex-col items-start gap-5">
          <span className="text-xs font-bold tracking-wider text-[#C2F800]">
            WORKOUT LIBRARY
          </span>

          <h2 className="max-w-[620px] text-3xl leading-[0.95] font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h2>

          <p className="max-w-[470px] text-sm leading-relaxed text-[#9CA3AF] md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="/#workout-library"
            className="btn min-h-0 h-auto border-none bg-[#C2F800] px-6 py-3 text-xs font-bold text-black hover:bg-[#a9d900]"
          >
            BROWSE WORKOUTS
          </Link>
        </section>

        <section className="flex flex-1 items-center justify-center">
          <Image
            src="/banner.png"
            alt="Workout anatomy illustration"
            width={334}
            height={334}
            priority
            className="h-auto w-[334px] object-contain md:w-[334px] lg:w-[334px]"
          />
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
