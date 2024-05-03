import { forwardRef, type ComponentProps } from "react";
import classnames from "classnames";

import type Typography from "../../syntax-core/src/Typography/Typography";
import textColor from "../../syntax-core/src/colors/textColors";

import styles from "./Icon.module.css";

/**
 * [Icon](http://localhost:6006/?path=/docs/icons-icons--docs) is the base component that renders an icon.
 * You shouldn't use this component directly, instead use the specific icon components.
 */
const Icon = forwardRef<
  SVGSVGElement,
  {
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
     * @defaultValue "sm"
     */
    size?: "xs" | "sm" | "md" | "lg";
    /**
     * The className that can be passed into the Icon. Chances are you won't need this, only used for IconButton to override styling.
     */
    className?: string;
    /**
     * The svg path of the icon. You should not use this prop directly, instead use the specific icon components.
     */
    path: string;
  }
>(({ className, color = "inherit", path, size = "sm" }, ref) => (
  <svg
    className={classnames(
      styles.icon,
      textColor(color),
      className,
      styles[`icon${size}`],
    )}
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={path} fill={color} />
  </svg>
));

Icon.displayName = "Icon";

export default Icon;
