"use client";

import Link from "next/link";
import { usePlan } from "../context/PlanContext";

const NavbarCounts = () => {
  const { todayPlan, savedCards } = usePlan();

  return (
    <section className="navbar-end gap-2">
      {/* Plan Counter */}
      <Link
        href="/my-plan"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1D2A0D]"
      >
        Plan
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C2F800] px-1.5 text-[10px] font-bold text-black">
          {todayPlan.length}
        </span>
      </Link>

      {/* Saved Counter */}
      <Link
        href="/my-plan"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#C2F800]"
      >
        Saved
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#9299A5] px-1.5 text-[10px] font-bold text-[#C2F800]">
          {savedCards.length}
        </span>
      </Link>
    </section>
  );
};

export default NavbarCounts;
