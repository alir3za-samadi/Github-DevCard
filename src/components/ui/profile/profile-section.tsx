import Repo from "@/components/ui/profile/repo";
import GenerateCard from "@/components/ui/generate-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { formatDate, languageCount, cn, collctedStars } from "@/lib/utils";
import Image from "next/image";

import type { ReactNode } from "react";
import type {
  GithubUser,
  GithubRepo,
  GithubRepos,
  GithubStarredResponse,
} from "@/lib/types";

const COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-slate-400",
] as const;

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

function InformationSection({
  userData,
  className,
  infoClassName,
  childrenContainerClassName,
  children,
}: {
  userData: GithubUser;
  className?: string;
  infoClassName?: string;
  childrenContainerClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("flex items-center justify-between pt-2 w-full", className)}
    >
      <Information userData={userData} className={infoClassName} />
      {children && (
        <div className={cn("flex justify-end", childrenContainerClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}

function Information({
  userData,
  className,
}: {
  userData: GithubUser;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Image
        src={userData.avatar_url}
        alt={`${userData.login}-avatar`}
        width={56}
        height={56}
        className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-border bg-foreground"
      />

      <div className="flex flex-col">
        <h1 className="text-[17px] font-semibold text-foreground leading-tight">
          {userData.name}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {userData.location || "Unknown Location"}
        </p>
      </div>
    </div>
  );
}

function DetailCards({
  repos,
  userData,
  userGivenStarred,
}: {
  repos: GithubRepos;
  userData: GithubUser;
  userGivenStarred: GithubStarredResponse;
}) {
  const starredRepos = Array.isArray(userGivenStarred) ? userGivenStarred : [];
  const totalCollctedStars = collctedStars(repos);
  const topLanguages = languageCount(repos);
  const detailCards = [
    { label: "Repos", value: userData.public_repos },
    { label: "Followers", value: userData.followers },
    {
      label: "Stars given",
      value: starredRepos.length >= 99 ? "99+" : starredRepos.length.toString(),
    },
    {
      label: "Total stars",
      value: totalCollctedStars.toLocaleString(),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {detailCards.map((stat, i) => (
          <Card key={i} className="bg-card border-border shadow-none p-0">
            <CardContent className="p-4 flex flex-col justify-between h-20.5">
              <span className="text-[11px] text-muted-foreground">
                {stat.label}
              </span>
              <span className="text-xl font-mono font-medium text-card-foreground">
                {stat.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="bg-card border-border shadow-none p-0">
          <CardContent className="p-4 flex flex-col justify-between h-30">
            <span className="text-[11px] text-muted-foreground">
              Top languages
            </span>
            <div className="h-3.5 w-full bg-muted rounded-full overflow-hidden flex gap-0.5">
              {topLanguages.map((lang, index) => {
                const { language, percentage } = lang;
                const bgColor = COLORS[index % COLORS.length];

                return (
                  <Tooltip key={language}>
                    <TooltipTrigger
                      className={`flex items-center justify-center text-xs text-black truncate ${bgColor}`}
                      style={{ width: `${percentage}%` }}
                    >
                      {language}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {`${language} ${percentage}%`}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
              {topLanguages.map((lang, index) => {
                const { language, percentage } = lang;
                const bgColor = COLORS[index % COLORS.length];

                return (
                  <div key={language} className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full shrink-0 ${bgColor}`}
                    />
                    <span className="font-medium text-foreground">
                      {language}
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-none justify-center p-0 ">
          <CardContent className="p-4 flex items-center h-19">
            <p className="text-xs text-muted-foreground flex flex-col gap-[7.5px]">
              <span>
                Joined GitHub:{" "}
                <span className="text-foreground">
                  {formatDate(userData.created_at)}
                </span>
              </span>

              <span>
                Live In:{" "}
                <span className="text-foreground">
                  {userData.location || "Unknown Location"}
                </span>
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
