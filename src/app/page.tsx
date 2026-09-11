import SearchSection from "@/components/ui/home/search-section";
import HeroSection from "@/components/ui/home/hero-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevCard | Github Profile Viewer",
  description: "DevCard | Github Profile Viewer by Alir3za Samadi",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 pt-2 pb-8 items-center w-full gap-8">
      <HeroSection />
      <SearchSection />
    </div>
  );
}
