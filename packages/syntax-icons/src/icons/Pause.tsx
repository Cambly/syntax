import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Pause = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M10 21H6V3h4zm8-18h-4v18h4z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Pause.displayName = "Pause";
export default Pause;
