import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Menu = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M21 13.8H3v-3.6h18zm0-9.9H3v3.6h18zm0 12.6H3v3.6h18z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Menu.displayName = "Menu";
export default Menu;
