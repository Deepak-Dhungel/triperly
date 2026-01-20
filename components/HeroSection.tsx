"use client";
import { useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { appData } from "@/constants/home-page.constant";
import { motion } from "motion/react";

function HeroSection() {
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!destination) {
      setError("Please enter a destination.");
      return;
    } else
      router.push(
        `/trip-planner?destination=${encodeURIComponent(destination)}`,
      );
  }

  return (
    <section className="h-[80vh] lg:h-[70vh] mt-3 rounded-2xl flex flex-col justify-center items-center mx-4 md:mx-10 p-4 bg-[--bg-high] relative overflow-hidden">
      <motion.div
        className="hidden lg:block absolute left-0 bottom-0 w-[30%] max-h-full h-[500px] bg-contain bg-no-repeat opacity-[0.30] pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg-left.svg')",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      {/* moition cloud left side */}
      <motion.div
        className="absolute left-0 top-8 w-[30%] h-[500px] opacity-[0.30] hidden lg:block bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-cloud-left.svg')",
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "90vw" }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          delay: 16,
        }}
      />
      {/* moition cloud right side */}
      <motion.div
        className="absolute  w-[30%] left-0 top-8 h-[500px] opacity-[0.30] hidden lg:block bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-cloud-right.svg')",
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        initial={{ x: "-75%" }}
        animate={{ x: "90vw" }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <div
        className="hidden lg:block absolute right-0 bottom-0 w-[30%] max-h-full h-[500px] bg-contain bg-no-repeat opacity-[0.30] pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg-right.svg')",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <h1 className="text-4xl lg:text-6xl font-semibold text-center md:flex items-center">
        <span>
          {appData.heroSection.title}
          <br /> with
          <span className="text-[--accent]">{appData.name} </span>
        </span>
      </h1>
      <p className="lg:w-[700px] text-xl lg:text-2xl text-center mt-6 text-[--text-secondary] font-light">
        {appData.heroSection.desc}
      </p>
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="mt-10 relative flex items-center"
          role="search"
          aria-label="Search destinations"
        >
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-4 py-3 px-6 bg-transparent rounded-lg border-2 w-[350px] md:w-[500px] border-[--accent] focus:outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-thin"
            placeholder="Search destination, ex. Paris, France"
            aria-label="Destination"
          />

          <button
            type="submit"
            className="bg-[--accent] p-3 rounded-lg w-11 h-11 absolute right-1 top-5 flex items-center justify-center hover:opacity-90"
            aria-label="Search / go to trip planner"
          >
            <PiPaperPlaneRightFill className="text-white" size={18} />
          </button>
        </form>
        {error && (
          <span className="text-sm text-red-600 absolute bg-red-100 w-full p-2 rounded-lg mt-1">
            {error}
          </span>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
