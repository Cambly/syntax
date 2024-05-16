/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type Template } from "@svgr/babel-plugin-transform-svg-component";

const iconTemplate: Template = ({ componentName, jsx }, { tpl }) => {
  if (
    !(
      jsx.children[0] &&
      jsx.children[0].type === "JSXElement" &&
      jsx.children[0].openingElement.attributes[0]?.type === "JSXAttribute" &&
      jsx.children[0].openingElement.attributes[0]?.value?.type ===
        "StringLiteral" &&
      jsx.children[0].openingElement.attributes[0]?.value?.value
    )
  ) {
    throw new Error(
      `Invalid SVG element structure. Please check the SVG file: ${componentName}`,
    );
  }

  return tpl`
  import { type ComponentProps, forwardRef } from "react";
  import Icon from "../../../syntax-core/src/Icon/Icon";

  const ${componentName} = forwardRef<
    SVGSVGElement,
    Omit<ComponentProps<typeof Icon>, "path">
  >(({ color, size }, ref) => {
    const path = ${jsx.children[0].openingElement.attributes[0].value.value};
    return (
      <Icon ref={ref} path={path} color={color} size={size} />
    );
  });

  ${componentName}.displayName = "${componentName}";
  export default ${componentName}
  `;
};

export default iconTemplate;
