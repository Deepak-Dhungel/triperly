"use client";

import React, { useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmarkFill } from "react-icons/bs";
import { TripDataType, TripUserInputType } from "@/types/trip.types";
import placeholder from "@/public/paris.jpg";
import { HotelCard } from "@/components/my-trip/HotelCard";
import { ItineraryCard } from "@/components/my-trip/ItineraryCard";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

// import Placeholder from "@/public/places/paris.jpg";
import BookmarkIcon from "@/public/bookmark-icon.png";
import { usePathname } from "next/navigation";

function Result() {
  const [userInputData, setUserInputData] = useState<TripUserInputType | null>(
    null
  );
  const [tripData, setTripData] = useState<TripDataType>({} as TripDataType);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [placePhoto, setPlacePhoto] = useState<string | StaticImageData>("");
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setShowSaveBtn(true);
  //     } else {
  //       setShowSaveBtn(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect to get user input and gemini response data from session storage during initial render and save it to state variables
  // inside Result component (replace your useEffect and the Image block)

  // inside Result component
  const pathname = usePathname();

  useEffect(() => {
    // read sessionStorage whenever pathname changes (covers the navigation moment)
    const storedUserInput = localStorage.getItem("userInput");
    const storedTripData = localStorage.getItem("tripData");
    const storedPlacePhotoRaw = localStorage.getItem("placePhoto");

    // parse userInput
    if (storedUserInput) {
      try {
        setUserInputData(JSON.parse(storedUserInput));
      } catch (err) {
        console.warn("userInput JSON.parse failed:", err);
      }
    }

    // parse tripData
    if (storedTripData) {
      try {
        setTripData(JSON.parse(storedTripData));
      } catch (err) {
        console.warn("tripData JSON.parse failed:", err);
      }
    }

    // normalize placePhoto to a plain URL string (or empty string)
    let finalPhoto: string | null = null;
    if (storedPlacePhotoRaw) {
      const raw = storedPlacePhotoRaw.trim();
      // If it looks like JSON try parse, else use raw
      if (raw.startsWith("{") || raw.startsWith("[")) {
        try {
          const parsed = JSON.parse(raw);
          // common shapes: string, { image: "..."} , { url: "..." } , array
          if (typeof parsed === "string") finalPhoto = parsed;
          else if (Array.isArray(parsed) && parsed.length) {
            const first = parsed[0];
            finalPhoto = first?.image ?? first?.url ?? first?.src ?? null;
          } else if (parsed && typeof parsed === "object") {
            finalPhoto = parsed.image ?? parsed.url ?? parsed.src ?? null;
          }
        } catch (err) {
          console.warn("placePhoto JSON.parse failed, using raw:", err);
          finalPhoto = raw;
        }
      } else {
        finalPhoto = raw; // plain url
      }
    } else {
      console.warn("no placePhoto found in sessionStorage");
    }

    console.log("[DEBUG] resolved finalPhoto:", finalPhoto);
    setPlacePhoto(finalPhoto ?? "");
  }, [pathname]);

  // const [imageSrc, setImageSrc] = useState<string>("");

  // useEffect(() => {
  //   const loadImage = async () => {
  //     if (userInputData?.location) {
  //       const src = await fetchPlacePhoto(userInputData.location);
  //       if (src) {
  //         setImageSrc(src);
  //       }
  //     }
  //   };
  //   loadImage();
  // }, [userInputData?.location]);

  // Render a fallback if the image URL isn't available yet
  // if (!imageSrc) {
  //   return <div>Loading image...</div>;
  // }

  function handleSaveTrip() {
    //check if user is logged in
    if (!isLoggedIn) {
      // router.push("/login?redirect=/trip-planner/my-trip");
    }

    //if not logged in, take to login page

    //else add data to firestore db
  }

  // redirect to trip-planner page if userInputData or tripData is null
  // if (!userInputData || !tripData) return router.push("/");

  const bannerImageChipsClass =
    "border-[2px] border-white bg-[--bg-high] w-fit py-1 px-4 rounded-full flex items-center gap-2";

  const recommendationCardClass =
    "mt-12 rounded-2xl bg-[--bg-high] drop-shadow-2xl flex flex-col justify-center items-start p-6 md:p-10";

  return (
    <div className="mt-32 relative w-[90%] lg:w-[60%] mx-auto">
      {/* location image with details */}
      <div className="flex flex-col relative">
        <div className="w-full h-[450px] relative">
          {/* debug overlay (remove later) */}
          {/* <div className="absolute left-2 top-2 z-50 bg-[--bg-high] text-xs p-2 rounded opacity-90">
            <div>
              photo: {String(placePhoto).slice(0, 120)}
              {String(placePhoto).length > 120 ? "…" : ""}
            </div>
          </div> */}

          {typeof placePhoto === "string" && placePhoto.length > 0 ? (
            // If external URL, use <img> so you don't need next.config change
            /^https?:\/\//i.test(placePhoto) ? (
              <Image
                src={placePhoto}
                alt={userInputData?.location ?? "location"}
                width={1200}
                height={450}
                className="w-full h-full object-cover rounded-xl block"
                // onError={(e) => {
                //   console.error(
                //     "External image failed to load, falling back:",
                //     placePhoto
                //   );
                //   (e.currentTarget as HTMLImageElement).src = placeholder.src;
                // }}
              />
            ) : (
              // treat as local path (starts with "/") or data URL — use next/image for best optimization
              <Image
                src={placePhoto || placeholder}
                alt={userInputData?.location ?? "location"}
                fill={false} // explicit: not using fill to avoid confusion; remove if you use width/height
                // Provide a fixed layout instead of fill, or use a wrapper with position:relative and fill
                width={1200}
                height={450}
                className="rounded-xl object-cover"
              />
            )
          ) : (
            // fallback UI when nothing available
            <div className="w-full h-full flex items-center justify-center rounded-xl bg-gray-200 text-gray-600">
              No photo available
            </div>
          )}
        </div>

        <div className="absolute left-2 bottom-2 mt-4 flex flex-col lg:flex-row gap-4 text-sm font-medium">
          <span className={bannerImageChipsClass}>
            📅
            <span>
              {userInputData?.noOfDays} Day(s) during{" "}
              {userInputData?.travelMonth}
            </span>
          </span>
          <span className={bannerImageChipsClass}>
            ✈️ <span>{userInputData?.travellingWith}</span>
          </span>
          <span className={bannerImageChipsClass}>
            💰 <span>{tripData?.tripSummary?.totalCost}</span>
          </span>
        </div>
        {/* <div className="absolute right-2 bottom-2 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
          <span className={bannerImageChipsClass}>
            <Image src={BookmarkIcon} alt="bookmark" width={25} height={25} />
            <span>Save this trip</span>
          </span>
        </div> */}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-4xl font-bold">
                {userInputData?.location}
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
              {userInputData?.location}
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
