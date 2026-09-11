import PageHeader from "@/components/ui/page-header";
import CompareForm from "@/components/ui/compare/compare-form";
import UserInfo from "@/components/ui/compare/user-info";
import HeadToHead from "@/components/ui/compare/head-to-head";
import GenerateCard from "@/components/ui/generate-card";
import { Separator } from "@/components/ui/separator";
import { Swords } from "lucide-react";
import type { UserProfileData } from "@/lib/types";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ userA?: string; userB?: string }>;
}): Promise<Metadata> {
  const { userA = "", userB = "" } = await searchParams;

  const hasUsers = Boolean(userA && userB);

  const title = hasUsers
    ? `Compare ${userA} vs ${userB} | DevCard`
    : "Compare Github Profiles | DevCard";

  const description = hasUsers
    ? `Head-to-head Github profile comparison between ${userA} and ${userB}.`
    : "Compare two Github developer profiles side-by-side with DevCard.";

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

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

  const pageTitle =
    dataA && dataB
      ? `Compare ${dataA.login} vs ${dataB.login}`
      : "Compare GitHub Profiles";

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={pageTitle} />

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
            <GenerateCard triggerClassName="w-full text-sm">
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
      throw new Error(errorData?.message || "FAILED_TO_FETCH");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
