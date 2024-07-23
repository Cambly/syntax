import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const TwoUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M11 20H2v-5l2-1 2.5 3L9 14l2 1zm11 0v-7l-2-1-2.5 3-2.5-3-2 1v7zM17.5 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7m-11 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
TwoUsers.displayName = "TwoUsers";
export default TwoUsers;
