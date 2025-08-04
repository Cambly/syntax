import { type ComponentProps } from "react";
import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import styles from "./Badge.module.css";
import type InternalIcon from "../Icon/Icon";

const badgeColor = [
  "sky",
  "success300",
  "destructive300",
  "orange",
  "tan",
  "gray370",
  "gray870",
  "lilac",
  "thistle",
  "pink",
  "cream",
  "yellow700",
  "silver",
  "blackandwhite",
  "success100",
  "destructive100",
  "graytertiary",
] as const;

type BadgeColor = (typeof badgeColor)[number];

const textColorForBackgroundColor = (
  color: BadgeColor,
): "gray900" | "white" | "gray700" => {
  switch (color) {
    case "gray370":
    case "destructive300":
    case "orange":
    case "tan":
    case "success300":
    case "sky":
    case "thistle":
    case "pink":
    case "lilac":
    case "cream":
    case "silver":
    case "yellow700":
    case "success100":
    case "destructive100":
      return "gray900";
    case "graytertiary":
      return "gray700";
    default:
      return "white";
  }
};

const backgroundColorForColor = (
  color: BadgeColor,
):
  | Exclude<BadgeColor, "silver" | "blackandwhite" | "graytertiary">
  | undefined => {
  switch (color) {
    case "silver":
      return undefined;
    case "blackandwhite":
      return undefined;
    case "graytertiary":
      return undefined;
    default:
      return color;
  }
};

const inlineStylesForColor = (
  color: BadgeColor,
): Record<string, string | number | null> => {
  switch (color) {
    case "silver":
      return {
        background:
          "linear-gradient(85deg, #CECECE -8.89%, #EEECEC 38.35%, #FFF 49.64%, #E9E8E8 66.22%) padding-box, \
          linear-gradient(83.45deg, #A9A9A9 2.57%, #E5E2E2 61.77%, #6E6E6E 100.3%) border-box",
        border: "1px solid transparent",
        paddingTop: "3px",
        paddingBottom: "3px",
      };
    case "blackandwhite":
      return {
        background:
          "linear-gradient(65deg, #000 12.53%, #949494 45.45%, #000 81.69%)",
        border: "1px solid transparent",
        paddingTop: "3px",
        paddingBottom: "3px",
      };
    case "graytertiary":
      return {
        background: "white",
        border: "1px solid var(--color-base-gray-300)",
        paddingTop: "3px",
        paddingBottom: "3px",
      };
    default:
      return {};
  }
};

/**
 * [Badge](https://cambly-syntax.vercel.app/?path=/docs/components-badge--docs) is a component to display short text and give additional context to features and other components.
 */
const Badge = ({
  icon: Icon,
  text,
  color = "sky",
}: {
  /**
   * The icon to be displayed. Please use a [Material Icon](https://material.io/resources/icons/)
   */
  icon?:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
  /**
   * The text to display inside the badge
   */
  text: string;
  /**
   * The color of the badge
   *
   * @defaultValue "sky"
   */
  color?: (typeof badgeColor)[number];
}): JSX.Element => {
  return (
    <Box
      display="inlineFlex"
      paddingX={2}
      paddingY={1}
      rounding={"sm"}
      backgroundColor={backgroundColorForColor(color)}
      alignItems="center"
      justifyContent="center"
      minHeight={24}
      dangerouslySetInlineStyle={{
        __style: inlineStylesForColor(color),
      }}
    >
      <Typography
        size={0}
        weight="medium"
        color={textColorForBackgroundColor(color)}
      >
        <Box display="flex" gap={1} alignItems="center" justifyContent="start">
          {Icon && <Icon className={styles.icon} size={100} />}
          <Typography
            color={textColorForBackgroundColor(color)}
            size={0}
            weight="medium"
            transform="uppercase"
          >
            {text}
          </Typography>
        </Box>
      </Typography>
    </Box>
  );
};

export default Badge;
