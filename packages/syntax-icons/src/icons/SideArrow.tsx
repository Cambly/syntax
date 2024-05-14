import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const SideArrow = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M13.8 1.8 12 3.6l7.2 7.2H0v2.4h19.2L12 20.4l1.8 1.8L24 12 13.8 1.8Z"
    color={color}
    size={size}
  />
));
SideArrow.displayName = "SideArrow";
export default SideArrow;
