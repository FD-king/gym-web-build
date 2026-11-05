import SingleGymCard from "./singleGymCard";
import { IGymCardType } from "../types/GymCardType";

const GymCards = async () => {
  const resources = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!resources.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const cardsData: IGymCardType[] = await resources.json();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card) => (
          <SingleGymCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default GymCards;
