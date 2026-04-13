// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import path, { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const config: StorybookConfig = {
  stories: [
    "../stories/Introduction.mdx",
    "../stories",
    "../../../packages/**/*.stories.tsx",
  ],

  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-designs"),
    getAbsolutePath("storybook-addon-rtl"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  staticDirs: ["../public"],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: "react-docgen",
  },

  async viteFinal(config) {
    // Resolve the mdx-react-shim file:// URL to a filesystem path so Rollup
    // can bundle it (import.meta.resolve in addon-docs returns a file:// URL
    // that Rollup cannot handle directly).
    const mdxShimPath = fileURLToPath(
      import.meta.resolve("@storybook/addon-docs/mdx-react-shim"),
    );

    return {
      ...config,
      define: {
        "process.env": {},
      },
      resolve: {
        ...config.resolve,
        alias: [
          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
          {
            find: import.meta.resolve("@storybook/addon-docs/mdx-react-shim"),
            replacement: mdxShimPath,
          },
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

  features: {
    actions: false,
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
