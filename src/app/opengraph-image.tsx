import { ImageResponse } from "next/og";

// Default social card for every route without its own (product pages use the
// product photo). Ink-on-paper wordmark in the house palette.
export const alt = "ReFlair — Curated Pre-Loved Fashion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f6f5f1",
                    color: "#121110",
                    border: "24px solid #f6f5f1",
                }}
            >
                <div style={{ display: "flex", fontSize: 26, letterSpacing: 12, textTransform: "uppercase", color: "#76736c" }}>
                    Curated pre-loved fashion
                </div>
                <div style={{ display: "flex", fontSize: 200, lineHeight: 1, marginTop: 24, marginBottom: 24, letterSpacing: -4 }}>
                    ReFlair
                </div>
                <div style={{ display: "flex", fontSize: 30, color: "#76736c" }}>
                    One of each. Once it’s gone, it’s gone.
                </div>
            </div>
        ),
        { ...size },
    );
}
