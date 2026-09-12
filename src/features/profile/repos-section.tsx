"use client";

import { useState } from "react";
import ReposSort from "@/features/profile/repos-sort";
import ReposExport from "@/features/profile/repos-export";
import ReposList from "@/features/profile/repos-list";
import ReposPaginationControls from "@/features/profile/repos-pagination-controls";
import { sortRepos } from "@/lib/utils";
import type { GithubRepos, SortOptionsValue } from "@/lib/types";

const ITEMS_PER_PAGE = 9;

export default function ReposSection({ repos }: { repos: GithubRepos }) {
  const [sortBy, setSortBy] = useState<SortOptionsValue>("updated");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedRepos = sortRepos(repos, sortBy);
  const totalItems = sortedRepos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const paginatedRepos = sortedRepos.slice(startItem, endItem);

  function handleValueChange(value: SortOptionsValue) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return repos.length > 0 ? (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex justify-between">
        <ReposSort sortBy={sortBy} onValueChange={handleValueChange} />
        <ReposExport repos={sortedRepos} sortBy={sortBy} />
      </div>

      <ReposList
        repos={paginatedRepos}
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
      >
        <ReposPaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </ReposList>
    </div>
  ) : (
    <p className="text-muted-foreground w-full text-center">
      The user has no public repositories
    </p>
  );
}
