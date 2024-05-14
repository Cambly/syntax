import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Achievement = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 2a8.5 8.5 0 0 0-5 15.375V22l5-2 5 2v-4.625A8.5 8.5 0 0 0 12 2m2.5 9 1.5 3-1 1-3-2.5L9 15l-1-1 1.5-3L7 9l.5-1h3l1-3h1l1 3h3l.5 1z"
    color={color}
    size={size}
  />
));
Achievement.displayName = "Achievement";
export default Achievement;
