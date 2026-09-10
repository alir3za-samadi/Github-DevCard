import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <CompareFormSkeleton />

      <Separator />

      <Skeleton className="h-9 w-full rounded-md" />

      <div className="flex flex-col gap-4 md:flex-row items-center">
        <UserInfoSkeleton />
        <Skeleton className="h-5 w-5 shrink-0 my-2 md:my-0 rounded-full" />
        <UserInfoSkeleton />
      </div>

      <HeadToHeadSkeleton />
    </div>
  );
}

function CompareFormSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col w-full gap-2 px-4 pt-8 border rounded-xl bg-card items-center md:items-start md:flex-row lg:gap-4">
        <div className="flex-1 w-full space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="min-h-2 mb-1 md:min-h-5" />
        </div>

        <Skeleton className="h-5 w-5 shrink-0 my-2 rounded-full" />

        <div className="flex-1 w-full space-y-2">
          <div className="min-h-2 md:hidden" />
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="min-h-2 mb-1 md:min-h-5" />
        </div>
      </div>

      <Skeleton className="h-10 w-full min-w-30 md:w-28 rounded-md" />
      <Skeleton className="h-4 w-48 rounded-md" />
    </div>
  );
}

function UserInfoSkeleton() {
  return (
    <div className="w-full p-5 border rounded-xl bg-card flex items-center gap-4 md:w-1/2">
      <Skeleton className="w-14 h-14 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-5 w-28 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-14 rounded-md" />
          <Skeleton className="h-4 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function HeadToHeadSkeleton() {
  return (
    <div className="p-6 border rounded-xl bg-card space-y-6 w-full">
      <Skeleton className="h-6 w-32 mx-auto rounded-md" />

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-2">
            <div className="grid grid-cols-3 items-center">
              <Skeleton className="h-4 w-20 justify-self-start rounded-md" />
              <Skeleton className="h-4 w-24 justify-self-center rounded-md" />
              <Skeleton className="h-4 w-20 justify-self-end rounded-md" />
            </div>
            <Skeleton className="h-3.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
