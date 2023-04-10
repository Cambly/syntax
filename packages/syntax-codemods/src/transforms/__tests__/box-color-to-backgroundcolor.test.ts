import { join } from "path";
import { readFile } from "fs/promises";

import jscodeshift from "jscodeshift";
import transform from "../box-color-to-backgroundcolor";
import { format } from "prettier";

const getTestMetadata = async (
  dirPath: string,
  filePrefix: string,
  fileExtension: string,
) => {
  const inputPath = join(
    dirPath,
    [filePrefix, "input", fileExtension].join("."),
  );
  const outputPath = join(
    dirPath,
    [filePrefix, "output", fileExtension].join("."),
  );
  const inputCode = await readFile(inputPath, "utf8");
  const outputCode = await readFile(outputPath, "utf8");

  const input = { path: inputPath, source: inputCode };
  return { input, outputCode };
};

describe("box-color-to-backgroundcolor", () => {
  it("transforms correctly - base", async () => {
    const fixtureDir = join(__dirname, "..", "__fixtures__");
    const subDirPath = join(fixtureDir, "box-color-to-backgroundcolor");
    const { input, outputCode } = await getTestMetadata(
      subDirPath,
      "base",
      "tsx",
    );

    const output = transform(input, {
      j: jscodeshift.withParser("tsx"),
      jscodeshift,
      stats: () => {
        /* empty */
      },
      report: () => {
        /* empty */
      },
    });

    expect(format(String(output))).toEqual(outputCode);
  });
});
