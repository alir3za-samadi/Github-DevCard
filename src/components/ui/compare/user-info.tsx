import Image from "next/image";

import { UserProfileData } from "@/lib/types";
import { cn } from "@/lib/utils";

const USER_INFO_CONFIG = [
  {
    key: "followers",
    label: "Followers",
    className: "w-full",
    getValue: (data: UserProfileData) => data.followers,
  },
  {
    key: "repos",
    label: "Repos",
    className: "",
    getValue: (data: UserProfileData) => data.public_repos,
  },
  {
    key: "stars",
    label: "Stars",
    className: "",
    getValue: (data: UserProfileData) => data.totalStars,
  },
] as const;

export default function UserInfo({ userProfileData }: { userProfileData: UserProfileData }) {
  return (
    <div className="w-full p-5 border rounded-xl bg-card flex items-center gap-4 md:w-1/2">
      <Image
        src={userProfileData.avatar_url}
        alt={`${userProfileData.login}-avatar`}
        width={56}
        height={56}
        className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-border bg-foreground"
      />

      <div className="space-y-1">
        <h3 className="font-bold text-lg">{userProfileData.username}</h3>

        <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-0.5">
          {USER_INFO_CONFIG.map((stat) => (
            <span key={stat.key} className={cn(stat.className)}>
              <span className="font-bold"> {stat.getValue(userProfileData)} </span>
              {stat.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
