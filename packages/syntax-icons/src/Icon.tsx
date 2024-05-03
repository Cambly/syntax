import { forwardRef } from "react";
import styles from "./Icon.module.css";
import classnames from "classnames";

const Icon = forwardRef<
  SVGSVGElement,
  {
    className?: string;
    color?: string;
    path: string;
    size?: "xs" | "sm" | "md" | "lg";
  }
>(({ className, color, path, size }, ref) => (
  <svg
    className={classnames(
      styles.icon,
      className,
      size && styles[`icon${size}`],
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
