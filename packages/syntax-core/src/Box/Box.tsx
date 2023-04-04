import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import styles from "./Box.module.css";
import marginStyles from "./margin.module.css";
import paddingStyles from "./padding.module.css";
import allColors from "../colors/allColors";
import colorStyles from "../colors/colors.module.css";

type AlignItems = "baseline" | "center" | "end" | "start" | "stretch";
type As =
  | "article"
  | "aside"
  | "caption"
  | "details"
  | "div"
  | "figcaption"
  | "figure"
  | "footer"
  | "header"
  | "main"
  | "nav"
  | "section"
  | "summary";
type Dimension = number | string;
type Direction = "row" | "column";
type Display = "flex" | "block" | "inlineBlock" | "visuallyHidden";
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
type Margin =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "auto";
type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Box is primitive design component and is used by lots of other components. It keeps details like spacing, borders and colors consistent across all of Syntax.
 *
 * Passthrough props:
 *  * `aria-*`
 *  * `data-testid`
 */
export default function Box(props: {
  /**
   * The alignment of the box on the cross axis.
   *
   * Responsive props:
   * * `smAlignItems`
   * * `lgAlignItems`
   */
  alignItems?: AlignItems;
  /**
   * Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   */
  alignSelf?: "auto" | "start" | "end" | "center" | "baseline" | "stretch";
  /**
   * The underlying DOM element usually set for accessibility or SEO reasons.
   *
   * @defaultValue "div"
   */
  as?: As;
  /**
   * The background color of the box.
   */
  color?: (typeof allColors)[number];
  /**
   * The children to be rendered inside the box.
   */
  children?: ReactNode;
  /**
   * An "escape hatch" used to apply styles not otherwise available on Box.
   *
   * Please use this sparingly and only when you have a good reason to.
   */
  dangerouslySetInlineStyle?: {
    __style: Record<string, string | number | null>;
  };
  /**
   * The flex direction of the box.
   *
   * Responsive props:
   * * `smDirection`
   * * `lgDirection`
   *
   * @defaultValue `row`
   */
  direction?: Direction;
  /**
   * The display property specifies the display behavior (the type of rendering box) of an element.
   *
   * Responsive props:
   * * `smDisplay`
   * * `lgDisplay`
   *
   * @defaultValue `block`
   */
  display?: Display;
  /**
   * By default, flex items will all try to fit onto one line. But if you specify `flexWrap="wrap"`, the flex items will wrap onto multiple lines.
   *
   * @defaultValue `nowrap`
   */
  flexWrap?: "wrap" | "nowrap";
  /**
   * The gap between the children of the box.
   */
  gap?: Gap;
  /**
   * The id of the element.
   */
  id?: string;
  /**
   * The alignment of the box on the cross axis on lg (960px) or larger viewports.
   */
  lgAlignItems?: AlignItems;
  /**
   * The flex direction on lg (960px) or larger viewports.
   */
  lgDirection?: Direction;
  /**
   * The display style on lg (960px) or larger viewports.
   */
  lgDisplay?: Display;
  /**
   * The alignment of the box on the cross axis on lg (960px) or larger viewports.
   */
  lgJustifyContent?: JustifyContent;
  /**
   * Margin on lg (960px) or larger viewports.
   */
  lgMargin?: Margin;
  /**
   * Bottom margin on lg (960px) or larger viewports.
   */
  lgMarginBottom?: Margin;
  /**
   * Margin to the right in left-to-right languages, and to the left in right-to-left languages on lg (960px) or larger viewports.
   */
  lgMarginEnd?: Margin;
  /**
   * Margin to the left in left-to-right languages, and to the right in right-to-left languages on lg (960px) or larger viewports.
   */
  lgMarginStart?: Margin;
  /**
   * Top margin on lg (960px) or larger viewports.
   */
  lgMarginTop?: Margin;
  /**
   * The padding of the box on lg (960px) or larger viewports.
   */
  lgPadding?: Padding;
  /**
   * The padding of the box on the x-axis on lg (960px) or larger viewports.
   */
  lgPaddingX?: Padding;
  /**
   * The padding of the box on the y-axis on lg (960px) or larger viewports.
   */
  lgPaddingY?: Padding;
  /**
   * The margin of the box.
   *
   * Responsive props:
   * * `smMargin`
   * * `lgMargin`
   *
   * @defaultValue 0
   */
  margin?: Margin;
  /**
   * Bottom margin of the box.
   *
   * Responsive props:
   * * `smMarginBottom`
   * * `lgMarginBottom`
   *
   */
  marginBottom?: Margin;
  /**
   * Margin to the right in left-to-right languages, and to the left in right-to-left languages.
   *
   * Responsive props:
   * * `smMarginEnd`
   * * `lgMarginEnd`
   *
   */
  marginEnd?: Margin;
  /**
   * Margin to the left in left-to-right languages, and to the right in right-to-left languages.
   *
   * Responsive props:
   * * `smMarginStart`
   * * `lgMarginStart`
   *
   */
  marginStart?: Margin;
  /**
   * Top margin of the box.
   *
   * Responsive props:
   * * `smMarginTop`
   * * `lgMarginTop`
   *
   */
  marginTop?: Margin;
  /**
   * The maximum height of the box.
   */
  maxHeight?: Dimension;
  /**
   * The maximum width of the box.
   */
  maxWidth?: Dimension;
  /**
   * The minimum height of the box.
   */
  minHeight?: Dimension;
  /**
   * The minimum width of the box.
   */
  minWidth?: Dimension;
  /**
   * The height of the box.
   */
  height?: Dimension;
  /**
   * The alignment of the box on the main axis.
   *
   * Responsive props:
   * * `smJustifyContent`
   * * `lgJustifyContent`
   *
   * @defaultValue "start"
   */
  justifyContent?: JustifyContent;
  /**
   * The padding of the box.
   *
   * Responsive props:
   * * `smPadding`
   * * `lgPadding`
   *
   * @defaultValue 0
   */
  padding?: Padding;
  /**
   * The padding of the box on the x-axis.
   *
   * Responsive props:
   * * `smPaddingX`
   * * `lgPaddingX`
   *
   */
  paddingX?: Padding;
  /**
   * The padding of the box on the y-axis.
   *
   * Responsive props:
   * * `smPaddingY`
   * * `lgPaddingY`
   */
  paddingY?: Padding;
  /**
   * The position of the box.
   *
   * @defaultValue "static"
   */
  position?: "static" | "absolute" | "relative" | "fixed";
  /**
   * Border radius of the box.
   *
   * * `none`: 0px
   * * `sm`: 8px
   * * `md`: 12px
   * * `lg`: 16px
   * * `xl`: 24px
   * * `pill`: 999px
   *
   * @defaultValue "none"
   */
  rounding?: "xl" | "lg" | "md" | "sm" | "pill" | "none";
  /**
   * The alignment of the box on the cross axis on sm (480px) or larger viewports.
   */
  smAlignItems?: AlignItems;
  /**
   * The flex direction on sm (480px) or larger viewports.
   */
  smDirection?: Direction;
  /**
   * The display style on sm (480px) or larger viewports.
   */
  smDisplay?: Display;
  /**
   * The alignment of the box on the main axis on sm (480px) or larger viewports.
   */
  smJustifyContent?: JustifyContent;
  /**
   * Margin on sm (480px) or larger viewports.
   */
  smMargin?: Margin;
  /**
   * Bottom margin on sm (480px) or larger viewports.
   */
  smMarginBottom?: Margin;
  /**
   * Margin to the right in left-to-right languages, and to the left in right-to-left languages on sm (480px) or larger viewports.
   */
  smMarginEnd?: Margin;
  /**
   * Margin to the left in left-to-right languages, and to the right in right-to-left languages on sm (480px) or larger viewports.
   */
  smMarginStart?: Margin;
  /**
   * Top margin on sm (480px) or larger viewports.
   */
  smMarginTop?: Margin;
  /**
   * The padding of the box on sm (480px) or larger viewports.
   */
  smPadding?: Padding;
  /**
   * The padding of the box on the x-axis on sm (480px) or larger viewports.
   */
  smPaddingX?: Padding;
  /**
   * The padding of the box on the y-axis on sm (480px) or larger viewports.
   */
  smPaddingY?: Padding;
  /**
   * The width of the box.
   */
  width?: Dimension;
}): ReactElement {
  const { as: BoxElement = "div", children, ...boxProps } = props;

  const {
    // Classname
    alignItems,
    smAlignItems,
    lgAlignItems,
    alignSelf,
    color,
    direction,
    smDirection,
    lgDirection,
    display,
    smDisplay,
    lgDisplay,
    flexWrap,
    gap,
    justifyContent,
    smJustifyContent,
    lgJustifyContent,
    // Margin
    margin,
    marginBottom,
    marginEnd,
    marginStart,
    marginTop,
    smMargin,
    smMarginBottom,
    smMarginEnd,
    smMarginStart,
    smMarginTop,
    lgMargin,
    lgMarginBottom,
    lgMarginEnd,
    lgMarginStart,
    lgMarginTop,
    // Padding
    padding,
    paddingX,
    paddingY,
    smPadding,
    smPaddingX,
    smPaddingY,
    lgPadding,
    lgPaddingX,
    lgPaddingY,
    position,
    rounding,
    // Style
    dangerouslySetInlineStyle,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    ...maybePassThroughProps
  } = boxProps;

  const parsedProps = {
    className: classNames(
      styles.box,
      alignItems && styles[`alignItems${alignItems}`],
      smAlignItems && styles[`alignItems${smAlignItems}Small`],
      lgAlignItems && styles[`alignItems${lgAlignItems}Large`],
      alignSelf && styles[`alignSelf${alignSelf}`],
      color && colorStyles[`${color}BackgroundColor`],
      direction && styles[direction],
      smDirection && styles[`${smDirection}Small`],
      lgDirection && styles[`${lgDirection}Large`],
      display && styles[display],
      smDisplay && styles[`${smDisplay}Small`],
      lgDisplay && styles[`${lgDisplay}Large`],
      flexWrap && styles.flexWrap,
      gap && styles[`gap${gap}`],
      margin && !marginBottom && marginStyles[`marginBottom${margin}`],
      margin && !marginEnd && marginStyles[`marginEnd${margin}`],
      margin && !marginStart && marginStyles[`marginStart${margin}`],
      margin && !marginTop && marginStyles[`marginTop${margin}`],
      marginBottom && marginStyles[`marginBottom${marginBottom}`],
      marginEnd && marginStyles[`marginEnd${marginEnd}`],
      marginStart && marginStyles[`marginStart${marginStart}`],
      marginTop && marginStyles[`marginTop${marginTop}`],
      smMargin &&
        !smMarginBottom &&
        marginStyles[`marginBottom${smMargin}Small`],
      smMargin && !smMarginEnd && marginStyles[`marginEnd${smMargin}Small`],
      smMargin && !smMarginStart && marginStyles[`marginStart${smMargin}Small`],
      smMargin && !smMarginTop && marginStyles[`marginTop${smMargin}Small`],
      smMarginBottom && marginStyles[`marginBottom${smMarginBottom}Small`],
      smMarginEnd && marginStyles[`marginEnd${smMarginEnd}Small`],
      smMarginStart && marginStyles[`marginStart${smMarginStart}Small`],
      smMarginTop && marginStyles[`marginTop${smMarginTop}Small`],
      lgMargin &&
        !lgMarginBottom &&
        marginStyles[`marginBottom${lgMargin}Large`],
      lgMargin && !lgMarginEnd && marginStyles[`marginEnd${lgMargin}Large`],
      lgMargin && !lgMarginStart && marginStyles[`marginStart${lgMargin}Large`],
      lgMargin && !lgMarginTop && marginStyles[`marginTop${lgMargin}Large`],
      lgMarginBottom && marginStyles[`marginBottom${lgMarginBottom}Large`],
      lgMarginEnd && marginStyles[`marginEnd${lgMarginEnd}Large`],
      lgMarginStart && marginStyles[`marginStart${lgMarginStart}Large`],
      lgMarginTop && marginStyles[`marginTop${lgMarginTop}Large`],
      padding && !paddingX && paddingStyles[`paddingX${padding}`],
      padding && !paddingY && paddingStyles[`paddingY${padding}`],
      paddingX && paddingStyles[`paddingX${paddingX}`],
      paddingY && paddingStyles[`paddingY${paddingY}`],
      smPadding && !smPaddingX && paddingStyles[`paddingX${smPadding}Small`],
      smPadding && !smPaddingY && paddingStyles[`paddingY${smPadding}Small`],
      smPaddingX && paddingStyles[`paddingX${smPaddingX}Small`],
      smPaddingY && paddingStyles[`paddingY${smPaddingY}Small`],
      lgPadding && !lgPaddingX && paddingStyles[`paddingX${lgPadding}Large`],
      lgPadding && !lgPaddingX && paddingStyles[`paddingY${lgPadding}Large`],
      lgPaddingX && paddingStyles[`paddingX${lgPaddingX}Large`],
      lgPaddingY && paddingStyles[`paddingY${lgPaddingY}Large`],
      justifyContent && styles[`justifyContent${justifyContent}`],
      smJustifyContent && styles[`justifyContent${smJustifyContent}Small`],
      lgJustifyContent && styles[`justifyContent${lgJustifyContent}Large`],
      position && position !== "static" && styles[position],
      rounding && rounding !== "none" && styles[`rounding${rounding}`],
    ),
    style: {
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
      ...(dangerouslySetInlineStyle?.__style ?? {}),
    },
  };

  const passthroughProps = Object.entries(maybePassThroughProps).reduce<
    Record<string, number | string | undefined>
  >((acc, [key]) => {
    if (
      key === "id" ||
      key.startsWith("aria-") ||
      key.startsWith("data-testid")
    ) {
      // @ts-expect-error unsafe assignment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      acc[key] = maybePassThroughProps[key];
    }
    return acc;
  }, {});

  return (
    <BoxElement {...parsedProps} {...passthroughProps}>
      {children}
    </BoxElement>
  );
}
