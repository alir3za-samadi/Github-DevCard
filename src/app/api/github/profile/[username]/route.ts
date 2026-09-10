import { fetchGithubUser, fetchGithubRepos } from "@/lib/github";
import { collctedStars } from "@/lib/utils";
import { NextResponse } from "next/server";
import type { GithubUserDataResponse } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
): Promise<NextResponse<GithubUserDataResponse>> {
  const username = (await params).username;

  if (!username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 },
    );
  }

  const [userData, reposData] = await Promise.all([
    fetchGithubUser(username),
    fetchGithubRepos(username),
  ]);

  if ("message" in userData) {
    const message = userData.message;

    if (message === "USER_NOT_FOUND") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (message === "API_ERROR" || message === "RATE_LIMIT_EXCEEDED") {
      return NextResponse.json(
        { message: "GitHub API rate limit exceeded or error occurred" },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }

  if ("message" in reposData) {
    return NextResponse.json(
      { message: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }

  const totalStars = collctedStars(reposData);

  return NextResponse.json({
    username: userData.login,
    followers: userData.followers,
    public_repos: userData.public_repos,
    avatar_url: userData.avatar_url,
    login: userData.login,
    totalStars,
  });
}
