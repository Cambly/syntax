const fs = require("fs");
const { component, story, test, barrel } = require("./component_templates.tsx");

// grab component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) throw new Error("You must include a component name.");

const uppercasedName =
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const dir = `./packages/syntax-core/src/${uppercasedName}/`;

// throw an error if the file already exists
if (fs.existsSync(dir))
  throw new Error("A component with that name already exists.");

// create the folder
fs.mkdirSync(dir);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// component.tsx
fs.writeFile(
  `${dir}/${uppercasedName}.tsx`,
  component(uppercasedName),
  writeFileErrorHandler,
);
// storybook.tsx
fs.writeFile(
  `${dir}/${uppercasedName}.stories.tsx`,
  story(uppercasedName),
  writeFileErrorHandler,
);
// test.tsx
fs.writeFile(
  `${dir}/${uppercasedName}.test.tsx`,
  test(uppercasedName),
  writeFileErrorHandler,
);

// insert new component into 'packages/syntax-core/src/index.tsx file
fs.readFile(
  "./packages/syntax-core/src/index.tsx",
  "utf8",
  function (err, data) {
    if (err) throw err;

    // grab all components and combine them with new component
    const currentComponents = data.match(/(?<=import )(.*?)(?= from)/g);
    const newComponents = [uppercasedName, ...currentComponents].sort();

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
);
