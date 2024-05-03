import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const HangUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M12 6C3.969 6 0 10.02 0 10.02V18l7.2-1.2v-4.2h9.6v4.2L24 18v-7.98S20.031 6 12 6Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
HangUp.displayName = "HangUp";
export default HangUp;
