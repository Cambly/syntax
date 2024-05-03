import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const PhoneOn = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="m18 13.2-3.6 3.6-7.2-7.2 3.6-3.66L6 0 0 6s-.024 5.976 6 12 12 6 12 6l6-6-6-4.8Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
PhoneOn.displayName = "PhoneOn";
export default PhoneOn;
