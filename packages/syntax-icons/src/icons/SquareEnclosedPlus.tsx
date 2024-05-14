import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const SquareEnclosedPlus = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M3 3v18h18V3zm14.4 9.9h-4.5v4.5h-1.8v-4.5H6.6v-1.8h4.5V6.6h1.8v4.5h4.5z"
    color={color}
    size={size}
  />
));
SquareEnclosedPlus.displayName = "SquareEnclosedPlus";
export default SquareEnclosedPlus;
