import colorStyles from "../colors/colors.module.css";

export default function textColor(
  color:
    | "gray900"
    | "gray700"
    | "primary"
    | "destructive-primary"
    | "destructive-darkBackground"
    | "success"
    | "success-darkBackground"
    | "white"
    | "inherit",
): string {
  switch (color) {
    case "gray700":
      return colorStyles.cambioGray800Color;
    case "white":
      return colorStyles.cambioWhiteColor;
    case "inherit":
      return colorStyles.inheritColor;
    case "destructive-primary":
      return colorStyles.cambioDestructive900Color;
    case "destructive-darkBackground":
      return colorStyles.cambioDestructive100Color;
    case "success":
      return colorStyles.cambioSuccess900Color;
    case "success-darkBackground":
      return colorStyles.cambioSuccess100Color;
    // primary / gray900
    default:
      return colorStyles.cambioBlackColor;
  }
}
