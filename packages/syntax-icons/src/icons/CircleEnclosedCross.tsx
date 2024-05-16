import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CircleEnclosedCross = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m5.2 13.8-1.4 1.4-3.8-3.775L8.2 17.2l-1.4-1.4 3.775-3.8L6.8 8.2l1.4-1.4 3.8 3.775L15.8 6.8l1.4 1.4-3.775 3.8z"
    color={color}
    size={size}
  />
));
CircleEnclosedCross.displayName = "CircleEnclosedCross";
export default CircleEnclosedCross;
