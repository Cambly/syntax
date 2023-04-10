#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { parseArgs } from "node:util";
import runJscodeshift from "./run-js-codeshift";

const {
  values: { codemod, path: inputPath },
} = parseArgs({
  options: {
    codemod: {
      type: "string",
      short: "c",
    },
    path: {
      type: "string",
      short: "p",
    },
  },
});

async function init() {
  const availableCodemods = (
    await fs.readdir("./dist/transforms", { withFileTypes: true })
  )
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".js"))
    .map((dirent) => dirent.name.replace(".js", ""));

  if (!codemod || !availableCodemods.includes(codemod)) {
    throw new Error(
      `Please provide a valid codemod to execute.

Available codemods:
${availableCodemods.join("\n")}`,
    );
  }

  if (!inputPath) {
    throw new Error(`Please provide a path to execute the codemod on.`);
  }
  const resolvedPath = path.resolve(inputPath);

  const response = await runJscodeshift(
    path.resolve(path.join(__dirname, "transforms", `${codemod}.js`)),
    { silent: false, verbose: 2 },
    [resolvedPath],
  );

  if (response.error > 0) {
    throw new Error(`Codemod failed with ${response.error} errors.`);
  }

  // eslint-disable-next-line no-console
  console.log(`Codemod executed successfully.`);
}

void init();
