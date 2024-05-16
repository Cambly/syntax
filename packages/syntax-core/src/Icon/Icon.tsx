import { forwardRef, type ComponentProps } from "react";
import classnames from "classnames";

import styles from "./Icon.module.css";
import textColor from "../colors/textColors";
import type Typography from "../Typography/Typography";

type IconProps = {
  /**
   * The color of the Icon.
   *
   * @defaultValue "gray900"
   */
  color?: ComponentProps<typeof Typography>["color"];
  /**
   * The size of the Icon.
   * * `xs`: 16px x 16px
   * * `sm`: 20px x 20px
   * * `md`: 24px x 24px
   * * `lg`: 32px x 32px
   *
   * @defaultValue "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * The svg path of the icon. You should not use this prop directly, instead use the specific icon components.
   */
  path?: string;
};

/**
 * [Icon](http://localhost:6006/?path=/docs/icons-icons--docs) is the base component that renders an icon.
 * You shouldn't use this component directly, instead use the specific icon components.
 * @example
 * `import Book from "@cambly/syntax-icons/Book";`
 *
 * You can click on the icon to copy the import statement!
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = "inherit", path, size = "md" }: IconProps, ref) => (
    <svg
      className={classnames(
        styles.icon,
        textColor(color),
        styles[`icon${size}`],
      )}
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </svg>
  ),
);

Icon.displayName = "Icon";

export default Icon;
