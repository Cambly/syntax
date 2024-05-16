import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const PhoneOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M5.15 14.85C1.996 10.645 2 7 2 7l5-5 4 4.95L8 10l1 1zM3.5 22 22 3.5 20.5 2 2 20.5zM14 16l-1-1-3.85 3.85C13.355 22.004 17 22 17 22l5-5-5-4z"
    color={color}
    size={size}
  />
));
PhoneOff.displayName = "PhoneOff";
export default PhoneOff;
