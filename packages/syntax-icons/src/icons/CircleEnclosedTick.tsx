import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CircleEnclosedTick = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m-2 15-4-4 1.5-1.5L10 14l6.5-6.5L18 9z"
    color={color}
    size={size}
  />
));
CircleEnclosedTick.displayName = "CircleEnclosedTick";
export default CircleEnclosedTick;
