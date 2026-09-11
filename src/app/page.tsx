import SearchSection from "@/components/ui/home/search-section";
import HeroSection from "@/components/ui/home/hero-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      "https://github-dev-card-bypl.vercel.app",
  ),
  title: "Search Github Profiles | DevCard",
  description:
    "Search and explore Github user profiles, repositories, top languages, and developer statistics on DevCard.",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 pt-2 pb-8 items-center w-full gap-8">
      <HeroSection />
      <SearchSection />
    </div>
  );
}
