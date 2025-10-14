import React from "react";

const OptionCard: React.FC<{
  active: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
}> = ({ active, onClick, title, desc, icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-4 flex flex-col w-[150px] lg:w-[200px] border-2 p-4 rounded-lg hover:border-[--accent-light] hover:cursor-pointer hover:drop-shadow-md ${
        active
          ? "bg-[--accent-light] border-[--accent-light] text-white"
          : "bg-transparent"
      }`}
      aria-pressed={active}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-lg lg:text-xl mt-4">{title}</span>
      {desc && <span className="text-sm">{desc}</span>}
    </button>
  );
};

export default OptionCard;
