import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-[10]">
      <div className="flex flex-col items-center gap-6">
        <span className="text-white text-xl">Finding your trip details...</span>
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-[--accent] animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-[--accent] animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-[--accent] animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
