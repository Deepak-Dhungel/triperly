"use client";
import { HotelRecommendationType } from "@/types/trip.types";
import Image from "next/image";
import placeholder from "@/public/hotel-placeholder.jpg";

type HotelCardType = {
  hotelInfo: HotelRecommendationType;
};

export function HotelCard({ hotelInfo }: HotelCardType) {
  return (
    <div className="w-full h-auto flex flex-col gap-2 rounded-xl p-2 bg-[--bg-high]">
      {/* image: fill the card width and keep a fixed height */}
      <div className="w-full h-[110px] relative rounded-lg overflow-hidden">
        <Image
          src={placeholder}
          alt="location"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      <div className="flex flex-col">
        {/* single-line truncate */}
        <span className="mt-2 text-normal truncate">{hotelInfo.name}</span>

        <span className="text-sm text-[--text-secondary] font-light">
          <span className="font-medium">{hotelInfo.pricePerNight} </span>/Night
        </span>
      </div>
    </div>
  );
}
