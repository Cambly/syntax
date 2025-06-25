import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Progress = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M20 22h-4V2h4zM14 7h-4v15h4zm-6 5H4v10h4z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Progress.displayName = "Progress";
export default Progress;
