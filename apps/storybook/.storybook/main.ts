import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: [
    "../stories/Introduction.stories.mdx",
    "../stories",
    "../../../packages/**/*.stories.tsx",
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-toolbars",
    "storybook-addon-designs",
    "storybook-addon-rtl",
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
