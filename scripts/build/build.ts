import { dirname } from "path";
import { fileURLToPath } from "url";
import spawn from "cross-spawn";
import fse from "fs-extra";
import { build } from "tsup";
import {
  cleanBuild,
  getCJSDir,
  getESMDir,
  getPublicFiles,
  getSourcePath,
  makeGitignore,
  makeProxies,
  writePackageJson,
} from "./utils.js";
import { glob } from "glob";

Object.defineProperty(process.env, "NODE_ENV", {
  writable: true,
  enumerable: true,
  configurable: true,
  value: "production",
});

const cwd = process.cwd();

cleanBuild(cwd);

writePackageJson(cwd, true);
makeGitignore(cwd);
makeProxies(cwd);

const sourcePath = getSourcePath(cwd);
const entry = getPublicFiles(sourcePath);
const esmDir = getESMDir();
const cjsDir = getCJSDir();

spawn.sync(
  "tsc",
  [
    "--emitDeclarationOnly",
    "--project",
    // This file and the other files in the scripts folder were copied
    // verbatim from the ariakit repo. The only change to the build
    // script that was necessary to get a minimal build was the tsconfig file
    "tsconfig.build.json", // old version, starting point:
    // https://github.com/ariakit/ariakit/blob/main/scripts/build/build.js
    // "tsconfig.json",
    "--noEmit",
    "false",
    "--outDir",
    esmDir,
  ],
  { stdio: "inherit" },
);

fse.copySync(esmDir, cjsDir);

const builds = /** @type {const} */ [
  { format: "esm", outDir: esmDir },
  { format: "cjs", outDir: cjsDir },
];

// const entry = await glob("src/**/*.{ts,tsx}", {
//   cwd,
//   ignore: [
//     "**/node_modules/**",
//     // "**/dist/**",
//     // "**/cjs/**",
//     // "**/esm/**",
//     // "**/node_modules/**",
//     // "*.stories.*",
//     // "*.test.*",
//   ],
// });

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = `${__dirname}/../../tsup.config.js`;
const tsconfig = `${cwd}/tsconfig.build.json`;

for (const { format, outDir } of builds) {
  await build({
    config,
    // tsconfig,
    entry,
    exclude: [
      "**/dist/**",
      "**/cjs/**",
      "**/esm/**",
      "**/node_modules/**",
      "*.stories.*",
      "*.test.*",
    ],
    format,
    declaration: true,
    outDir,
    splitting: true,
    esbuildOptions(options) {
      options.chunkNames = "__chunks/[hash]";
    },
  });
}
