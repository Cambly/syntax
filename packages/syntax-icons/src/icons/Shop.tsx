import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Shop = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M21 22.1H3v-6h18zm1-15v7h-8v-2h-4v2H2v-7h6c0-2.206 1.794-4 4-4s4 1.794 4 4zm-8 0c0-1.103-.897-2-2-2s-2 .897-2 2z"
    color={color}
    size={size}
  />
));
Shop.displayName = "Shop";
export default Shop;
