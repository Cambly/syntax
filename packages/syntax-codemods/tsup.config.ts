import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
  entry: [
    "src/index.ts",
    ...fs
      .readdirSync("./src/transforms", { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name)
      .map((name) => `src/transforms/${name}`),
  ],
  external: ["source-map-support", "jscodeshift"],
  format: "esm",
  sourcemap: true,
  target: ["node18"],
  dts: true,
});
