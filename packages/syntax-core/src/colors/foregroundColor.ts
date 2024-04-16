import { type Color } from "../constants";
import styles from "./colors.module.css";

export function foregroundColor(
  color: (typeof Color)[number],
  on: "lightBackground" | "darkBackground",
): string {
  if (on === "lightBackground") {
    switch (color) {
      case "primary":
      case "success-primary":
      case "destructive-primary":
        return styles.whiteColor;
      case "success-secondary":
      case "success-tertiary":
        return styles.success700Color;
      case "destructive-secondary":
      case "destructive-tertiary":
        return styles.destructive700Color;
      default:
        return styles.blackColor;
    }
  } else {
    switch (color) {
      case "primary":
      case "success-primary":
      case "destructive-primary":
        return styles.blackColor;
      case "secondary":
      case "tertiary":
        return styles.whiteColor;
      case "success-secondary":
      case "success-tertiary":
        return styles.success300Color;
      case "destructive-secondary":
      case "destructive-tertiary":
        return styles.destructive300Color;
      default: // branded
        return styles.blackColor;
    }
  }
}
