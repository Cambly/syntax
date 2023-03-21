import { Color, ColorValue } from "../constants";
import styles from "./colors.module.css";

export default function foregroundColor(color: ColorValue): string {
  switch (color) {
    case Color.SECONDARY:
    case Color.TERTIARY:
      return styles.primary700Color;
    case Color.DESTRUCTIVE_SECONDARY:
    case Color.DESTRUCTIVE_TERTIARY:
      return styles.destructive700Color;
    case Color.BRANDED:
      return styles.gray900Color;
    default:
      return styles.whiteColor;
  }
}
