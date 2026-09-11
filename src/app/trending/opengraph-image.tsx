import { ImageResponse } from "next/og";
import { TOP_LANGUAGES } from "@/lib/constants";

export const runtime = "edge";
export const alt = "Trending GitHub Repositories | DevCard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_THEME = {
  bg: "#090d16",
  cardBg: "#111827",
  border: "#1f2937",
  primary: "#38bdf8",
  foreground: "#f8fafc",
  muted: "#94a3b8",
};

export default async function Image({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;

  const currentLang =
    TOP_LANGUAGES.find((l) => l.value === lang) || TOP_LANGUAGES[0];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: OG_THEME.bg,
        color: OG_THEME.foreground,
        fontFamily: "sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: OG_THEME.cardBg,
          border: `1px solid ${OG_THEME.border}`,
          borderRadius: "16px",
          padding: "48px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: "bold",
            color: OG_THEME.primary,
            marginBottom: 16,
          }}
        >
          DevCard
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: OG_THEME.foreground,
            textAlign: "center",
          }}
        >
          Trending {currentLang.label} Repos
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: OG_THEME.muted,
            marginTop: 16,
          }}
        >
          Explore top trending projects on GitHub today
        </div>
      </div>
    </div>,
    { ...size },
  );
}
