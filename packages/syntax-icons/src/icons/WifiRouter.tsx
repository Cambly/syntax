import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const WifiRouter = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M2 14v6h20v-6zm6 4H4v-2h4zm6 0h-2v-2h2zm3 0h-2v-2h2zm3 0h-2v-2h2zM12 8c1.47 0 2.807.523 3.85 1.4L14.5 11c-.695-.585-1.52-1-2.5-1s-1.805.415-2.5 1L8.15 9.4A5.95 5.95 0 0 1 12 8M5.5 6.35A10.15 10.15 0 0 1 12 4c2.45 0 4.761.888 6.5 2.35l-1.35 1.525A7.98 7.98 0 0 0 12 6a7.98 7.98 0 0 0-5.15 1.875z"
    color={color}
    size={size}
  />
));
WifiRouter.displayName = "WifiRouter";
export default WifiRouter;
