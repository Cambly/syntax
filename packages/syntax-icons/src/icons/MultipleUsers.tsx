import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const MultipleUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M4.5 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M7 15l-1-1-1.5 1L3 14l-1 1v5h3zm12.5-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m2.5 7-1-1-1.5 1-1.5-1-1 1 2 5h3zm-7-3-1-1-2 2-2-2-1 1-2 8h10z"
    color={color}
    size={size}
  />
));
MultipleUsers.displayName = "MultipleUsers";
export default MultipleUsers;
