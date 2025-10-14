"use client";

import Loader from "@/components/Loader";
import {
  budgetOptions,
  geminiPromptConstant,
  travellingWith,
  travelMonth,
} from "@/constants/trip-planner.constant";

import { chatSession } from "@/service/gemini";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TripUserInputType } from "@/types/trip.types";
import { fetchPlaceDataAndPhotos } from "@/service/placeSearch";
import OptionCard from "@/components/ui-elements/OptionCard";

function TripPlanner() {
  const [tripUserInput, setTripUserInput] = useState<TripUserInputType>({
    location: "",
    budget: "",
    noOfDays: "",
    travellingWith: "",
    travelMonth: "",
  } as TripUserInputType);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState<{ noOfDays?: string }>({});

  useEffect(() => {
    if (searchParams) {
      const userDestination = searchParams.get("destination") ?? "";
      setTripUserInput({ ...tripUserInput, location: userDestination });
    }
  }, [searchParams]);

  // const [tripData, setTripData] = useState();

  // useEffect runs on initial render to get the destination from session storage which is set in hero section
  // if found it prefills the location field with that value
  // useEffect(() => {
  //   try {
  //     const destination = sessionStorage.getItem("userDestination");
  //     if (destination) {
  //       const parsedDestination = JSON.parse(destination);
  //       setTripUserInput((prev) => ({ ...prev, location: parsedDestination }));
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse userDestination from sessionStorage", e);
  //   }
  // }, []);

  // function to handle user input changes and update the state
  const handleInputChange = (label: string, value: string) => {
    if (label === "noOfDays") {
      // allow only digits
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly !== value) {
        // user typeda non-digit
        setErrors((s) => ({ ...s, noOfDays: "Please type a number" }));
      } else {
        // valid numeric input, clear error
        setErrors((s) => ({ ...s, noOfDays: undefined }));
      }
      setTripUserInput((prev) => ({ ...prev, [label]: digitsOnly }));
      return;
    } else
      setTripUserInput((prev) => {
        const updateData = { ...prev, [label]: value };
        return updateData;
      });
  };

  //main gemini function with photo fetch
  const handleSubmitUserData = async () => {
    if (Object.keys(tripUserInput).length === 0) {
      alert("please provide your info ");
      return;
    }

    const { location, budget, noOfDays, travellingWith, travelMonth } =
      tripUserInput;

    if (!location || !budget || !noOfDays || !travellingWith || !travelMonth) {
      alert("Please fill all required fields");
      return;
    }

    // prepare prompt
    const geminiPrompt = geminiPromptConstant
      .replace("{location}", location)
      .replace("{budget}", budget)
      .replace("{travellingWith}", travellingWith)
      .replace("{duration}", noOfDays)
      .replace("{travelMonth}", travelMonth);

    setShowLoader(true);

    try {
      // 1) call Gemini (await)
      const geminiResponse = await chatSession.sendMessage(geminiPrompt);

      // 2) normalize gemini text (handle both sync string or .response.text() async)
      let geminiText = "";
      try {
        if (
          geminiResponse &&
          typeof geminiResponse.response?.text === "function"
        ) {
          geminiText = await geminiResponse.response.text();
        } else if (typeof geminiResponse === "string") {
          geminiText = geminiResponse;
        } else if (
          geminiResponse?.response &&
          typeof geminiResponse.response === "string"
        ) {
          geminiText = geminiResponse.response;
        } else {
          // fallback to JSON stringify to ensure we store something useful
          geminiText = JSON.stringify(geminiResponse);
        }
      } catch (err) {
        console.warn(
          "Failed to extract gemini text cleanly, falling back to stringify",
          err
        );
        geminiText = JSON.stringify(geminiResponse);
      }

      // 3) fetch photos (await). fetchPlaceDataAndPhotos previously returned { dataId, photos } in our helpers.
      let photos: any[] = [];
      try {
        const photosResult = await fetchPlaceDataAndPhotos(location);
        // photosResult might be { dataId, photos } or an array; handle both
        if (Array.isArray(photosResult)) {
          photos = photosResult;
        } else if (photosResult?.photos) {
          photos = photosResult.photos;
        } else if (photosResult?.result?.photos) {
          photos = photosResult.result.photos;
        } else {
          // try if function returned { dataId, photos } as in shared helper
          photos = photosResult?.photos ?? [];
        }
      } catch (err) {
        console.error("Failed to fetch place photos:", err);
        photos = [];
      }

      // 4) write everything to sessionStorage
      try {
        localStorage.setItem("userInput", JSON.stringify(tripUserInput));
        localStorage.setItem(
          "tripData",
          typeof geminiText === "string"
            ? geminiText
            : JSON.stringify(geminiText)
        );

        // pick a safe photo url (try common fields and fallback)
        const firstPhoto = photos?.[1] ?? photos?.[0] ?? null;
        const photoUrl =
          firstPhoto?.image ??
          firstPhoto?.thumbnail ??
          firstPhoto?.src ??
          firstPhoto?.url ??
          (typeof firstPhoto === "string" ? firstPhoto : null);

        if (photoUrl) {
          localStorage.setItem("placePhoto", photoUrl);
        } else {
          // optional: clear previous value if none found
          localStorage.removeItem("placePhoto");
        }
      } catch (err) {
        console.error("Failed to write to local Storage:", err);
        // continue — storage failures shouldn't block navigation necessarily
      }

      // all done — hide loader and navigate
      setShowLoader(false);
      router.push("/trip-planner/my-trip");
    } catch (error) {
      console.error(
        "error while fetching response from gemini or processing data",
        error
      );
      setShowLoader(false);
      // optionally show a user-friendly message:
      alert(
        "Something went wrong while generating your trip. Please try again."
      );
    }
  };

  return (
    <div className="w-screen flex justify-center items-center flex-col relative">
      <div className="my-10 w-[90%] md:w-[80%] lg:w-[50%] pt-20">
        <div className="flex flex-col">
          <span className="font-semibold text-3xl">
            Tell us more about your travel preferences
          </span>
          <span className="font-normal text-lg mt-2 text-[--text-secondary]">
            Just provide some basic information, and our trip planner will
            generate a customized <br />
            itinerary based on your preferences.
          </span>
        </div>

        <div className="mt-12 rounded-lg bg-[--bg-high] drop-shadow-2xl flex flex-col justify-center items-start p-6 md:p-10">
          <div className="flex flex-col w-full">
            <span className="text-xl font-medium">
              What is the destination of your choice?
            </span>
            <input
              type="text"
              className="mt-4 py-2 px-6 rounded-lg focus:outline-[--accent-light] placeholder:text-gray-300 placeholder:text-sm placeholder:font-thin"
              placeholder="Ex. Paris, France"
              value={tripUserInput.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div className="mt-12 flex flex-col w-full">
            <span className="text-xl font-medium">
              How many days are you planning to travel?
            </span>
            <input
              type="text" // keep type text to avoid spinners; can be "number" too
              inputMode="numeric" // show numeric keyboard on mobile
              pattern="\d*" // optional
              className={`mt-4 py-2 px-6 rounded-lg focus:outline-orange-300 ${
                errors.noOfDays
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-300"
              } placeholder:text-sm placeholder:font-thin `}
              placeholder={errors.noOfDays ? "Please type a number" : "Ex. 3"}
              value={tripUserInput.noOfDays}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          <div className="mt-12 flex flex-col w-full">
            <span className="text-xl font-medium">What is your budget?</span>

            <div className="flex justify-between flex-wrap">
              {budgetOptions.map((option, idx) => (
                <OptionCard
                  key={idx}
                  active={tripUserInput.budget === option.title}
                  onClick={() => handleInputChange("budget", option.title)}
                  title={option.title}
                  desc={option.desc}
                  icon={option.icon}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col w-full">
            <span className="text-xl font-medium">
              Who do you plan on traveling with on your next adventure?
            </span>

            <div className="flex justify-between flex-wrap">
              {travellingWith.map((option, idx) => (
                <OptionCard
                  key={idx}
                  active={tripUserInput.travellingWith === option.title}
                  onClick={() =>
                    handleInputChange("travellingWith", option.title)
                  }
                  title={option.title}
                  desc={option.desc}
                  icon={option.icon}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col w-full">
            <span className="text-xl font-medium">
              When do you plan to travel?
            </span>

            <div className="flex justify-between flex-wrap">
              {travelMonth.map((option, idx) => (
                <OptionCard
                  key={idx}
                  active={tripUserInput.travelMonth === option.months}
                  onClick={() =>
                    handleInputChange("travelMonth", option.months)
                  }
                  title={option.season}
                  desc={option.months}
                  icon={option.icon}
                />
              ))}
            </div>
          </div>

          <div
            className="mt-20 h-12 w-full cursor-pointer"
            onClick={handleSubmitUserData}
          >
            <button className="h-12 w-full bg-[--accent] hover:bg-[#e63d03] hover:drop-shadow-md rounded-lg text-center text-white flex items-center justify-center">
              Analyze my information
            </button>
          </div>
        </div>
        {showLoader && <Loader />}
      </div>
    </div>
  );
}

export default TripPlanner;
