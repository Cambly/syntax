module.exports = {
  root: true,
  extends: ["@cambly/eslint-config-syntax"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
