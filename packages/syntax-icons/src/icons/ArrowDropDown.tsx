import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ArrowDropDown = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m4.5 8.25 7.5 7.5 7.5-7.5z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ArrowDropDown.displayName = "ArrowDropDown";
export default ArrowDropDown;
