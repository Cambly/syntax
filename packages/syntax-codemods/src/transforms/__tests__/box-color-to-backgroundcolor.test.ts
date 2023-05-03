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

const fixtureDir = join(__dirname, "..", "__fixtures__");
const subDirPath = join(fixtureDir, "box-color-to-backgroundcolor");

describe("box-color-to-backgroundcolor", () => {
  it.each(["base", "full"])(`transforms correctly - %s`, async (file) => {
    const { input, outputCode } = await getTestMetadata(
      subDirPath,
      file,
      "tsx",
    );

    const jscodeshiftWithParser = jscodeshift.withParser("tsx");

    const output = transform(input, {
      j: jscodeshiftWithParser,
      jscodeshift: jscodeshiftWithParser,
      stats: () => {
        /* empty */
      },
      report: () => {
        /* empty */
      },
    });

    expect(format(String(output))).toStrictEqual(format(outputCode));
  });
});
