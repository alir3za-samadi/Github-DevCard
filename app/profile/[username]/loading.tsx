import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <div className="flex items-center justify-center">
        <Skeleton className="h-6 w-48" />
      </div>

      <Separator />

      <ProfileSectionSkeleton />

      <Separator />

      <RepoSectionSkeleton />
    </div>
  );
}

function ProfileSectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center w-full gap-4">
          <Skeleton className="w-14 h-14 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 w-35">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Skeleton className="h-9 w-30 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-card border-border shadow-none p-0">
            <CardContent className="p-4 flex flex-col justify-between h-20.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="bg-card border-border shadow-none p-0">
          <CardContent className="p-4 flex flex-col justify-between h-30">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3.5 w-full rounded-full" />
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-3 w-10" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-none justify-center p-0">
          <CardContent className="p-4 flex items-center h-19">
            <div className="flex flex-col gap-3 w-full">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RepoSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center w-1/2 gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
        <div className="flex justify-end w-1/2">
          <Skeleton className="h-9 w-30 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <RepoCardSkeleton key={i} />
          ))}
        </div>

        <Skeleton className="h-4 w-48 mt-2" />
      </div>
    </div>
  );
}

function RepoCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="px-4 flex flex-col h-21 justify-between py-4">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
}
