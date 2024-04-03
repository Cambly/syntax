import { type CambioColor } from "../constants";
import styles from "./colors.module.css";

export function backgroundColor(
  color: (typeof CambioColor)[number],
  on: "lightBackground" | "darkBackground",
): string {
  if (on === "lightBackground") {
    switch (color) {
      case "primary":
        return styles.cambioBlackBackgroundColor;
      case "secondary":
      case "success-secondary":
      case "destructive-secondary":
        return styles.cambioTransparentFullBackgroundColor;
      case "tertiary":
      case "success-tertiary":
      case "destructive-tertiary":
        return styles.cambioTransparentFullBackgroundColor;
      case "success-primary":
        return styles.cambioSuccess700BackgroundColor;
      case "destructive-primary":
        return styles.cambioDestructive700BackgroundColor;
      case "branded":
        return styles.cambioYellow700BackgroundColor;
      default:
        return styles.cambioBlackBackgroundColor;
    }
  } else {
    switch (color) {
      case "primary":
        return styles.cambioGray200BackgroundColor;
      case "secondary":
      case "success-secondary":
      case "destructive-secondary":
        return styles.cambioTransparentFullBackgroundColor;
      case "tertiary":
      case "success-tertiary":
      case "destructive-tertiary":
        return styles.cambioTransparentFullBackgroundColor;
      case "success-primary":
        return styles.cambioSuccess300BackgroundColor;
      case "destructive-primary":
        return styles.cambioDestructive300BackgroundColor;
      case "branded":
        return styles.cambioYellow700BackgroundColor;
      default:
        return styles.cambioWhiteBackgroundColor;
    }
  }
}
