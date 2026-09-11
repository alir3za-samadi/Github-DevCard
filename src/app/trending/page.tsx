import PageHeader from "@/components/ui/page-header";
import FilterSection from "@/components/ui/trending/filter-section";
import ReposSection from "@/components/ui/trending/repos-section";
import GenerateCard from "@/components/ui/generate-card";
import { TOP_LANGUAGES } from "@/lib/constants";
import type { GithubTrendingRepos, LanguageValue } from "@/lib/types";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;

  const currentLang =
    TOP_LANGUAGES.find((l) => l.value === lang) || TOP_LANGUAGES[0];

  const title = `Trending ${currentLang.label} GitHub Repositories | DevCard`;
  const description = `Explore top trending ${currentLang.label} repositories on GitHub today. Filter by programming language and discover popular projects with DevCard.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;

  const targetLangValue = lang || "javascript";

  const currentLang =
    TOP_LANGUAGES.find((l) => l.value === targetLangValue) || TOP_LANGUAGES[0];
  const currentTrendingRepos = await getTerndingRepos(currentLang.value, 30);

  if (currentTrendingRepos && "message" in currentTrendingRepos) {
    const errorMessage = String(currentTrendingRepos.message);
    throw new Error(errorMessage || "FAILED_TO_FETCH_DATA");
  }

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader
        title={`Trending ${currentLang.label} Repositories on GitHub`}
      />
      <div className="flex justify-between">
        <FilterSection languages={TOP_LANGUAGES} currentLang={currentLang} />
        <GenerateCard triggerClassName="text-sm">
          <PageHeader
            title={`Trending ${currentLang.label} Repositories on GitHub`}
          />
          <ReposSection
            repos={
              currentTrendingRepos
                ? currentTrendingRepos.items.slice(0, 5)
                : null
            }
            currentLang={currentLang}
          />
        </GenerateCard>
      </div>

      <ReposSection
        repos={currentTrendingRepos ? currentTrendingRepos.items : null}
        currentLang={currentLang}
      />
    </div>
  );
}

async function getTerndingRepos(
  language: LanguageValue,
  daysAge?: number,
): Promise<GithubTrendingRepos | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(
      `${baseUrl}/api/github/trending?lang=${language}&daysAge=${daysAge}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      if (res.status === 404) return null;

      const errorData = await res.json().catch(() => null);
      const errorMessage = errorData?.message || "FAILED_TO_FETCH";

      throw new Error(errorMessage);
    }
    const json = await res.json();

    return json;
  } catch (error) {
    throw error;
  }
}
