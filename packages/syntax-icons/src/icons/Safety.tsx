import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Safety = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M14 2h-4L3 6v2.45S3 18 12 22c9-4 9-13.55 9-13.55V6zm-3 14-4-4 1.5-1.5L11 13l5.5-5.5L18 9z"
    color={color}
    size={size}
  />
));
Safety.displayName = "Safety";
export default Safety;
