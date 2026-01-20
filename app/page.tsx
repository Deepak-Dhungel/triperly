import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import PlacesToExplore from "@/components/PlacesToExploreSection";

export default function Home() {
  return (
    <div className="pt-20 relative">
      <HeroSection />
      <AboutSection />
      <PlacesToExplore />
    </div>
  );
}
