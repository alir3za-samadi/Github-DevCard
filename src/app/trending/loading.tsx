import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeaderSkeleton />

      <Separator />

      <SortSectionSkeleton />

      <ReposSectionSkeleton />
    </div>
  );
}
function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-9 w-3/4 max-w-md mx-auto" />
    </div>
  );
}

function SortSectionSkeleton() {
  return (
    <>
      <div className="hidden md:flex items-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-md" />
        ))}
      </div>

      <div className="md:hidden">
        <Skeleton className="h-9 w-40 rounded-md" />
      </div>
    </>
  );
}

function ReposSectionSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="w-full p-4 flex items-start justify-between gap-4"
        >
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <Skeleton className="w-14 h-14 rounded-full shrink-0" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12" />
          </div>
        </Card>
      ))}

      <Skeleton className="h-4 w-52 my-1" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}
