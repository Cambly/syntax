import Typography from "../Typography/Typography";
import Box from "../Box/Box";

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
  text,
  color = "primary700",
}: {
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
  >
    <Typography
      color={textColorForBackgroundColor(color)}
      size={100}
      weight="bold"
    >
      {text}
    </Typography>
  </Box>
);

export default Badge;
