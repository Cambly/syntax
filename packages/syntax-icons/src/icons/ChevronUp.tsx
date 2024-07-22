import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ChevronUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m3 14.525 1.35 1.35L12 8.225l7.65 7.65 1.35-1.35-9-9z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ChevronUp.displayName = "ChevronUp";
export default ChevronUp;
