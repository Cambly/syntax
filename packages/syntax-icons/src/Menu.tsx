import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Menu = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M24 14.4H0V9.6h24v4.8Zm0-13.2H0V6h24V1.2ZM24 18H0v4.8h24V18Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Menu.displayName = "Menu";
export default Menu;
