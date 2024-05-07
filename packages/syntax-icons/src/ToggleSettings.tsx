import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const ToggleSettings = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M24 4.8h-2.605a3.601 3.601 0 0 1-6.79 0H0V2.4h14.605a3.601 3.601 0 0 1 6.79 0H24v2.4Zm0 14.4h-2.605a3.601 3.601 0 0 0-6.79 0H0v2.4h14.605a3.601 3.601 0 0 0 6.79 0H24v-2.4Zm0-8.4H9.395a3.601 3.601 0 0 0-6.79 0H0v2.4h2.605a3.601 3.601 0 0 0 6.79 0H24v-2.4Z"
    color={color}
    size={size}
  />
));
ToggleSettings.displayName = "ToggleSettings";
export default ToggleSettings;
