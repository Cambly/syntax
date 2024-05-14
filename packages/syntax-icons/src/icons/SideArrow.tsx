import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const SideArrow = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M13.5 3.5 12 5l6 6H2v2h16l-6 6 1.5 1.5L22 12z"
    color={color}
    size={size}
  />
));
SideArrow.displayName = "SideArrow";
export default SideArrow;
