import React from "react";
import OptionCard from "../ui-elements/OptionCard";

type SelectionOption = {
  icon: React.ReactNode;
  title: string;
  desc?: string;
};

interface TripInputSelectionCardProps {
  label: string;
  options: SelectionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

function TripInputSelectionCard({
  label,
  options,
  selectedValue,
  onSelect,
}: TripInputSelectionCardProps) {
  return (
    <div className="mt-12 flex flex-col w-full">
      <span className="text-xl font-medium">{label}</span>

      <div className="flex justify-between flex-wrap">
        {options.map((option, idx) => (
          <OptionCard
            key={idx}
            active={selectedValue === option.title}
            onClick={() => onSelect(option.title)}
            title={option.title}
            desc={option.desc}
            icon={option.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default TripInputSelectionCard;
