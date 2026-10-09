import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Stop = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M3 3h18v18H3z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Stop.displayName = "Stop";
export default Stop;
