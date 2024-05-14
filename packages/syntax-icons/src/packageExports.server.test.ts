import packageJSON from "../package.json";
import { readdir } from "node:fs/promises";
import path from "node:path";

describe("package.json: exports", () => {
  it("contains correct exports", async () => {
    const files = await readdir(path.resolve(__dirname, "icons"));

    const filesToObject = files.reduce<
      Record<
        string,
        {
          types: string;
          default: string;
        }
      >
    >((acc, file) => {
      const name = file.replace(/\.tsx$/, "");
      acc[`./${name}`] = {
        types: `./dist/${name}.d.ts`,
        default: `./dist/${name}.js`,
      };
      return acc;
    }, {});

    expect(packageJSON.exports).toStrictEqual({
      "./package.json": "./package.json",
      ...filesToObject,
    });
  });
});
