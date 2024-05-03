import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Clock = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm-1.2 2.4h2.4v9.12h-2.4V2.4Zm6.36 16.44-5.64-5.64 1.68-1.68 5.64 5.64-1.68 1.68Z"
    color={color}
    size={size}
  />
));
Clock.displayName = "Clock";
export default Clock;
