"use client";

import { Suspense } from "react";
import TripPlannerForm from "@/components/trip-planner/TripPlannerForm";

function TripPlannerInner() {
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

        <TripPlannerForm />
      </div>
    </div>
  );
}

export default function TripPlannerPage() {
  return (
    <Suspense fallback={null}>
      <TripPlannerInner />
    </Suspense>
  );
}
