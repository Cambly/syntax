import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ThumbsDown = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M19 16V3h3v13zm-8 0-.901 3.154A3.017 3.017 0 0 0 13 23l4-7V3H5L2 9v7z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ThumbsDown.displayName = "ThumbsDown";
export default ThumbsDown;
