"use client";

import Loader from "@/components/Loader";
import GradientButton from "@/components/ui-elements/GradientButton";
import {
  budgetOptions,
  geminiPromptConstant,
  travellingWith,
  travelMonth,
} from "@/constants/trip-planner.constant";
import { auth, db } from "@/service/firebase.config";
import { chatSession } from "@/service/gemini";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TripUserInputType } from "@/types/trip.types";

function TripPlanner() {
  const [tripUserInput, setTripUserInput] = useState<TripUserInputType>(
    {} as TripUserInputType
  );
  const [showLoader, setShowLoader] = useState(false);
  const [tripData, setTripData] = useState();
  const router = useRouter();

  const handleInputChange = (label: string, value: string) => {
    setTripUserInput((prev) => {
      const updateData = { ...prev, [label]: value };
      return updateData;
    });
  };

  const handleSubmitUserData = async () => {
    if (Object.keys(tripUserInput).length !== 0) {
      if (
        tripUserInput.location &&
        tripUserInput.budget &&
        tripUserInput.noOfDays &&
        tripUserInput.travellingWith &&
        tripUserInput.travelMonth
      ) {
        const geminiPrompt = geminiPromptConstant
          .replace("{location}", tripUserInput.location)
          .replace("{budget}", tripUserInput.budget)
          .replace("{travellingWith}", tripUserInput.travellingWith)
          .replace("{duration}", tripUserInput.noOfDays)
          .replace("{travelMonth}", tripUserInput.travelMonth);

        setShowLoader(true);

        const geminiResponse = await chatSession.sendMessage(geminiPrompt);
        sessionStorage.setItem("userInput", JSON.stringify(tripUserInput));
          sessionStorage.setItem("tripData", geminiResponse.response.text());
        router.push("/trip-planner/my-trip");
      } else {
        alert("Please fill all required fields");
      }
    } else {
      alert("please provide your info ");
    }
  };

  // async function addTripToFirebase() {
  //   try {
  //     const userId = auth?.currentUser?.uid;
  //     const dbRef = collection(db, `users/${userId}/trips`);
  //     await addDoc(dbRef, { ...tripUserInput });
  //     console.log("Data Added to Firestore");
  //     console.log("loading false");
  //     setShowLoader(false);
  //   } catch (error) {
  //     console.log("error while adding data to firebase", error);
  //   }
  // }

  return (
    <div className="my-10 px-4 md:px-60 z-[9]">
      <div className="flex flex-col">
        <span className="font-semibold text-3xl">
          Tell us your travel preferences
        </span>
        <span className="font-normal text-lg mt-2">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </span>
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 drop-shadow-2xl flex flex-col justify-center items-start p-6 md:p-10">
        <div className="flex flex-col w-full">
          <span className="text-xl font-medium">
            What is the destination of your choice?
          </span>
          <input
            type="text"
            className="mt-4 py-2 px-6 rounded-full focus:outline-none placeholder:text-gray-300 placeholder:text-sm"
            placeholder="Ex. Paris, France"
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        <div className="mt-12 flex flex-col w-full">
          <span className="text-xl font-medium">
            How many days are you planning to travel?
          </span>
          <input
            type="number"
            className="mt-4 py-2 px-6 rounded-full focus:outline-none placeholder:text-gray-300 placeholder:text-sm"
            placeholder="Ex. 3 Days"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="mt-12 flex flex-col w-full">
          <span className="text-xl font-medium">What is your budget?</span>

          <div className="flex justify-between">
            {budgetOptions.map((option, idx) => (
              <div
                key={idx}
                className={`mt-4 flex flex-col w-[30%] border-2 p-4 rounded-md  hover:bg-background hover:cursor-pointer ${
                  tripUserInput.budget == option.title
                    ? "bg-background"
                    : "bg-[#e9fde237]"
                }`}
                onClick={() => handleInputChange("budget", option.title)}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-semibold text-xl mt-4">
                  {option.title}
                </span>
                <span className="text-sm">{option.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col w-full">
          <span className="text-xl font-medium">
            Who do you plan on traveling with on your next adventure?
          </span>

          <div className="flex justify-between flex-wrap">
            {travellingWith.map((option, idx) => (
              <div
                key={idx}
                className={`mt-4 flex flex-col border-2 w-[30%] p-4 rounded-md hover:bg-background hover:cursor-pointer ${
                  tripUserInput.travellingWith == option.title
                    ? "bg-background"
                    : "bg-[#e9fde237]"
                }`}
                onClick={() =>
                  handleInputChange("travellingWith", option.title)
                }
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-semibold text-xl mt-4">
                  {option.title}
                </span>
                <span className="text-sm">{option.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col w-full">
          <span className="text-xl font-medium">
            When do you plan to travel?
          </span>

          <div className="flex justify-between flex-wrap">
            {travelMonth.map((option, idx) => (
              <div
                key={idx}
                className={`mt-4 flex flex-col border-2 w-[30%] p-4 rounded-md hover:bg-background hover:cursor-pointer ${
                  tripUserInput.travelMonth == option.months
                    ? "bg-background"
                    : "bg-[#e9fde237]"
                }`}
                onClick={() => handleInputChange("travelMonth", option.months)}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-semibold text-xl mt-4">
                  {option.season}
                </span>
                <span className="text-sm">{option.months}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-20 h-12 w-full cursor-pointer"
          onClick={handleSubmitUserData}
        >
          <GradientButton text="Analyze my information" />
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}

export default TripPlanner;
