import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ArrowUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M3.5 10.5 5 12l6-6v16h2V6l6 6 1.5-1.5L12 2z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ArrowUp.displayName = "ArrowUp";
export default ArrowUp;
