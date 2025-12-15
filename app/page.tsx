import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import RecentDestinations from "@/components/RecentDestinations";

export default function Home() {
  return (
    <div className="pt-20 relative">
      <HeroSection />
      <div className="relative">
        <div className="absolute w-full h-full bg-[url('/bg.svg')] bg-cover bg-no-repeat opacity-5" />
        <AboutSection />
        <RecentDestinations />
      </div>
    </div>
  );
}
