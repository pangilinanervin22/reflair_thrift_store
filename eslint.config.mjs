import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Flat config (ESLint 9+ / Next.js 16): Next's core-web-vitals rules plus its
// TypeScript preset, so unused imports and `any` no longer slip through.
/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default eslintConfig;
