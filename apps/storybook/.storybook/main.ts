import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../../../packages/**/*.stories.tsx"],
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
            find: "@cambly/syntax-divider",
            replacement: path.resolve(
              __dirname,
              "../../../packages/syntax-divider/",
            ),
          },
        ],
      },
    };
  },
};
export default config;
