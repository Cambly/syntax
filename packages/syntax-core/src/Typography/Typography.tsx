import classNames from "classnames";
import { forwardRef, type ReactElement, type ReactNode } from "react";
import styles from "./Typography.module.css";
import textColor from "../colors/textColors";

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
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
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
      | "destructive-darkBackground"
      | "destructive-lightBackground"
      | "success"
      | "success-darkBackground"
      | "white"
      | "white-secondary"
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
     * Mobile (viewport width <= 480px)::
     * * `0`: 12px
     * * `100`: 13px
     * * `200`: 16px
     * * `300`: 19px
     * * `400`: 25px
     * * `500`: 32px
     * * `700`: 38px
     * * `800`: 46px
     * * `900`: 55px
     * * `1100`: 83px
     *
     * Desktop (viewport width > 480px):
     * * `0`: 12px
     * * `100`: 13px
     * * `200`: 16px
     * * `300`: 20px
     * * `400`: 25px
     * * `500`: 32px
     * * `700`: 44px
     * * `800`: 63px
     * * `900`: 76px
     * * `1100`: 119px
     *
     * @defaultValue 200
     */
    size?: 0 | 100 | 200 | 300 | 400 | 500 | 700 | 800 | 900 | 1100;
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
     * * `regular`: 400
     * * `medium`: 510
     * * `semiBold`: 590
     * * `bold`: 710
     *
     * @defaultValue "regular"
     */
    weight?: "regular" | "medium" | "semiBold" | "bold";
    /**
     * Controls how whitespace within the element is handled.
     *
     * See: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
     *
     * @defaultValue "inherit"
     */
    whiteSpace?: "inherit" | "normal" | "nowrap" | "preLine";
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
    whiteSpace = "inherit",
  },
  ref,
): ReactElement {
  const Tag = as;

  return (
    <Tag
      id={id}
      className={classNames(
        styles.typography,
        styles[align],
        styles[weight],
        styles[whiteSpace],
        fontStyle === "serif" ? styles.serif : styles.sansSerif,
        textColor(color),
        inline && styles.inline,
        styles[`size${size}`],
        transform === "uppercase" && styles.uppercase,
        underline && styles.underline,
        lineClamp != null && styles.lineClamp,
        as === "p" && styles[`p${size}`],
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
