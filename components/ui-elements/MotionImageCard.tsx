"use client";

import {
  motion,
  TargetAndTransition,
  MotionProps,
  ViewportOptions,
} from "motion/react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type MotionImageCardType = {
  src: string | StaticImport;
  alt: string;
  className?: string;
  initial?: TargetAndTransition;
  whileInView?: TargetAndTransition;
  whileHover?: TargetAndTransition;
  transition?: MotionProps["transition"];
  viewport?: ViewportOptions;
};

function MotionImageCard({
  src,
  alt,
  initial,
  whileInView,
  whileHover,
  viewport = { amount: 0.4 },
}: MotionImageCardType) {
  const imageClass =
    "rounded-lg w-[200px] h-[auto] lg:w-[300px] object-cover drop-shadow-2xl transition-transform duration-300 ease-out";

  return (
    <motion.div
      className="bg-[--bg-high] rounded-lg drop-shadow-2xl transition-transform duration-300 ease-out"
      initial={initial}
      whileInView={whileInView}
      whileHover={whileHover}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        rotate: { duration: 0.2, ease: "easeInOut" },
      }}
      viewport={viewport}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className={`${imageClass} className`}
      />
    </motion.div>
  );
}

export default MotionImageCard;
