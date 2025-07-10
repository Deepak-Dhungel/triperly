import React from "react";
import { BsArrowRight } from "react-icons/bs";

type GradientButtonType = {
  text: string;
};

function GradientButton({ text }: GradientButtonType) {
  return (
    <div className="button-wrapper">
      <span className="bg-gradient-to-r from-[#FF772A] via-[#D262FA] to-[#DDD9F5] rounded-full z-[2] h-[calc(100%-2px)] w-[calc(100%-2px)] flex items-center justify-center gap-4">
        <span className="text-md font-semibold text-background">{text}</span>
        <BsArrowRight size={30} className="text-background" />
      </span>
    </div>
  );
}

export default GradientButton;
