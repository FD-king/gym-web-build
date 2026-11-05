"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlan } from "../context/PlanContext";

import { FaRegCalendarTimes } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { toast } from "react-hot-toast";

import { IGymCardType } from "../types/GymCardType";

const SingleDetailCard = ({ card }: { card: IGymCardType }) => {
  const { addToPlan, toggleSaved, isInPlan, isSaved, todayPlan } = usePlan();

  const added = isInPlan(card.id);
  const saved = isSaved(card.id);
  const planFull = todayPlan.length >= 5;

  // Add to Today's Plan
  const handleAddToPlan = () => {
    if (added) {
      toast.error("Workout already added to your plan!");
      return;
    }

    if (planFull) {
      toast.error("Your plan is full! Remove a workout first.");
      return;
    }

    const success = addToPlan(card);

    if (success) {
      toast.success("Workout added to today's plan!", {
        icon: "💪",
      });
    } else {
      toast.error("Unable to add workout. Please try again.");
    }
  };

  // Save / Unsave Workout
  const handleSave = () => {
    toggleSaved(card);

    if (saved) {
      toast.success("Workout removed from saved workouts.", {
        icon: "🗑️",
      });
    } else {
      toast.success("Workout saved successfully!", {
        icon: "🔖",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1014] px-5 py-8 md:px-8">
      <div className="mx-auto grid max-w-[1250px] grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-10">
        {/* Workout Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[#252830]">
          <Image
            src={card.image}
            alt={card.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Workout Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold uppercase leading-tight text-white">
            {card.name}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#9299A5]">
            {card.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-3 flex flex-wrap gap-2">
            {card.muscleGroups.map((muscle, index) => (
              <span
                key={`${muscle}-${index}`}
                className="rounded-full bg-[#C2F800] px-3 py-1 text-[10px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Information */}
          <div className="mt-5 overflow-hidden rounded-xl border border-[#252830] bg-[#15171D]">
            {[
              { label: "Equipment", value: card.equipment },
              { label: "Difficulty", value: card.difficulty },
              { label: "Sets", value: card.sets },
              { label: "Reps", value: card.reps },
              { label: "Duration", value: `${card.duration} min` },
              { label: "Calories", value: `${card.caloriesBurned} kcal` },
              { label: "Rating", value: card.rating },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-between gap-4 px-4 py-3 ${
                  index !== 6 ? "border-b border-[#252830]" : ""
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#9299A5]">
                  {item.label}
                </span>

                <span className="text-xs text-white">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
              Instructions
            </h2>

            <ol className="mt-3 list-decimal space-y-3 pl-4 text-xs leading-relaxed text-[#B0B5BE]">
              {card.instructions.map((instruction, index) => (
                <li key={index} className="pl-1">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* Add to Plan */}
            <button
              onClick={handleAddToPlan}
              disabled={added || planFull}
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold transition-all duration-200 ${
                added
                  ? "cursor-not-allowed bg-[#27351A] text-[#C2F800]"
                  : planFull
                    ? "cursor-not-allowed bg-[#353A45] text-[#9299A5]"
                    : "bg-[#C2F800] text-black hover:bg-[#A9D900]"
              }`}
            >
              <FaRegCalendarTimes size={14} />

              {added
                ? "Added to today's plan"
                : planFull
                  ? "Plan is full"
                  : "Add to today's plan"}
            </button>

            {/* Save for Later */}
            <button
              onClick={handleSave}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-medium transition-colors duration-200 ${
                saved
                  ? "border-[#C2F800] text-[#C2F800]"
                  : "border-[#353A45] text-white hover:border-[#C2F800] hover:text-[#C2F800]"
              }`}
            >
              <CiBookmark size={17} />

              {saved ? "Saved" : "Save for later"}
            </button>
          </div>

          {/* View My Plan */}
          <Link
            href="/my-plan"
            className="mt-4 w-fit text-xs text-[#9299A5] transition-colors hover:text-[#C2F800]"
          >
            View my plan →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleDetailCard;
