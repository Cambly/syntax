import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Joystick = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M13.2 8.4V6.99a3.595 3.595 0 0 0 2.4-3.39 3.6 3.6 0 0 0-7.2 0 3.595 3.595 0 0 0 2.4 3.39V8.4L1.2 12v7.2L12 24l10.8-4.8V12l-9.6-3.6ZM12 16.2l-7.2-3 6-2.4v2.4h2.4v-2.4l6 2.4-7.2 3Z"
    color={color}
    size={size}
  />
));
Joystick.displayName = "Joystick";
export default Joystick;
