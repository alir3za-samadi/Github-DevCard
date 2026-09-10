import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { GithubRepo, Repos, SortOptionValue } from "@/lib/types";

export type { ClassValue };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function languageCount(repos: GithubRepo[]) {
  const languageCounts = repos.reduce(
    (acc: Record<string, number>, repo: GithubRepo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  const topFiveRaw = Object.entries(languageCounts)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const topFiveTotalCount = topFiveRaw.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const topLanguages = topFiveRaw.map(({ language, count }) => ({
    language,
    count,
    percentage:
      topFiveTotalCount > 0 ? Math.round((count / topFiveTotalCount) * 100) : 0,
  }));

  return topLanguages;
}

export function sortRepos(repos: Repos, sortBy: SortOptionValue) {
  const newRepos = [...repos];

  switch (sortBy) {
    case "updated": {
      // default is sort byt updatedd
      break;
    }

    case "stars": {
      newRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      break;
    }
    case "name": {
      newRepos.sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
  }

  return newRepos;
}

export function collctedStars(repos: GithubRepo[]) {
  return repos.reduce(
    (acc: number, repo: GithubRepo) => acc + repo.stargazers_count,
    0,
  );
}

export function getDaysAge(daysAgo: number = 30) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);

  const formattedDate = targetDate.toISOString().split("T")[0];

  return formattedDate;
}
