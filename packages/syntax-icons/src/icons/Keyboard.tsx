import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Keyboard = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M2 5v14h20V5zm9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-1 2H5v-2h2zm0-3H5V8h2zm9 7H8v-2h8zm0-4h-2v-2h2zm0-3h-2V8h2zm3 3h-2v-2h2zm0-3h-2V8h2z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Keyboard.displayName = "Keyboard";
export default Keyboard;
