import { fetchGithubTrendingRepos } from "@/lib/github";
import { NextResponse, type NextRequest } from "next/server";
import type { LanguageValue, GithubTrendingReposResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GithubTrendingReposResponse>> {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") as LanguageValue | null;

  const rawDaysAge = searchParams.get("daysAge");
  const daysAge = rawDaysAge ? Number(rawDaysAge) : 30;

  if (!language) {
    return NextResponse.json(
      { message: "Language is required" },
      { status: 400 },
    );
  }

  const result = await fetchGithubTrendingRepos(language, daysAge);

  if ("message" in result) {
    if (result.message === "RATE_LIMIT_EXCEEDED") {
      return NextResponse.json(
        { message: "GitHub API rate limit exceeded. Please try again later." },
        { status: 429 },
      );
    }

    if (result.message === "VALIDATION_FAILED") {
      return NextResponse.json(
        { message: "Invalid search parameters supplied." },
        { status: 422 },
      );
    }

    return NextResponse.json({ message: result.message }, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}
