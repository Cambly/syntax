import colorStyles from "../colors/colors.module.css";

export default function textColor(
  color:
    | "gray900"
    | "gray700"
    | "primary"
    | "destructive-primary"
    | "destructive-lightBackground"
    | "destructive-darkBackground"
    | "success"
    | "success-darkBackground"
    | "white"
    | "white-secondary"
    | "inherit",
): string {
  switch (color) {
    case "gray700":
      return colorStyles.cambioGray700Color;
    case "white":
      return colorStyles.cambioWhiteColor;
    case "white-secondary":
      return colorStyles.white70Color;
    case "inherit":
      return colorStyles.inheritColor;
    case "destructive-primary":
      return colorStyles.cambioDestructive900Color;
    case "destructive-lightBackground":
      return colorStyles.cambioDestructive900Color;
    case "destructive-darkBackground":
      return colorStyles.cambioDestructive300Color;
    case "success":
      return colorStyles.cambioSuccess700Color;
    case "success-darkBackground":
      return colorStyles.cambioSuccess100Color;
    // primary / gray900
    default:
      return colorStyles.cambioBlackColor;
  }
}
