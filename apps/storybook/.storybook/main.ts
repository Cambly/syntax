import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import globby from "globby";

const config: StorybookConfig = {
  // storybook in pnpm workspace has a bug that will auto match and duplicate stories from node_modules
  // so use globby to exclude stories from this workspace matched in node_modules
  // (this happens because syntax-floating components has a dependency on syntax-core + pnpm linking behavior for workspace management)
  //
  // see: https://github.com/storybookjs/storybook/issues/19446#issuecomment-1276067149
  stories: globby.sync(
    [
      "../stories/Introduction.stories.mdx",
      "../stories/*.stories.mdx",
      "../../../packages/**/*.stories.tsx",
      // globby allows negating patterns. specifically exclude stories from this workspace duplicate matched through node_modules
      "!../../../packages/**/node_modules",
    ],
    {
      cwd: __dirname,
    },
  ),
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
    "@storybook/addon-actions",
    "storybook-addon-designs",
    "@storybook/addon-a11y",
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  async viteFinal(config) {
    return {
      ...config,
      define: {
        "process.env": {},
      },
      resolve: {
        alias: [
          {
            find: "@cambly/syntax-core",
            replacement: path.resolve(
              __dirname,
              "../../../packages/syntax-core/",
            ),
          },
          {
            find: "@cambly/syntax-design-tokens",
            replacement: path.resolve(
              __dirname,
              "../../../packages/syntax-design-tokens/",
            ),
          },
          {
            find: "@cambly/syntax-floating-components",
            replacement: path.resolve(
              __dirname,
              "../../../packages/syntax-floating-components/",
            ),
          },
        ],
      },
    };
  },
};
export default config;
