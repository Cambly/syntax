import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ArrowDown = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M20.5 13.5 19 12l-6 6V2h-2v16l-6-6-1.5 1.5L12 22z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ArrowDown.displayName = "ArrowDown";
export default ArrowDown;
