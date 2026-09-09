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

export type GithubUserResponse = GithubUser | { message: string };
export type GithubReposResponse = GithubRepo[] | { message: string };
export type GithubStarredResponse = GithubRepo[] | { message: string };
export type Repos = GithubRepo[];

export type SortBy = "updated" | "stars" | "name";
