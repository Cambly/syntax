import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const ChevronUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m0 16.8 1.8 1.8L12 8.4l10.2 10.2 1.8-1.8-12-12-12 12Z"
    color={color}
    size={size}
  />
));
ChevronUp.displayName = "ChevronUp";
export default ChevronUp;
