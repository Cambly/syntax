import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const PhoneOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M3.78 15.42C-.004 10.374 0 6 0 6l6-6 4.8 5.94L7.2 9.6l1.2 1.2-4.62 4.62ZM1.8 24 24 1.8 22.2 0 0 22.2 1.8 24Zm12.6-7.2-1.2-1.2-4.62 4.62C13.626 24.004 18 24 18 24l6-6-6-4.8-3.6 3.6Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
PhoneOff.displayName = "PhoneOff";
export default PhoneOff;
