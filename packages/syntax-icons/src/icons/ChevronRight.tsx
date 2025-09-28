import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ChevronRight = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m9.475 21-1.35-1.35 7.65-7.65-7.65-7.65L9.475 3l9 9z";
  return <Icon ref={ref} path={path} color={color} size={size} rtlMirror />;
});
ChevronRight.displayName = "ChevronRight";
export default ChevronRight;
