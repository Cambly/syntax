import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Timer = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M20 2H4v4l5 6-5 6v4h16v-4l-5-6 5-6zm-7 10v2.5l4 5.5H7l4-5.5v-2.512L7 7h10z"
    color={color}
    size={size}
  />
));
Timer.displayName = "Timer";
export default Timer;
