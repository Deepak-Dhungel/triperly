"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import paris from "@/public/paris.jpg";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="my-32 px-4 md:px-40 z-[9]">
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
        <SavedTripCard />
        <SavedTripCard />
        <SavedTripCard />
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
