import { placesToExplore } from "@/constants/home-page.constant";
import React from "react";
import ExplorePlaceCard from "./ui-elements/ExplorePlaceCard";

const PlacesToExplore = () => {
  return (
    <section className="w-[90%] lg:w-[70%] my-40 flex flex-col mx-auto ">
      <h1 className="font-bold text-4xl tracking-wide text-center">
        Explore hundred of places to visit <br /> for every corner of the world
      </h1>

      <div className="flex flex-col mt-10 gap-6 justify-center items-center">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {placesToExplore.slice(0, 3).map((place) => (
            <ExplorePlaceCard key={place.id} place={place} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <ExplorePlaceCard place={placesToExplore[3]} />
          <ExplorePlaceCard place={placesToExplore[4]} width={67} />
        </div>
      </div>
    </section>
  );
};

export default PlacesToExplore;
