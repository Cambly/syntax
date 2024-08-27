import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Check = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M21.678 6.864 8.95 19.592l-6.364-6.364L4 11.814l4.95 4.95L20.264 5.45z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Check.displayName = "Check";
export default Check;
