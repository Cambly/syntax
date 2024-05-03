import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Hand = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M18 13.2V0h-3.6l-.6 10.8L12.6 0h-3v10.8l-1.8-9-3 .6.6 9.6L3 4.8 0 6l3 12c1.09 3.454 3.772 6 9 6 4.997 0 6.974-3.72 8.4-6 1.62-2.591 3.6-8.4 3.6-8.4l-3.6-1.8-2.4 5.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Hand.displayName = "Hand";
export default Hand;
