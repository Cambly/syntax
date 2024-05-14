import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const ThumbsDown = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M20.4 15.6V0H24v15.6h-3.6Zm-9.6 0-1.081 3.785C9.058 21.698 10.794 24 13.2 24l4.8-8.4V0H3.6L0 7.2v8.4h10.8Z"
    color={color}
    size={size}
  />
));
ThumbsDown.displayName = "ThumbsDown";
export default ThumbsDown;
