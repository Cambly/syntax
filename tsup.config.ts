import { defineConfig } from "tsup";
import { promises as fsPromises } from "fs";
import path from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import { glob } from "glob";

// build.mjs
import { build } from "esbuild";

// entry,
// exclude: ["**/dist/**", "**/cjs/**", "**/esm/**", "**/node_modules/**", "*.stories.*", "*.test.*"],
// format,
// declaration: true,
// outDir,
// splitting: true,
// esbuildOptions(options) {
//   options.chunkNames = "__chunks/[hash]";
// },

const cwd = process.cwd();
const entry = glob.sync("src/**/*.{ts,tsx}", {
  cwd,
  ignore: [
    "**/node_modules/**",
    "**/dist/**",
    "**/cjs/**",
    "**/esm/**",
    "**/*.stories.*",
    "**/*.test.*",
  ],
});

// console.log('entry', entry);
// process.exit(0)
export default defineConfig({
  // entry: ["src/index.tsx"],
  // entry: ["src/**/*!(.stories).{ts,tsx}"],
  // entry: ["src/**/*"],
  // tsconfig: "tsconfig.build.json",
  entry,
  format: ["cjs", "esm"],
  external: ["react", "react-dom"],
  noExternal: ["@cambly/syntax-design-tokens"],
  sourcemap: true,
  dts: true,
  splitting: true,
  // bundle: false,
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.chunkNames = "__chunks/[hash]";
  },
  // ESBuild does not yet support CSS Modules
  // https://github.com/egoist/tsup/issues/536#issuecomment-1302012400
  esbuildPlugins: [
    {
      name: "css-module",
      setup(build): void {
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "file" },
          (args) => ({
            path: `${args.path}#css-module`,
            namespace: "css-module",
            pluginData: {
              pathDir: path.join(args.resolveDir, args.path),
            },
          }),
        );
        build.onLoad(
          { filter: /#css-module$/, namespace: "css-module" },
          async (args) => {
            const { pluginData } = args as {
              pluginData: { pathDir: string };
            };

            const source = await fsPromises.readFile(
              pluginData.pathDir,
              "utf8",
            );

            let cssModule = {};
            postcssModules({
              getJSON(_, json) {
                console.log("jsoin", json);
                // cssModule = json;
              },
            });
            const result = await postcss([
              postcssModules({
                getJSON(_, json) {
                  cssModule = json;
                },
              }),
            ]).process(source, { from: pluginData.pathDir });

            return {
              pluginData: { css: result.css },
              contents: `import "${
                pluginData.pathDir
              }"; export default ${JSON.stringify(cssModule)}`,
            };
          },
        );
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "css-module" },
          (args) => ({
            path: path.join(args.resolveDir, args.path, "#css-module-data"),
            namespace: "css-module",
            pluginData: args.pluginData as { css: string },
          }),
        );
        build.onLoad(
          { filter: /#css-module-data$/, namespace: "css-module" },
          (args) => ({
            contents: (args.pluginData as { css: string }).css,
            loader: "css",
          }),
        );
      },
    },
  ],
});
