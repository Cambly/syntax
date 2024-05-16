import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Stars = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 14.5 16 16l-1.5 6h-2L11 16l-6-1.5v-2l6-1.5 1.5-6h2l1.5 6 6 1.5zm-12-9-2.5-1-1-2.5h-1l-1 2.5-2.5 1v1l2.5 1 1 2.5h1l1-2.5 2.5-1z"
    color={color}
    size={size}
  />
));
Stars.displayName = "Stars";
export default Stars;
