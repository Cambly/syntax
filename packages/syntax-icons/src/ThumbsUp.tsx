import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const ThumbsUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M3.6 8.4V24H0V8.4h3.6Zm9.6 0 1.081-3.785A3.62 3.62 0 0 0 10.8 0L6 8.4V24h14.4l3.6-7.2V8.4H13.2Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
ThumbsUp.displayName = "ThumbsUp";
export default ThumbsUp;
