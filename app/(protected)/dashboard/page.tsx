"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import paris from "@/public/paris.jpg";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

function Dashboard() {
  const { user } = useAuth();
  const [savedUserTrips, setSavedUserTrips] = useState<null | []>(null);
  const [showLoader, setShowLoader] = useState(false);

  console.log("Dashboard rendered with user");

  useEffect(() => {
    if (!user) return;

    getUserTrips();
  }, [user]);

  async function getUserTrips() {
    setShowLoader(true);
    if (savedUserTrips === null) {
      try {
        // get the user token
        const userToken = await user?.getIdToken();

        if (!userToken) {
          console.log("No user token found");
          return;
        }

        // call the api to get user trips from the backend
        const res = await fetch("/api/trips", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (res.ok) {
          setShowLoader(false);
          const data = await res.json();
          setSavedUserTrips(data.trips);
        }
      } catch (error) {
        console.error("Error while fetching trip data from DB", error);
      }
    }
  }

  console.log(savedUserTrips);

  return (
    <div className="mt-[70px] pt-10 px-4 md:px-40 border-t-2">
      {showLoader && <Loader message="Getting your trips..." />}
      <div className="flex flex-col">
        <span className="font-semibold text-3xl">
          Welcome{" "}
          {user?.displayName &&
            user?.displayName.split(" ")[0].charAt(0).toUpperCase() +
              user?.displayName.split(" ")[0].slice(1).toLowerCase()}
          ,
        </span>
        <span className="font-normal text-lg mt-2">
          Find trips that you have saved.
        </span>
      </div>

      <div className="mt-10 flex gap-10 flex-wrap">
        <SavedTripCard />
      </div>
    </div>
  );
}

export default Dashboard;

export function SavedTripCard() {
  return (
    <div className="w-[20%] flex flex-col gap-2 rounded-xl p-2 transition-all hover:scale-110">
      <Image src={paris} alt="trip-location" className="rounded-xl" />
      <div className="flex flex-col">
        <span className="mt-2 text-lg font-semibold">Paris, France</span>
        <span className="text-xs">2 Days trip with Cheap Budget</span>
      </div>
    </div>
  );
}
