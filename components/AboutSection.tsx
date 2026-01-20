import PrimaryButton from "./ui-elements/PrimaryButton";
import { appData } from "@/constants/home-page.constant";
import MotionImageCard from "./ui-elements/MotionImageCard";

export default function AboutSection() {
  const aboutCardImages = appData.aboutSection.images;

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-[90%] lg:w-[70%] mx-auto my-20">
      <div className="md:w-1/2 md:pr-20 pb-20 md:pb-0 flex flex-col gap-6">
        <h1 className="font-semibold text-5xl md:text-4xl lg:text-6xl text-center md:text-left">
          {appData.aboutSection.title.map((line, idx) => (
            <span key={idx}>
              {line} <span className="text-[--accent]">.</span>
              <br />
            </span>
          ))}
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
          <MotionImageCard
            src={aboutCardImages[0]}
            alt="USA"
            className={`h-[300px] border-4 border-white`}
            initial={{ y: -30, x: -100, opacity: 1 }}
            whileInView={{ y: 0, x: 0, opacity: 1 }}
            whileHover={{ rotate: 6 }}
          />
          <MotionImageCard
            src={aboutCardImages[1]}
            alt="paris"
            className={`h-[300px] border-4 border-white`}
            initial={{ y: 100, x: -50, opacity: 0 }}
            whileInView={{ y: 0, x: 0, opacity: 1 }}
            whileHover={{ rotate: -6 }}
          />
        </div>

        <MotionImageCard
          src={aboutCardImages[2]}
          alt="London"
          className={`h-[500px] border-4 border-white`}
          initial={{ x: 100, opacity: 0, scale: 0.6 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 0.8, ease: "easeOut" } }}
          whileHover={{ rotate: -6 }}
        />
      </div>
    </section>
  );
}
