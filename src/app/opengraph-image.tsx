import { ImageResponse } from "next/og";

export const alt = "Kosmo Group - Punjab's Premier Automotive Dealership Network";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0f12",
          backgroundImage: "radial-gradient(circle at 50% 40%, #1e222b 0%, #0d0f12 70%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: "999px",
            padding: "8px 24px",
            color: "#d4af37",
            fontSize: "18px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Authorized Dealership Network • Punjab
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "900",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          Two Automotive Icons. One Trusted Group.
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            maxWidth: "750px",
            marginBottom: "48px",
            lineHeight: 1.4,
          }}
        >
          Authorized Tata Motors Passenger Vehicles and Hero MotoCorp Two-Wheelers in Jalandhar &amp; Punjab.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(35, 52, 245, 0.2)",
              border: "1px solid rgba(35, 52, 245, 0.6)",
              borderRadius: "12px",
              padding: "12px 28px",
              color: "#93c5fd",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Kosmo Tata
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(238, 35, 38, 0.2)",
              border: "1px solid rgba(238, 35, 38, 0.6)",
              borderRadius: "12px",
              padding: "12px 28px",
              color: "#fca5a5",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Kosmo Hero
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
