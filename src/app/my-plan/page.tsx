"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { usePlan } from "../context/PlanContext";

import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { FaFire } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { toast } from "react-hot-toast";

type ActiveTab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const { todayPlan, savedCards, removeFromPlan, removeSaved } = usePlan();

  const [activeTab, setActiveTab] = useState<ActiveTab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  // Select active list
  const activeCards = activeTab === "plan" ? todayPlan : savedCards;

  // Sort workouts
  const sortedCards = useMemo(() => {
    return [...activeCards].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [activeCards, sortBy]);

  // Today's workout statistics
  const totalMinutes = todayPlan.reduce(
    (total, card) => total + card.duration,
    0,
  );

  const totalCalories = todayPlan.reduce(
    (total, card) => total + card.caloriesBurned,
    0,
  );

  // Remove workout
  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);

      setCompletedIds((prev) => prev.filter((item) => item !== id));

      toast.success("Workout removed from today's plan!", {
        icon: "🗑️",
      });
    } else {
      removeSaved(id);

      toast.success("Workout removed from saved workouts!", {
        icon: "🔖",
      });
    }
  };

  // Mark workout as done
  const handleComplete = (id: number) => {
    if (completedIds.includes(id)) return;

    setCompletedIds((prev) => [...prev, id]);

    toast.success("Workout completed! Great job!", {
      icon: "💪",
    });
  };

  return (
    <div className="min-h-screen bg-[#0E1014] px-5 py-8 md:px-8">
      <div className="mx-auto max-w-[925px]">
        {/* PAGE HEADING */}
        <div>
          <h1 className="text-2xl font-extrabold uppercase text-white">
            My Plan
          </h1>

          <p className="mt-1 text-xs text-[#9299A5]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* STATISTICS */}
        <div className="mt-5 grid grid-cols-3 rounded-xl border border-[#252830] bg-[#15171D] p-4 sm:p-5">
          {/* Exercises */}
          <div className="border-r border-[#252830] px-2 sm:px-3">
            <p className="text-[10px] text-[#9299A5]">Exercises</p>

            <h2 className="mt-1 text-2xl font-extrabold text-[#C2F800]">
              {todayPlan.length}
            </h2>
          </div>

          {/* Minutes */}
          <div className="border-r border-[#252830] px-2 sm:px-3">
            <p className="text-[10px] text-[#9299A5]">Minutes</p>

            <h2 className="mt-1 text-2xl font-extrabold text-white">
              {totalMinutes}
            </h2>
          </div>

          {/* Calories */}
          <div className="px-2 sm:px-3">
            <p className="text-[10px] text-[#9299A5]">Calories</p>

            <h2 className="mt-1 text-2xl font-extrabold text-white">
              {totalCalories}
            </h2>
          </div>
        </div>

        {/* TABS AND SORTING */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center rounded-lg border border-[#252830] bg-[#15171D] p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-4 py-1.5 text-[10px] transition-all duration-200 ${
                activeTab === "plan"
                  ? "bg-[#252A34] font-semibold text-white"
                  : "text-[#9299A5] hover:text-white"
              }`}
            >
              Today{"'"}s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-1.5 text-[10px] transition-all duration-200 ${
                activeTab === "saved"
                  ? "bg-[#252A34] font-semibold text-white"
                  : "text-[#9299A5] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-[10px] text-[#9299A5]">
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-[#252830] bg-[#15171D] px-3 py-2 text-[10px] text-white outline-none focus:border-[#C2F800]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* WORKOUT LIST */}
        <div className="mt-5">
          {sortedCards.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex min-h-[235px] flex-col items-center justify-center rounded-xl border border-dashed border-[#252830] px-4 text-center">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
                Nothing here yet
              </h2>

              <p className="mt-1 text-xs text-[#9299A5]">
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save your favorite workouts and find them here later."}
              </p>

              <Link
                href="/"
                className="mt-5 rounded-full bg-[#C2F800] px-5 py-2 text-[10px] font-bold text-black shadow-lg shadow-[#C2F800]/10 transition-all hover:scale-105 hover:bg-[#A9D900]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            /* POPULATED WORKOUT LIST */
            <div className="flex flex-col gap-3">
              {sortedCards.map((card) => {
                const isCompleted = completedIds.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className="flex min-h-[88px] items-center gap-3 overflow-hidden rounded-xl border border-[#252830] bg-[#15171D] p-3 transition-colors hover:border-[#C2F800]/40 sm:gap-4"
                  >
                    {/* WORKOUT IMAGE */}
                    <Link
                      href={`/content/${card.id}`}
                      className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg sm:w-28"
                    >
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </Link>

                    {/* WORKOUT INFORMATION */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <Link href={`/content/${card.id}`}>
                        <h3 className="line-clamp-1 text-xs font-extrabold uppercase text-white transition-colors hover:text-[#C2F800] sm:text-sm">
                          {card.name}
                        </h3>
                      </Link>

                      <p className="mt-0.5 truncate text-[10px] text-[#9299A5]">
                        {card.equipment}
                      </p>

                      {/* WORKOUT DETAILS */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#B5BAC3]">
                        <span className="flex items-center gap-1">
                          <LuClock size={12} className="text-[#C2F800]" />
                          {card.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                          <FaFire size={11} className="text-[#C2F800]" />
                          {card.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1">
                          <CiStar size={14} className="text-[#C2F800]" />
                          {card.rating}
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                      {/* VIEW DETAILS */}
                      <Link
                        href={`/content/${card.id}`}
                        className="hidden rounded-full border border-[#343B48] px-3 py-2 text-[10px] text-white transition-all hover:border-[#C2F800] hover:text-[#C2F800] sm:block sm:px-4"
                      >
                        View Details
                      </Link>

                      {/* MARK AS DONE */}
                      {activeTab === "plan" && (
                        <button
                          onClick={() => handleComplete(card.id)}
                          disabled={isCompleted}
                          className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-bold transition-all sm:px-4 ${
                            isCompleted
                              ? "cursor-default bg-[#252A34] text-[#9299A5]"
                              : "bg-[#C2F800] text-black hover:bg-[#A9D900]"
                          }`}
                        >
                          <IoMdCheckmark size={13} />

                          {isCompleted ? "Completed" : "Mark as Done"}
                        </button>
                      )}

                      {/* REMOVE / UNSAVE */}
                      <button
                        onClick={() => handleRemove(card.id)}
                        aria-label="Remove workout"
                        title={
                          activeTab === "plan"
                            ? "Remove from plan"
                            : "Remove from saved"
                        }
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#9299A5] transition-colors hover:text-red-400"
                      >
                        <RxCross2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPlanPage;
