import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ChevronLeft = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m14.525 3 1.35 1.35L8.225 12l7.65 7.65-1.35 1.35-9-9z"
    color={color}
    size={size}
  />
));
ChevronLeft.displayName = "ChevronLeft";
export default ChevronLeft;
