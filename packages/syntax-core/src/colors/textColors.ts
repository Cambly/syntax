import colorStyles from "../colors/colors.module.css";

export type TextColors =
  | "gray700"
  | "white"
  | "white-secondary"
  | "inherit"
  | "destructive-primary"
  | "destructive-lightBackground"
  | "destructive-darkBackground"
  | "success"
  | "success-darkBackground"
  | "gray900"
  | "primary"
  | "cream"
  | "lilac"
  | "navy"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "sky"
  | "slate"
  | "tan"
  | "teal"
  | "thistle";

export default function textColor(color: TextColors): string {
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
    case "gray900":
      return colorStyles.cambioGray900Color;
    case "primary":
      return colorStyles.cambioBlackColor;
    case "cream":
      return colorStyles.cambioCreamColor;
    case "lilac":
      return colorStyles.cambioLilacColor;
    case "navy":
      return colorStyles.cambioNavyColor;
    case "orange":
      return colorStyles.cambioOrangeColor;
    case "pink":
      return colorStyles.cambioPinkColor;
    case "purple":
      return colorStyles.cambioPurpleColor;
    case "red":
      return colorStyles.cambioRedColor;
    case "sky":
      return colorStyles.cambioSkyColor;
    case "slate":
      return colorStyles.cambioSlateColor;
    case "tan":
      return colorStyles.cambioTanColor;
    case "teal":
      return colorStyles.cambioTealColor;
    case "thistle":
      return colorStyles.cambioThistleColor;
    default:
      const _exhaustiveCheck: never = color;
      throw new Error(`Unhandled color`);
      return _exhaustiveCheck;
  }
}
