import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ChevronRight = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m9.475 21-1.35-1.35 7.65-7.65-7.65-7.65L9.475 3l9 9z"
    color={color}
    size={size}
  />
));
ChevronRight.displayName = "ChevronRight";
export default ChevronRight;
