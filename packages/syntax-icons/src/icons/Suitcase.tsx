import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Suitcase = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M2 22.1v-10l8 6h4l8-6v10zm20-15v2.5l-8 6v-1.5h-4v1.5l-8-6V7.1h6c0-2.206 1.794-4 4-4s4 1.794 4 4zm-12 0h4c0-1.103-.897-2-2-2s-2 .897-2 2"
    color={color}
    size={size}
  />
));
Suitcase.displayName = "Suitcase";
export default Suitcase;
