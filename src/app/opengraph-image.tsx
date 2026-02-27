import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Owoigbe Timilehin — Vibe Coder | Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#000",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          OT
          <span style={{ color: "#2563EB" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fff",
            marginTop: 24,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Owoigbe Timilehin
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.5)",
            marginTop: 16,
          }}
        >
          Vibe Coder | Backend Engineer
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.3)",
            marginTop: 40,
          }}
        >
          Laravel &middot; Next.js &middot; TypeScript &middot; PostgreSQL
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
