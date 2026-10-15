// Flat config. Lints the Node scripts (JavaScript).
// TypeScript sources are verified by `npm run typecheck` (strict mode).
export default [
  { ignores: ["dist/**", "node_modules/**", "public/**"] },
  {
    files: ["**/*.mjs", "**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        process: "readonly", console: "readonly", URL: "readonly", Buffer: "readonly",
        setTimeout: "readonly", clearTimeout: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
    },
  },
];
