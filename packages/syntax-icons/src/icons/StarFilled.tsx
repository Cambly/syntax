import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const StarFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "m22 11-.5-3.5h-6l-2-5.5h-3l-2 5.5h-6L2 11l4.5 3L4 20.5 7 22l5-4 5 4 3-1.5-2.5-6.5z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
StarFilled.displayName = "StarFilled";
export default StarFilled;
