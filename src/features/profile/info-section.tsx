import Information from "@/features/profile/info";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { GithubUser } from "@/lib/types";

export default function InformationSection({
  userData,
  className,
  infoClassName,
  childrenContainerClassName,
  children,
}: {
  userData: GithubUser;
  className?: string;
  infoClassName?: string;
  childrenContainerClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("flex items-center justify-between pt-2 w-full", className)}
    >
      <Information userData={userData} className={infoClassName} />
      {children && (
        <div className={cn("flex justify-end", childrenContainerClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}
