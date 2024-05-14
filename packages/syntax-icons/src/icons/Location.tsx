import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Location = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 2c-4.059 0-8 3.074-8 8 0 5.299 6.5 12 6.5 12h3S20 15.299 20 10c0-4.926-3.941-8-8-8m0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8"
    color={color}
    size={size}
  />
));
Location.displayName = "Location";
export default Location;
