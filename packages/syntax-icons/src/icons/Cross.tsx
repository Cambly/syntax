import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Cross = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M21 4.299 19.701 3 12 10.701 4.299 3 3 4.299 10.701 12 3 19.701 4.299 21 12 13.299 19.701 21 21 19.701 13.299 12z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Cross.displayName = "Cross";
export default Cross;
