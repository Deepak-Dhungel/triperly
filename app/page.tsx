import HeroSection from "@/components/HeroSection";
import ImageMarquee from "@/components/ImageMarquee";
import GradientText from "@/components/ui-elements/GradientText";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ImageMarquee />

      <div className="mx-4 my-10 md:m-10 flex items-center justify-center flex-col">
        <div className="gap-2 font-semibold text-center text-4xl md:text-6xl tracking-wide">
          <GradientText text="discover . plan . experience" />
        </div>
        <div className="text-xl md:text-3xl text-center mt-6 text-text font-semibold flex flex-col gap-6">
          <span className="md:mx-56 leading-normal">
            Skip the manual trip planning and start your effortless journey with
            TripErly today, at no cost.
          </span>
          <span>The start of a new Travel Planning Experience.</span>
        </div>
      </div>
    </div>
  );
}
