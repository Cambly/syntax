import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Pause = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M9.6 22.8H4.8V1.2h4.8v21.6Zm9.6-21.6h-4.8v21.6h4.8V1.2Z"
    color={color}
    size={size}
  />
));
Pause.displayName = "Pause";
export default Pause;
