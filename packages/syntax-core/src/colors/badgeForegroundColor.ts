import { type BadgeColor } from "../constants";
import styles from "./colors.module.css";

export default function badgeForegroundColor(
  color: (typeof BadgeColor)[number],
): string {
  switch (color) {
    case "yellow700":
      return styles.blackColor;
    default:
      return styles.whiteColor;
  }
}
