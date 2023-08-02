import fs from "fs";
import { parseArgs } from "node:util";
import { component, story, test } from "./component_templates";

// grab component name from terminal argument
const { positionals } = parseArgs({
  options: {},
  allowPositionals: true,
});
const name = positionals[0];
if (!name) throw new Error("You must include a component name.");

const dir = `./packages/syntax-core/src/${name}/`;

// throw an error if the file already exists
if (fs.existsSync(dir))
  throw new Error("A component with that name already exists.");

// create the folder
fs.mkdirSync(dir);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// ComponentName.tsx
fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler);
// ComponentName.stories.tsx
fs.writeFile(`${dir}/${name}.stories.tsx`, story(name), writeFileErrorHandler);
// ComponentName.test.tsx
fs.writeFile(`${dir}/${name}.test.tsx`, test(name), writeFileErrorHandler);

// insert new component into 'packages/syntax-core/src/index.tsx file
fs.readFile(
  "./packages/syntax-core/src/index.tsx",
  "utf8",
  function (err, data) {
    if (err) throw err;

    // grab all components and combine them with new component
    const currentComponents = data.match(/(?<=import )(.*?)(?= from)/g) || "";
    const newComponents = [name, ...currentComponents].sort();

    // create the import and export statements
    const importStatements = newComponents
      .map(
        (importName) =>
          `import ${importName} from './${importName}/${importName}';\n`,
      )
      .join("");
    const exportStatements = `export {\n${newComponents
      .map((component) => `  ${component},\n`)
      .join("")}};\n`;

    const fileContent = `${importStatements}\n${exportStatements}`;

    fs.writeFile(
      `./packages/syntax-core/src/index.tsx`,
      fileContent,
      writeFileErrorHandler,
    );
  },
);

console.log(
  "Note: Formatting of files might change because of our lint rules when you save.",
  "Note 2: Make sure the casing of your Component names are 'StartCased' ex: 'ButtonGroup' or 'Card' ",
);
