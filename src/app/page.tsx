import SearchSection from "@/components/ui/home/search-section";
import HeroSection from "@/components/ui/home/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 pt-2 pb-8 items-center w-full gap-8">
      <HeroSection />
      <SearchSection />
    </div>
  );
}
