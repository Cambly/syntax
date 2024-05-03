import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const WifiRouter = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M0 14.4v7.2h24v-7.2H0Zm7.2 4.8H2.4v-2.4h4.8v2.4Zm7.2 0H12v-2.4h2.4v2.4Zm3.6 0h-2.4v-2.4H18v2.4Zm3.6 0h-2.4v-2.4h2.4v2.4ZM12 7.2c1.764 0 3.368.627 4.62 1.68L15 10.8c-.835-.702-1.824-1.2-3-1.2s-2.165.498-3 1.2L7.38 8.88A7.135 7.135 0 0 1 12 7.2ZM4.2 5.22C6.287 3.466 9.06 2.4 12 2.4c2.94 0 5.713 1.066 7.8 2.82l-1.62 1.83A9.576 9.576 0 0 0 12 4.8c-2.352 0-4.51.846-6.18 2.25L4.2 5.22Z"
    color={color}
    size={size}
  />
));
WifiRouter.displayName = "WifiRouter";
export default WifiRouter;
