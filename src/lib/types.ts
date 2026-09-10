import { SORT_OPTIONS, TOP_LANGUAGES } from "@/lib/constants";

export interface UserData {
  username: string;
  followers: number;
  public_repos: number;
  avatar_url: string;
  login: string;
  totalStars: number;
}

export type ReposData = {
  id: number;
  name: string;
  fullName: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  topics: string[];
}[];

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface UserProfileResponse {
  username: string;
  followers: number;
  public_repos: number;
  avatar_url: string;
  login: string;
  totalStars: number;
}

export interface TrendingRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GithubTrendingRepos {
  total_count: number;
  items: TrendingRepo[];
}

export type GithubRepos = GithubRepo[];
export type GithubUserResponse = GithubUser | { message: string };
export type GithubReposResponse = GithubRepo[] | { message: string };
export type GithubStarredResponse = GithubRepo[] | { message: string };
export type GithubUserDataResponse = UserData | { message: string };

export type GithubTrendingReposResponse =
  | GithubTrendingRepos
  | { message: string };

export type SortOptionValue = (typeof SORT_OPTIONS)[number]["value"];

export interface Language {
  label: string;
  value: string;
  color: string;
}

export type Languages = readonly Language[];
export type LanguageValue = (typeof TOP_LANGUAGES)[number]["value"];
