import { describe, expect, it } from "vitest";
import { extractUploadThingKey, isAllowedImageUrl } from "./uploadthingUrl";
import { PLACEHOLDER_PRODUCT_IMAGE } from "./constants";

describe("extractUploadThingKey", () => {
    it("reads the key from the legacy utfs.io host", () => {
        expect(extractUploadThingKey("https://utfs.io/f/abc-123.png")).toBe("abc-123.png");
    });

    it("reads the key from an app-scoped ufs.sh host", () => {
        expect(extractUploadThingKey("https://p2z5aom165.ufs.sh/f/xyz789")).toBe("xyz789");
    });

    it("knows the placeholder image", () => {
        expect(extractUploadThingKey(PLACEHOLDER_PRODUCT_IMAGE)).toBe("dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png");
    });

    it("rejects other hosts, http, nested paths and garbage", () => {
        expect(extractUploadThingKey("https://example.com/f/abc")).toBeNull();
        expect(extractUploadThingKey("http://utfs.io/f/abc")).toBeNull();
        expect(extractUploadThingKey("https://utfs.io/f/abc/def")).toBeNull();
        expect(extractUploadThingKey("https://utfs.io/abc")).toBeNull();
        expect(extractUploadThingKey("not a url")).toBeNull();
        expect(extractUploadThingKey("")).toBeNull();
    });

    it("backs the image allow-list", () => {
        expect(isAllowedImageUrl("https://utfs.io/f/ok.png")).toBe(true);
        expect(isAllowedImageUrl("https://evil.example/f/ok.png")).toBe(false);
    });
});
