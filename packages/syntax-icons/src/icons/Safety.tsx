import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Safety = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M14.4 0H9.6L1.2 4.8v2.94S1.2 19.2 12 24C22.8 19.2 22.8 7.74 22.8 7.74V4.8L14.4 0Zm-3.6 16.8L6 12l1.8-1.8 3 3 6.6-6.6 1.8 1.8-8.4 8.4Z"
    color={color}
    size={size}
  />
));
Safety.displayName = "Safety";
export default Safety;
