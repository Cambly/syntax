// Codemod to remove a prop from a component.

// Example with `component` set to "Button" and `prop` set to "startIcon":
// <Button startIcon={<Icon />} text="Continue" />
// to
// <Button text="Continue" />

import { type API, type FileInfo } from "jscodeshift";

export const parser = "tsx";

export default function transformer(
  fileInfo: FileInfo,
  api: API,
  options: {
    component: string;
    prop: string;
  },
): string | null {
  const { component, prop } = options;

  if (!component || !prop) {
    throw new Error("`component` and `prop` are required options");
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

  /**
   * targetLocalName is the name of the variable that the Box component is imported as.
   * E.g. import { Button } from '@cambly/syntax-core // Button
   * E.g. import { Button as RenamedButton } from '@cambly/syntax-core // RenamedButton
   */
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

  // Remove prop
  jsxWithMatchingAttributesCollection.replaceWith((nodepath) => {
    const node = nodepath.node;
    if (node.name.name === prop) {
      return null;
    }
    return node;
  });

  return src.toSource({ quote: "double" });
}
