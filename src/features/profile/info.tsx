import { cn } from "@/lib/utils";
import Image from "next/image";
import type { GithubUser } from "@/lib/types";

export default function Information({
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
