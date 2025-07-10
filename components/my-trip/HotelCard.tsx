"use client";
import { HotelRecommendationType } from "@/types/trip.types";
import Image from "next/image";
import placeholder from "@/public/paris.jpg";
import { useEffect, useState } from "react";
import { fetchPlacePhoto } from "@/service/googlePlaceApi";

type HotelCardType = {
  hotelInfo: HotelRecommendationType;
};

export function HotelCard({ hotelInfo }: HotelCardType) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImage = async () => {
      if (hotelInfo.name) {
        const hotelNameWithAddress = `${hotelInfo.name}, ${hotelInfo.hotelLocation}`;
        // console.log("hotel name:", hotelNameWithAddress);
        const src = await fetchPlacePhoto(hotelNameWithAddress);
        setImageSrc(src);
      }
    };
    loadImage();
  }, [hotelInfo]);

  // Render a fallback if the image URL isn't available yet
  if (!imageSrc) {
    return (
      <div className="w-[150] h-[150px] relative">
        <Image
          src={placeholder}
          alt="location"
          fill
          className="rounded-xl object-cover w-[auto] h-[auto]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    );
  }
  return (
    <div className="w-[22%] flex flex-col gap-2 rounded-xl p-2 transition-all hover:scale-110 cursor-pointer">
      <div className="w-[auto] h-[150px] relative">
        <Image
          src={imageSrc}
          alt="location"
          fill
          className="rounded-xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="mt-2 text-md font-semibold">{hotelInfo.name}</span>
        <span className="text-xs">
          {hotelInfo.pricePerNight} <span className="font-medium">/Night</span>{" "}
        </span>
      </div>
    </div>
  );
}
