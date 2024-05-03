import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Keyboard = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M0 3.6v16.8h24V3.6H0Zm10.8 3.6h2.4v2.4h-2.4V7.2Zm0 3.6h2.4v2.4h-2.4v-2.4ZM7.2 7.2h2.4v2.4H7.2V7.2Zm0 3.6h2.4v2.4H7.2v-2.4ZM6 13.2H3.6v-2.4H6v2.4Zm0-3.6H3.6V7.2H6v2.4ZM16.8 18H7.2v-2.4h9.6V18Zm0-4.8h-2.4v-2.4h2.4v2.4Zm0-3.6h-2.4V7.2h2.4v2.4Zm3.6 3.6H18v-2.4h2.4v2.4Zm0-3.6H18V7.2h2.4v2.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Keyboard.displayName = "Keyboard";
export default Keyboard;
