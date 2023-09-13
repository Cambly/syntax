module.exports = {
  root: true,
  extends: ["@cambly/eslint-config-syntax"],
  ignore: ['dist', 'cjs', 'esm', 'node_modules', 'coverage','build'],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
