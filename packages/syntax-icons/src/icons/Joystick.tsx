import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Joystick = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M13 9V7.825A3 3 0 0 0 15 5a3 3 0 1 0-6 0c0 1.306.835 2.413 2 2.825V9l-8 3v6l9 4 9-4v-6zm-1 6.5L6 13l5-2v2h2v-2l5 2z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Joystick.displayName = "Joystick";
export default Joystick;
