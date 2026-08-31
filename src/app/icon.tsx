import { ImageResponse } from "next/og";

// Generated favicon / PWA icon: an ink tile with the paper "R".
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#121110",
                    color: "#f6f5f1",
                    fontSize: 340,
                }}
            >
                R
            </div>
        ),
        { ...size },
    );
}
