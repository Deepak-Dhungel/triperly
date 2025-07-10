import React from "react";
import GradientText from "./ui-elements/GradientText";
import Link from "next/link";
import GradientButton from "./ui-elements/GradientButton";

function HeroSection() {
  return (
    <div className="h-[500px] mt-4 rounded-2xl bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 drop-shadow-2xl flex flex-col justify-center items-center mx-4 md:mx-10 p-4">
      <div className="text-4xl md:text-5xl font-semibold text-center md:flex items-center">
        <span>Plan Your Dream Trip with</span>
        <GradientText text="TripErly" />
      </div>
      <span className="text-xl md:text-2xl text-center mt-6 text-text">
        Let our AI-powered platform help you take a sneak peek at your next
        <br />
        adventure, explore virtually, and plan with ease!
      </span>

      <Link href="/trip-planner" className="mt-20 h-14 w-[300px]">
        <GradientButton text="Get Started-It's Free" />
      </Link>
    </div>
  );
}

export default HeroSection;
