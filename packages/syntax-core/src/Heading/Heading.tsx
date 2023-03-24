import { ReactElement, ReactNode } from "react";
import { Color } from "../constants";
import Typography from "../Typography/Typography";
/**
 * Heading enforces a consistent style & accessibility best practices for headings.
 */
const Heading = ({
  align = "start",
  as = "h1",
  children,
  color = "gray900",
  size = 500,
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
  color?: (typeof Color)[number];
  /**
   * Size of the text.
   *
   * * `500`: 20px
   * * `600`: 28px
   * * `700`: 40px
   * * `800`: 64px
   *
   * @defaultValue 500
   */
  size?: 500 | 600 | 700 | 800;
}): ReactElement => {
  return (
    <Typography align={align} as={as} color={color} size={size} weight="bold">
      {children}
    </Typography>
  );
};

export default Heading;
