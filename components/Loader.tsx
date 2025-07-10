import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-[10]">
      <iframe src="https://lottie.host/embed/5d01e795-0c3b-49ad-8cd9-96f6ecdefb9f/9nj45g6FlQ.json" />
    </div>
  );
}

export default Loader;
