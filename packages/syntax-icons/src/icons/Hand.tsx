import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Hand = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M17 13V2h-3l-.5 9-1-9H10v9L8.5 3.5 6 4l.5 8-2-6L2 7l2.5 10c.909 2.878 3.143 5 7.5 5 4.164 0 5.812-3.1 7-5 1.35-2.16 3-7 3-7l-3-1.5z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Hand.displayName = "Hand";
export default Hand;
