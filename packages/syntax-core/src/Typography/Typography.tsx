import { forwardRef, type Ref } from "react";
import { type TextColors } from "../colors/textColors";
import {
  type BaseTypographyProps,
  baseTypographyFactory,
} from "../BaseTypography/BaseTypography";

type BaseTextColors =
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
 * [Typography](https://cambly-syntax.vercel.app/?path=/docs/components-typography--docs) is a component that renders text.
 */
const Typography = forwardRef<
  HTMLDivElement,
  BaseTypographyProps<BaseTextColors>
>(function TypographyWithRef(
  props: BaseTypographyProps<BaseTextColors>,
  ref: Ref<HTMLDivElement>,
) {
  const BaseTypography = baseTypographyFactory<TextColors>();
  return <BaseTypography {...props} ref={ref} />;
});

export default Typography;
