import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME + " — Curated Pre-Loved Fashion",
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        background_color: "#f6f5f1",
        theme_color: "#121110",
        icons: [
            { src: "/icon", sizes: "512x512", type: "image/png" },
            { src: "/apple-icon", sizes: "180x180", type: "image/png" },
        ],
    };
}
