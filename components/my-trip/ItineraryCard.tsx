"use client";

import { ItineraryPlaceType, ItineraryType } from "@/types/trip.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import placeholder from "@/public/paris.jpg";
import { fetchPlacePhoto } from "@/service/googlePlaceApi";

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
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImage = async () => {
      if (place.name) {
        const src = await fetchPlacePhoto(place.name);
        setImageSrc(src);
      }
    };
    loadImage();
  }, [place]);

  // Render a fallback if the image URL isn't available yet
  //   if (!imageSrc) {
  //     return (
  //       <div className="w-[auto] h-[200px] relative">
  //         <Image
  //           src={placeholder}
  //           alt="location"
  //           fill
  //           className="rounded-xl object-cover"
  //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //           priority
  //         />
  //       </div>
  //     );
  //   }
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

      {/* <Image
        src={imageSrc || placeholder}
        alt="location"
        height={150}
        width={150}
        className="rounded-xl object-fill"
      /> */}
    </div>
  );
}
