import Repo from "@/features/profile/repo";
import type { GithubRepos } from "@/lib/types";
import type { ReactNode } from "react";

export default function ReposList({
  repos,
  startItem,
  endItem,
  totalItems,
  children,
}: {
  repos: GithubRepos;
  startItem: number;
  endItem: number;
  totalItems: number;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
        {repos.map((repo) => (
          <Repo repo={repo} key={repo.id} />
        ))}
      </div>

      <span className="text-muted-foreground">
        Showing {startItem + 1} - {endItem} of {totalItems} repositories
      </span>

      {children}
    </div>
  );
}
