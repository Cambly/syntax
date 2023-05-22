//Cdemod to convert
// <Box rounding="circle" /> and <Box rounding="pill" />
// to
// <Box rounding="full" />.

import { type API, type FileInfo } from "jscodeshift";

export const parser = "tsx";

export default function transformer(
  fileInfo: FileInfo,
  api: API,
): string | null {
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
        name: "Box",
      },
    },
  );

  if (componentIdentifierCollection.size() === 0) return null;

  /**
   * targetLocalName is the name of the variable that the Box component is imported as.
   * E.g. import { Box } from '@cambly/syntax-core // Box
   * E.g. import { Box as RenamedBox } from '@cambly/syntax-core // RenamedBox
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    .find(j.JSXAttribute, { name: { name: "rounding" } })
    .filter(
      (nodepath) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodepath.parentPath?.parentPath.value.name?.name === targetLocalName,
    );

  if (jsxWithMatchingAttributesCollection.size() === 0) return null;

  jsxWithMatchingAttributesCollection.replaceWith((nodepath) => {
    const node = nodepath.node;

    if (
      node.name.name === "rounding" &&
      node.value?.type === "StringLiteral" &&
      ["pill", "circle"].includes(node.value.value)
    ) {
      node.value.value = "full";
    }
    return node;
  });

  return src.toSource({ quote: "double" });
}
