import { Button } from "@/components/base/button";
import { useParams } from "next/navigation";
import type { GithubRepos, SortOptionsValue } from "@/lib/types";

export default function ReposExport({
  repos,
  sortBy,
}: {
  repos: GithubRepos;
  sortBy: SortOptionsValue;
}) {
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
