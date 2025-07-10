import React from "react";

type GradientBorderBtnType = {
  text: string;
};

function GradientBorderBtn({ text }: GradientBorderBtnType) {
  return (
    <div className="button-wrapper hover:drop-shadow-xl transition-all duration-100 ease-in-out">
      <span className="button-inner">{text}</span>
    </div>
  );
}

export default GradientBorderBtn;
