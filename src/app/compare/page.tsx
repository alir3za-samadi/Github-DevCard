import PageHeader from "@/components/ui/page-header";
import CompareForm from "@/components/ui/compare/compare-form";
import UserInfo from "@/components/ui/compare/user-info";
import HeadToHead from "@/components/ui/compare/head-to-head";
import GenerateCard from "@/components/ui/generate-card";
import { Separator } from "@/components/ui/separator";
import { Swords } from "lucide-react";
import { UserProfileData } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevCard | Github Profile Viewer",
  description: "DevCard | Github Profile Viewer by Alir3za Samadi",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ userA?: string; userB?: string }>;
}) {
  const { userA = "", userB = "" } = await searchParams;

  let dataA: UserProfileData | null = null;
  let dataB: UserProfileData | null = null;

  if (userA && userB) {
    [dataA, dataB] = await Promise.all([getUser(userA), getUser(userB)]);
  }

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader
        title={`Compare ${dataA ? dataA.login + " vs" : ""} ${dataB ? dataB.login : ""}`}
      />

      <CompareForm
        userA={userA}
        userB={userB}
        errorA={userA && !dataA ? `User "${userA}" not found` : null}
        errorB={userB && !dataB ? `User "${userB}" not found` : null}
      />

      {dataA && dataB && (
        <>
          <Separator />

          <div className="flex justify-center">
            <GenerateCard triggerClassame="w-full text-sm">
              <div className="flex flex-col gap-4 md:flex-row">
                <UserInfo userProfileData={dataA} />
                <Swords
                  className="text-muted-foreground shrink-0 mx-auto md:my-auto"
                  size={18}
                  aria-hidden="true"
                />
                <UserInfo userProfileData={dataB} />
              </div>

              <HeadToHead dataA={dataA} dataB={dataB} />
            </GenerateCard>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <UserInfo userProfileData={dataA} />
            <Swords
              className="text-muted-foreground shrink-0 mx-auto md:my-auto"
              size={18}
              aria-hidden="true"
            />
            <UserInfo userProfileData={dataB} />
          </div>

          <HeadToHead dataA={dataA} dataB={dataB} />
        </>
      )}
    </div>
  );
}

async function getUser(username: string): Promise<UserProfileData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/github/profile/${username}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;

      const errorData = await res.json().catch(() => null);
      const errorMessage = errorData?.message || "FAILED_TO_FETCH";

      throw new Error(errorMessage);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}
