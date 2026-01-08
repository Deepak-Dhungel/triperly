import Image from "next/image";
import paris from "@/public/paris.jpg";

export function SavedTripCard() {
  return (
    <div className="w-[20%] flex flex-col gap-2 rounded-xl p-2 transition-all hover:scale-110">
      <Image src={paris} alt="trip-location" className="rounded-xl" />
      <div className="flex flex-col">
        <span className="mt-2 text-lg font-semibold">Paris, France</span>
        <span className="text-xs">2 Days trip with Cheap Budget</span>
      </div>
    </div>
  );
}
