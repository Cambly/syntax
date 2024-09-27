import { forwardRef } from "react";
import classnames from "classnames";
import colorStyles from "../colors/colors.module.css";
import styles from "./Icon.module.css";
import type allColors from "../colors/allColors";

type IconProps = {
  /**
   * The color of the Icon.
   *
   * @defaultValue "inherit"
   */
  color?: (typeof allColors)[number];
  /**
   * The size of the Icon.
   * * 100: 16px x 16px
   * * 200: 20px x 20px
   * * 300: 24px x 24px
   * * 400: 32px x 32px
   * * 500: 48px x 48px
   * * 600: 72px x 72px
   * * 700: 100px x 100px
   * * 800: 140px x 140px
   * * 900: 200px x 200px
   * * 1000: 280px x 280px
   *
   * @defaultValue 200
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
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
  ({ color = "inherit", path, size = 200 }: IconProps, ref) => (
    <svg
      className={classnames(
        styles.icon,
        colorStyles[`${color}Color`],
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
