import { type BadgeColor } from "../constants";
import styles from "./colors.module.css";

export default function badgeBackgroundColor(
  color: (typeof BadgeColor)[number],
): string {
  switch (color) {
    case "gray900":
      return styles.gray900BackgroundColor;
    case "destructive-primary":
      return styles.destructive700BackgroundColor;
    case "orange700":
      return styles.orange700BackgroundColor;
    case "yellow700":
      return styles.yellow700BackgroundColor;
    case "success":
      return styles.success700BackgroundColor;
    case "purple700":
      return styles.purple700BackgroundColor;
    default:
      return styles.primary700BackgroundColor;
  }
}
