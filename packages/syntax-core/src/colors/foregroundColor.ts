import { type CambioColor, type Color } from "../constants";
import styles from "./colors.module.css";

export function classicForegroundColor(color: (typeof Color)[number]): string {
  switch (color) {
    case "secondary":
    case "tertiary":
      return styles.primary700Color;
    case "destructive-secondary":
    case "destructive-tertiary":
      return styles.destructive700Color;
    case "branded":
      return styles.gray900Color;
    case "inverse":
      return styles.whiteColor;
    default:
      return styles.whiteColor;
  }
}

export function cambioForegroundColor(
  color: (typeof CambioColor)[number],
): string {
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
}
