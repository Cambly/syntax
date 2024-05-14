import { type Template } from "@svgr/babel-plugin-transform-svg-component";

const iconTemplate: Template = ({ componentName, jsx }, { tpl }) => {
  return tpl`
  import { type ComponentProps, forwardRef } from "react";
  import Icon from "../../../syntax-core/src/Icon/Icon";

  const ${componentName} = forwardRef<
    SVGSVGElement,
    Omit<ComponentProps<typeof Icon>, "path">
  >(({ color, size }, ref) => (
    <Icon ref={ref} path="${jsx.children[0].openingElement.attributes[0].value.value}" color={color} size={size} />
  ));

  ${componentName}.displayName = "${componentName}";
  export default ${componentName}
  `;
};

export default iconTemplate;
