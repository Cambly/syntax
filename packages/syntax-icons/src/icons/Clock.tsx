import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Clock = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m-1 2h2v7.6l-2 .79zm5.3 13.7L11 12.39l2-.79 4.7 4.7z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Clock.displayName = "Clock";
export default Clock;
