import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#050214",
          backgroundImage: "radial-gradient(circle at 30% 20%, #241250 0%, #050214 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#bea5ff",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#7c3aed" }} />
          DESIGN · DEVELOPMENT · AI RESEARCH
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          PROJECT
          <span style={{ color: "#7c3aed" }}>-LABSX</span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#a1a1aa" }}>
          Kozhikode, Kerala
        </div>
      </div>
    ),
    { ...size },
  );
}
