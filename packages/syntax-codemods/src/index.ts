#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { parseArgs } from "node:util";
import runJscodeshift from "./run-js-codeshift";

const {
  values: { codemod, path: inputPath, ...remainingArgs },
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
  strict: false, // Allow additional arguments to be passed to the codemod
});

async function init() {
  const availableCodemods = (
    await fs.readdir(path.join(__dirname, "transforms"), {
      withFileTypes: true,
    })
  )
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".js"))
    .map((dirent) => dirent.name.replace(".js", ""));

  if (
    !codemod ||
    typeof codemod !== "string" ||
    !availableCodemods.includes(codemod)
  ) {
    throw new Error(
      `Please provide a valid codemod to execute.

  Available codemods:
  ${availableCodemods.join("\n")}`,
    );
  }

  if (!inputPath || typeof inputPath !== "string") {
    throw new Error(`Please provide a path to execute the codemod on.`);
  }
  const resolvedPath = path.resolve(inputPath);

  const response = await runJscodeshift(
    path.resolve(path.join(__dirname, "transforms", `${codemod}.js`)),
    { silent: false, verbose: 2, ...remainingArgs },
    [resolvedPath],
  );

  if (response.error > 0) {
    throw new Error(`Codemod failed with ${response.error} errors.`);
  }

  // eslint-disable-next-line no-console
  console.log(`Codemod executed successfully.`);
}

void init();
