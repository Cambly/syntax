import { join } from "path";
import { readFile } from "fs/promises";

import jscodeshift from "jscodeshift";
import transform from "../component-remove-prop";
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
const subDirPath = join(fixtureDir, "component-remove-prop");

describe("component-remove-prop", () => {
  it.each([
    {
      file: "button-start-icon",
      component: "Button",
      prop: "startIcon",
    },
    {
      file: "button-end-icon",
      component: "Button",
      prop: "endIcon",
    },
  ])(`transforms correctly - %s`, async ({ file, component, prop }) => {
    const { input, outputCode } = await getTestMetadata(
      subDirPath,
      file,
      "tsx",
    );

    const jscodeshiftWithParser = jscodeshift.withParser("tsx");

    const output = transform(
      input,
      {
        j: jscodeshiftWithParser,
        jscodeshift: jscodeshiftWithParser,
        stats: () => undefined,
        report: () => undefined,
      },
      {
        component,
        prop,
      },
    );

    expect(
      format(String(output), {
        parser: "babel",
      }),
    ).toStrictEqual(
      format(outputCode, {
        parser: "babel",
      }),
    );
  });
});
