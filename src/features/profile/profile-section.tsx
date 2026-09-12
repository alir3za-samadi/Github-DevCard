import Repo from "@/features/profile/repo";
import GenerateCard from "@/components/ui/generate-card";

import type {
  GithubUser,
  GithubRepo,
  GithubRepos,
  GithubStarredResponse,
} from "@/lib/types";
import InformationSection from "@/features/profile/info-section";
import DetailCards from "@/features/profile/detail-cards";

export default function ProfileSection({
  userData,
  repos,
  userGivenStarred,
  mostUserStarredRepoData,
}: {
  userData: GithubUser;
  repos: GithubRepos;
  userGivenStarred: GithubStarredResponse;
  mostUserStarredRepoData: GithubRepo | null;
}) {
  return (
    <>
      <InformationSection userData={userData}>
        <GenerateCard cardName={userData?.name}>
          <InformationSection
            userData={userData}
            className="flex-col sm:flex-row gap-4 items-start sm:items-center"
            childrenContainerClassName="w-full sm:w-1/2"
          >
            {mostUserStarredRepoData && (
              <div className="w-full">
                <Repo
                  repo={mostUserStarredRepoData}
                  key={mostUserStarredRepoData.id}
                />
              </div>
            )}
          </InformationSection>

          <DetailCards
            repos={repos}
            userData={userData}
            userGivenStarred={userGivenStarred}
          />
        </GenerateCard>
      </InformationSection>

      <DetailCards
        repos={repos}
        userData={userData}
        userGivenStarred={userGivenStarred}
      />
    </>
  );
}
