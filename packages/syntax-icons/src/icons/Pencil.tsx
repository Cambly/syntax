import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Pencil = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m0 19.2 15-15L19.8 9l-15 15H0v-4.8ZM16.8 2.4l4.8 4.8L24 4.8 19.2 0l-2.4 2.4Z"
    color={color}
    size={size}
  />
));
Pencil.displayName = "Pencil";
export default Pencil;
