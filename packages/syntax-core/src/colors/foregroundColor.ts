import { type Color } from "../constants";
import styles from "./colors.module.css";

export default function foregroundColor(color: (typeof Color)[number]): string {
  switch (color) {
    case "secondary":
    case "tertiary":
      return styles.primary700Color;
    case "destructive-secondary":
    case "destructive-tertiary":
      return styles.destructive700Color;
    case "branded":
      return styles.gray900Color;
    default:
      return styles.whiteColor;
  }
}
