"use client"

import { useEffect } from "react";

// Replaces the root layout when it (or the whole tree) fails, so it must render
// its own <html> and <body>. Inline styles only — with no layout there is no
// global CSS and no font setup.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const label: React.CSSProperties = {
        fontFamily: "system-ui, sans-serif",
        fontSize: 10,
        letterSpacing: "0.34em",
        textTransform: "uppercase",
        margin: "0 0 18px",
    };

    return (
        <html lang="en">
            <body style={{
                margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                background: "#f6f5f1", color: "#121110", fontFamily: "Georgia, 'Times New Roman', serif",
                textAlign: "center", padding: "48px 24px",
            }}>
                <div>
                    <p style={{ ...label, color: "#76736c" }}>ReFlair · Something went wrong</p>
                    <h1 style={{ fontWeight: 300, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, margin: "0 0 14px" }}>
                        The store could not be loaded.
                    </h1>
                    <p style={{ fontStyle: "italic", color: "#76736c", margin: "0 0 28px" }}>It’s us, not you. Try again in a moment.</p>
                    {error.digest && <p style={{ ...label, color: "#aaa79f", letterSpacing: "0.2em" }}>Reference: {error.digest}</p>}
                    <button
                        type="button"
                        onClick={() => reset()}
                        style={{
                            fontFamily: "system-ui, sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                            background: "#121110", color: "#f6f5f1", border: "1px solid #121110", padding: "14px 28px", cursor: "pointer",
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
