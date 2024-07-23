import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CircleEnclosedStar = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m4.5 15L15 18l-3-3-3 3-1.5-1L9 13l-3-2 .5-1.5H10L11 6h2l1 3.5h3.5L18 11l-3 2z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
CircleEnclosedStar.displayName = "CircleEnclosedStar";
export default CircleEnclosedStar;
