import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const HeartFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "m12 20.973-.287-.083a14.5 14.5 0 0 1-6.853-4.493 12.6 12.6 0 0 1-2.086-3.451A10.7 10.7 0 0 1 2 8.998c0-.266.026-.976.27-1.84.246-.874.63-1.605 1.14-2.173 1.05-1.263 2.57-1.987 4.173-1.987.722 0 1.426.154 2.092.458.65.296 1.231.721 1.729 1.262.22.24.42.506.596.78a6 6 0 0 1 .596-.78 5.4 5.4 0 0 1 1.73-1.262 5 5 0 0 1 2.091-.458c1.602 0 3.122.724 4.173 1.987.51.568.894 1.299 1.14 2.173a7 7 0 0 1 .27 1.84c0 1.328-.26 2.657-.774 3.948a12.6 12.6 0 0 1-2.086 3.45 14.5 14.5 0 0 1-6.853 4.494z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
HeartFilled.displayName = "HeartFilled";
export default HeartFilled;
