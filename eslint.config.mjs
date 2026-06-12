import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Mirrors the previous `.eslintrc.json` (`extends: "next/core-web-vitals"`)
// in ESLint flat-config form, required by ESLint 9+ / Next.js 16.
/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
