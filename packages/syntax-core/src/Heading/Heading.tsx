import { type ComponentProps, type ReactElement, type ReactNode } from "react";
import Typography from "../Typography/Typography";

function weight({
  fontStyle,
  size,
}: {
  fontStyle: ComponentProps<typeof Heading>["fontStyle"];
  size: ComponentProps<typeof Heading>["size"];
}): "bold" | "medium" | "regular" {
  if (fontStyle === "serif" && size === 400) {
    return "bold";
  } else if (fontStyle === "serif") {
    return "medium";
  } else {
    return "regular";
  }
}

/**
 * [Heading](https://cambly-syntax.vercel.app/?path=/docs/components-heading--docs) enforces a consistent style & accessibility best practices for headings.
 */
const Heading = ({
  align = "start",
  as = "h1",
  children,
  color = "gray900",
  "data-testid": dataTestId,
  fontStyle = "sans-serif",
  lineClamp,
  size = 400,
}: {
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
   * @defaultValue "h1"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * The text to be rendered
   */
  children?: ReactNode;
  /**
   * The color of the text.
   *
   * @defaultValue "gray900"
   */
  color?:
    | "gray900"
    | "gray700"
    | "primary"
    | "destructive-primary"
    | "success"
    | "white"
    | "inherit";
  /**
   * Test id for the text.
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
   * The number of lines we should truncate the text at
   */
  lineClamp?: number | undefined;
  /**
   * Size of the text
   *
   * Mobile: (viewport width < 480px):
   * * `400`: 25px
   * * `500`: 32px
   * * `700`: 38px
   * * `800`: 46px
   * * `900`: 55px
   * * `1100`: 83px
   *
   * Desktop (viewport width >= 480px):
   * * `400`: 25px
   * * `500`: 32px
   * * `700`: 49px
   * * `800`: 63px
   * * `900`: 76px
   * * `1100`: 119px
   *
   * @defaultValue 400
   */
  size?: 400 | 500 | 700 | 800 | 900 | 1100;
}): ReactElement => {
  return (
    <Typography
      align={align}
      as={as}
      color={color}
      fontStyle={fontStyle}
      data-testid={dataTestId}
      lineClamp={lineClamp}
      size={size}
      weight={weight({ fontStyle, size })}
    >
      {children}
    </Typography>
  );
};

export default Heading;
