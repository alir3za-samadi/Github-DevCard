import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Compare Github Profiles | DevCard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_THEME = {
  bg: "#090d16",
  cardBg: "#111827",
  border: "#1f2937",
  primary: "#38bdf8",
  foreground: "#f8fafc",
  muted: "#94a3b8",
  vsAccent: "#f43f5e",
};

export default async function Image({
  searchParams,
}: {
  searchParams: Promise<{ userA?: string; userB?: string }>;
}) {
  const { userA = "", userB = "" } = await searchParams;

  const hasUsers = Boolean(userA && userB);

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
        padding: "32px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: OG_THEME.cardBg,
          border: `2px solid ${OG_THEME.border}`,
          borderRadius: "24px",
          padding: "60px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            fontWeight: "bold",
            color: OG_THEME.primary,
            letterSpacing: "-0.02em",
          }}
        >
          DevCard
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {hasUsers ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                fontSize: 60,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: OG_THEME.foreground,
              }}
            >
              <span>{userA}</span>
              <span style={{ color: OG_THEME.vsAccent, fontSize: 44 }}>VS</span>
              <span>{userB}</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: OG_THEME.foreground,
                textAlign: "center",
              }}
            >
              Compare GitHub Profiles
            </div>
          )}

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: OG_THEME.muted,
              marginTop: 8,
            }}
          >
            {hasUsers
              ? "Head-to-head GitHub developer profile match"
              : "Compare developer statistics side-by-side with DevCard"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: OG_THEME.muted,
            opacity: 0.8,
          }}
        >
          devcard.app
        </div>
      </div>
    </div>,
    { ...size },
  );
}
