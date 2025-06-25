import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const UserRemove = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "m2 15 3-2 2.5 4 2.5-4 5 3 2 5H2zM7.5 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M22 10h-8v2h8z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
UserRemove.displayName = "UserRemove";
export default UserRemove;
