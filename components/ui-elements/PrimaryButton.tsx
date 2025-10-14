import React from "react";

type PrimaryButtonProps = {
  buttonText: string;
};

function PrimaryButton({ buttonText }: PrimaryButtonProps) {
  return (
    <button className="h-10 w-full self-start px-6 lg:px-10 bg-[--accent] hover:bg-[#e63d03] rounded-lg text-center text-white flex items-center justify-center ">
      {buttonText}
    </button>
  );
}

export default PrimaryButton;
