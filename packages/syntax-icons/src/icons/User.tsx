import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const User = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m0 18 8.4-3.6 3.6 6 3.6-6L24 18v6H0v-6ZM12 0a6.6 6.6 0 1 0 0 13.2A6.6 6.6 0 0 0 12 0Z"
    color={color}
    size={size}
  />
));
User.displayName = "User";
export default User;
