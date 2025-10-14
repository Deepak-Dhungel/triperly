import Image from "next/image";
import PrimaryButton from "./ui-elements/PrimaryButton";
import { appData } from "@/constants/home-page.constant";

export default function AboutSection() {
  const imageClass =
    "rounded-lg w-[200px] h-[auto] lg:w-[300px] object-cover drop-shadow-2xl transition-transform duration-300 ease-out";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-[90%] lg:w-[70%] mx-auto my-20">
      <div className="md:w-1/2 md:pr-20 pb-20 md:pb-0 flex flex-col gap-6">
        <h1 className="font-semibold text-5xl md:text-4xl lg:text-6xl text-center md:text-left">
          {appData.aboutSection.title[0]}{" "}
          <span className="text-[--accent]">.</span> <br />
          {appData.aboutSection.title[1]}{" "}
          <span className="text-[--accent]">.</span> <br />
          {appData.aboutSection.title[2]}{" "}
          <span className="text-[--accent]">!</span> <br />
        </h1>

        <span className="text-xl md:text-lg lg:text-xl text-[--text-secondary] font-light text-center md:text-left">
          {appData.aboutSection.desc}
        </span>

        <div className="mx-auto md:mx-0 w-max">
          <PrimaryButton buttonText={appData.aboutSection.buttonText} />
        </div>
      </div>

      <div className="md:w-1/2 flex gap-6 items-center justify-end">
        <div className="flex flex-col gap-6">
          <Image
            src={appData.aboutSection.images[0]}
            alt="USA"
            width={600}
            height={400}
            className={`${imageClass} h-[300px] hover:rotate-6 `}
          />
          <Image
            src={appData.aboutSection.images[1]}
            alt="paris"
            width={600}
            height={400}
            className={`${imageClass} h-[300px] hover:rotate-[-6deg] `}
          />
        </div>
        <div className="bg-[--bg-high] rounded-lg drop-shadow-2xl hover:rotate-[-6deg] transition-transform duration-300 ease-out">
          <Image
            src={appData.aboutSection.images[2]}
            alt="London"
            width={600}
            height={400}
            className={`${imageClass} h-[500px]`}
          />
        </div>
      </div>
    </div>
  );
}
