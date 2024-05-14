import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ToggleSettings = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 6h-2.17a3.001 3.001 0 0 1-5.659 0H2V4h12.171a3 3 0 0 1 5.658 0H22zm0 12h-2.17a3.001 3.001 0 0 0-5.659 0H2v2h12.171a3.001 3.001 0 0 0 5.658 0H22zm0-7H9.83a3.001 3.001 0 0 0-5.659 0H2v2h2.171a3.001 3.001 0 0 0 5.658 0H22z"
    color={color}
    size={size}
  />
));
ToggleSettings.displayName = "ToggleSettings";
export default ToggleSettings;
