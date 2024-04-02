import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import styles from "./Badge.module.css";

const badgeColorClassic = [
  "gray200",
  "gray900",
  "destructive700",
  "orange700",
  "yellow700",
  "success700",
  "primary700",
  "purple700",
] as const;

const badgeColorCambio = [
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
] as const;

const badgeColorClassicToCambio = {
  gray200: "gray370",
  gray900: "gray870",
  destructive700: "destructive300",
  orange700: "orange",
  yellow700: "tan",
  success700: "success300",
  primary700: "sky",
  purple700: "lilac",
  sky: "sky",
  success300: "success300",
  destructive300: "destructive300",
  orange: "orange",
  tan: "tan",
  gray370: "gray370",
  gray870: "gray870",
  lilac: "lilac",
  thistle: "thistle",
  pink: "pink",
} as const;

const textColorForBackgroundColor = (
  color: (typeof badgeColorClassic)[number] | (typeof badgeColorCambio)[number],
): "gray900" | "white" => {
  switch (color) {
    case "gray200":
    case "yellow700":
      return "gray900";
    case "gray370":
    case "destructive300":
    case "orange":
    case "tan":
    case "success300":
    case "sky":
    case "thistle":
    case "pink":
    case "lilac":
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
   * Classic colors:
   * * `gray200` => maps to neutralLight in Cambio
   * * `gray900` => maps to neutralDark in Cambio
   * * `destructive700` => maps to destructive in Cambio
   * * `orange700` => maps to orange in Cambio
   * * `yellow700` => maps to tan in Cambio
   * * `success700` => maps to success in Cambio
   * * `primary700` => maps to sky in Cambio
   * * `purple700` => maps to lilac in Cambio
   *
   * Cambio colors:
   * * `sky`
   * * `success300`
   * * `destructive300`
   * * `orange`
   * * `tan`
   * * `gray370`
   * * `gray870`
   * * `lilac`
   * * `thistle`
   * * `pink`
   *
   * @defaultValue "primary700"
   */
  color?:
    | (typeof badgeColorClassic)[number]
    | (typeof badgeColorCambio)[number];
}): JSX.Element => {
  const mappedColor = badgeColorClassicToCambio[color];

  return (
    <Box
      display="inlineFlex"
      paddingX={2}
      rounding={"sm"}
      backgroundColor={mappedColor}
      alignItems="center"
      justifyContent="center"
      minHeight={24}
    >
      <Typography
        size={100}
        weight="medium"
        color={textColorForBackgroundColor(mappedColor)}
      >
        <Box display="flex" gap={1} alignItems="center" justifyContent="start">
          {Icon && <Icon className={styles.icon} />}
          <Typography
            color={textColorForBackgroundColor(mappedColor)}
            size={100}
            weight="medium"
          >
            {text}
          </Typography>
        </Box>
      </Typography>
    </Box>
  );
};

export default Badge;
