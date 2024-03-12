import classNames from "classnames";
import { forwardRef, type ReactElement, type ReactNode } from "react";
import styles from "./Typography.module.css";
import colorStyles from "../colors/colors.module.css";
import { useTheme } from "../ThemeProvider/ThemeProvider";

function classicTextColor(
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
      return colorStyles.gray700Color;
    case "white":
      return colorStyles.whiteColor;
    case "inherit":
      return colorStyles.inheritColor;
    case "primary":
      return colorStyles.primary700Color;
    case "destructive-primary":
    case "destructive-darkBackground":
      return colorStyles.destructive700Color;
    case "success":
      return colorStyles.success700Color;
    default:
      return colorStyles.gray900Color;
  }
}

function cambioTextColor(
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

function classicWeight(
  weight: "regular" | "interactive" | "medium" | "semiBold" | "bold" | "heavy",
): "regular" | "interactive" | "semiBold" | "bold" | "heavy" {
  switch (weight) {
    case "medium":
      return "regular";
    default:
      return weight;
  }
}

function cambioWeight(
  weight: "regular" | "interactive" | "medium" | "semiBold" | "bold" | "heavy",
): "regular" | "medium" | "semiBold" {
  switch (weight) {
    case "interactive":
      return "medium";
    case "bold":
    case "heavy":
      return "regular";
    default:
      return weight;
  }
}

/**
 * [Typography](https://cambly-syntax.vercel.app/?path=/docs/components-typography--docs) is a component that renders text.
 */
const Typography = forwardRef<
  HTMLDivElement,
  {
    /**
     * Aligns the text to the left, right, or center of the container.
     * * `start` and `end` will align the text to the left or right of the container depending on the locale.
     * * `forceLeft` and `forceRight` will align the text to the left or right of the container regardless of the locale (should be used sparingly).
     *
     * @defaultValue "start"
     */
    align?: "start" | "end" | "forceLeft" | "center" | "forceRight";
    /**
     * DOM element to render as.
     *
     * @defaultValue "div"
     */
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /**
     * The text to be rendered
     */
    children?: ReactNode;
    /**
     * The color of the text.
     *
     * Cambio only: `success-darkBackground` / `destructive-darkBackground`
     *
     * @defaultValue "gray900"
     */
    color?:
      | "gray900"
      | "gray700"
      | "primary"
      | "destructive-primary"
      | "destructive-darkBackground"
      | "success"
      | "success-darkBackground"
      | "white"
      | "inherit";
    /**
     * Test id for the text
     */
    "data-testid"?: string;
    /**
     * Style of the font
     *
     * Classic only supports `sans-serif`
     *
     * @defaultValue "sans-serif"
     */
    fontStyle?: "serif" | "sans-serif";
    /**
     * The id for the element
     */
    id?: string;
    /**
     * Whether the text should flow inline with other elements.
     *
     * @defaultValue false
     */
    inline?: boolean;
    /**
     * The number of lines we should truncate the text at
     */
    lineClamp?: number | undefined;
    /**
     * Size of the text.
     *
     * Classic:
     * * `100`: 12px
     * * `200`: 14px
     * * `300`: 16px
     * * `500`: 20px
     * * `600`: 28px
     * * `700`: 40px
     * * `800`: 64px
     *
     * Cambio Mobile:
     * * `100`: 13px
     * * `200`: 16px
     * * `300`: 18px
     * * `400`: 20px
     * * `500`: 23px
     * * `600`: 26px
     * * `700`: 29px
     * * `800`: 33px
     * * `900`: 37px
     * * `1000`: 41px
     * * `1100`: 46px
     *
     * Cambio Desktop (viewport width > 480px):
     * * `100`: 13px
     * * `200`: 16px
     * * `300`: 20px
     * * `400`: 25px
     * * `500`: 31px
     * * `600`: 39px
     * * `700`: 49px
     * * `800`: 61px
     * * `900`: 76px
     * * `1000`: 95px
     * * `1100`: 119px
     *
     * @defaultValue 200
     */
    size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 1100;
    /**
     * The tooltip to be displayed when the user hovers the text
     */
    tooltip?: string;
    /**
     * Whether the text should be transformed to uppercase.
     *
     * @defaultValue "none"
     */
    transform?: "none" | "uppercase";
    /**
     * Whether the text has an underline.
     *
     * @defaultValue false
     */
    underline?: boolean;
    /**
     * Indicates the boldness of the text.
     *
     * Classic:
     * * `regular`: 400
     * * `interactive`: 500 (Classic only)
     * * `semiBold`: 600
     * * `bold`: 700 (Classic only)
     * * `heavy`: 860 (Classic only)
     *
     * Cambio:
     * * `regular`: 400
     * * `medium`: 510
     * * `semiBold`: 590
     *
     * @defaultValue "regular"
     */
    weight?:
      | "regular"
      | "interactive"
      | "medium"
      | "semiBold"
      | "bold"
      | "heavy";
  }
>(function Typography(
  {
    align = "start",
    as = "div",
    children,
    color = "gray900",
    "data-testid": dataTestId,
    fontStyle = "sans-serif",
    id,
    inline = false,
    lineClamp = undefined,
    size = 200,
    tooltip,
    transform = "none",
    underline = false,
    weight = "regular",
  },
  ref,
): ReactElement {
  const Tag = as;

  const { themeName } = useTheme();

  const weightStyles =
    themeName === "classic"
      ? styles[classicWeight(weight)]
      : styles[`${cambioWeight(weight)}Cambio`];

  return (
    <Tag
      id={id}
      className={classNames(
        styles.typography,
        styles[align],
        weightStyles,
        themeName === "cambio" && fontStyle === "serif"
          ? styles.serif
          : styles.sansSerif,
        themeName === "cambio"
          ? cambioTextColor(color)
          : classicTextColor(color),
        inline && styles.inline,
        themeName === "classic"
          ? styles[
              `size${
                // TypeScript doesn't narrow the type of size with `.includes` so we have to do it manually
                // https://github.com/microsoft/TypeScript/issues/36275#issuecomment-643376433
                // One we ship Cambio, we can remove these checks
                size === 100 ||
                size === 200 ||
                size === 300 ||
                size === 500 ||
                size === 600 ||
                size === 700 ||
                size === 800
                  ? size
                  : 200
              }`
            ]
          : styles[`size${size}Cambio`],
        transform === "uppercase" && styles.uppercase,
        underline && styles.underline,
        lineClamp != null && styles.lineClamp,
      )}
      data-testid={dataTestId}
      style={{
        WebkitLineClamp: lineClamp,
      }}
      title={tooltip}
      ref={ref}
    >
      {children}
    </Tag>
  );
});

export default Typography;
