import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import styles from "./Badge.module.css";
import { useTheme } from "../ThemeProvider/ThemeProvider";

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
  icon?: React.ComponentType<{ className?: string }>;
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
}): JSX.Element => {
  const { themeName } = useTheme();

  return (
    <Box
      display={themeName === "classic" ? "inlineBlock" : "inlineFlex"}
      paddingX={themeName === "classic" ? 2 : 3}
      paddingY={1}
      rounding={themeName === "classic" ? "full" : "sm"}
      backgroundColor={color}
      alignItems="center"
      justifyContent="center"
      height={themeName === "cambio" ? 32 : undefined}
    >
      <Typography color={textColorForBackgroundColor(color)}>
        <Box display="flex" gap={1} alignItems="center" justifyContent="start">
          {Icon && <Icon className={styles.icon} />}
          <Typography
            color={textColorForBackgroundColor(color)}
            size={100}
            weight={themeName === "classic" ? "bold" : "medium"}
          >
            {text}
          </Typography>
        </Box>
      </Typography>
    </Box>
  );
};

export default Badge;
