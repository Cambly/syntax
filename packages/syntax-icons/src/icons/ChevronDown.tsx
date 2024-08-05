import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ChevronDown = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m3 9.475 1.35-1.35 7.65 7.65 7.65-7.65L21 9.475l-9 9z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ChevronDown.displayName = "ChevronDown";
export default ChevronDown;
