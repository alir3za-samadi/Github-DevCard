"use client";

import { useRef, type ReactNode } from "react";
import Repo from "@/components/ui/profile/repo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { formatDate, languageCount } from "@/lib/utils";
import { toBlob } from "html-to-image";
import Image from "next/image";

import type {
  GithubUser,
  GithubRepo,
  Repos,
  GithubStarredResponse,
} from "@/lib/types";

const COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-slate-400",
];

export default function ProfileSection({
  userData,
  repos,
  starredReposData,
  mostUserStarredRepoData,
}: {
  userData: GithubUser;
  repos: Repos;
  starredReposData: GithubStarredResponse;
  mostUserStarredRepoData: GithubRepo | null;
}) {
  return (
    <>
      <Information userData={userData}>
        <GenerateCard
          repos={repos}
          userData={userData}
          starredReposData={starredReposData}
          mostUserStarredRepoData={mostUserStarredRepoData}
        />
      </Information>

      <DetailCards
        repos={repos}
        userData={userData}
        starredReposData={starredReposData}
      />
    </>
  );
}

function Information({
  userData,
  className,
  children,
}: {
  userData: GithubUser;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-4 pt-2 md:flex-row ${className ? className : ""}`}
    >
      <div className="flex items-center w-2/3 gap-4">
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

      <div className="flex justify-end w-1/3">{children}</div>
    </div>
  );
}

function DetailCards({
  repos,
  userData,
  starredReposData,
}: {
  repos: Repos;
  userData: GithubUser;
  starredReposData: GithubStarredResponse;
}) {
  const starredRepos = Array.isArray(starredReposData) ? starredReposData : [];
  const totalCollctedStars = repos.reduce(
    (acc: number, repo: GithubRepo) => acc + repo.stargazers_count,
    0,
  );
  const topLanguages = languageCount(repos);
  const detailCards = [
    { label: "Repos", value: userData.public_repos },
    { label: "Followers", value: userData.followers },
    { label: "Stars given", value: totalCollctedStars.toLocaleString() },
    {
      label: "Total stars",
      value:
        starredRepos.length >= 100 ? "100+" : starredRepos.length.toString(),
    },
  ];

  return (
    <>
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
                const bgColor = COLORS[index];

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

                const bgColor = COLORS[index];

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
          <CardContent className="p-4 flex items-center h-19]">
            <p className="text-xs text-muted-foreground flex flex-col gap-7.5">
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
    </>
  );
}

function GenerateCard({
  repos,
  userData,
  starredReposData,
  mostUserStarredRepoData,
}: {
  repos: Repos;
  userData: GithubUser;
  starredReposData: GithubStarredResponse;
  mostUserStarredRepoData: GithubRepo | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const repo = mostUserStarredRepoData;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const node = cardRef.current;

    const blob = await toBlob(node, {
      cacheBust: true,
      height: node.scrollHeight,
      width: node.scrollWidth,
      pixelRatio: 4,
      style: {
        borderRadius: "0",
        overflow: "visible",
        maxHeight: "none",
      },
    });
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = `${userData?.name || "github"}-card.png`;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button className="text-xs md:text-sm md:w-30">Generate card</Button>} />
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader>
          <DialogTitle>Generate card</DialogTitle>
        </DialogHeader>

        <div
          ref={cardRef}
          className="bg-background p-4 rounded-2xl space-y-6 max-h-[60vh] overflow-y-auto"
        >
          <Information userData={userData} className="flex-col">
            {repo && (
              <div className="flex w-full items-center justify-center py-0">
                <Repo repo={repo} key={repo.id} />
              </div>
            )}
          </Information>

          <DetailCards
            repos={repos}
            userData={userData}
            starredReposData={starredReposData}
          />
        </div>

        <DialogFooter className="flex-col sm:justify-between">
          <Button onClick={handleDownload}>Download Card</Button>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
