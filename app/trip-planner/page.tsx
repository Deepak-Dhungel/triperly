"use client";

import Loader from "@/components/Loader";
import {
  budgetOptions,
  geminiPromptConstant,
  travellingWith,
  travelMonth,
} from "@/constants/trip-planner.constant";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TripUserInputType } from "@/types/trip.types";
import OptionCard from "@/components/ui-elements/OptionCard";
import { getLocationPhoto } from "@/service/locationPhoto";
import { useRouter } from "next/navigation";

function TripPlanner() {
  const [tripUserInput, setTripUserInput] = useState<TripUserInputType>({
    location: "",
    budget: "",
    noOfDays: "",
    travellingWith: "",
    travelMonth: "",
  } as TripUserInputType);
  const [showLoader, setShowLoader] = useState(false);
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState<{ noOfDays?: string }>({});

  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      const userDestination = searchParams.get("destination") ?? "";
      setTripUserInput({ ...tripUserInput, location: userDestination });
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
    try {
      const { location, budget, noOfDays, travellingWith, travelMonth } =
        tripUserInput;
      if (
        !location ||
        !budget ||
        !noOfDays ||
        !travellingWith ||
        !travelMonth
      ) {
        alert("Please fill all required fields");
        return;
      }
      setShowLoader(true);

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
        console.log("first", geminiResponse);

        //store trip data in local storage
        if (geminiResponse.tripResult) {
          localStorage.setItem(
            "tripData",
            JSON.stringify(geminiResponse.tripResult)
          );
        }
      } catch (error) {
        console.error("error while fetching response from gemini", error);
      }

      // fetch location photo
      try {
        const photoURL = await getLocationPhoto(location);
        console.log("photoURL:", photoURL);

        //store photo URL in local storage
        if (photoURL) {
          localStorage.setItem("locationPhoto", photoURL);
        }

        // redirect to my-trip page
        router.push("/trip-planner/my-trip");
      } catch (error) {
        console.error("error fetching location photo:", error);
      }
    } catch (error) {
      console.log("error fetching photo:", error);
    } finally {
      setShowLoader(false);
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
