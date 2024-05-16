import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const HangUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 7C5.307 7 2 10.35 2 10.35V17l6-1v-3.5h8V16l6 1v-6.65S18.693 7 12 7"
    color={color}
    size={size}
  />
));
HangUp.displayName = "HangUp";
export default HangUp;
