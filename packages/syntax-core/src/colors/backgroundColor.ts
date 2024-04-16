import { type Color } from "../constants";
import styles from "./colors.module.css";

export function backgroundColor(
  color: (typeof Color)[number],
  on: "lightBackground" | "darkBackground",
): string {
  if (on === "lightBackground") {
    switch (color) {
      case "primary":
        return styles.blackBackgroundColor;
      case "secondary":
      case "success-secondary":
      case "destructive-secondary":
        return styles.transparentFullBackgroundColor;
      case "tertiary":
      case "success-tertiary":
      case "destructive-tertiary":
        return styles.transparentFullBackgroundColor;
      case "success-primary":
        return styles.success700BackgroundColor;
      case "destructive-primary":
        return styles.destructive700BackgroundColor;
      case "branded":
        return styles.yellow700BackgroundColor;
      default:
        return styles.blackBackgroundColor;
    }
  } else {
    switch (color) {
      case "primary":
        return styles.gray200BackgroundColor;
      case "secondary":
      case "success-secondary":
      case "destructive-secondary":
        return styles.transparentFullBackgroundColor;
      case "tertiary":
      case "success-tertiary":
      case "destructive-tertiary":
        return styles.transparentFullBackgroundColor;
      case "success-primary":
        return styles.success300BackgroundColor;
      case "destructive-primary":
        return styles.destructive300BackgroundColor;
      case "branded":
        return styles.yellow700BackgroundColor;
      default:
        return styles.whiteBackgroundColor;
    }
  }
}
