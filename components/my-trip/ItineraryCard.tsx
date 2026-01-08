import { ItineraryPlaceType, ItineraryType } from "@/types/trip.types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type ItineraryCardType = {
  itineraryInfo: ItineraryType;
};

export function ItineraryCard({ itineraryInfo }: ItineraryCardType) {
  const [openItineary, setOpenItineary] = useState<number | null>(
    itineraryInfo.day
  );

  function handleItinearyAccordion(itinearyIndex: number) {
    if (itinearyIndex === openItineary) {
      setOpenItineary(null);
    } else {
      setOpenItineary(itinearyIndex);
    }
  }

  return (
    <div className="w-full">
      <div
        className="mt-10"
        onClick={() => handleItinearyAccordion(itineraryInfo.day)}
      >
        <span className="flex items-center gap-4 text-xl font-semibold cursor-pointer">
          <IoIosArrowDown size={30} />
          Day {itineraryInfo.day}
        </span>
        {openItineary === itineraryInfo.day &&
          itineraryInfo.places.map((place, idx) => (
            <ItinearyItemCard key={idx} place={place} />
          ))}
      </div>
    </div>
  );
}

type ItinearyItemCardType = {
  place: ItineraryPlaceType;
};

export function ItinearyItemCard({ place }: ItinearyItemCardType) {
  return (
    <div className="mt-10 flex flex-col md:flex-row justify-between gap-20 items-left p-6 border-2 rounded-xl border-white  w-full hover:backdrop-blur-sm hover:bg-[--background]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{place.name}</span>
          <span className="mt-2 text-[--text-secondary] font-light">
            {place.description}
          </span>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <span>🕗 {place.bestTimeToVisit}</span>
          <span>🤑 {place.approxExpenses}</span>
        </div>
      </div>
    </div>
  );
}
