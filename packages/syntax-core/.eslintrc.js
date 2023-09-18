const path = require("path");

module.exports = {
  root: true,
  extends: ["@cambly/eslint-config-syntax"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["dist"],
      parserOptions: {
        project: [path.join(__dirname, "tsconfig.json")],
      },
    },
  ],
};
