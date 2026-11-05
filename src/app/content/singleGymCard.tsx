import Image from "next/image";
import Link from "next/link";
import { IGymCardType } from "../types/GymCardType";
import { FaRegClock } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const SingleGymCard = ({ card }: { card: IGymCardType }) => {
  return (
    <Link href={`/content/${card.id}`} className="block w-full">
      <div className="w-full overflow-hidden rounded-xl border border-[#252830] bg-[#15171D] transition-all duration-200 hover:border-[#C2F800]/50 hover:-translate-y-1">
        {/* Workout Image */}
        <div className="relative aspect-video w-full bg-[#15171D]">
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
          />
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Muscle Group Badges */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {card.muscleGroups.map((muscle, index) => (
              <span
                key={`${muscle}-${index}`}
                className="rounded-full bg-[#C2F800] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2 className="text-sm font-extrabold uppercase leading-tight text-white">
            {card.name}
          </h2>

          {/* Equipment */}
          <p className="mt-1 text-[10px] text-[#9299A5]">{card.equipment}</p>

          {/* Divider */}
          <div className="my-3 border-t border-[#252830]" />

          {/* Workout Statistics */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#9299A5]">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <FaRegClock size={12} />
              <span>{card.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5">
              <FaFire size={12} />
              <span>{card.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <CiStar size={14} />
              <span>{card.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleGymCard;
