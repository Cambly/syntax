import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const AddUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="m0 15.6 3.6-2.4 3 4.8 3-4.8 6 3.6 2.4 6H0v-7.2ZM6.6 1.2a5.4 5.4 0 1 0 0 10.8 5.4 5.4 0 0 0 0-10.8ZM24 9.6h-3.6V6H18v3.6h-3.6V12H18v3.6h2.4V12H24V9.6Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
AddUsers.displayName = "AddUsers";
export default AddUsers;
