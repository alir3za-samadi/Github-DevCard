"use server";

import type {
  GithubReposResponse,
  GithubUserResponse,
  GithubStarredResponse,
  GithubRepo,
} from "@/lib/types";

const token = process.env.GITHUB_TOKEN;

export async function fetchGithubUser(
  userName: string,
): Promise<GithubUserResponse> {
  try {
    const res = await fetch(`https://api.github.com/users/${userName}`, {
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
  userName: string,
): Promise<GithubReposResponse> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${userName}/repos?sort=updated&per_page=30`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      return { message: "FAILED_TO_FETCH_REPOS" };
    }

    const data = await res.json();
    return data;
  } catch {
    return { message: "NETWORK_ERROR" };
  }
}

export async function fetchGithubStarred(
  userName: string,
): Promise<GithubStarredResponse> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${userName}/starred?per_page=100`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchGithubUserMostStarredRepo(
  userName: string,
): Promise<GithubRepo | null> {
  try {
    const starredRepo = await fetch(
      `https://api.github.com/search/repositories?q=user:${userName}+fork:true&sort=stars&order=desc&per_page=1`,
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
      `https://api.github.com/search/repositories?q=user:${userName}+fork:true&sort=updated&order=desc&per_page=1`,
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
