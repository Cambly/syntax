import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const ChevronLeft = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m16.8 0 1.8 1.8L8.4 12l10.2 10.2-1.8 1.8-12-12 12-12Z"
    color={color}
    size={size}
  />
));
ChevronLeft.displayName = "ChevronLeft";
export default ChevronLeft;
