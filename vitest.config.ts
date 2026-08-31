import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
    resolve: {
        alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    test: {
        include: ["src/**/*.test.ts"],
        environment: "node",
        env: { TZ: "UTC" }, // the date helpers must render Manila time regardless of the host zone
    },
});
