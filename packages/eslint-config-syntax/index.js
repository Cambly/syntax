// @ts-check

/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
module.exports = {
  extends: ["next", "turbo", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-console": "error",
    "react/jsx-key": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
      },
    },
    {
      files: ["*.test.{js,ts,jsx,tsx}"],
      extends: ["plugin:testing-library/react", "plugin:vitest/all"],
      plugins: ["testing-library", "vitest"],
      rules: {
        "testing-library/no-await-sync-events": "error",
        "testing-library/no-global-regexp-flag-in-query": "error",
        "testing-library/no-manual-cleanup": "error",
        "testing-library/prefer-user-event": "error",
        "testing-library/prefer-wait-for": "error",
        "testing-library/render-result-naming-convention": "off",
        "vitest/consistent-test-it": "error",
        "vitest/no-alias-methods": "error",
        "vitest/no-commented-out-tests": "error",
        "vitest/no-conditional-expect": "error",
        "vitest/no-conditional-in-test": "error",
        "vitest/no-conditional-tests": "error",
        "vitest/no-disabled-tests": "error",
        "vitest/no-done-callback": "error",
        "vitest/no-duplicate-hooks": "error",
        "vitest/no-focused-tests": "error",
        "vitest/no-identical-title": "error",
        "vitest/no-interpolation-in-snapshots": "error",
        "vitest/no-large-snapshots": "error",
        "vitest/no-mocks-import": "error",
        "vitest/no-skipped-tests": "error",
        "vitest/no-standalone-expect": "error",
        "vitest/no-test-prefixes": "error",
        "vitest/no-test-return-statement": "error",
        "vitest/prefer-called-with": "error",
        "vitest/prefer-lowercase-title": "error",
      },
    },
  ],
};
