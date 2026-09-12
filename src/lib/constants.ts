import { getDaysAge } from "@/lib/utils";

import type { LanguagesValue } from "@/lib//types";

export const GITHUB_API_BASE_URL = "https://api.github.com";

export const GITHUB_ENDPOINTS = {
  USER: (username: string) => `${GITHUB_API_BASE_URL}/users/${username}`,

  USER_REPOS: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=99`,

  USER_STARRED: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/starred?per_page=99`,

  USER_MOST_STARRED_REPO: (username: string) =>
    `${GITHUB_API_BASE_URL}/search/repositories?q=user:${username}+fork:true&sort=stars&order=desc&per_page=1`,

  USER_LATEST_UPDATED_REPO: (username: string) =>
    `${GITHUB_API_BASE_URL}/search/repositories?q=user:${username}+fork:true&sort=updated&order=desc&per_page=1`,

  TRENDING_REPOS: (language: LanguagesValue, daysAgo: number) => {
    const dateQuery = getDaysAge(daysAgo);
    const rawQuery = `language:${language} pushed:>${dateQuery}`;
    const encodedQuery = encodeURIComponent(rawQuery);
    return `${GITHUB_API_BASE_URL}/search/repositories?q=${encodedQuery}&sort=stars&order=desc`;
  },
} as const;

export const SORT_OPTIONS = [
  { label: "Recently Updated", value: "updated" },
  { label: "Most Stars", value: "stars" },
  { label: "Name", value: "name" },
] as const;

export const TOP_LANGUAGES = [
  {
    label: "JavaScript",
    value: "javascript",
    color: "bg-yellow-400/20 text-yellow-300 border-yellow-500/30",
  },
  {
    label: "TypeScript",
    value: "typescript",
    color: "bg-blue-400/20 text-blue-300 border-blue-500/30",
  },
  {
    label: "Python",
    value: "python",
    color: "bg-emerald-400/20 text-emerald-300 border-emerald-500/30",
  },
  {
    label: "Rust",
    value: "rust",
    color: "bg-orange-400/20 text-orange-300 border-orange-500/30",
  },
  {
    label: "Go",
    value: "go",
    color: "bg-cyan-400/20 text-cyan-300 border-cyan-500/30",
  },
] as const;
