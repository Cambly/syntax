import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const PhoneOn = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m17 13-3 3-6-6 3-3.05L7 2 2 7s-.02 4.98 5 10 10 5 10 5l5-5z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
PhoneOn.displayName = "PhoneOn";
export default PhoneOn;
