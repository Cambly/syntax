import Runner from "jscodeshift/src/Runner";

export default function runJscodeshift(
  transformerPath: string,
  flags: Record<string, unknown>,
  files: string[],
) {
  return Runner.run(transformerPath, files, {
    ignorePattern: ["**/node_modules/**", "**/dist/**"],
    extensions: "tsx,ts,jsx,js",
    parser: "tsx",
    verbose: 2,
    runInBand: true,
    ...flags,
  });
}
