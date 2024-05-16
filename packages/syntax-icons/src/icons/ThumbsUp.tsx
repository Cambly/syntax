import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ThumbsUp = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M5 8v13H2V8zm8 0 .901-3.154A3.017 3.017 0 0 0 11 1L7 8v13h12l3-6V8z"
    color={color}
    size={size}
  />
));
ThumbsUp.displayName = "ThumbsUp";
export default ThumbsUp;
