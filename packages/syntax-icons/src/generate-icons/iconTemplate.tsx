/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- walking an untyped babel AST */

import { type Template } from "@svgr/babel-plugin-transform-svg-component";

/**
 * Pull the `d` attribute off a `<path>` element by name.
 *
 * This used to read `attributes[0]` and assume it was the path data. That is
 * true for a clean single-path SVG, but `privacy.svg` leads with `fill="#fff"`,
 * so the generated component got `const path = "#fff"` and rendered nothing —
 * silently, because a colour string is still a non-empty string. Looking the
 * attribute up by name means a malformed SVG fails the build instead.
 */
function getPathData(element: any): string | null {
  if (element?.type !== "JSXElement") return null;
  if (element.openingElement?.name?.name !== "path") return null;
  for (const attr of element.openingElement.attributes) {
    if (
      attr?.type === "JSXAttribute" &&
      attr.name?.name === "d" &&
      attr.value?.type === "StringLiteral" &&
      attr.value.value
    ) {
      return attr.value.value as string;
    }
  }
  return null;
}

/**
 * Icons that must flip in RTL (anything directional).
 *
 * This used to be applied by hand to the generated files, which meant
 * `pnpm generate-icons` silently stripped it from all nine of them and broke
 * RTL mirroring until someone noticed in review. Keeping the list here makes
 * regeneration idempotent.
 */
const RTL_MIRRORED_ICONS = new Set([
  "Accent",
  "ArrowLeft",
  "ArrowRight",
  "ChevronLeft",
  "ChevronRight",
  "Exit",
  "Help",
  "Progress",
  "Send",
]);

const iconTemplate: Template = ({ componentName, jsx }, { tpl }) => {
  const children = jsx.children.filter(
    (child: any) => child?.type === "JSXElement",
  );

  // Icon renders a single `<path d={path} />` tinted by `color`, so anything
  // multi-path or multi-colour cannot round-trip through it. Reject it here
  // rather than emitting a component that renders the wrong thing.
  if (children.length !== 1) {
    throw new Error(
      `${componentName}: expected exactly one element inside <svg>, found ${children.length}. ` +
        `Syntax icons must be a single monochrome <path> — merge the shapes in Figma, ` +
        `or add the icon to MULTICOLOR_ICONS in generateIcons.ts and hand-author its component.`,
    );
  }

  const pathData = getPathData(children[0]);
  if (!pathData) {
    throw new Error(
      `${componentName}: could not find a <path d="..."> in the SVG. ` +
        `Check that the icon is a single filled path with no stroke.`,
    );
  }

  // `tpl` interpolations are AST placeholders, not raw text, so the rtlMirror
  // attribute can't be spliced into one shared template — hence two.
  if (RTL_MIRRORED_ICONS.has(componentName)) {
    return tpl`
  import { type ComponentProps, forwardRef } from "react";
  import Icon from "../../../syntax-core/src/Icon/Icon";

  const ${componentName} = forwardRef<
    SVGSVGElement,
    Omit<ComponentProps<typeof Icon>, "path">
  >(({ color, size }, ref) => {
    const path = "${pathData}";
    return (
      <Icon ref={ref} path={path} color={color} size={size} rtlMirror />
    );
  });

  ${componentName}.displayName = "${componentName}";
  export default ${componentName}
  `;
  }

  return tpl`
  import { type ComponentProps, forwardRef } from "react";
  import Icon from "../../../syntax-core/src/Icon/Icon";

  const ${componentName} = forwardRef<
    SVGSVGElement,
    Omit<ComponentProps<typeof Icon>, "path">
  >(({ color, size }, ref) => {
    const path = "${pathData}";
    return (
      <Icon ref={ref} path={path} color={color} size={size} />
    );
  });

  ${componentName}.displayName = "${componentName}";
  export default ${componentName}
  `;
};

export default iconTemplate;
