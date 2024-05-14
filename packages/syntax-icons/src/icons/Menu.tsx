import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Menu = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M24 14.4H0V9.6h24v4.8Zm0-13.2H0V6h24V1.2ZM24 18H0v4.8h24V18Z"
    color={color}
    size={size}
  />
));
Menu.displayName = "Menu";
export default Menu;
