"use server";

import { GITHUB_ENDPOINTS } from "@/lib/constants";
import type {
  GithubReposResponse,
  GithubUserResponse,
  GithubStarredResponse,
  GithubTrendingReposResponse,
  GithubRepo,
  LanguagesValue,
  TrendingRepo,
  GithubTrendingRepos,
  UserProfileData,
} from "@/lib/types";

const token = process.env.GITHUB_TOKEN;

export async function fetchGithubUser(
  username: string,
): Promise<GithubUserResponse> {
  try {
    const res = await fetch(GITHUB_ENDPOINTS.USER(username), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate: 3600 },
    });

    if (res.status === 404) {
      return { message: "USER_NOT_FOUND" };
    }

    if (!res.ok) {
      return { message: "API_ERROR" };
    }

    const data = await res.json();
    return data;
  } catch {
    return { message: "NETWORK_ERROR" };
  }
}

export async function fetchGithubRepos(
  username: string,
): Promise<GithubReposResponse> {
  try {
    const res = await fetch(GITHUB_ENDPOINTS.USER_REPOS(username), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return { message: "FAILED_TO_FETCH_REPOS" };
    }

    const data = await res.json();
    return data;
  } catch {
    return { message: "NETWORK_ERROR" };
  }
}

export async function fetchGithubUserGivenStarred(
  username: string,
): Promise<GithubStarredResponse> {
  try {
    const res = await fetch(GITHUB_ENDPOINTS.USER_STARRED(username), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchGithubUserMostStarredRepo(
  username: string,
): Promise<GithubRepo | null> {
  try {
    const starredRepo = await fetch(
      GITHUB_ENDPOINTS.USER_MOST_STARRED_REPO(username),
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 3600 },
      },
    );

    if (starredRepo.ok) {
      const starredData = await starredRepo.json();
      const topRepo = starredData.items?.[0];

      if (topRepo && topRepo.stargazers_count > 0) {
        return topRepo;
      }
    }

    const updatedRepo = await fetch(
      GITHUB_ENDPOINTS.USER_LATEST_UPDATED_REPO(username),
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 3600 },
      },
    );

    if (!updatedRepo.ok) return null;
    const updatedData = await updatedRepo.json();
    return updatedData.items?.[0] || null;
  } catch {
    return null;
  }
}

export async function fetchGithubTrendingRepos(
  language: LanguagesValue,
  daysAge: number,
): Promise<GithubTrendingReposResponse> {
  try {
    const res = await fetch(
      GITHUB_ENDPOINTS.TRENDING_REPOS(language, daysAge),
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      if (res.status === 429) return { message: "RATE_LIMIT_EXCEEDED" };
      if (res.status === 422) return { message: "VALIDATION_FAILED" };
      return { message: "FAILED_TO_FETCH_TRENDING_REPOS" };
    }

    const data = await res.json();

    const reposData = {
      total_count: data.total_count,
      items: (data.items || []).map((repo: TrendingRepo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        owner: {
          login: repo.owner.login,
          avatar_url: repo.owner.avatar_url,
        },
        topics: Array.isArray(repo.topics) ? repo.topics : [],
      })),
    };

    return reposData;
  } catch {
    return { message: "NETWORK_ERROR" };
  }
}

export async function getTerndingRepos(
  language: LanguagesValue,
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

export async function getUser(
  username: string,
): Promise<UserProfileData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/github/profile/${username}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;

      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "FAILED_TO_FETCH");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
