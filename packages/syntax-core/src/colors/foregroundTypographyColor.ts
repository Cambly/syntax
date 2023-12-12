import { type Color } from "../constants";

export default function foregroundTypographyColor(
  color: (typeof Color)[number],
): (typeof Color)[number] {
  switch (color) {
    case "secondary":
    case "tertiary":
      return "primary";
    case "destructive-secondary":
    case "destructive-tertiary":
      return "destructive-primary";
    case "branded":
      return "gray900";
    case "inverse":
      return "white";
    default:
      return "white";
  }
}
