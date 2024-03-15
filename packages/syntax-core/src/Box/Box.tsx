import classNames from "classnames";
import { type AriaRole, type ReactElement, type ReactNode } from "react";
import styles from "./Box.module.css";
import marginStyles from "./margin.module.css";
import paddingStyles from "./padding.module.css";
import type allColors from "../colors/allColors";
import colorStyles from "../colors/colors.module.css";
import roundingStyles from "../rounding.module.css";
import { forwardRef } from "react";
import { useTheme } from "../ThemeProvider/ThemeProvider";

type AlignItems = "baseline" | "center" | "end" | "start" | "stretch";
type As =
  | "article"
  | "aside"
  | "caption"
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
type Display =
  | "none"
  | "flex"
  | "block"
  | "inlineBlock"
  | "inlineFlex"
  | "visuallyHidden";
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
type Overflow =
  | "visible"
  | "hidden"
  | "scroll"
  | "auto"
  | "inherit"
  | "initial";

type BoxProps = {
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
  backgroundColor?: (typeof allColors)[number];
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
   * Sets the flex behavior of a flex item.
   *
   * * `none`: The item will not grow or shrink
   * * `shrink`: The item will shrink if necessary (default browser behavior)
   * * `grow`: The item will grow if necessary
   *
   * @defaultValue `shrink`
   */
  flex?: "none" | "shrink" | "grow";
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
   * How box behaves when content does not fit in the box on both axes.
   *
   * * `visible`
   * * `hidden`
   * * `scroll`
   * * `auto`
   * * `inherit`
   * * `initial`
   *
   * @defaultValue "visible"
   */
  overflow?: Overflow;
  /**
   * How box behaves when content does not fit in the box on the X axis.
   *
   * * `visible`
   * * `hidden`
   * * `scroll`
   * * `auto`
   * * `inherit`
   * * `initial`
   *
   * @defaultValue "visible"
   */
  overflowX?: Overflow;
  /**
   * How box behaves when content does not fit in the box on the Y axis.
   *
   * * `visible`
   * * `hidden`
   * * `scroll`
   * * `auto`
   * * `inherit`
   * * `initial`
   *
   * @defaultValue "visible"
   */
  overflowY?: Overflow;
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
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  /**
   * The role attribute of the box.
   *
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) for the list of valid roles.
   */
  role?: AriaRole;
  /**
   * Border radius of the box.
   *
   * Classic:
   * * `none`: 0px
   * * `sm`: 8px
   * * `md`: 12px
   * * `lg`: 16px
   * * `xl`: 24px
   * * `full`: 999px
   *
   * Cambio:
   * * `none`: 0px
   * * `sm`: 4px
   * * `md`: 8px
   * * `lg`: 8px (maps to `md`)
   * * `xl`: 8px (maps to `md`)
   * * `full`: 999px
   *
   * @defaultValue "none"
   */
  rounding?: "xl" | "lg" | "md" | "sm" | "full" | "none";
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
};

function roundingCambio(
  rounding: "sm" | "md" | "lg" | "xl" | "full",
): "sm" | "md" | "full" {
  if (rounding === "lg" || rounding === "xl") {
    return "md";
  }
  return rounding;
}

/**
 * [Box](https://cambly-syntax.vercel.app/?path=/docs/components-box--docs) is primitive design component and is used by lots of other components. It keeps details like spacing, borders and colors consistent across all of Syntax.
 *
 * Passthrough props:
 *  * `aria-*`
 *  * `data-testid`
 */
const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  props: BoxProps,
  ref,
): ReactElement {
  const { as: BoxElement = "div", children, ...boxProps } = props;
  const { themeName } = useTheme();

  const {
    // Classname
    alignItems,
    smAlignItems,
    lgAlignItems,
    alignSelf,
    backgroundColor,
    direction,
    smDirection,
    lgDirection,
    display,
    smDisplay,
    lgDisplay,
    flex,
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
    // Overflow
    overflow,
    overflowX,
    overflowY,
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

  const classicRoundingStyle =
    themeName === "classic" && rounding && rounding !== "none"
      ? roundingStyles[`rounding${rounding}`]
      : undefined;
  const cambioRoundingStyles =
    themeName === "cambio" && rounding && rounding !== "none"
      ? roundingStyles[`rounding${roundingCambio(rounding)}Cambio`]
      : undefined;

  const parsedProps = {
    className: classNames(
      styles.box,
      alignItems && styles[`alignItems${alignItems}`],
      smAlignItems && styles[`alignItems${smAlignItems}Small`],
      lgAlignItems && styles[`alignItems${lgAlignItems}Large`],
      alignSelf && styles[`alignSelf${alignSelf}`],
      backgroundColor && colorStyles[`${backgroundColor}BackgroundColor`],
      direction && styles[direction],
      smDirection && styles[`${smDirection}Small`],
      lgDirection && styles[`${lgDirection}Large`],
      display && styles[display],
      smDisplay && styles[`${smDisplay}Small`],
      lgDisplay && styles[`${lgDisplay}Large`],
      flex && (flex === "none" || flex === "grow") && styles[`flex${flex}`],
      flexWrap && styles.flexWrap,
      gap != null && styles[`gap${gap}`],
      margin != null && !marginBottom && marginStyles[`marginBottom${margin}`],
      margin != null && !marginEnd && marginStyles[`marginEnd${margin}`],
      margin != null && !marginStart && marginStyles[`marginStart${margin}`],
      margin != null && !marginTop && marginStyles[`marginTop${margin}`],
      marginBottom != null && marginStyles[`marginBottom${marginBottom}`],
      marginEnd != null && marginStyles[`marginEnd${marginEnd}`],
      marginStart != null && marginStyles[`marginStart${marginStart}`],
      marginTop != null && marginStyles[`marginTop${marginTop}`],
      smMargin != null &&
        !smMarginBottom &&
        marginStyles[`marginBottom${smMargin}Small`],
      smMargin != null &&
        !smMarginEnd &&
        marginStyles[`marginEnd${smMargin}Small`],
      smMargin != null &&
        !smMarginStart &&
        marginStyles[`marginStart${smMargin}Small`],
      smMargin != null &&
        !smMarginTop &&
        marginStyles[`marginTop${smMargin}Small`],
      smMarginBottom != null &&
        marginStyles[`marginBottom${smMarginBottom}Small`],
      smMarginEnd != null && marginStyles[`marginEnd${smMarginEnd}Small`],
      smMarginStart != null && marginStyles[`marginStart${smMarginStart}Small`],
      smMarginTop != null && marginStyles[`marginTop${smMarginTop}Small`],
      lgMargin != null &&
        !lgMarginBottom &&
        marginStyles[`marginBottom${lgMargin}Large`],
      lgMargin != null &&
        !lgMarginEnd &&
        marginStyles[`marginEnd${lgMargin}Large`],
      lgMargin != null &&
        !lgMarginStart &&
        marginStyles[`marginStart${lgMargin}Large`],
      lgMargin != null &&
        !lgMarginTop &&
        marginStyles[`marginTop${lgMargin}Large`],
      lgMarginBottom != null &&
        marginStyles[`marginBottom${lgMarginBottom}Large`],
      lgMarginEnd != null && marginStyles[`marginEnd${lgMarginEnd}Large`],
      lgMarginStart != null && marginStyles[`marginStart${lgMarginStart}Large`],
      lgMarginTop != null && marginStyles[`marginTop${lgMarginTop}Large`],
      padding != null && !paddingX && paddingStyles[`paddingX${padding}`],
      padding != null && !paddingY && paddingStyles[`paddingY${padding}`],
      paddingX != null && paddingStyles[`paddingX${paddingX}`],
      paddingY != null && paddingStyles[`paddingY${paddingY}`],
      smPadding != null &&
        !smPaddingX &&
        paddingStyles[`paddingX${smPadding}Small`],
      smPadding != null &&
        !smPaddingY &&
        paddingStyles[`paddingY${smPadding}Small`],
      smPaddingX != null && paddingStyles[`paddingX${smPaddingX}Small`],
      smPaddingY != null && paddingStyles[`paddingY${smPaddingY}Small`],
      lgPadding != null &&
        !lgPaddingX &&
        paddingStyles[`paddingX${lgPadding}Large`],
      lgPadding != null &&
        !lgPaddingX &&
        paddingStyles[`paddingY${lgPadding}Large`],
      lgPaddingX != null && paddingStyles[`paddingX${lgPaddingX}Large`],
      lgPaddingY != null && paddingStyles[`paddingY${lgPaddingY}Large`],
      justifyContent && styles[`justifyContent${justifyContent}`],
      smJustifyContent && styles[`justifyContent${smJustifyContent}Small`],
      lgJustifyContent && styles[`justifyContent${lgJustifyContent}Large`],
      position && position !== "static" && styles[position],
      classicRoundingStyle,
      cambioRoundingStyles,
      overflow && styles[`overflow${overflow}`],
      overflowX && styles[`overflowX${overflowX}`],
      overflowY && styles[`overflowY${overflowY}`],
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
      key === "role" ||
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
    <BoxElement {...parsedProps} {...passthroughProps} ref={ref}>
      {children}
    </BoxElement>
  );
});

export default Box;
