import { promises as fs } from "fs";
import { transform } from "@svgr/core";
import path from "path";
import iconTemplate from "./iconTemplate";
import { exec } from "child_process";

const __dirname = path.resolve();

const BASE_SVG_PATH = path.join(__dirname, "packages", "syntax-icons", "svgs");
const EXPORT_PATH = path.join(
  __dirname,
  "packages",
  "syntax-icons",
  "src",
  "icons",
);

function snakeToPascal(str: string): string {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    )
    .replace(/^[a-z]/, (group) => group.toUpperCase());
}

function getFileName(file: string) {
  return snakeToPascal(file.replace(".svg", ""));
}

async function generateIcons() {
  const files = await fs.readdir(BASE_SVG_PATH);

  for (const file of files) {
    if (!file.endsWith(".svg")) continue;
    // eslint-disable-next-line no-console
    console.log(`Generating ${getFileName(file)}.tsx ...`);
    const fileName = await fs.readFile(BASE_SVG_PATH + `/${file}`, "utf8");
    const jsCode = await transform(
      fileName,
      {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        icon: true,
        typescript: true,
        template: iconTemplate,
      },
      {
        componentName: getFileName(file),
      },
    );

    await fs.writeFile(
      path.join(EXPORT_PATH, `${getFileName(file)}.tsx`),
      jsCode,
    );
  }
}

function runPrettier(): void {
  exec(`npx prettier ${EXPORT_PATH} --write`, (error, stdout) => {
    if (error) throw error;
    // eslint-disable-next-line no-console
    if (stdout) console.log(`${stdout}`);
    // eslint-disable-next-line no-console
    console.log("Formatted icons with Prettier");
  });
}

async function init() {
  await generateIcons();
  runPrettier();
}

void init();
