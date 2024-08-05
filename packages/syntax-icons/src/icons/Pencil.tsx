import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Pencil = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M2 18 14.5 5.5l4 4L6 22H2zM16 4l4 4 2-2-4-4z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Pencil.displayName = "Pencil";
export default Pencil;
