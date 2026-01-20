"use client";

import React, { useEffect, useRef } from "react";
import { ExplorePlaceType } from "@/types/types";
import { motion, useInView } from "motion/react";

type ExplorePlaceCardType = {
  place: ExplorePlaceType;
  width?: number;
};

function ExplorePlaceCard({ place, width = 33 }: ExplorePlaceCardType) {
  const ref = useRef<HTMLDivElement | null>(null);

  const initialCardView = { scale: 0.85, opacity: 0 };
  const fullVisibleCard = { scale: 1, opacity: 1 };

  const [bgLoaded, setBgLoaded] = React.useState(false);

  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setBgLoaded(true);
    }
  }, [isInView]);

  if (!place) return null;

  const { name, image, places } = place;

  return (
    <motion.div
      ref={ref}
      className={`w-full md:w-[${width}%] h-[250px] md:h-[400px] rounded-2xl relative  overflow-hidden`}
      style={{
        backgroundImage: bgLoaded ? `url(${image.src})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={initialCardView}
      whileInView={fullVisibleCard}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.4 }}
    >
      {/* Dark Gradient Overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="text-white font-bold absolute bottom-4 left-4 right-4 flex flex-col justify-start items-start">
        <span className="text-3xl">{name}</span>
        <span className="text-md">{places.join(" . ")}</span>
      </div>
    </motion.div>
  );
}

export default ExplorePlaceCard;
