import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const ChevronDown = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m0 7.2 1.8-1.8L12 15.6 22.2 5.4 24 7.2l-12 12-12-12Z"
    color={color}
    size={size}
  />
));
ChevronDown.displayName = "ChevronDown";
export default ChevronDown;
