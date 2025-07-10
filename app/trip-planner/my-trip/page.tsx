"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { TripDataType, TripUserInputType } from "@/types/trip.types";
import { fetchPlacePhoto, getPlaceDetail } from "@/service/googlePlaceApi";
import axios from "axios";
import placeholder from "@/public/paris.jpg";
import { HotelCard } from "@/components/my-trip/HotelCard";
import { ItineraryCard } from "@/components/my-trip/ItineraryCard";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

function Result() {
  const [userInputData, setUserInputData] = useState<TripUserInputType | null>(
    null
  );
  const [tripData, setTripData] = useState<TripDataType>({} as TripDataType);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowSaveBtn(true);
      } else {
        setShowSaveBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUserInput = sessionStorage.getItem("userInput");
    const storedTripData = sessionStorage.getItem("tripData");

    if (storedUserInput) {
      try {
        const parsedUserInput = JSON.parse(storedUserInput);
        setUserInputData(parsedUserInput);
      } catch (error) {
        console.error("Error parsing user input data:", error);
      }
    } else {
      console.warn("No user input data found in Session Storage.");
    }

    if (storedTripData) {
      try {
        const parsedTripData = JSON.parse(storedTripData);
        console.log(parsedTripData);
        setTripData(parsedTripData);
      } catch (error) {
        console.error("Error parsing trip data:", error);
      }
    } else {
      console.warn("No trip data found in Session Storage.");
    }
  }, []);

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImage = async () => {
      if (userInputData?.location) {
        const src = await fetchPlacePhoto(userInputData.location);
        setImageSrc(src);
      }
    };
    loadImage();
  }, [userInputData?.location]);

  // Render a fallback if the image URL isn't available yet
  if (!imageSrc) {
    return <div>Loading image...</div>;
  }


  function handleSaveTrip(){
     //check if user is logged in
   if(!isLoggedIn){
    router.push("/login?redirect=/trip-planner/my-trip");
   }

   //if not logged in, take to login page

   //else add data to firestore db
  }


  if (!userInputData || !tripData) return <p>Loading...</p>;

  return (
    <div className="my-10 px-4 md:px-28 z-[9] relative">
      <div className="flex flex-col relative">
        <div className="w-full h-[450px] relative">
          <Image
            src={imageSrc}
            alt="location"
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="absolute left-2 bottom-2 mt-4 flex gap-4 text-sm font-medium">
          <span className="border-[1px] bg-white py-1 px-4 rounded-full">
            📅 {userInputData.noOfDays} Day(s) during{" "}
            {userInputData.travelMonth}
          </span>
          <span className="border-[1px] bg-white py-1 px-4 rounded-full">
            ✈️ {userInputData.travellingWith}
          </span>
          <span className="border-[1px] bg-white py-1 px-4 rounded-full">
            💰 {tripData?.tripSummary?.totalCost}
          </span>
        </div>
        <div className="p-2 bg-white border-2 rounded-full absolute right-2 bottom-2 shadow-xl cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
          <BsBookmark size={25} />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-4xl font-bold">{userInputData.location}</span>
            <span className="mt-2 text-sm text-gray-800 font-normal">
              {tripData?.tripSummary?.summaryText}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 drop-shadow-2xl flex flex-col justify-center items-start p-6 md:p-10">
        <div className="flex flex-col w-full">
          <span className="text-2xl font-bold">Hotel Recommendation</span>
          <span className="text-md text-gray-600">
            Top Hotels in{" "}
            <span className="font-semibold text-gray-800">
              {userInputData.location}
            </span>{" "}
            Based on your Interest
          </span>
          <div className="mt-10 flex justify-between">
            {tripData?.hotelRecommendations?.map((hotel, idx) => (
              <HotelCard key={idx} hotelInfo={hotel} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 drop-shadow-2xl flex flex-col justify-center items-start p-6 md:p-10">
        <div className="flex flex-col w-full">
          <span className="text-2xl font-bold">Travel Itinerary</span>
          <div className="flex flex-col gap-10">
            {tripData.itinerary.map((item, idx) => (
              <ItineraryCard key={idx} itineraryInfo={item} />
            ))}
          </div>
        </div>
      </div>

      {/* floating save button */}
      {showSaveBtn && (
        <div
          className={`flex items-center gap-4 px-4 py-2 bg-gray-600 w-fit rounded-full fixed bottom-4 
            left-1/2 -translate-x-1/2 cursor-pointer text-white 
            transition-all duration-300 ease-in-out hover:px-8 hover:py-3 hover:bg-gray-800`}
          onClick={handleSaveTrip}
        >
          <BsBookmarkFill />
          <span
            className={`transition-all duration-300 ease-in-out 
             overflow-hidden`}
          >
            Save this to My TripErly
          </span>
        </div>
      )}
    </div>
  );
}

export default Result;
