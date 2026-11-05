import { Suspense } from "react";
import HeroSection from "./components/HeroSection";
import GymCards from "./content/gymCards";

const MainPage = () => {
  return (
    <div>
      <HeroSection />
      <section className="mx-auto container px-4 pt-10 pb-2">
        <h2 className="font-bold text-[30px] text-white">THE LIBRARY</h2>
        <p className="text-[14px] font-normal text-[#9CA3AF]">
          Twelve lifts covering every major muscle group.
        </p>
      </section>
      <section id="workout-library">
        <Suspense fallback="Loading...">
          <GymCards />
        </Suspense>
      </section>
    </div>
  );
};

export default MainPage;
