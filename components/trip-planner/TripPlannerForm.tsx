"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OptionCard from "../ui-elements/OptionCard";
import {
  budgetOptions,
  travellingWith,
  travelMonth,
  geminiPromptConstant,
} from "@/constants/trip-planner.constant";
import { TripUserInputType } from "@/types/trip.types";
import TripInputSelectionCard from "./TripInputSelectionCard";
import Loader from "@/components/Loader";
import { getLocationPhoto } from "@/service/locationPhoto";

function TripPlannerForm() {
  const [tripUserInput, setTripUserInput] = useState<TripUserInputType>({
    location: "",
    budget: "",
    noOfDays: "",
    travellingWith: "",
    travelMonth: "",
  } as TripUserInputType);

  const [errors, setErrors] = useState<{ noOfDays?: string }>({});
  const [missingInputError, setMissingInputError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // prefill destination when arriving from the landing page search (e.g. /trip-planner?destination=Paris)
  useEffect(() => {
    const destination = searchParams.get("destination");
    if (destination) {
      setTripUserInput((prev) => ({ ...prev, location: destination }));
    }
  }, [searchParams]);

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

  const handleSubmitUserData = async () => {
    const { location, budget, noOfDays, travellingWith, travelMonth } =
      tripUserInput;

    if (!location || !budget || !noOfDays || !travellingWith || !travelMonth) {
      setMissingInputError(true);
      return;
    }
    setMissingInputError(false);
    setShowLoader(true);

    let tripResult = null;

    try {
      localStorage.removeItem("tripData");
      localStorage.removeItem("locationPhoto");

      const geminiPrompt = geminiPromptConstant
        .replace("{location}", location)
        .replace("{budget}", budget)
        .replace("{travellingWith}", travellingWith)
        .replace("{duration}", noOfDays)
        .replace("{travelMonth}", travelMonth);

      try {
        const connectWithGemini = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: geminiPrompt }),
        });
        const geminiResponse = await connectWithGemini.json();

        if (geminiResponse.tripResult) {
          tripResult = geminiResponse.tripResult;
          localStorage.setItem("tripData", JSON.stringify(tripResult));
        }
      } catch (error) {
        console.error("error while fetching response from gemini", error);
      }

      try {
        const photoURL = await getLocationPhoto(location);
        if (photoURL) {
          localStorage.setItem("locationPhoto", photoURL);
        }
      } catch (error) {
        console.error("error fetching location photo:", error);
      }

      if (tripResult) {
        // keep the loader visible until this page unmounts on navigation,
        // instead of hiding it immediately and leaving a blank gap
        router.push(`/trip-planner/trip-result/${tripResult.tripId}`);
        return;
      }

      console.error("No trip result returned, staying on the form");
    } finally {
      if (!tripResult) {
        setShowLoader(false);
      }
    }
  };

  return (
    <>
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
            className={`mt-4 py-2 px-6 rounded-lg focus:outline-[--accent-light] ${
              errors.noOfDays
                ? "placeholder:text-red-600"
                : "placeholder:text-gray-300"
            } placeholder:text-sm placeholder:font-thin `}
            placeholder={errors.noOfDays ? "Please type a number" : "Ex. 3"}
            value={tripUserInput.noOfDays}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <TripInputSelectionCard
          label="What is your budget?"
          options={budgetOptions}
          selectedValue={tripUserInput.budget}
          onSelect={(value) => handleInputChange("budget", value)}
        />

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

        <div className="mt-12 flex flex-col w-full mb-20">
          <span className="text-xl font-medium">
            When do you plan to travel?
          </span>

          <div className="flex justify-between flex-wrap">
            {travelMonth.map((option, idx) => (
              <OptionCard
                key={idx}
                active={tripUserInput.travelMonth === option.months}
                onClick={() => handleInputChange("travelMonth", option.months)}
                title={option.season}
                desc={option.months}
                icon={option.icon}
              />
            ))}
          </div>
        </div>

        {missingInputError && (
          <span className="mb-2 text-sm text-red-600 bg-red-100 w-full p-2 rounded-lg">
            Looks like something’s missing. Please complete all required
            selections.
          </span>
        )}

        <div
          className="h-12 w-full cursor-pointer"
          onClick={handleSubmitUserData}
        >
          <button className="h-12 w-full bg-[--accent] hover:bg-[#e63d03] hover:drop-shadow-md rounded-lg text-center text-white flex items-center justify-center">
            Analyze my information
          </button>
        </div>
      </div>

      {showLoader && (
        <Loader
          messages={[
            "Analyzing your information...",
            "Finding the best trip options for you...",
            "Comparing hotels and prices...",
            "Building your itinerary...",
            "Almost there...",
          ]}
        />
      )}
    </>
  );
}

export default TripPlannerForm;
