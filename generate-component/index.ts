import fsSync, { promises as fs } from "fs";
import { parseArgs } from "node:util";
import { component, story, test } from "./component_templates";

function writeFileErrorHandler(err) {
  if (err) throw err;
}

async function updateIndexFile(newTemplateName) {
  const indexFileContents = await fs.readFile(
    "./packages/syntax-core/src/index.tsx",
    "utf8",
  );

  // grab all components and combine them with new component
  const currentComponents =
    indexFileContents.match(/(?<=import )(.*?)(?= from)/g) || "";
  const newComponents = [newTemplateName, ...currentComponents].sort();

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

  try {
    await fs.writeFile(`./packages/syntax-core/src/index.tsx`, fileContent);
  } catch (error) {
    writeFileErrorHandler(error);
  }
}

async function generateComponent() {
  // grab component name from terminal argument
  const { positionals } = parseArgs({
    options: {},
    allowPositionals: true,
  });
  const name = positionals[0];
  if (!name) throw new Error("You must include a component name.");

  const dir = `./packages/syntax-core/src/${name}/`;

  // Throw an error if the file already exists
  if (fsSync.existsSync(dir))
    throw new Error("A component with that name already exists.");

  try {
    // Create the folder
    await fs.mkdir(dir);

    // Create file: ComponentName.tsx
    const Template = await fs.readFile(__dirname + "/Template.tsx", "utf8");
    await fs.writeFile(
      `${dir}/${name}.tsx`,
      Template.replace(/Template/g, name),
    );

    // Create file: ComponentName.stories.tsx
    const StoriesTemplate = await fs.readFile(
      __dirname + "/Template.stories.tsx",
      "utf8",
    );
    await fs.writeFile(
      `${dir}/${name}.stories.tsx`,
      StoriesTemplate.replace(/Template/g, name),
    );

    // Create file: ComponentName.test.tsx
    const TestTemplate = await fs.readFile(
      __dirname + "/Template.test.tsx",
      "utf8",
    );
    await fs.writeFile(
      `${dir}/${name}.test.tsx`,
      TestTemplate.replace(/Template/g, name),
    );

    // insert new component into 'packages/syntax-core/src/index.tsx file
    updateIndexFile(name);

    console.log(
      "Note: Formatting of files might change because of our lint rules when you save.",
      "Note 2: Make sure the casing of your Component names are 'StartCased' ex: 'ButtonGroup' or 'Card' ",
    );
  } catch (error) {
    writeFileErrorHandler(error);
  }
}

generateComponent();
