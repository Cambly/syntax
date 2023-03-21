import { Color, ColorValue } from "../constants";
import styles from "./colors.module.css";

export default function backgroundColor(color: ColorValue): string {
  switch (color) {
    case Color.SECONDARY:
      return styles.primary100BackgroundColor;
    case Color.DESTRUCTIVE_PRIMARY:
      return styles.destructive700Background;
    case Color.DESTRUCTIVE_SECONDARY:
      return styles.destructive100BackgroundColor;
    case Color.SUCCESS:
      return styles.success700BackgroundColor;
    case Color.TERTIARY:
    case Color.DESTRUCTIVE_TERTIARY:
      return styles.whiteBackgroundColor;
    case Color.BRANDED:
      return styles.yellow700BackgroundColor;
    default:
      return styles.primary700BackgroundColor;
  }
}
