import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Shop = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22.8 24H1.2v-7.2h21.6V24ZM24 6v8.4h-9.6V12H9.6v2.4H0V6h7.2c0-2.647 2.153-4.8 4.8-4.8s4.8 2.153 4.8 4.8H24Zm-9.6 0c0-1.323-1.077-2.4-2.4-2.4A2.403 2.403 0 0 0 9.6 6h4.8Z"
    color={color}
    size={size}
  />
));
Shop.displayName = "Shop";
export default Shop;
