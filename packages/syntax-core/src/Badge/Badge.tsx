import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import { type ReactElement } from "react";
import styles from "./Badge.module.css";

const BadgeColor = [
  "gray200",
  "gray900",
  "destructive700",
  "orange700",
  "yellow700",
  "success700",
  "primary700",
  "purple700",
] as const;

const textColorForBackgroundColor = (
  color: (typeof BadgeColor)[number],
): "gray900" | "white" => {
  switch (color) {
    case "gray200":
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
  color = "primary700",
}: {
  /**
   * The icon to be displayed. Please use a [Material Icon](https://material.io/resources/icons/)
   */
  icon?: React.ComponentType<{ className: string }>;
  /**
   * The text to display inside the badge
   */
  text: string;
  /**
   * The color of the badge
   *
   * @defaultValue "primary700"
   */
  color?: (typeof BadgeColor)[number];
}): JSX.Element => (
  <Box
    display="inlineBlock"
    paddingX={2}
    paddingY={1}
    rounding="full"
    backgroundColor={color}
    dangerouslySetInlineStyle={{ __style: { lineHeight: "14px" } }}
  >
    <Typography color={textColorForBackgroundColor(color)} size={100}>
      <Box display="flex" gap={1} alignItems="center" justifyContent="start">
        {Icon && <Icon className={styles.icon} />}
        <Typography
          color={textColorForBackgroundColor(color)}
          size={100}
          weight="bold"
        >
          {text}
        </Typography>
      </Box>
    </Typography>
  </Box>
);

export default Badge;
