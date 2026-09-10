"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

import { Language, TrendingRepo } from "@/lib/types";

const ITEMS_PER_PAGE = 5;

export default function ReposSection({
  repos,
  currentLang,
}: {
  repos: TrendingRepo[] | null;
  currentLang: Language;
}) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  if (!repos) {
    return (
      <p className="text-muted-foreground w-full text-center">
        The languages has no trending repositories
      </p>
    );
  }

  const totalItems = repos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const paginatedRepos = repos?.slice(startItem, endItem);

  return (
    <div className="flex flex-col items-center gap-4">
      {paginatedRepos?.map((repo) => (
        <Repo key={repo.id} repo={repo} currentLang={currentLang} />
      ))}

      {totalItems > 0 && (
        <span className="text-muted-foreground text-sm">
          Showing {startItem + 1} - {endItem} of {totalItems} repositories
        </span>
      )}

      <PaginationControls totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

function Repo({
  repo,
  currentLang,
}: {
  repo: TrendingRepo;
  currentLang: Language;
}) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full block group"
    >
      <Card className="p-4 transition-all duration-200 hover:border-foreground/30 hover:bg-accent/40 flex items-start justify-between gap-5">
        <div className="space-y-4 flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <Image
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}-avatar`}
              width={56}
              height={56}
              className="w-13 h-13 rounded-full overflow-hidden shrink-0 border border-border bg-foreground"
            />
            <h2 className="font-bold text-base group-hover:text-primary transition-colors truncate">
              <span className="text-muted-foreground font-normal">
                {repo.owner.login} /{" "}
              </span>
              {repo.name}
            </h2>
            <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {repo.description}
          </p>
        </div>

        <div className="flex flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
          <Badge variant="outline" className={cn("text-xs", currentLang.color)}>
            {repo.language}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
            <Star className="size-4 fill-yellow-500/20 text-yellow-500" />
            <span>
              {repo.stargazers_count >= 1000
                ? `${(repo.stargazers_count / 1000).toFixed(0)}k`
                : repo.stargazers_count}
            </span>
          </div>
        </div>
      </Card>
    </a>
  );
}

function PaginationControls({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (pageNumber <= 1) {
      params.delete("page");
    } else if (pageNumber > totalPages) {
      params.set("page", totalPages.toString());
    } else {
      params.set("page", pageNumber.toString());
    }

    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            scroll={false}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        <div className="flex flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  scroll={false}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            scroll={false}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
