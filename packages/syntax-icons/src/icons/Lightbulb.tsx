import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Lightbulb = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M15 22H9l-1-3h8zM12 2c-3.533-.003-6.5 2.826-6.5 6.375 0 1.857.687 3.488 1.872 4.69.406.41.628.958.628 1.535V17h8v-2.4c0-.577.222-1.125.628-1.536 1.185-1.201 1.872-2.832 1.872-4.689C18.5 4.826 15.533 1.997 12 2";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Lightbulb.displayName = "Lightbulb";
export default Lightbulb;
