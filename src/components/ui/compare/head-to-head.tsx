import { cn } from "@/lib/utils";
import { UserProfileData } from "@/lib/types";

const STATS_CONFIG = [
  {
    key: "followers",
    label: "Followers",
    getValue: (data: UserProfileData) => data.followers,
  },
  {
    key: "repos",
    label: "Repositories",
    getValue: (data: UserProfileData) => data.public_repos,
  },
  {
    key: "total_stars",
    label: "Total Stars",
    getValue: (data: UserProfileData) => data.totalStars,
  },
] as const;

const COLORS = {
  userA: { bg: "bg-foreground/40" },
  userB: { bg: "bg-muted-foreground/20" },
} as const;

export default function HeadToHead({
  dataA,
  dataB,
}: {
  dataA: UserProfileData;
  dataB: UserProfileData;
}) {
  return (
    <div className="p-6 border rounded-xl bg-card space-y-6">
      <h3 className="text-xl font-bold text-center">Head to Head</h3>

      <div className="space-y-6">
        {STATS_CONFIG.map((stat) => {
          const valA = stat.getValue(dataA);
          const valB = stat.getValue(dataB);
          const total = valA + valB;

          const rawA = total > 0 ? (valA / total) * 100 : 50;
          const rawB = total > 0 ? (valB / total) * 100 : 50;

          return (
            <div key={stat.key} className="space-y-2">
              <div className="grid grid-cols-3 items-center text-xs font-medium md:text-sm ">
                <span className="text-left truncate">
                  {dataA.username}{" "}
                  <span className="text-muted-foreground">({valA})</span>
                </span>

                <span className="text-center font-semibold text-foreground">
                  {stat.label}
                </span>

                <span className="text-right truncate">
                  <span className="text-muted-foreground">({valB})</span>{" "}
                  {dataB.username}
                </span>
              </div>

              <div className="h-3.5 w-full bg-muted rounded-full overflow-hidden flex">
                <div
                  className={cn(
                    "h-full transition-all duration-500 min-w-1.5",
                    COLORS.userA.bg,
                  )}
                  style={{ width: `${rawA}%` }}
                />
                <div
                  className={cn(
                    "h-full transition-all duration-500 min-w-1.5",
                    COLORS.userB.bg,
                  )}
                  style={{ width: `${rawB}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
