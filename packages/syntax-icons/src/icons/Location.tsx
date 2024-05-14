import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Location = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 0C7.13 0 2.4 3.69 2.4 9.6c0 6.358 7.8 14.4 7.8 14.4h3.6s7.8-8.042 7.8-14.4C21.6 3.69 16.87 0 12 0Zm0 13.2a4.8 4.8 0 1 1 0-9.6 4.8 4.8 0 0 1 0 9.6Z"
    color={color}
    size={size}
  />
));
Location.displayName = "Location";
export default Location;
