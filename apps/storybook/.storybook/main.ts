import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../stories", "../../../packages/**/*.stories.tsx"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
    "storybook-addon-designs",
    "@storybook/addon-a11y",
  ],
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
        ],
      },
    };
  },
};
export default config;
