import { forwardRef, type Ref } from "react";
import type { TextColors } from "../colors/textColors";
import { type BaseTypographyProps } from "../BaseTypography/BaseTypography";
import { baseTypographyFactory } from "../BaseTypography/BaseTypography";

type ColorTextColors =
  | "cream"
  | "lilac"
  | "navy"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "sky"
  | "slate"
  | "tan"
  | "teal"
  | "thistle";

/**
 * [ColorTypography](https://cambly-syntax.vercel.app/?path=/docs/components-colortypography--docs) is a component that renders text with Cambio colors.
 */
const ColorTypography = forwardRef<
  HTMLDivElement,
  BaseTypographyProps<ColorTextColors>
>(function ColorTypographyWithRef(
  props: BaseTypographyProps<ColorTextColors>,
  ref: Ref<HTMLDivElement>,
) {
  const BaseTypography = baseTypographyFactory<TextColors>();
  return <BaseTypography {...props} ref={ref} />;
});

export default ColorTypography;
