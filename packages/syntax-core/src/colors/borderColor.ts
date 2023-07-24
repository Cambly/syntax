import { type Color } from "../constants";
import styles from "./colors.module.css";

export default function borderColor(
  color: (typeof Color)[number],
): string | undefined {
  switch (color) {
    case "secondary":
      return styles.primary300BorderColor;
    case "destructive-secondary":
      return styles.destructive300BorderColor;
    default:
      return undefined;
  }
}
