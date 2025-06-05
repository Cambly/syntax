import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ArrowRight = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M13.5 3.5 12 5l6 6H2v2h16l-6 6 1.5 1.5L22 12z";
  return <Icon ref={ref} path={path} color={color} size={size} rtlMirror />;
});
ArrowRight.displayName = "ArrowRight";
export default ArrowRight;
