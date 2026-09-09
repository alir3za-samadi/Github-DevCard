import RepoSection from "@/components/ui/profile/repo-section";
import ProfileSection from "@/components/ui/profile/profile-section";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import {
  fetchGithubUser,
  fetchGithubRepos,
  fetchGithubStarred,
  fetchGithubUserMostStarredRepo,
} from "@/lib/github";

import type { GithubRepo } from "@/lib/types";

export default async function UserProfile(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  const username = params.username;
  const [userData, reposData, starredReposData, mostUserStarredRepoData] =
    await Promise.all([
      fetchGithubUser(username),
      fetchGithubRepos(username),
      fetchGithubStarred(username),
      fetchGithubUserMostStarredRepo(username),
    ]);

  if ("message" in userData) {
    if (userData.message === "USER_NOT_FOUND") notFound();
    throw new Error("FAILED_TO_FETCH_DATA");
  }

  const repos: GithubRepo[] = Array.isArray(reposData) ? reposData : [];

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <div className="flex items-center justify-center">
        <span className="font-bold text-lg tracking-tight text-foreground/90">
          Proflie of {userData.login}
        </span>
      </div>

      <Separator />

      <ProfileSection
        userData={userData}
        repos={repos}
        starredReposData={starredReposData}
        mostUserStarredRepoData={mostUserStarredRepoData}
      />

      <Separator />
      <RepoSection repos={repos} />
    </div>
  );
}
