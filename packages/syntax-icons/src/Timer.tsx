import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Timer = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M21.6 0H2.4v4.8l6 7.2-6 7.2V24h19.2v-4.8l-6-7.2 6-7.2V0Zm-8.4 12v3l4.8 6.6H6l4.8-6.6v-3.015L6 6h12l-4.8 6Z"
    color={color}
    size={size}
  />
));
Timer.displayName = "Timer";
export default Timer;