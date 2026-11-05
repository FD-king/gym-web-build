import { Suspense } from "react";
import SingleDetailCard from "../singleDetailCard";

const getCardDetail = async (CardID: string) => {
  const resources = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${CardID}`,
  );

  if (!resources.ok) {
    throw new Error("Failed to fetch workout data");
  }

  return resources.json();
};

// Component responsible for params and API fetching
const CardDetailContent = async ({
  params,
}: {
  params: Promise<{ CardID: string }>;
}) => {
  // Get CardID INSIDE Suspense
  const { CardID } = await params;

  // Fetch workout data
  const CardDetailData = await getCardDetail(CardID);

  return <SingleDetailCard card={CardDetailData} />;
};

// Main page component
const CardDetailPage = ({
  params,
}: {
  params: Promise<{ CardID: string }>;
}) => {
  return (
    <Suspense fallback={<p>Loading workout details...</p>}>
      <CardDetailContent params={params} />
    </Suspense>
  );
};

export default CardDetailPage;
