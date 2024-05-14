import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const AddUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m2 15 3-2 2.5 4 2.5-4 5 3 2 5H2zM7.5 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M22 10h-3V7h-2v3h-3v2h3v3h2v-3h3z"
    color={color}
    size={size}
  />
));
AddUsers.displayName = "AddUsers";
export default AddUsers;
