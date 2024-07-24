import classNames from "classnames";
import { type Color } from "../constants";
import styles from "./colors.module.css";

export function border(
  color: (typeof Color)[number],
  on: "lightBackground" | "darkBackground",
): string | null {
  if (on === "lightBackground") {
    switch (color) {
      case "secondary":
        return classNames(styles.noBorder, styles.cambioGray870BorderColor);
      case "success-secondary":
        return classNames(styles.noBorder, styles.success770BorderColor);
      case "destructive-secondary":
        return classNames(styles.noBorder, styles.destructive770BorderColor);
      default:
        return styles.noBorder;
    }
  } else {
    switch (color) {
      case "secondary":
        return classNames(styles.noBorder, styles.gray370BorderColor);
      case "success-secondary":
        return classNames(styles.noBorder, styles.success370BorderColor);
      case "destructive-secondary":
        return classNames(styles.noBorder, styles.destructive370BorderColor);
      default:
        return styles.noBorder;
    }
  }
}
