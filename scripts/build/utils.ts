import { lstatSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
import chalk from "chalk";
import fse from "fs-extra";
import { rimrafSync } from "rimraf";

function isDirectory(path: string) {
  return lstatSync(path).isDirectory();
}

export function removeExt(path: string) {
  return path.replace(/\.[^.]+$/, "");
}

export function readPackageJson(rootPath: string): Record<string, unknown> {
  const pkgPath = join(rootPath, "package.json");
  return JSON.parse(readFileSync(pkgPath, "utf-8"));
}

export function getPackageJson(rootPath: string, prod: boolean = false) {
  const { exports: _, ...pkg } = readPackageJson(rootPath);
  const sourcePath = getSourcePath(rootPath);
  const publicFiles = getPublicFiles(sourcePath);
  const sourceDir = getSourceDir();
  const cjsDir = getCJSDir();
  const esmDir = getESMDir();

  const getExports = (path: string) => {
    if (!prod) {
      return path.replace(sourcePath, `./${sourceDir}`);
    }
    path = removeExt(path).replace(sourcePath, "");
    return {
      import: `./${join(esmDir, path)}.js`,
      require: `./${join(cjsDir, path)}.cjs`,
    };
  };

  const moduleExports = Object.entries(publicFiles).reduce(
    (acc, [name, path]) => {
      if (name === "index") {
        return { ".": getExports(path), ...acc };
      }
      const pathname = `./${name.replace(/\/index$/, "")}`;
      return { ...acc, [pathname]: getExports(path) };
    },
    {},
  );

  const nextPkg: Record<string, unknown> = {
    ...pkg,
    main: prod ? join(cjsDir, "index.cjs") : join(sourceDir, "index.ts"),
    module: prod ? join(esmDir, "index.js") : join(sourceDir, "index.ts"),
    types: prod ? join(cjsDir, "index.d.ts") : join(sourceDir, "index.ts"),
    exports: {
      ...moduleExports,
      "./package.json": "./package.json",
    },
  };

  return nextPkg;
}

export function writePackageJson(rootPath: string, prod = false) {
  const pkgPath = join(rootPath, "package.json");
  const currentContents = readFileSync(pkgPath, "utf-8");
  const pkg = getPackageJson(rootPath, prod);
  const nextContents = `${JSON.stringify(pkg, null, 2)}\n`;
  if (currentContents === nextContents) return;
  writeFileSync(pkgPath, nextContents);
  console.log(`${chalk.blue(pkg.name)} - Updated package.json`);
}

export function getSourceDir() {
  return "src";
}

export function getDistDir() {
  return "dist";
}

export function getESMDir() {
  return join(getDistDir(), "esm");
}

export function getCJSDir() {
  return join(getDistDir(), "cjs");
}

export function getSourcePath(rootPath: string) {
  return join(rootPath, getSourceDir());
}

export function getDistPath(rootPath: string) {
  return join(rootPath, getDistDir());
}

/**
 * Ensure that paths are consistent across Windows and non-Windows platforms.
 */
function normalizePath(filePath: string) {
  return filePath.replace(/\\/g, "/");
}

/**
 * Filters to catch test and story files and other patterns that should be ignored.
 */
function isOtherIgnoredPath(filepath: string) {
  if (/\.test\./.test(filepath)) return true;
  if (/\.stories\./.test(filepath)) return true;
  return false;
}

/**
 * Filters out files starting with __
 * Includes directories and TS/JS files.
 */
function isModuleNameSameAsDirectory(rootPath: string, filename: string) {
  if (isDirectory(join(rootPath, filename))) return true;
  return (
    basename(dirname(join(rootPath, filename))) ===
    removeExt(basename(join(rootPath, filename)))
  );
}

/**
 * Filters out files starting with __
 * Includes directories and TS/JS files.
 */
function isPublicModule(rootPath: string, filename: string) {
  const isPrivate = /^__/.test(filename);
  if (isPrivate) return false;
  if (isDirectory(join(rootPath, filename))) return true;
  return /\.(j|t)sx?$/.test(filename);
}

/**
 * Returns { index: "path/to/index", moduleName: "path/to/moduleName" }
 */
export function getPublicFiles(
  sourcePath: string,
  prefix: string = "",
): Record<string, string> {
  return (
    readdirSync(sourcePath)
      .filter((filename) => isPublicModule(sourcePath, filename))
      // .filter((filename) => !isOtherIgnoredPath(filename))
      .filter((filename) => isModuleNameSameAsDirectory(sourcePath, filename))
      .sort() // Ensure consistent order across platforms
      .reduce((acc, filename) => {
        const path = join(sourcePath, filename);
        const childFiles =
          isDirectory(path) && getPublicFiles(path, join(prefix, filename));
        return {
          ...(childFiles || {
            [removeExt(normalizePath(join(prefix, filename)))]:
              normalizePath(path),
          }),
          ...acc,
        };
      }, {})
  );
}

/**
 * Syntax repos do not use index files, instead use a file whose name matches it's directory
 * This function helps export as if it was an index file;
 */
function collapseMatchingModuleAndDirectoryName(moduleName: string) {
  const parts = moduleName.split("/");
  if (parts.length < 2) return moduleName;
  const lastPart = parts[parts.length - 1];
  const secondToLastPart = parts[parts.length - 2];
  if (lastPart === secondToLastPart) {
    return parts.slice(0, parts.length - 1).join("/");
  }
  return moduleName;
}

/**
 * Returns { "module": "module", "path/to/module": "path/to/module/index" }]
 */
export function getProxyFolders(rootPath: string): Record<string, string> {
  const publicFiles = getPublicFiles(getSourcePath(rootPath));
  console.log("publicFiles in getProxyFolders", publicFiles);
  return Object.fromEntries(
    Object.keys(publicFiles)
      .map((name): [string, string] => [name.replace(/\/index$/, ""), name])
      .map(([module, name]) => [
        collapseMatchingModuleAndDirectoryName(module),
        name,
      ])
      .filter(([name]) => name !== "index"),
  );
}

/**
 * Returns ["lib", "es", "dist", "ts", "moduleName", ...]
 */
export function getBuildFolders(rootPath: string): string[] {
  return [getCJSDir(), getESMDir(), ...Object.keys(getProxyFolders(rootPath))];
}

function getRootPath(path: string) {
  return path.replace(/^([^/]+).*$/, "$1");
}

function isRootModule(path: string, _: number, array: string[]) {
  const rootPath = getRootPath(path);
  return path === rootPath || !array.includes(rootPath);
}

function reduceToRootPaths(array: string[], path: string) {
  const rootPath = getRootPath(path);
  if (array.includes(rootPath)) return array;
  return [...array, rootPath];
}

export function cleanBuild(rootPath: string) {
  writePackageJson(rootPath);
  getBuildFolders(rootPath)
    .filter(isRootModule)
    .reduce(reduceToRootPaths, [])
    .forEach((name) => rimrafSync(name));
}

export function getIndexPath(path: string) {
  const index = readdirSync(path).find((file) =>
    /^index\.(c|m)?(j|t)sx?/.test(file),
  );
  if (!index) {
    throw new Error(`Missing index file in ${path}`);
  }
  return join(path, index);
}

export function makeGitignore(rootPath: string) {
  const pkg = readPackageJson(rootPath);
  const buildFolders = getBuildFolders(rootPath);
  const contents = buildFolders
    .filter(isRootModule)
    .reduce(reduceToRootPaths, [])
    .sort() // Ensure that the order is consistent across platforms
    .map((name) => `/${name}`)
    .join("\n");
  writeFileSync(
    join(rootPath, ".gitignore"),
    `# Automatically generated\n${contents}\n`,
  );
  console.log(
    `\nCreated in ${chalk.bold(pkg.name)}: ${chalk.bold(
      chalk.green(".gitignore"),
    )}`,
  );
}

function getProxyPackageContents(
  rootPath: string,
  moduleName: string,
  path: string,
) {
  const { name } = readPackageJson(rootPath);
  const mainDir = getCJSDir();
  const moduleDir = getESMDir();
  const prefix = "../".repeat(moduleName.split("/").length);
  const json = {
    name: `${name}/${moduleName}`,
    private: true,
    sideEffects: false,
    main: join(prefix, mainDir, `${path}.cjs`),
    module: join(prefix, moduleDir, `${path}.js`),
    types: join(prefix, mainDir, `${path}.d.ts`),
  };
  return JSON.stringify(json, null, 2);
}

export function makeProxies(rootPath: string) {
  const pkg = readPackageJson(rootPath);
  /** @type {string[]} */
  const created: string[] = [];
  Object.entries(getProxyFolders(rootPath)).forEach(([name, path]) => {
    fse.ensureDirSync(name);
    writeFileSync(
      `${name}/package.json`,
      getProxyPackageContents(rootPath, name, path),
    );
    created.push(chalk.bold(chalk.green(name)));
  });
  if (created.length) {
    console.log(
      [
        "",
        `Created proxies in ${chalk.bold(pkg.name)}:`,
        `${created.join(", ")}`,
      ].join("\n"),
    );
  }
}
