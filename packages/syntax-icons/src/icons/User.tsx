import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const User = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m3 16.5 6.3-2.7 2.7 4.5 2.7-4.5 6.3 2.7V21H3zM12 3a4.95 4.95 0 1 0 0 9.9A4.95 4.95 0 0 0 12 3"
    color={color}
    size={size}
  />
));
User.displayName = "User";
export default User;
