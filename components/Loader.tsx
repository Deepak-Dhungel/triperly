import React, { useEffect, useState } from "react";

type LoaderPropsType = {
  message?: string;
  messages?: string[];
  intervalMs?: number;
};

function Loader({ message, messages, intervalMs = 2500 }: LoaderPropsType) {
  const cycleMessages = messages?.length ? messages : message ? [message] : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cycleMessages.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % cycleMessages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [cycleMessages.length, intervalMs]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-[10]">
      <div className="flex flex-col items-center gap-6">
        <span className="text-white text-xl">{cycleMessages[index]}</span>
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
