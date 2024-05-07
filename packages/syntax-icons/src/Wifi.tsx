import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Wifi = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M3.18 11.04 0 7.2c3.128-2.963 7.352-4.8 12-4.8s8.872 1.837 12 4.8l-3.18 3.84c-.103-.11-.228-.218-.335-.325A11.96 11.96 0 0 0 12 7.2a11.959 11.959 0 0 0-8.485 3.515c-.107.107-.233.215-.335.325ZM12 16.8c-1.153 0-2.16.534-2.82 1.38l2.821 3.42 2.819-3.42A3.544 3.544 0 0 0 12 16.8Zm6.788-4.388A9.537 9.537 0 0 0 12 9.6a9.537 9.537 0 0 0-6.788 2.812c-.16.16-.265.26-.412.428l2.723 3.36c1.096-1.182 2.742-1.8 4.477-1.8 1.735 0 3.38.618 4.477 1.8l2.723-3.36c-.147-.168-.252-.269-.412-.428Z"
    color={color}
    size={size}
  />
));
Wifi.displayName = "Wifi";
export default Wifi;
