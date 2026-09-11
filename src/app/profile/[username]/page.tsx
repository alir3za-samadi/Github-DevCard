import PageHeader from "@/components/ui/page-header";
import RepoSection from "@/components/ui/profile/repos-section";
import ProfileSection from "@/components/ui/profile/profile-section";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import {
  fetchGithubUser,
  fetchGithubRepos,
  fetchGithubUserGivenStarred,
  fetchGithubUserMostStarredRepo,
} from "@/lib/github";
import type { GithubRepo } from "@/lib/types";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const username = (await params).username;

  const title = `${username}'s Github Profile | DevCard`;
  const description = `View ${username}'s Github repositories, stars, and developer stats on DevCard.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const [userData, reposData, userGivenStarred, mostUserStarredRepoData] =
    await Promise.all([
      fetchGithubUser(username),
      fetchGithubRepos(username),
      fetchGithubUserGivenStarred(username),
      fetchGithubUserMostStarredRepo(username),
    ]);

  if ("message" in userData) {
    if (userData.message === "USER_NOT_FOUND") notFound();
    throw new Error(userData.message || "FAILED_TO_FETCH_DATA");
  }

  const repos: GithubRepo[] = Array.isArray(reposData) ? reposData : [];

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={`Profile of ${userData.login}`} />

      <ProfileSection
        userData={userData}
        repos={repos}
        userGivenStarred={userGivenStarred}
        mostUserStarredRepoData={mostUserStarredRepoData}
      />

      <Separator />
      <RepoSection repos={repos} />
    </div>
  );
}
