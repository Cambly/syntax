import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const StarHalfFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m22 11-.5-3.5h-6l-2-5.5h-3l-2 5.5h-6L2 11l4.5 3L4 20.5 7 22l5-4 5 4 3-1.5-2.5-6.5zm-10 4.5V4l2 5.5h6L15 13l2.5 6.5z"
    color={color}
    size={size}
  />
));
StarHalfFilled.displayName = "StarHalfFilled";
export default StarHalfFilled;
