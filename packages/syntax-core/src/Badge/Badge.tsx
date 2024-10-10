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
] as const;

const textColorForBackgroundColor = (
  color: (typeof badgeColor)[number],
): "gray900" | "white" => {
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
    case "yellow700":
      return "gray900";
    default:
      return "white";
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
      backgroundColor={color}
      alignItems="center"
      justifyContent="center"
      minHeight={24}
    >
      <Typography
        size={100}
        weight="medium"
        color={textColorForBackgroundColor(color)}
      >
        <Box display="flex" gap={1} alignItems="center" justifyContent="start">
          {Icon && <Icon className={styles.icon} size={100} />}
          <Typography
            color={textColorForBackgroundColor(color)}
            size={100}
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
