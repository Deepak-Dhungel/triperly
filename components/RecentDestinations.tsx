import Image from "next/image";
import React from "react";
import Paris from "@/public/paris.jpg";
import Denver from "@/public/places/denver.webp";
import London from "@/public/places/london.avif";
import Singapore from "@/public/places/singapore.avif";

const RecentDestinations = () => {
  const recentDest = [
    {
      id: 1,
      place: "Paris",
      image: Paris,
    },
    {
      id: 2,
      place: "Denver",
      image: Denver,
    },
    {
      id: 3,
      place: "London",
      image: London,
    },
    {
      id: 4,
      place: "Singapore",
      image: Singapore,
    },
  ];

  return (
    <div className="w-[90%] lg:w-[70%] mx-auto my-20">
      <h1 className="font-semibold text-3xl lg:text-4xl tracking-wide">
        Our Recent Destinations
      </h1>
      <span className="text-lg md:text-lg lg:text-xl text-[--text-secondary] font-light">
        These are some of the popular destinations our users have recently
        explored.
      </span>

      <div className="mt-10 flex justify-between flex-wrap gap-4">
        {recentDest.map((dest) => (
          <div key={dest.id} className="flex flex-col items-start">
            <div className="border-2 border-gray-400 rounded-lg bg-[--bg-high] overflow-hidden p-2">
              <Image
                src={dest.image}
                alt={dest.place}
                width={300}
                height={100}
                className=" w-40 h-40 lg:w-56 lg:h-44 object-cover rounded-lg"
              />
            </div>

            <span className="md:mt-2 text-base font-medium text-[--text-secondary]">
              {dest.place}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDestinations;
