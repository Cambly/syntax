import { type Color } from "../constants";
import styles from "./colors.module.css";

export default function backgroundColor(color: (typeof Color)[number]): string {
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
    case "black":
      return styles.blackBackgroundColor;
    default:
      return styles.primary700BackgroundColor;
  }
}
