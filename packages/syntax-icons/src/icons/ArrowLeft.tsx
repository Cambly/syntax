import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ArrowLeft = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M10.5 3.5 12 5l-6 6h16v2H6l6 6-1.5 1.5L2 12z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ArrowLeft.displayName = "ArrowLeft";
export default ArrowLeft;
