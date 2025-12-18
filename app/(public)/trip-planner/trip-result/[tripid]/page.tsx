"use client";

import React, { useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmarkFill } from "react-icons/bs";
import { TripDataType } from "@/types/trip.types";
import { HotelCard } from "@/components/my-trip/HotelCard";
import { ItineraryCard } from "@/components/my-trip/ItineraryCard";
import { useAuth } from "@/context/AuthContext";
import BookmarkIcon from "@/public/bookmark-icon.png";
import { ToastContext } from "@/context/ToastContext";
import Loader from "@/components/Loader";

function TripSearchResult() {
  const [tripData, setTripData] = useState<TripDataType>({} as TripDataType);
  const [locationPhoto, setLocationPhoto] = useState<string | StaticImageData>(
    ""
  );

  const { user } = useAuth(); // logged in user
  const { setShowToast } = useContext(ToastContext);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const storedTripData = localStorage.getItem("tripData");
    const storedLocationPhoto = localStorage.getItem("locationPhoto");

    // parse tripData stored in localStorage
    if (storedTripData) {
      try {
        setTripData(JSON.parse(storedTripData));
      } catch (err) {
        console.warn("tripData JSON.parse failed:", err);
      }
    }

    // parse locationPhoto URL stored in localStorage
    if (storedLocationPhoto) {
      try {
        setLocationPhoto(storedLocationPhoto);
      } catch (error) {
        console.warn("locationPhoto parsing error:", error);
      }
    }
  }, []);

  async function handleSaveTrip() {
    //check if user is logged in
    if (!user) {
      setShowToast({
        status: true,
        type: "warning",
        message: "Please login to save your trip",
      });
    }

    //if user signed in, call the API to save trip data
    setShowLoader(true);
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.uid,
        trip: tripData,
      }),
    });

    if (res.ok) {
      setShowLoader(false);
      setShowToast({
        status: true,
        type: "success",
        message: "Trip saved successfully!",
      });
    } else {
      setShowToast({
        status: true,
        type: "error",
        message: "Failed to save the trip. Please try again.",
      });
    }
  }

  // redirect to trip-planner page if userInputData or tripData is null
  // if (!userInputData || !tripData) return router.push("/");

  const bannerImageChipsClass =
    "border-[2px] border-white bg-[--bg-high] w-fit py-1 px-4 rounded-full flex items-center gap-2";

  const recommendationCardClass =
    "mt-12 rounded-2xl bg-[--bg-high] drop-shadow-2xl flex flex-col justify-center items-start p-6 md:p-10";

  return (
    <div className="mt-32 relative w-[90%] lg:w-[60%] mx-auto">
      <div className="flex flex-col relative">
        <div className="w-full h-[450px] relative">
          {locationPhoto ? (
            <Image
              src={locationPhoto}
              alt="user location"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
              <p>No photo available</p>
            </div>
          )}
        </div>

        <div className="absolute left-2 bottom-2 mt-4 flex flex-col lg:flex-row gap-4 text-sm font-medium">
          <span className={bannerImageChipsClass}>
            📅
            <span>
              {tripData?.tripSummary?.duration} during{" "}
              {tripData?.tripSummary?.travelMonth}
            </span>
          </span>
          <span className={bannerImageChipsClass}>
            ✈️ <span>{tripData?.tripSummary?.travellingWith}</span>
          </span>
          <span className={bannerImageChipsClass}>
            💰 <span>{tripData?.tripSummary?.totalCost}</span>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-4xl font-bold">
                {tripData?.tripSummary?.location}
              </span>
              <span className="flex gap-2 bg-[--bg-high] hover:bg-[--background] rounded-full py-1 px-4 border-[2px] hover:border-[--accent] cursor-pointer transition-transform hover:scale-105 ease-in-out hover:drop-shadow-xl">
                <Image
                  src={BookmarkIcon}
                  alt="bookmark"
                  width={25}
                  height={25}
                />
                <span>Save this trip</span>
              </span>
            </div>

            <span className="mt-4 text-md text-[--text-secondary] font-normal">
              {tripData?.tripSummary?.summaryText}
            </span>
          </div>
        </div>
      </div>

      <div className={recommendationCardClass}>
        <div className="flex flex-col w-full">
          <span className="text-2xl font-bold">Hotel Recommendation</span>
          <span className="text-md text-[--text-secondary] font-normal mt-2">
            Top Hotels in{" "}
            <span className="font-semibold text-gray-800">
              {tripData?.tripSummary?.location}
            </span>{" "}
            Based on your Interest
          </span>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tripData?.hotelRecommendations?.map((hotel, idx) => (
              <HotelCard key={idx} hotelInfo={hotel} />
            ))}
          </div>
        </div>
      </div>

      <div className={recommendationCardClass}>
        <div className="flex flex-col w-full">
          <span className="text-2xl font-bold">Travel Itinerary</span>
          <div className="flex flex-col gap-10">
            {tripData &&
              tripData?.itinerary?.map((item, idx) => (
                <ItineraryCard key={idx} itineraryInfo={item} />
              ))}
          </div>
        </div>
      </div>

      <div
        className={`flex items-center gap-4 px-4 py-2 bg-white/30 backdrop-blur-md w-fit border-[--accent] border-2 rounded-full fixed bottom-4 
            left-1/2 -translate-x-1/2 cursor-pointer text-[--accent] 
            transition-all duration-300 ease-in-out hover:px-8 hover:py-3 hover:bg-[--accent] hover:text-white`}
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
      {showLoader && <Loader message="Saving your trip..." />}
    </div>
  );
}

export default TripSearchResult;
