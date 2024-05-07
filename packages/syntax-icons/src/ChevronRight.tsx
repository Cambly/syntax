import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const ChevronRight = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m7.2 24-1.8-1.8L15.6 12 5.4 1.8 7.2 0l12 12-12 12Z"
    color={color}
    size={size}
  />
));
ChevronRight.displayName = "ChevronRight";
export default ChevronRight;
