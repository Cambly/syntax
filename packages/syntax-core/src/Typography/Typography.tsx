import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import { Color } from "../constants";
import styles from "./Typography.module.css";
import colorStyles from "../colors/colors.module.css";

function textColor(color: (typeof Color)[number]): string {
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
      return colorStyles.destructive700Color;
    default:
      return colorStyles.gray900Color;
  }
}

/**
 * Typography is a component that renders text.
 */
const Typography = ({
  align = "start",
  as = "div",
  children,
  color = "gray900",
  inline = false,
  lineClamp,
  size = 200,
  tooltip,
  transform = "none",
  underline = false,
  weight = "regular",
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
   * @defaultValue "gray900"
   */
  color?: (typeof Color)[number];
  /**
   * Whether the text should flow inline with other elements.
   *
   * @defaultValue false
   */
  inline?: boolean;
  /**
   * The number of lines we should truncate the text at
   *
   * @defaultValue null
   */
  lineClamp?: number;
  /**
   * Size of the text.
   *
   * * `100`: 12px
   * * `200`: 14px
   * * `300`: 16px
   * * `500`: 20px
   * * `600`: 28px
   * * `700`: 40px
   * * `800`: 64px
   *
   * @defaultValue 200
   */
  size?: 100 | 200 | 300 | 500 | 600 | 700 | 800;
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
   * @defaultValue "regular"
   */
  weight?: "regular" | "semiBold" | "bold" | "heavy";
}): ReactElement => {
  const Tag = as;

  return (
    <Tag
      className={classNames(
        styles.typography,
        styles[align],
        styles[weight],
        textColor(color),
        inline && styles.inline,
        styles[`size${size}`],
        transform === "uppercase" && styles.uppercase,
        underline && styles.underline,
        lineClamp != null && styles.lineClamp,
      )}
      style={{
        WebkitLineClamp: lineClamp,
      }}
      title={tooltip}
    >
      {children}
    </Tag>
  );
};

export default Typography;
