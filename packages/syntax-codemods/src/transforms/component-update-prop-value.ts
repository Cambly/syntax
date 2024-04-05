// Codemod to update a prop value on a component.

// Example with `component` set to "Box" and the `rounding` prop value should change from `xl` to `md`:
// <Box rounding="xl" />
// to
// <Box rounding="md" />
import { type API, type FileInfo } from "jscodeshift";

export const parser = "tsx";

export default function transformer(
  fileInfo: FileInfo,
  api: API,
  options: {
    component: string;
    prop: string;
    previousPropValue: string;
    nextPropValue: string;
  },
): string | null {
  const { component, prop, previousPropValue, nextPropValue } = options;

  if (!component || !prop || !previousPropValue || !nextPropValue) {
    throw new Error(
      "`component`, `prop`, `previousPropValue` and `nextPropValue` are required options",
    );
  }

  const j = api.jscodeshift;
  const src = j(fileInfo.source);

  const syntaxImportCollection = src.find(j.ImportDeclaration, {
    source: {
      value: "@cambly/syntax-core",
    },
  });

  if (syntaxImportCollection.size() === 0) return null;

  const componentIdentifierCollection = syntaxImportCollection.find(
    j.ImportSpecifier,
    {
      imported: {
        type: "Identifier",
        name: component,
      },
    },
  );

  if (componentIdentifierCollection.size() === 0) return null;

  const targetLocalName = String(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    componentIdentifierCollection.get(0).node.local?.name,
  );

  const jsxCollection = src.find(j.JSXElement, {
    openingElement: { name: { name: targetLocalName } },
  });

  const spreadPropsCollection = jsxCollection.find(j.JSXSpreadAttribute).filter(
    (nodepath) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      nodepath.parentPath.parentPath.value.name?.name === targetLocalName,
  );

  if (spreadPropsCollection.size() > 0) {
    throw new Error(
      `Remove dynamic properties and rerun codemod.\n${spreadPropsCollection
        .nodes()
        .map(
          (node) =>
            `Location: ${fileInfo.path} @line: ${node.loc?.start.line ?? ""}`,
        )
        .join("\n")}`,
    );
  }

  const jsxWithMatchingAttributesCollection = jsxCollection
    .find(j.JSXAttribute, { name: { name: prop } })
    .filter(
      (nodepath) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodepath.parentPath?.parentPath.value.name?.name === targetLocalName,
    );

  if (jsxWithMatchingAttributesCollection.size() === 0) return null;

  // Update prop
  jsxWithMatchingAttributesCollection.replaceWith((nodepath) => {
    const node = nodepath.node;
    if (node.name.name === prop) {
      if (node.value?.type === "StringLiteral") {
        if (node.value.value === previousPropValue) {
          node.value.value = nextPropValue;
        }
      } else {
        throw new Error(
          `Expected prop value to be a string literal. Found: ${
            node.value?.type ?? ""
          }. Location: ${fileInfo.path} @line: ${node.loc?.start.line ?? ""}`,
        );
      }
    }
    return node;
  });

  return src.toSource({ quote: "double" });
}
