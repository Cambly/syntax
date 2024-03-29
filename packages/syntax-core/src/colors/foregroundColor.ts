import { type CambioColor } from "../constants";
import styles from "./colors.module.css";

export function cambioForegroundColor(
  color: (typeof CambioColor)[number],
  on: "lightBackground" | "darkBackground",
): string {
  if (on === "lightBackground") {
    switch (color) {
      case "primary":
      case "success-primary":
      case "destructive-primary":
        return styles.cambioWhiteColor;
      case "success-secondary":
      case "success-tertiary":
        return styles.cambioSuccess900Color;
      case "destructive-secondary":
      case "destructive-tertiary":
        return styles.cambioDestructive900Color;
      default:
        return styles.cambioBlackColor;
    }
  } else {
    switch (color) {
      case "primary":
      case "success-primary":
      case "destructive-primary":
        return styles.cambioBlackColor;
      case "secondary":
      case "tertiary":
        return styles.cambioWhiteColor;
      case "success-secondary":
      case "success-tertiary":
        return styles.cambioSuccess100Color;
      case "destructive-secondary":
      case "destructive-tertiary":
        return styles.cambioDestructive100Color;
      default: // branded
        return styles.cambioBlackColor;
    }
  }
}
