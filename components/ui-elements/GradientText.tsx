import React from "react";

type GradientTextType = {
  text: string;
};

function GradientText({ text }: GradientTextType) {
  return (
    <div
      className={`bg-gradient-to-r from-[#ff820e] via-[#f629ee] to-[#329dff] text-transparent bg-clip-text capitalize leading-normal`}
    >
      {text}
    </div>
  );
}

export default GradientText;
