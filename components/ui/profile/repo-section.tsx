"use client";

import { useState, type ReactNode } from "react";
import Repo from "@/components/ui/profile/repo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { sortRepos } from "@/lib/utils";
import { useParams } from "next/navigation";

import type { Repos, SortBy } from "@/lib/types";

const ITEMS_PER_PAGE = 6;

export default function RepoSection({ repos }: { repos: Repos }) {
  const [sortBy, setSortBy] = useState<SortBy>("updated");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedRepos = sortRepos(repos, sortBy);
  const totalItems = sortedRepos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
  const paginatedRepos = sortedRepos.slice(startItem, endItem);

  function handleValueChange(value: SortBy) {
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
      <Header>
        <Sort sortBy={sortBy} onValueChange={handleValueChange} />
        <Export repos={sortedRepos} sortBy={sortBy} />
      </Header>

      <RepoList
        repos={paginatedRepos}
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
      >
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </RepoList>
    </div>
  ) : (
    <p className="text-muted-foreground w-full text-center">
      The user has no public repositories
    </p>
  );
}

function Header({ children }: { children: ReactNode }) {
  return <div className="flex justify-between">{children}</div>;
}

function Sort({
  sortBy,
  onValueChange,
}: {
  sortBy: SortBy;
  onValueChange: (value: SortBy) => void;
}) {
  const sortOption = [
    { label: "Recently Updated", value: "updated" },
    { label: "Most Stars", value: "stars" },
    { label: "Name", value: "name" },
  ];

  return (
    <div className="flex items-center w-1/2 gap-2 text-xs text-muted-foreground">
      <span className="min-w-fit">Sort by:</span>

      <Select
        items={sortOption}
        value={sortBy}
        onValueChange={(val) => onValueChange(val as SortBy)}
      >
        <SelectTrigger className="w-full max-w-40 text-xs md:text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Type</SelectLabel>
            {sortOption.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function Export({ repos, sortBy }: { repos: Repos; sortBy: SortBy }) {
  const params = useParams();
  const username = params.username;

  function handleDownload() {
    const blob = new Blob([JSON.stringify(repos, null, 2)], {
      type: "application/json;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sortBy}-${username}-repositories.json`;

    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex items-center justify-end w-1/2 gap-2 text-xs text-muted-foreground">
      <Button
        variant={"outline"}
        className="text-xs md:text-sm md:w-30"
        onClick={handleDownload}
      >
        Export
      </Button>
    </div>
  );
}

function RepoList({
  repos,
  startItem,
  endItem,
  totalItems,
  children,
}: {
  repos: Repos;
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

function PaginationControls({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    totalPages > 1 && (
      <div className="flex flex-col justify-center items-center mt-4 ">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page);
                    }}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
