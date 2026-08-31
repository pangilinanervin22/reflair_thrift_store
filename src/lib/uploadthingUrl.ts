// UploadThing serves files from https://utfs.io/f/<key> (legacy host, where
// every existing product image lives) and https://<appId>.ufs.sh/f/<key>
// (v7 `ufsUrl`). Both forms are accepted everywhere: next.config.js
// remotePatterns, the product schema, and file deletion.

/** Returns the file key for an UploadThing URL, or null if the URL isn't one. */
export function extractUploadThingKey(url: string): string | null {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        return null;
    }
    if (parsed.protocol !== "https:") return null;

    const host = parsed.hostname;
    if (host !== "utfs.io" && !host.endsWith(".ufs.sh")) return null;

    const match = parsed.pathname.match(/^\/f\/([^/]+)$/);
    return match ? match[1] : null;
}

export const isAllowedImageUrl = (url: string): boolean => extractUploadThingKey(url) !== null;
