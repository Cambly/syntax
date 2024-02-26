import { type CambioColor, type Color } from "../constants";
import styles from "./colors.module.css";

export function classicBackgroundColor(color: (typeof Color)[number]): string {
  switch (color) {
    case "secondary":
      return styles.primary100BackgroundColor;
    case "destructive-primary":
      return styles.destructive700BackgroundColor;
    case "destructive-secondary":
      return styles.destructive100BackgroundColor;
    case "success":
      return styles.success700BackgroundColor;
    case "tertiary":
    case "destructive-tertiary":
      return styles.whiteBackgroundColor;
    case "branded":
      return styles.yellow700BackgroundColor;
    case "inverse":
      return styles.gray60BackgroundColor;
    default:
      return styles.primary700BackgroundColor;
  }
}

export function cambioBackgroundColor(
  color: (typeof CambioColor)[number],
): string {
  switch (color) {
    case "primary":
      return styles.cambioBlackBackgroundColor;
    case "secondary":
    case "tertiary":
    case "success-secondary":
    case "destructive-secondary":
      return styles.cambioTransparentFullBackgroundColor;
    case "quaternary":
      return styles.cambioTransparentGray54BackgroundColor;
    case "branded":
      return styles.cambioYellowBackgroundColor;
    case "success-primary":
      return styles.cambioSuccessBackgroundColor;
    case "destructive-primary":
      return styles.cambioDestructiveBackgroundColor;
    default:
      return styles.cambioBlackBackgroundColor;
  }
}
